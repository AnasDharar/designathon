from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.features.vibes import service
from app.features.vibes.schemas import VibeCreate, VibeUpdate, VibeResponse, UIGenerateRequest, UIGenerateResponse
from app.features.vibes.image_generator import generate_ui_prompt
from app.core.config import get_settings

router = APIRouter()


@router.get("", response_model=list[VibeResponse])
async def list_vibes(db: AsyncSession = Depends(get_db)):
    """List all vibes for the current user."""
    user = await service.get_default_user(db)
    vibes = await service.list_vibes(db, user.id)
    return [VibeResponse(id=str(v.id), title=v.title, description=v.description,
                         scores=v.scores, score_explanations=v.score_explanations,
                         aesthetic_summary=v.aesthetic_summary, status=v.status,
                         is_public=v.is_public, reference_count=v.reference_count,
                         created_at=v.created_at, updated_at=v.updated_at) for v in vibes]


@router.post("", response_model=VibeResponse)
async def create_vibe(data: VibeCreate, db: AsyncSession = Depends(get_db)):
    """Create a new vibe."""
    user = await service.get_default_user(db)
    vibe = await service.create_vibe(db, user.id, data.title, data.description)
    return VibeResponse(id=str(vibe.id), title=vibe.title, description=vibe.description,
                        scores=vibe.scores, score_explanations=vibe.score_explanations,
                        aesthetic_summary=vibe.aesthetic_summary, status=vibe.status,
                        is_public=vibe.is_public, reference_count=vibe.reference_count,
                        created_at=vibe.created_at, updated_at=vibe.updated_at)


@router.post("/from-uploads", response_model=VibeResponse)
async def create_vibe_from_uploads(
    title: str = Form(...),
    description: str | None = Form(None),
    images: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db),
):
    """Create a vibe from uploaded reference images and run AI analysis."""
    settings = get_settings()
    if not images:
        raise HTTPException(status_code=400, detail="At least one image is required.")
    if len(images) > 3:
        raise HTTPException(status_code=400, detail="Maximum 3 images are allowed.")

    allowed_mime_types = {"image/jpeg", "image/png", "image/webp"}
    max_bytes = settings.max_upload_size_mb * 1024 * 1024

    parsed_images: list[tuple[bytes, str, str]] = []
    for image in images:
        if image.content_type not in allowed_mime_types:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported image type: {image.content_type}. Allowed: jpeg, png, webp.",
            )

        content = await image.read()
        if len(content) > max_bytes:
            raise HTTPException(
                status_code=400,
                detail=f"Image {image.filename} exceeds max size of {settings.max_upload_size_mb}MB.",
            )
        parsed_images.append((content, image.content_type, image.filename or "upload"))

    user = await service.get_default_user(db)
    vibe = await service.create_vibe_from_uploads(
        db=db,
        user_id=user.id,
        title=title,
        description=description,
        images=parsed_images,
    )
    return VibeResponse(
        id=str(vibe.id),
        title=vibe.title,
        description=vibe.description,
        scores=vibe.scores,
        score_explanations=vibe.score_explanations,
        aesthetic_summary=vibe.aesthetic_summary,
        status=vibe.status,
        is_public=vibe.is_public,
        reference_count=vibe.reference_count,
        created_at=vibe.created_at,
        updated_at=vibe.updated_at,
    )


@router.post("/generate-ui", response_model=UIGenerateResponse)
async def generate_ui(data: UIGenerateRequest, db: AsyncSession = Depends(get_db)):
    vibe = await service.get_vibe(db, data.vibe_id)
    if not vibe:
        raise HTTPException(status_code=404, detail="Vibe not found")

    prompt_text = generate_ui_prompt(
        prompt=data.prompt,
        vibe_title=vibe.title,
        vibe_description=vibe.description,
        vibe_scores=vibe.scores,
    )
    return UIGenerateResponse(prompt_text=prompt_text)


@router.get("/explore", response_model=list[VibeResponse])
async def explore_vibes(db: AsyncSession = Depends(get_db)):
    """Browse public vibes."""
    vibes = await service.list_public_vibes(db)
    return [VibeResponse(id=str(v.id), title=v.title, description=v.description,
                         scores=v.scores, score_explanations=v.score_explanations,
                         aesthetic_summary=v.aesthetic_summary, status=v.status,
                         is_public=v.is_public, reference_count=v.reference_count,
                         created_at=v.created_at, updated_at=v.updated_at) for v in vibes]


@router.get("/{vibe_id}", response_model=VibeResponse)
async def get_vibe(vibe_id: str, db: AsyncSession = Depends(get_db)):
    """Get a vibe by ID."""
    vibe = await service.get_vibe(db, vibe_id)
    if not vibe:
        raise HTTPException(status_code=404, detail="Vibe not found")
    return VibeResponse(id=str(vibe.id), title=vibe.title, description=vibe.description,
                        scores=vibe.scores, score_explanations=vibe.score_explanations,
                        aesthetic_summary=vibe.aesthetic_summary, status=vibe.status,
                        is_public=vibe.is_public, reference_count=vibe.reference_count,
                        created_at=vibe.created_at, updated_at=vibe.updated_at)


@router.delete("/{vibe_id}")
async def delete_vibe_endpoint(vibe_id: str, db: AsyncSession = Depends(get_db)):
    """Delete a vibe."""
    vibe = await service.get_vibe(db, vibe_id)
    if not vibe:
        raise HTTPException(status_code=404, detail="Vibe not found")
    await service.delete_vibe(db, vibe)
    return {"status": "deleted"}
