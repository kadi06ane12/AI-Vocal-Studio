from fastapi import APIRouter
import os

from services.demucs_service import extract_vocals

router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/process")
async def process_file(
    filename: str,
    format: str = "wav",
    model: str = "mdx_q",
):

    input_path = os.path.join(UPLOAD_FOLDER, filename)

    if not os.path.exists(input_path):
        return {
            "success": False,
            "message": "File not found"
        }

    try:
        files = extract_vocals(
            input_path=input_path,
            model=model,
            output_format=format,
        )

        return {
            "success": True,
            "message": "Vocals extracted successfully",
            "model": model,
            "format": format,
            "files": files,
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
