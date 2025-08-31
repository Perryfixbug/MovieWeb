from fastapi import APIRouter, Depends, HTTPException, Query, Request
from dependencies import get_session, get_user_id
from sqlmodel import Session, select, func
from sqlalchemy.orm import selectinload
from models.comment import Comment
from schemas.comment import CommentRead, CommentCreate, CommentUpdate
from typing import List, Dict

router = APIRouter(
  prefix='/comment',
  tags=["Comment"]
)

@router.get('/movie/{movieId}')
async def get_comments_of_movie(
  movieId: int,
  session: Session = Depends(get_session)
)->List[CommentRead]:
  comments = session.exec(select(Comment).where(Comment.targetId==movieId, Comment.targetType=="movie")).all()
  return comments

@router.get('/reply/{commentId}')
async def get_comments_of_movie(
  commentId: int,
  session: Session = Depends(get_session)
)->List[CommentRead]:
  comments = session.exec(select(Comment).where(Comment.targetId==commentId, Comment.targetType=="comment")).all()
  return comments

@router.post('/')
async def create_comment(
  request: Request,
  userId: int = Depends(get_user_id),
  session: Session = Depends(get_session)
)->CommentRead:
  comment_data = await request.json()
  comment = Comment(**comment_data, userId=userId)
  session.add(comment)
  session.commit()
  session.refresh(comment)
  return comment

@router.put('/')
async def update_comment(
  request: Request,
  userId: int = Depends(get_user_id),
  session: Session = Depends(get_session)
)->CommentRead:
  data = await request.json()
  comment_data = CommentUpdate(**data, userId=userId)
  comment = session.get(Comment, comment_data.id)
  if not comment:
    raise HTTPException(status_code=400, detail="Không thấy comment")
  for key, value in comment_data.model_dump():
    setattr(comment, key, value)
  session.commit()
  session.refresh()
  return comment

@router.delete('/{commentId}')
async def delete_comment(
  commnetId: int, 
  session: Session = Depends(get_session),
):
  comment = session.get(Comment, commnetId)
  session.delete(comment)
  session.commit()
  return "Xóa thành công comment"