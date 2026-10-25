from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.upload import router as upload_router
from routes.process import router as process_router
from routes.download import router as download_router

from logger import logger

logger.info("AI Vocal Studio backend starting")

app = FastAPI(title="AI Vocal Studio API")

# Serve output files
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ai-vocal-studio.kadi06ane12.workers.dev",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(upload_router)
app.include_router(process_router)
app.include_router(download_router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "AI Vocal Studio Backend Running 🚀"
    }
