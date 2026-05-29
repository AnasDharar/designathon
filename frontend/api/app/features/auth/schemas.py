import uuid
from pydantic import BaseModel
from typing import Optional


class LoginRequest(BaseModel):
    display_name: Optional[str] = "Designer"


class UserResponse(BaseModel):
    id: str
    display_name: str
    email: Optional[str] = None
    avatar_url: Optional[str] = None

    model_config = {"from_attributes": True}


class LoginResponse(BaseModel):
    user: UserResponse
    token: str
