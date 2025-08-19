from sqlmodel import SQLModel, Field

class Acting(SQLModel, table=True):
  actorId: int = Field(primary_key=True, foreign_key="actor.id")
  movieId: int = Field(primary_key=True, foreign_key="movie.id")
  