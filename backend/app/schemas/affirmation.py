from pydantic import BaseModel, Field


class AffirmationRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=60)
    feeling: str = Field(..., min_length=1, max_length=280)


class AffirmationResponse(BaseModel):
    affirmation: str

