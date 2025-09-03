from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum
from schemas.user import UserRead
from schemas.vote import VoteRead
from typing import List, Optional

class CommentTargetType(str, Enum):
  MOVIE = "movie"
  COMMENT = "comment"

class CommentBase(SQLModel):
  content: str
  targetId: int
  targetType: CommentTargetType
  spoil: bool = Field(default=False)
  userId: int = Field(foreign_key="user.id")

class CommentRead(CommentBase):
  id: int
  replies: Optional[List["CommentReply"]] = None
  votes: Optional[List["VoteRead"]] = None
  user: UserRead

  class Config:
    from_attributes = True

class CommentReply(CommentBase):
  id: int
  user: UserRead
  votes: Optional[List["VoteRead"]] = None

class CommentCreate(CommentBase):
  pass

class CommentUpdate(CommentBase):
  pass
