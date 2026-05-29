from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class VibeScores(BaseModel):
    professionalism: float = 0.5
    warmth: float = 0.5
    originality: float = 0.5
    visualDensity: float = 0.5
    interactionEnergy: float = 0.5
    accessibilityBias: float = 0.5


class VibeCreate(BaseModel):
    title: str
    description: Optional[str] = None
    pinterest_url: Optional[str] = None
    dribbble_url: Optional[str] = None


class VibeUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    scores: Optional[VibeScores] = None
    is_public: Optional[bool] = None


class VibeResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    scores: Optional[dict]
    score_explanations: Optional[dict]
    aesthetic_summary: Optional[str]
    status: str
    is_public: bool
    reference_count: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class UIGenerateRequest(BaseModel):
    vibe_id: str
    prompt: str


class UIGenerateResponse(BaseModel):
    prompt_text: str


class CritiqueResponse(BaseModel):
    id: str
    vibe_id: str
    scores: dict
    feedback: dict
    summary: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
