from sqlmodel import SQLModel, Field

class VoteBase(SQLModel):
  value: bool #1 = Up, 0 = Down
  userId: int = Field(foreign_key="user.id")
  commentId: int = Field(foreign_key="comment.id")

class VoteRead(VoteBase):
  pass