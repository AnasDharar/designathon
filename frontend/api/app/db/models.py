import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Boolean, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=True)
    display_name = Column(String(100), nullable=False, default="Designer")
    avatar_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    vibes = relationship("Vibe", back_populates="user")
    generations = relationship("Generation", back_populates="user")
    critiques = relationship("Critique", back_populates="user")


class Vibe(Base):
    __tablename__ = "vibes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    scores = Column(JSON, nullable=True)  # {"professionalism": 0.7, ...}
    score_explanations = Column(JSON, nullable=True)
    aesthetic_summary = Column(Text, nullable=True)
    status = Column(String(20), default="draft")  # draft|processing|ready|failed
    is_public = Column(Boolean, default=False)
    reference_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="vibes")
    references = relationship("VibeReference", back_populates="vibe")
    generations = relationship("Generation", back_populates="vibe")
    critiques = relationship("Critique", back_populates="vibe")


class VibeReference(Base):
    __tablename__ = "vibe_references"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vibe_id = Column(UUID(as_uuid=True), ForeignKey("vibes.id"), nullable=False)
    source_type = Column(String(20), nullable=False)  # upload|pinterest|dribbble
    source_url = Column(String(1000), nullable=True)
    storage_path = Column(String(500), nullable=True)
    thumbnail_path = Column(String(500), nullable=True)
    analysis = Column(JSON, nullable=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    vibe = relationship("Vibe", back_populates="references")


class Generation(Base):
    __tablename__ = "generations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    vibe_id = Column(UUID(as_uuid=True), ForeignKey("vibes.id"), nullable=False)
    prompt = Column(Text, nullable=False)
    settings = Column(JSON, nullable=True)
    results = Column(JSON, nullable=True)
    ai_direction = Column(Text, nullable=True)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="generations")
    vibe = relationship("Vibe", back_populates="generations")


class Critique(Base):
    __tablename__ = "critiques"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    vibe_id = Column(UUID(as_uuid=True), ForeignKey("vibes.id"), nullable=False)
    upload_path = Column(String(500), nullable=True)
    scores = Column(JSON, nullable=True)
    feedback = Column(JSON, nullable=True)
    summary = Column(Text, nullable=True)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="critiques")
    vibe = relationship("Vibe", back_populates="critiques")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    job_type = Column(String(50), nullable=False)
    status = Column(String(20), default="queued")
    metadata_ = Column("metadata", JSON, nullable=True)
    result = Column(JSON, nullable=True)
    error = Column(Text, nullable=True)
    progress = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
