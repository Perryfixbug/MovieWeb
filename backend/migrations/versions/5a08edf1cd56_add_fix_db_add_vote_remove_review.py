"""add fix db add vote, remove review

Revision ID: 5a08edf1cd56
Revises: eea0a8a02d0d
Create Date: 2025-09-02 19:04:28.506401
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "5a08edf1cd56"
down_revision: Union[str, Sequence[str], None] = "eea0a8a02d0d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # --- recreate actor table ---
    # 1. Tạo bảng tạm
    op.create_table(
        "actor_tmp",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String, nullable=False),
        sa.Column("description", sa.String, nullable=True),
        sa.Column("dob", sa.Date, nullable=True),
        sa.Column("country", sa.String, nullable=True),  # cho phép null
    )

    # 2. Copy dữ liệu từ actor sang actor_tmp
    op.execute(
        "INSERT INTO actor_tmp (id, name, description, dob, country) "
        "SELECT id, name, description, dob, country FROM actor"
    )

    # 3. Xóa bảng actor cũ
    op.drop_table("actor")

    # 4. Đổi tên bảng tạm thành actor
    op.rename_table("actor_tmp", "actor")

    # --- chỉnh bảng like ---
    with op.batch_alter_table("like", schema=None) as batch_op:
        batch_op.add_column(sa.Column("movieId", sa.Integer(), nullable=False))
        batch_op.create_foreign_key(
            "fk_like_movie",  # đặt tên constraint rõ ràng
            "movie",          # bảng tham chiếu
            ["movieId"],      # cột trong bảng like
            ["id"],           # cột trong bảng movie
        )
        batch_op.drop_column("targetId")
        batch_op.drop_column("targetType")


def downgrade() -> None:
    """Downgrade schema."""
    # --- chỉnh bảng like ---
    with op.batch_alter_table("like", schema=None) as batch_op:
        batch_op.add_column(sa.Column("targetType", sa.VARCHAR(length=7), nullable=False))
        batch_op.add_column(sa.Column("targetId", sa.INTEGER(), nullable=False))
        batch_op.drop_constraint("fk_like_movie", type_="foreignkey")
        batch_op.drop_column("movieId")

    # rollback actor table (bắt buộc recreate lại để enforce nullable=False)
    op.create_table(
        "actor_tmp",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String, nullable=False),
        sa.Column("description", sa.String, nullable=False),
        sa.Column("dob", sa.Date, nullable=False),
        sa.Column("country", sa.String, nullable=False),
    )

    op.execute(
        "INSERT INTO actor_tmp (id, name, description, dob, country) "
        "SELECT id, name, description, dob, country FROM actor"
    )

    op.drop_table("actor")
    op.rename_table("actor_tmp", "actor")
