from fastapi import APIRouter

from app.models.chatbot_model import ChatRequest
from app.services.chatbot_service import chat_with_bot

router = APIRouter()


@router.post("/chat")
def chat(request: ChatRequest):

    answer = chat_with_bot(
        request.username,
        request.disease,
        request.message
    )

    return {
        "response": answer
    }