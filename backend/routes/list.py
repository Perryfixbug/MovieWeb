from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_session, get_user_id
from models.userListMovie import UserListMovie
from schemas.movie import MovieMetadataSearch
from models.movie import Movie

from sqlmodel import Session, select
from typing import List

router = APIRouter(
  prefix='/list',
  tags=['List']
)

@router.post('/{movieId}')
async def list_movie(
  movieId: int,
  session: Session = Depends(get_session),
  userId: int = Depends(get_user_id)
)->List[MovieMetadataSearch]:
  movie_in_list = session.exec(select(UserListMovie).where(UserListMovie.userId == userId, UserListMovie.movieId == movieId)).first()
  if movie_in_list:
    session.delete(movie_in_list)
  else:
    movie_in_list = UserListMovie(userId=userId, movieId=movieId)
    session.add(movie_in_list)

  session.commit()

  movies = session.exec(
    select(Movie)
    .join(UserListMovie, UserListMovie.movieId == Movie.id)
    .where(UserListMovie.userId == userId)
  ).all()

  return movies