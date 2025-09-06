from sqlmodel import SQLModel, Field
from sqlmodel import Relationship

class UserListMovie(SQLModel, table=True):
  userId: int = Field(primary_key=True, foreign_key="user.id")
  movieId: int = Field(primary_key=True, foreign_key="movie.id")
  