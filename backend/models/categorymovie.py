from sqlmodel import SQLModel, Field

class CategoryMovie(SQLModel, table = True):
  movieId: int = Field(primary_key=True, foreign_key="movie.id")
  categoryId: int = Field(primary_key=True, foreign_key="category.id")