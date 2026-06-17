from fastapi import APIRouter, HTTPException
from app.database.mongodb import db
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter()

@router.get("/history/{username}")
def get_history(username: str):
    history = []
    for item in db.chat_history.find({"username": username}).sort("timestamp", -1):
        history.append({
            "id": str(item["_id"]),
            "disease": item["disease"],
            "question": item["question"],
            "response": item["response"],
            "timestamp": item["timestamp"].isoformat() if item.get("timestamp") else None,
            "title": item.get("title", None)
        })
    return history

@router.patch("/history/{item_id}/title")
def update_title(item_id: str, body: dict):
    try:
        db.chat_history.update_one(
            {"_id": ObjectId(item_id)},
            {"$set": {"title": body.get("title", "")}}
        )
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid ID")
    return {"message": "Title updated"}

@router.delete("/history/item/{item_id}")
def delete_item(item_id: str):
    try:
        db.chat_history.delete_one({"_id": ObjectId(item_id)})
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid ID")
    return {"message": "Deleted"}

@router.delete("/history/session/{username}/{disease}/{timestamp_prefix}")
def delete_session(username: str, disease: str, timestamp_prefix: str):
    items = list(db.chat_history.find({"username": username, "disease": disease}))
    ids_to_delete = []
    for item in items:
        if item.get("timestamp"):
            ts = item["timestamp"]
            date_str = ts.strftime("%Y-%m-%d")
            if date_str == timestamp_prefix:
                ids_to_delete.append(item["_id"])
    if ids_to_delete:
        db.chat_history.delete_many({"_id": {"$in": ids_to_delete}})
    return {"message": f"Deleted {len(ids_to_delete)} items"}