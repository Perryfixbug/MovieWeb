from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum
from schemas.user import UserRead
from typing import List

class CommentTargetType(str, Enum):
  MOVIE = "movie"
  COMMENT = "commnent"

class CommentBase(SQLModel):
  content: str
  targetId: int
  targetType: CommentTargetType
  spoil: bool = Field(default=False)
  userId: int = Field(foreign_key="user.id")

class CommentRead(CommentBase):
  id: int
  reply: List["CommentRead"] = None
  user: UserRead

class CommentCreate(CommentBase):
  pass

class CommentUpdate(CommentBase):
  pass
