from fastapi import APIRouter, Request
from app.models.chatbot_model import ChatRequest
from app.services.chatbot_service import chat_with_bot
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
router = APIRouter()

@router.post("/chat")
@limiter.limit("20/minute")
def chat(request: Request, body: ChatRequest):
    history = [{"role": m.role, "content": m.content} for m in body.history]
    bot_reply, suggested_questions = chat_with_bot(
        body.username,
        body.disease,
        body.message,
        history,
        skip_save=body.skip_save,
        idempotency_key=body.idempotency_key
    )
    return {
        "response": bot_reply,
        "suggested_questions": suggested_questions
    }