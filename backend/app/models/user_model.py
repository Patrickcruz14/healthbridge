from pydantic import BaseModel
from typing import Optional

class UserRegister(BaseModel):
    username: str
    email: str
    password: str
    age: Optional[str] = ""
    sex: Optional[str] = ""
    barangay: Optional[str] = ""
    city: Optional[str] = ""
    bloodType: Optional[str] = "Hindi alam"
    allergies: Optional[str] = ""
    denguHistory: Optional[bool] = None
    tbHistory: Optional[bool] = None
    hypertensionHistory: Optional[bool] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserProfileUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    email: Optional[str] = None
    age: Optional[str] = None
    sex: Optional[str] = None
    barangay: Optional[str] = None
    city: Optional[str] = None
    bloodType: Optional[str] = None
    allergies: Optional[str] = None
    currentMedications: Optional[str] = None
    denguHistory: Optional[bool] = False
    tbHistory: Optional[bool] = False
    hypertensionHistory: Optional[bool] = False
    profilePicture: Optional[str] = None

class UserPasswordChange(BaseModel):
    current_password: str
    new_password: str

class ForgotPassword(BaseModel):
    email: str

class ResetPassword(BaseModel):
    token: str
    new_password: str