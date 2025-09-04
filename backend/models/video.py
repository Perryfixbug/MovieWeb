from sqlmodel import SQLModel, Field, Relationship
from typing import List
from datetime import datetime
from schemas.video import VideoBase

class Video(VideoBase, table=True):
  id: int = Field(primary_key=True)
  slug: str = Field(index=True, unique=True)
  createAt: datetime = Field(default_factory=datetime.now)
  movie: "Movie" = Relationship(back_populates="videos")

from models.movie import Movie