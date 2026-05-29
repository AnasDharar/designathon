from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Production-first settings loaded from process environment."""

    app_name: str = "Vibes"
    debug: bool = False
    cors_origins: str = "http://localhost:3000"

    database_url: str = ""

    gemini_api_key: str = ""
    ai_model: str = "gemini-2.5-flash"

    storage_path: str = "./api/storage/uploads"
    max_upload_size_mb: int = 10

    model_config = {"extra": "ignore"}

    @property
    def cors_origin_list(self) -> list[str]:
        origins = []
        for origin in self.cors_origins.split(","):
            cleaned = origin.strip().rstrip("/")
            if cleaned:
                origins.append(cleaned)
        return origins


@lru_cache()
def get_settings() -> Settings:
    return Settings()
