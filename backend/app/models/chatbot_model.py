from pydantic import BaseModel


class ChatRequest(BaseModel):
    username: str
    disease: str
    message: str