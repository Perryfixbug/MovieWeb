from sqlmodel import SQLModel, Field

class SubBase(SQLModel):
  name: str
  link: str
  movieId: int = Field(foreign_key="movie.id")

class SubRead(SubBase):
  id: int