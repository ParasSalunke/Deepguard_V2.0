"""
DeepGuard Backend — FastAPI Application
Explainable AI system for detecting AI-generated images.
"""

import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.predict import router as predict_router

app = FastAPI(
    title="DeepGuard API",
    description="Explainable AI system for detecting AI-generated images using Grad-CAM",
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS — allow the React frontend to communicate with the backend
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://deepguardfrontend.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
app.include_router(predict_router)


@app.get("/health")
async def health_check():
    """Simple health-check endpoint."""
    return {"status": "running"}
