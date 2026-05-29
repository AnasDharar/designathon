import uuid
from pathlib import Path
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import Vibe, User, VibeReference
from app.core.config import get_settings
from app.features.vibes.analyzer import analyze_uploaded_images


async def get_default_user(db: AsyncSession) -> User:
    """Get or create the default MVP user."""
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    if not user:
        user = User(id=uuid.uuid4(), display_name="Designer")
        db.add(user)
        await db.commit()
        await db.refresh(user)
    return user


async def list_vibes(db: AsyncSession, user_id: uuid.UUID) -> list[Vibe]:
    result = await db.execute(
        select(Vibe).where(Vibe.user_id == user_id).order_by(Vibe.created_at.desc())
    )
    return list(result.scalars().all())


async def get_vibe(db: AsyncSession, vibe_id: uuid.UUID) -> Vibe | None:
    result = await db.execute(select(Vibe).where(Vibe.id == vibe_id))
    return result.scalar_one_or_none()


async def create_vibe(db: AsyncSession, user_id: uuid.UUID, title: str, description: str = None) -> Vibe:
    vibe = Vibe(
        id=uuid.uuid4(),
        user_id=user_id,
        title=title,
        description=description,
        status="draft",
    )
    db.add(vibe)
    await db.commit()
    await db.refresh(vibe)
    return vibe


async def update_vibe(db: AsyncSession, vibe: Vibe, **kwargs) -> Vibe:
    for key, value in kwargs.items():
        if value is not None:
            setattr(vibe, key, value)
    await db.commit()
    await db.refresh(vibe)
    return vibe


async def delete_vibe(db: AsyncSession, vibe: Vibe):
    await db.delete(vibe)
    await db.commit()


async def list_public_vibes(db: AsyncSession) -> list[Vibe]:
    result = await db.execute(
        select(Vibe).where(Vibe.is_public == True).order_by(Vibe.created_at.desc()).limit(20)
    )
    return list(result.scalars().all())


async def create_vibe_from_uploads(
    db: AsyncSession,
    user_id: uuid.UUID,
    title: str,
    description: str | None,
    images: list[tuple[bytes, str, str]],
) -> Vibe:
    settings = get_settings()
    vibe = Vibe(
        id=uuid.uuid4(),
        user_id=user_id,
        title=title,
        description=description,
        status="processing",
    )
    db.add(vibe)
    await db.flush()

    upload_root = Path(settings.storage_path).resolve()
    vibe_dir = upload_root / str(vibe.id)
    storage_available = True
    try:
        vibe_dir.mkdir(parents=True, exist_ok=True)
    except Exception:
        # Serverless file systems may be read-only or ephemeral.
        storage_available = False

    ai_images: list[tuple[bytes, str]] = []
    for idx, (content, mime_type, original_name) in enumerate(images, start=1):
        suffix = ".jpg"
        if mime_type == "image/png":
            suffix = ".png"
        elif mime_type == "image/webp":
            suffix = ".webp"

        file_path_str: str | None = None
        if storage_available:
            try:
                file_name = f"{idx}_{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S%f')}{suffix}"
                file_path = vibe_dir / file_name
                file_path.write_bytes(content)
                file_path_str = str(file_path)
            except Exception:
                # Keep flow non-blocking if disk write fails in production.
                storage_available = False

        reference = VibeReference(
            id=uuid.uuid4(),
            vibe_id=vibe.id,
            source_type="upload",
            source_url=None,
            storage_path=file_path_str,
            thumbnail_path=None,
            analysis={"filename": original_name, "mime_type": mime_type},
            sort_order=idx - 1,
        )
        db.add(reference)
        ai_images.append((content, mime_type))

    analysis_result = analyze_uploaded_images(ai_images, title=title, description=description)
    vibe.scores = analysis_result["scores"]
    vibe.score_explanations = analysis_result["score_explanations"]
    vibe.aesthetic_summary = analysis_result["aesthetic_summary"]
    vibe.reference_count = len(images)
    vibe.status = "ready"

    await db.commit()
    await db.refresh(vibe)
    return vibe
