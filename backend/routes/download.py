from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

router = APIRouter()

OUTPUT_FOLDER = "outputs"


@router.get("/download/{filename}/{filetype}")
async def download_file(filename: str, filetype: str):

    song = os.path.splitext(filename)[0]

    if filetype == "vocals":
        path = os.path.join(
            OUTPUT_FOLDER,
            "htdemucs",
            song,
            "vocals.wav"
        )
    else:
        path = os.path.join(
            OUTPUT_FOLDER,
            "htdemucs",
            song,
            "no_vocals.wav"
        )

    if not os.path.exists(path):
        return {
            "success": False,
            "message": "File not found"
        }

    return FileResponse(
        path,
        media_type="audio/wav",
        filename=os.path.basename(path)
    )