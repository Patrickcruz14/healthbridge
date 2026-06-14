from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chatbot_routes import router as chatbot_router
from app.routes.history_routes import router as history_router
from app.routes.auth_routes import router as auth_router

app = FastAPI(
    title="HealthBridge API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot_router)
app.include_router(history_router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message": "HealthBridge Running"
    }