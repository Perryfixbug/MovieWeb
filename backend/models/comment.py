from schemas.comment import CommentBase, CommentReply
from sqlmodel import Field, Relationship
from datetime import datetime
from typing import List

class Comment(CommentBase, table=True):
  id: int = Field(primary_key=True)
  createAt: datetime = Field(default_factory=datetime.now)
  user: "User" = Relationship(back_populates="comments")
  votes: List["Vote"] = Relationship()

from models.user import User
from models.vote import Vote
