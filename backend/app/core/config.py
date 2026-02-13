import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    def __init__(self) -> None:
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.openai_model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
        self.allowed_origins = os.getenv("ALLOWED_ORIGINS", "")
        self.openai_timeout = self._read_float("OPENAI_TIMEOUT", 20.0)
        self.openai_max_retries = self._read_int("OPENAI_MAX_RETRIES", 2)

    def _read_float(self, key: str, default: float) -> float:
        raw = os.getenv(key, "")
        if not raw:
            return default
        try:
            return float(raw)
        except ValueError:
            return default

    def _read_int(self, key: str, default: int) -> int:
        raw = os.getenv(key, "")
        if not raw:
            return default
        try:
            return int(raw)
        except ValueError:
            return default

    def cors_origins(self) -> list[str]:
        origins = [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]
        return origins or ["http://localhost:5173"]

    def validate(self) -> None:
        if not self.openai_api_key:
            raise RuntimeError("OPENAI_API_KEY is not set")


settings = Settings()

