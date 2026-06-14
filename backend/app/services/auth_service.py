from passlib.context import CryptContext

from app.database.mongodb import db
from app.utils.jwt_handler import create_access_token

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def register_user(
    username,
    email,
    password
):

    existing_user = db.users.find_one({
        "email": email
    })

    if existing_user:
        return {
            "error": "User already exists"
        }

    hashed_password = pwd_context.hash(
        password
    )

    db.users.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password
    })

    return {
        "message": "Registration successful"
    }


def login_user(
    email,
    password
):

    user = db.users.find_one({
        "email": email
    })

    if not user:
        return {
            "error": "Invalid credentials"
        }

    valid_password = pwd_context.verify(
        password,
        user["password"]
    )

    if not valid_password:
        return {
            "error": "Invalid credentials"
        }

    token = create_access_token({
        "email": email
    })

    return {
        "token": token,
        "username": user["username"]
    }