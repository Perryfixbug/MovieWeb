from fastapi import APIRouter, Depends, HTTPException, Query, Request
from dependencies import get_session, get_user_id
from sqlmodel import Session, select, func
from sqlalchemy.orm import selectinload
from models.vote import Vote
from schemas.vote import VoteRead, VoteCreate
from typing import List, Dict

router = APIRouter(
  prefix='/vote',
  tags=["Vote"]
)

@router.post('/')
async def change_vote(
  vote_data: VoteCreate,
  session: Session = Depends(get_session)
)->VoteRead:  
  vote = session.exec(select(Vote).where(Vote.userId == vote_data.userId, Vote.commentId == vote_data.commentId)).first()
  if vote:
    setattr(vote, "value", vote_data.value)
    session.commit()
    session.refresh(vote)
    return vote
  
  vote = Vote(**vote_data.model_dump())
  session.add(vote)
  session.commit()
  session.refresh(vote)
  return vote

@router.delete('/')
async def remove_vote(
  vote_data: VoteCreate,
  session: Session = Depends(get_session)
):
  vote = session.exec(select(Vote).where(Vote.userId == vote_data.userId, Vote.commentId == vote_data.commentId)).first()
  if not vote:
    return HTTPException(status_code=400, detail="Người dùng chưa vote")
  session.delete(vote)
  session.commit()
  return "Hủy vote thành công"