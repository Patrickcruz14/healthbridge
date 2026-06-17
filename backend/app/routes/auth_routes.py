from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.user_model import UserRegister, UserLogin, UserProfileUpdate, UserPasswordChange, ForgotPassword, ResetPassword
from app.services.auth_service import (
    register_user, login_user,
    get_user_profile, update_user_profile, change_user_password,
    forgot_password, reset_password
)
from app.utils.jwt_handler import verify_token
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
router = APIRouter()
bearer_scheme = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

@router.post("/register")
@limiter.limit("5/minute")
def register(request: Request, user: UserRegister):
    return register_user(
        user.username, user.email, user.password,
        user.age, user.sex, user.barangay, user.city,
        user.bloodType, user.allergies,
        user.denguHistory, user.tbHistory, user.hypertensionHistory
    )

@router.post("/login")
@limiter.limit("5/minute")
def login(request: Request, user: UserLogin):
    return login_user(user.email, user.password)

@router.get("/profile/{username}")
def get_profile(username: str, current_user: dict = Depends(get_current_user)):
    if current_user.get("username") != username:
        raise HTTPException(status_code=403, detail="Forbidden")
    return get_user_profile(username)

@router.put("/profile/{username}")
def update_profile(username: str, data: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    if current_user.get("username") != username:
        raise HTTPException(status_code=403, detail="Forbidden")
    return update_user_profile(username, data.model_dump(exclude_none=True))

@router.post("/profile/{username}/change-password")
def change_password(username: str, data: UserPasswordChange, current_user: dict = Depends(get_current_user)):
    if current_user.get("username") != username:
        raise HTTPException(status_code=403, detail="Forbidden")
    return change_user_password(username, data.current_password, data.new_password)

@router.post("/forgot-password")
@limiter.limit("5/minute")
def forgot_password_route(request: Request, data: ForgotPassword):
    return forgot_password(data.email)

@router.post("/reset-password")
@limiter.limit("5/minute")
def reset_password_route(request: Request, data: ResetPassword):
    return reset_password(data.token, data.new_password)