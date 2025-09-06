from schemas.vote import VoteBase
from sqlmodel import Field, Relationship
from datetime import datetime

class Vote(VoteBase, table=True):
  id: int = Field(primary_key=True)
  createAt: datetime = Field(default_factory=datetime.now)
  user: "User" = Relationship()

from models.user import User

