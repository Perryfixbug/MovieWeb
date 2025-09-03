from sqlmodel import SQLModel, Field
from schemas.user import UserRead
from typing import List, Optional

class VoteBase(SQLModel):
  value: bool #1 = Up, 0 = Down
  userId: int = Field(foreign_key="user.id")
  commentId: int = Field(foreign_key="comment.id")

class VoteRead(VoteBase):
  id: int

class VoteCreate(VoteBase):
  pass
