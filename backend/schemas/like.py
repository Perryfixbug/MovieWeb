from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum

class LikeTargetType(str, Enum):
  MOVIE = "movie"
  COMMENT = "commnent"

class LikeBase(SQLModel):
  targetId: int
  targetType: LikeTargetType
  userId: int = Field(foreign_key="user.id")