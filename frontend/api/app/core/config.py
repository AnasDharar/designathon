from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    # App
    app_name: str = "Vibes"
    app_env: str = "development"
    debug: bool = True
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    cors_origins: str = "http://localhost:3000"

    # Database
    database_url: str = ""
    supabase_url: str = ""

    # AI
    gemini_api_key: str = ""
    ai_provider: str = "gemini"
    ai_model: str = "gemini-2.0-flash"

    # Storage
    storage_path: str = "./api/storage/uploads"
    max_upload_size_mb: int = 10

    # Auth
    jwt_secret: str = "vibes-dev-secret"
    jwt_expiry_hours: int = 720

    model_config = {"env_file": "api/.env", "env_file_encoding": "utf-8"}

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",")]


@lru_cache()
def get_settings() -> Settings:
    return Settings()
