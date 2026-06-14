from fastapi import APIRouter

from app.database.mongodb import db

router = APIRouter()


@router.get("/history/{username}")
def get_history(username: str):

    history = []

    for item in db.chat_history.find(
        {"username": username}
    ).sort("timestamp", -1):

        history.append({
            "disease": item["disease"],
            "question": item["question"],
            "response": item["response"]
        })

    return history