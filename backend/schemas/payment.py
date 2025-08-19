from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class PaymentBase(SQLModel):
  paymentMethod: str
  amount: int
  createAt: datetime
  userId: int = Field(foreign_key="user.id")
