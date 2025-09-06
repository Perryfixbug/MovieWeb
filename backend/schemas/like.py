from sqlmodel import SQLModel, Field
from typing import Optional
from schemas.movie import MovieMetadataSearch

class LikeBase(SQLModel):
  movieId: int = Field(foreign_key="movie.id")
  userId: int = Field(foreign_key="user.id")

class LikeRead(LikeBase):
  movie: Optional["MovieMetadataSearch"] = None
