from datetime import datetime

from app.services.ollama_service import ask_llm
from app.services.rag_service import retrieve_context
from app.database.mongodb import db


def chat_with_bot(
    username: str,
    disease: str,
    message: str
):
    """
    Main HealthBridge chatbot service.
    Retrieves relevant context from the RAG system,
    sends it to Ollama, saves the conversation,
    and returns the AI response.
    """

    # Retrieve relevant context from ChromaDB
    context = retrieve_context(
        disease,
        message
    )

    # Create RAG prompt
    prompt = f"""
You are HealthBridge AI, a healthcare information assistant.

Rules:
1. Answer ONLY using the provided context.
2. Do NOT invent information.
3. If the answer is not found in the context, respond:
   "I could not find enough information in the HealthBridge knowledge base."
4. Keep answers clear, concise, and easy to understand.
5. Do not provide medical diagnosis or replace professional medical advice.

Context:
{context}

Question:
{message}

Answer:
"""

    # Generate response using Ollama
    response = ask_llm(prompt)

    # Save conversation history to MongoDB
    db.chat_history.insert_one({
        "username": username,
        "disease": disease,
        "question": message,
        "response": response,
        "timestamp": datetime.utcnow()
    })

    return response

