from functools import lru_cache

from fastapi import APIRouter, HTTPException

from app.schemas.affirmation import AffirmationRequest, AffirmationResponse
from app.services.affirmation_service import AffirmationService

router = APIRouter(prefix="/api", tags=["affirmations"])


@lru_cache
def get_service() -> AffirmationService:
    return AffirmationService()


@router.post("/affirmation", response_model=AffirmationResponse)
def create_affirmation(payload: AffirmationRequest) -> AffirmationResponse:
    name = payload.name.strip()
    feeling = payload.feeling.strip()
    if not name or not feeling:
        raise HTTPException(status_code=400, detail="Name and feeling are required.")

    try:
        service = get_service()
        affirmation = service.create(name=name, feeling=feeling)
        return AffirmationResponse(affirmation=affirmation)
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="The affirmation service is temporarily unavailable. Please try again in a moment.",
        )
