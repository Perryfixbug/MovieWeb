from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_session, get_user_id
from models.like import Like
from schemas.like import LikeRead
from sqlmodel import Session, select
from typing import List

router = APIRouter(
  prefix='/like',
  tags=['Like']
)

@router.post('/{movieId}')
async def like_movie(
  movieId: int,
  session: Session = Depends(get_session),
  userId: int = Depends(get_user_id)
)->List[LikeRead]:
  like = session.exec(select(Like).where(Like.movieId == movieId, Like.userId == userId)).first()
  if like:
    session.delete(like)
  else:
    like = Like(movieId=movieId, userId=userId)
    session.add(like)

  session.commit()

  user_likes = session.exec(select(Like).where(Like.userId == userId)).all()
  return user_likes