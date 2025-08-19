from sqlmodel import SQLModel, Field

class UserLikedMovie(SQLModel, table=True):
  userId: int = Field(primary_key=True, foreign_key="user.id")
  movieId: int = Field(primary_key=True, foreign_key="movie.id")
