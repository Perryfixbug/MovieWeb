from schemas.like import LikeBase
from sqlmodel import Field, Relationship
from datetime import datetime
from models.movie import Movie

class Like(LikeBase, table=True):
  id: int = Field(primary_key=True)
  createAt: datetime = Field(default_factory=datetime.now)
  movie: "Movie" = Relationship()

