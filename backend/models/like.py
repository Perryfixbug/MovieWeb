from schemas.like import LikeBase
from sqlmodel import Field, Relationship
from datetime import datetime

class Like(LikeBase, table=True):
  id: int = Field(primary_key=True)
  createAt: datetime = Field(default_factory=datetime.now)
  movie: "Movie" = Relationship(back_populates="likes")
  user: "User" = Relationship(back_populates="likes")

from models.user import User
from models.movie import Movie
