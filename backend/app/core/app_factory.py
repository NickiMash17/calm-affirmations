from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routes.affirmation import router as affirmation_router
from app.routes.health import router as health_router


def create_app() -> FastAPI:
    settings.validate()
    app = FastAPI(title="Live Mood Architect API")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(affirmation_router)
    app.include_router(health_router)
    return app
