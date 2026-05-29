import json
import logging
import base64
from typing import Any

from app.core.config import get_settings

logger = logging.getLogger(__name__)

_ANALYSIS_PROMPT_TEMPLATE = """
You are an expert product design art director.
Analyze the uploaded UI/design reference images and output ONLY valid JSON.

Context:
- vibe_title: {title}
- vibe_description: {description}

Return exactly this shape:
{{
  "scores": {{
    "professionalism": 0.0-1.0,
    "warmth": 0.0-1.0,
    "originality": 0.0-1.0,
    "visualDensity": 0.0-1.0,
    "interactionEnergy": 0.0-1.0,
    "accessibilityBias": 0.0-1.0
  }},
  "score_explanations": {{
    "professionalism": "short explanation",
    "warmth": "short explanation",
    "originality": "short explanation",
    "visualDensity": "short explanation",
    "interactionEnergy": "short explanation",
    "accessibilityBias": "short explanation"
  }},
  "aesthetic_summary": "2-4 sentence concise aesthetic summary"
}}
"""

def _fallback_analysis(reason: str | None = None) -> dict[str, Any]:
    summary = "Aesthetic analysis could not be generated yet. Please retry."
    if reason:
        summary = f"{summary} ({reason})"
    return {
        "scores": {
            "professionalism": 0.5,
            "warmth": 0.5,
            "originality": 0.5,
            "visualDensity": 0.5,
            "interactionEnergy": 0.5,
            "accessibilityBias": 0.5,
        },
        "score_explanations": {
            "professionalism": "Default score used because AI analysis is unavailable.",
            "warmth": "Default score used because AI analysis is unavailable.",
            "originality": "Default score used because AI analysis is unavailable.",
            "visualDensity": "Default score used because AI analysis is unavailable.",
            "interactionEnergy": "Default score used because AI analysis is unavailable.",
            "accessibilityBias": "Default score used because AI analysis is unavailable.",
        },
        "aesthetic_summary": summary,
    }


def _extract_json(text: str) -> dict[str, Any] | None:
    raw = text.strip()
    if raw.startswith("```"):
        raw = raw.strip("`")
        if raw.startswith("json"):
            raw = raw[4:].strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


def _clamp_scores(payload: dict[str, Any]) -> dict[str, Any]:
    fallback = _fallback_analysis()
    scores = payload.get("scores", {})
    explanations = payload.get("score_explanations", {})
    summary = payload.get("aesthetic_summary") or fallback["aesthetic_summary"]

    normalized_scores: dict[str, float] = {}
    for key, default_value in fallback["scores"].items():
        value = scores.get(key, default_value)
        try:
            number = float(value)
        except (TypeError, ValueError):
            number = float(default_value)
        normalized_scores[key] = max(0.0, min(1.0, number))

    normalized_explanations: dict[str, str] = {}
    for key, default_text in fallback["score_explanations"].items():
        value = explanations.get(key, default_text)
        normalized_explanations[key] = str(value)

    return {
        "scores": normalized_scores,
        "score_explanations": normalized_explanations,
        "aesthetic_summary": str(summary),
    }


def _analyze_with_gemini(images: list[tuple[bytes, str]], title: str, description: str | None) -> dict[str, Any]:
    settings = get_settings()
    from langchain_core.messages import HumanMessage
    from langchain_google_genai import ChatGoogleGenerativeAI

    llm = ChatGoogleGenerativeAI(
        model=settings.ai_model,
        google_api_key=settings.gemini_api_key,
        temperature=0,
    )

    prompt = _ANALYSIS_PROMPT_TEMPLATE.format(title=title, description=description or "")
    content: list[dict[str, Any]] = [{"type": "text", "text": prompt}]
    for image_bytes, mime_type in images:
        encoded = base64.b64encode(image_bytes).decode("utf-8")
        content.append(
            {
                "type": "image_url",
                "image_url": f"data:{mime_type};base64,{encoded}",
            }
        )

    response = llm.invoke([HumanMessage(content=content)])
    response_text = response.content if isinstance(response.content, str) else str(response.content)
    parsed = _extract_json(response_text)
    if not parsed:
        raise ValueError("Gemini returned non-JSON output")
    return _clamp_scores(parsed)


def analyze_uploaded_images(images: list[tuple[bytes, str]], title: str, description: str | None = None) -> dict[str, Any]:
    settings = get_settings()
    if not settings.gemini_api_key:
        return _fallback_analysis("GEMINI_API_KEY is missing")

    try:
        return _analyze_with_gemini(images, title, description)
    except Exception as exc:
        logger.exception("Gemini aesthetic analysis failed")
        return _fallback_analysis(f"Gemini failed: {exc}")
