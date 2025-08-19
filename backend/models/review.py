from schemas.review import ReviewBase
from sqlmodel import Field, Relationship

class Review(ReviewBase, table=True):
  id: int = Field(primary_key=True)
  user: "User" = Relationship(back_populates="reviews")
  movie: "Movie" = Relationship(back_populates="reviews")

from models.user import User
from models.movie import Movie  
