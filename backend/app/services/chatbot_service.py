import requests
import os
import time
from datetime import datetime
from app.database.mongodb import db
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def groq_request(payload, headers, retries=3):
    for attempt in range(retries):
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=payload
        )
        data = response.json()
        if "choices" in data:
            return data
        error = data.get('error', {})
        if isinstance(error, dict) and error.get('code') == 'rate_limit_exceeded':
            wait = 2 ** attempt
            print(f"Rate limit hit, waiting {wait}s...")
            time.sleep(wait)
            continue
        raise Exception(f"Groq API error: {data.get('error', data)}")
    raise Exception("Rate limit — subukan ulit mamaya")

def generate_suggested_questions(disease: str, bot_reply: str, history: list = []) -> list:
    history_summary = ""
    if history:
        history_summary = "Mga nakaraang tanong at sagot:\n"
        for msg in history[-4:]:
            history_summary += f"- {msg['role']}: {msg['content'][:100]}\n"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {
                "role": "system",
                "content": f"""Bumuo ng exactly 3 suggested na mensahe para sa user na mag-i-click bilang sagot sa bot tungkol sa {disease}.

PANUNTUNAN:
- Purong Tagalog — bawal mag-mix ng English maliban sa medical terms (BP, hypertension, dengue, TB)
- Natural na pakikipag-usap — parang kaibigan nagsasalita, hindi robotic
- DIREKTA sa huling sinabi ng bot — kung nagtanong ng BP, may BP number; kung nagtanong ng sintomas, may sintomas
- TATLONG MAGKAKAIBANG OPSYON — isa may sintomas/positibo, isa walang sintomas/negatibo, isa hindi pa nasusukat/hindi sigurado
- First person — ako, ko, akin
- MAX 8 salita bawat suggestion
- HUWAG mag-ulit ng salita sa loob ng iisang suggestion
- HUWAG gumamit ng "nararamdaman" nang paulit-ulit
- Isulat lang ang 3 suggestions, isa sa bawat linya, walang numbering, walang bullet, walang label

HALIMBAWA kung nagtanong ng BP:
Mga 150/90 ang BP ko ngayon
Hindi pa ako nakasukat ng BP
Normal lang ang BP ko kahapon

HALIMBAWA kung nagtanong ng sintomas:
Masakit ang ulo ko at nahihilo
Wala akong nararamdaman ngayon
Hindi ko sigurado kung may sintomas ako

HALIMBAWA kung nagtanong ng gamot:
Umiinom na ako ng gamot para sa BP
Wala pa akong gamot na inuumin
Minsan lang ako umiinom ng gamot"""
            },
            {
                "role": "user",
                "content": f"{history_summary}\nSagot ng bot: {bot_reply}\n\nBumuo ng 3 suggested replies ng user:"
            }
        ],
        "temperature": 0.3,
        "max_tokens": 120
    }
    try:
        data = groq_request(payload, headers)
        text = data["choices"][0]["message"]["content"]
        questions = [q.strip() for q in text.strip().split('\n') if q.strip()][:3]
        return questions
    except:
        return []

def chat_with_bot(username: str, disease: str, message: str, history: list = [], skip_save: bool = False, idempotency_key: str = None):

    if idempotency_key:
        existing = db.idempotency_cache.find_one({
            "key": idempotency_key,
            "username": username
        })
        if existing:
            return existing["response"], existing["suggested_questions"]

    prompt_doc = db.prompts.find_one({"disease": disease.lower()})
    system_prompt = prompt_doc["system_prompt"] if prompt_doc else "Ikaw si HealthBot, isang health assistant. Sumagot sa Filipino/Tagalog lagi."

    try:
        from app.services.rag_service import retrieve_context
        context = retrieve_context(disease, message)
        if context:
            system_prompt += f"\n\nRELEVANT CONTEXT:\n{context}"
    except:
        pass

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    messages = []
    messages.append({"role": "system", "content": system_prompt})
    messages.extend(history[-6:])
    messages.append({"role": "user", "content": message})

    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": messages,
        "temperature": 0.3,
        "max_tokens": 512
    }

    data = groq_request(payload, headers)
    bot_reply = data["choices"][0]["message"]["content"]
    suggested_questions = generate_suggested_questions(disease, bot_reply, history)

    if not skip_save:
        db.chat_history.insert_one({
            "username": username,
            "disease": disease,
            "question": message,
            "response": bot_reply,
            "timestamp": datetime.utcnow()
        })

    if idempotency_key and not skip_save:
        db.idempotency_cache.insert_one({
            "key": idempotency_key,
            "username": username,
            "response": bot_reply,
            "suggested_questions": suggested_questions,
            "timestamp": datetime.utcnow()
        })

    return bot_reply, suggested_questions