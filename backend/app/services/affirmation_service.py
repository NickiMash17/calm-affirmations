from openai import OpenAI

from app.core.config import settings
from app.core.safety import INSTRUCTIONS, SAFE_FALLBACK


class AffirmationService:
    def __init__(self) -> None:
        settings.validate()
        self._client = OpenAI(api_key=settings.openai_api_key)
        self._model = settings.openai_model

    def create(self, name: str, feeling: str) -> str:
        try:
            moderation = self._client.moderations.create(
                model="omni-moderation-latest",
                input=f"{name}: {feeling}",
            )
            results = getattr(moderation, "results", None) or []
            flagged = bool(results and getattr(results[0], "flagged", False))
            if flagged:
                return SAFE_FALLBACK
        except Exception:
            pass

        user_input = (
            f"User name: {name}\n"
            f"Feeling: {feeling}\n"
            "Write a short therapeutic affirmation tailored to them."
        )
        response = self._client.responses.create(
            model=self._model,
            instructions=INSTRUCTIONS,
            input=user_input,
        )
        text = (response.output_text or "").strip()
        if not text:
            raise RuntimeError("Empty model response")
        return text
