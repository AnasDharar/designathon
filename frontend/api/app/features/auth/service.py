import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import User


async def create_mock_user(db: AsyncSession, display_name: str = "Designer") -> User:
    """Create or retrieve a mock user for MVP auth."""
    # Check if a default user exists
    result = await db.execute(select(User).where(User.display_name == display_name).limit(1))
    user = result.scalar_one_or_none()

    if not user:
        user = User(
            id=uuid.uuid4(),
            display_name=display_name,
            email=f"{display_name.lower().replace(' ', '')}@vibes.app",
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    return user
