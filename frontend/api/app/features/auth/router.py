from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.features.auth.schemas import LoginRequest, LoginResponse, UserResponse
from app.features.auth.service import create_mock_user

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest = LoginRequest(), db: AsyncSession = Depends(get_db)):
    """MVP login — creates or retrieves a mock user, returns a simple token."""
    user = await create_mock_user(db, request.display_name)
    return LoginResponse(
        user=UserResponse(
            id=str(user.id),
            display_name=user.display_name,
            email=user.email,
            avatar_url=user.avatar_url,
        ),
        token=f"mock-token-{user.id}",
    )


@router.get("/me", response_model=UserResponse)
async def get_me():
    """MVP — returns a hardcoded user. Real auth coming later."""
    return UserResponse(
        id="mock-user-id",
        display_name="Designer",
        email="designer@vibes.app",
    )
