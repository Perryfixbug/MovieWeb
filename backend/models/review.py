from schemas.review import ReviewBase
from sqlmodel import Field, Relationship
from datetime import datetime

class Review(ReviewBase, table=True):
  id: int = Field(primary_key=True)
  createAt: datetime = Field(default_factory=datetime.now)
  user: "User" = Relationship(back_populates="reviews")
  movie: "Movie" = Relationship(back_populates="reviews")

from models.user import User
from models.movie import Movie  
