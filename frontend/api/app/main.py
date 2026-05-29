from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import get_settings
from app.db.database import engine
from app.features.auth.router import router as auth_router
from app.features.vibes.router import router as vibes_router


settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Serverless-safe lifespan hook."""
    yield
    await engine.dispose()


app = FastAPI(
    title=settings.app_name,
    description="AI-Powered Design Intelligence Platform API",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(vibes_router, prefix="/api/vibes", tags=["Vibes"])


@app.get("/")
async def root():
    return {"name": settings.app_name, "status": "running", "version": "0.1.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}
