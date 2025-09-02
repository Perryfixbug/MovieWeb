from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum

class LikeBase(SQLModel):
  movieId: int = Field(foreign_key="movie.id")
  userId: int = Field(foreign_key="user.id")

class LikeRead(LikeBase):
  pass