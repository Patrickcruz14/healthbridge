from pydantic import BaseModel
from typing import List, Optional

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    username: str
    disease: str
    message: str
    history: Optional[List[Message]] = []
    skip_save: bool = False  
    idempotency_key: Optional[str] = None 