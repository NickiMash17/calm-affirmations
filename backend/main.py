"""
Live Mood Architect — FastAPI Backend
Generates therapeutic affirmations via OpenAI.
"""

import os
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from openai import OpenAI, APITimeoutError, APIConnectionError, APIStatusError

# ── Config ──────────────────────────────────────────────────────────

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4.1-mini")
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if o.strip()
]

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY environment variable is required.")

client = OpenAI(api_key=OPENAI_API_KEY)

# ── App ─────────────────────────────────────────────────────────────

app = FastAPI(title="Live Mood Architect API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# ── Models ──────────────────────────────────────────────────────────

class AffirmationRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=60)
    feeling: str = Field(..., min_length=1, max_length=280)


class AffirmationResponse(BaseModel):
    affirmation: str

# ── System prompt ───────────────────────────────────────────────────

SYSTEM_PROMPT = """You are a compassionate, warm affirmation generator.

Rules you MUST follow:
- Never provide medical, legal, or diagnostic advice.
- Never provide guidance on self-harm or harming others.
- If the user's message suggests self-harm intent, respond ONLY with a short, supportive message encouraging them to reach out to a professional or crisis line (e.g., 988 Suicide & Crisis Lifeline in the US).
- Keep your response to 2–4 sentences.
- Be warm, empathetic, and specific to the person's name and feeling.
- Use the person's name naturally in the affirmation.
- Speak directly to the person (use "you").
"""

# ── Endpoint ────────────────────────────────────────────────────────

@app.post("/api/affirmation", response_model=AffirmationResponse)
async def create_affirmation(body: AffirmationRequest):
    name = body.name.strip()
    feeling = body.feeling.strip()

    if not name:
        raise HTTPException(status_code=400, detail="Name cannot be empty.")
    if not feeling:
        raise HTTPException(status_code=400, detail="Feeling cannot be empty.")

    user_message = f"My name is {name}. I'm feeling: {feeling}"

    try:
        response = client.responses.create(
            model=OPENAI_MODEL,
            instructions=SYSTEM_PROMPT,
            input=user_message,
        )
        affirmation = response.output_text.strip()
        if not affirmation:
            raise HTTPException(
                status_code=502,
                detail="We received an empty response. Please try again.",
            )
        return AffirmationResponse(affirmation=affirmation)

    except APITimeoutError:
        raise HTTPException(
            status_code=504,
            detail="The request took too long. Please try again in a moment.",
        )
    except (APIConnectionError, APIStatusError) as e:
        raise HTTPException(
            status_code=502,
            detail="We're having trouble connecting to our service. Please try again shortly.",
        )
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Something unexpected happened. Please try again.",
        )
