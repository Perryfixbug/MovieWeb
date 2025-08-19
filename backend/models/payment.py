from schemas.payment import PaymentBase
from sqlmodel import Field, Relationship

class Payment(PaymentBase, table=True):
  id: int = Field(primary_key=True)
  user: "User" = Relationship(back_populates="payments")

from models.user import User
  
