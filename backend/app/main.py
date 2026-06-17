from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.routes.chatbot_routes import router as chatbot_router
from app.routes.history_routes import router as history_router
from app.routes.auth_routes import router as auth_router
from app.routes.facility_routes import router as facility_router
from app.routes.upload_routes import router as upload_router

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="HealthBridge API",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://healthbridge-tau.vercel.app",  
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot_router)
app.include_router(history_router)
app.include_router(auth_router)
app.include_router(facility_router)
app.include_router(upload_router)

@app.get("/")
def home():
    return {"message": "HealthBridge Running"}