from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
api_key = os.getenv("CLOUDINARY_API_KEY")
api_secret = os.getenv("CLOUDINARY_API_SECRET")

print(f"Cloudinary config: cloud_name={cloud_name}, api_key={api_key}")

cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret,
)

router = APIRouter()

@router.post("/upload/profile-picture/{username}")
async def upload_profile_picture(username: str, file: UploadFile = File(...)):
    try:
        contents = await file.read()
        result = cloudinary.uploader.upload(
            contents,
            folder="healthbridge/profiles",
            public_id=f"profile_{username}",
            overwrite=True,
            resource_type="image",
        )
        return {"url": result["secure_url"]}
    except Exception as e:
        print(f"Upload error: {str(e)}")
        return JSONResponse(status_code=500, content={"error": str(e)})
