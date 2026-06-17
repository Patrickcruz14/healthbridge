import bcrypt
from app.database.mongodb import db
from app.utils.jwt_handler import create_access_token, create_reset_token, verify_token

def register_user(username, email, password, age="", sex="", barangay="", city="", bloodType="Hindi alam", allergies="", denguHistory=False, tbHistory=False, hypertensionHistory=False):
    existing_user = db.users.find_one({"email": email})
    if existing_user:
        return {"error": "User already exists"}
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    parts = username.strip().split(' ', 1)
    firstName = parts[0]
    lastName = parts[1] if len(parts) > 1 else ''
    db.users.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password.decode('utf-8'),
        "firstName": firstName,
        "lastName": lastName,
        "age": age,
        "sex": sex,
        "barangay": barangay,
        "city": city,
        "bloodType": bloodType,
        "allergies": allergies,
        "currentMedications": "",
        "denguHistory": denguHistory,
        "tbHistory": tbHistory,
        "hypertensionHistory": hypertensionHistory,
    })
    return {"message": "Registration successful"}

def login_user(email, password):
    user = db.users.find_one({"email": email})
    if not user:
        return {"error": "Invalid credentials"}
    valid_password = bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8'))
    if not valid_password:
        return {"error": "Invalid credentials"}
    token = create_access_token({"email": email, "username": user["username"]})
    return {"token": token, "username": user["username"]}

def get_user_profile(username: str):
    user = db.users.find_one({"username": username})
    if not user:
        return {"error": "User not found"}
    return {
        "firstName": user.get("firstName", ""),
        "lastName": user.get("lastName", ""),
        "email": user.get("email", ""),
        "age": user.get("age", ""),
        "sex": user.get("sex", ""),
        "barangay": user.get("barangay", ""),
        "city": user.get("city", ""),
        "bloodType": user.get("bloodType", "Hindi alam"),
        "allergies": user.get("allergies", ""),
        "currentMedications": user.get("currentMedications", ""),
        "denguHistory": user.get("denguHistory", False),
        "tbHistory": user.get("tbHistory", False),
        "hypertensionHistory": user.get("hypertensionHistory", False),
        "profilePicture": user.get("profilePicture", ""),
    }

def update_user_profile(username: str, data: dict):
    filtered = {k: v for k, v in data.items() if v is not None}
    db.users.update_one({"username": username}, {"$set": filtered})
    return {"message": "Profile updated"}

def change_user_password(username: str, current_password: str, new_password: str):
    user = db.users.find_one({"username": username})
    if not user:
        return {"error": "User not found"}
    valid = bcrypt.checkpw(current_password.encode('utf-8'), user["password"].encode('utf-8'))
    if not valid:
        return {"error": "Mali ang kasalukuyang password"}
    hashed = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    db.users.update_one({"username": username}, {"$set": {"password": hashed.decode('utf-8')}})
    return {"message": "Password changed successfully"}

def forgot_password(email: str):
    user = db.users.find_one({"email": email})
    if not user:
        return {"error": "Walang account na may email na ito"}
    reset_token = create_reset_token(email)
    db.password_resets.insert_one({
        "email": email,
        "token": reset_token,
        "used": False
    })
    return {"message": "Reset token generated", "reset_token": reset_token}

def reset_password(token: str, new_password: str):
    payload = verify_token(token)
    if not payload or payload.get("purpose") != "reset_password":
        return {"error": "Invalid or expired token"}
    email = payload.get("email")
    record = db.password_resets.find_one({"token": token, "used": False})
    if not record:
        return {"error": "Token already used or not found"}
    hashed = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    db.users.update_one({"email": email}, {"$set": {"password": hashed.decode('utf-8')}})
    db.password_resets.update_one({"token": token}, {"$set": {"used": True}})
    return {"message": "Password reset successful"}