from schemas.movie import MovieBase
from sqlmodel import Field, Relationship
from typing import List

from models.userListMovie import UserListMovie
from models.userLikedMovie import UserLikedMovie
from models.acting import Acting

class Movie(MovieBase, table=True):
  id: int = Field(primary_key=True)
  actors: List["Actor"] = Relationship(back_populates="actedMovies", link_model=Acting)
  uploader: "User" = Relationship(back_populates="uploaded_movies")
  comments: List["Comment"] = Relationship(back_populates="movie")
  reviews: List["Review"] = Relationship(back_populates="movie")
  userList: List["User"] = Relationship(back_populates="listMovies", link_model=UserListMovie)
  userLiked: List["User"] = Relationship(back_populates="likedMovies", link_model=UserLikedMovie)
  
from models.actor import Actor
from models.user import User
from models.comment import Comment
from models.review import Review

  
