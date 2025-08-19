from schemas.comment import CommentBase
from sqlmodel import Field, Relationship

class Comment(CommentBase, table=True):
  id: int = Field(primary_key=True)
  user: "User" = Relationship(back_populates="comments")
  movie: "Movie" = Relationship(back_populates="comments")

from models.user import User
from models.movie import Movie
