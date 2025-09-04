from sqlmodel import SQLModel, Field

class VideoBase(SQLModel):
  name: str
  link: str
  movieId: int = Field(foreign_key="movie.id")

class VideoRead(VideoBase):
  id: int
  slug: str

class VideoCreate(VideoBase):
  pass