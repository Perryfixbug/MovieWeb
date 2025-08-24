"""Make thumbnail nullable

Revision ID: b10d717f9b9e
Revises: 62a4199acf68
Create Date: 2025-08-24 18:21:21.869270

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'b10d717f9b9e'
down_revision: Union[str, Sequence[str], None] = '62a4199acf68'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


from alembic import op

def upgrade():
    # 1. Tạo bảng mới với thumbnail nullable
    op.execute("""
        CREATE TABLE movie_new (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            userRate FLOAT,
            imdbRate FLOAT,
            rottenRate FLOAT,
            length FLOAT NOT NULL,
            publishYear INTEGER NOT NULL,
            type TEXT NOT NULL,
            category TEXT,
            status TEXT NOT NULL,
            link_video TEXT NOT NULL,
            link_sub TEXT,
            poster TEXT,
            thumbnail TEXT, -- NULLABLE
            user_id INTEGER NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            createAt DATETIME NOT NULL
        )
    """)

    # 2. Copy dữ liệu từ bảng cũ sang bảng mới
    op.execute("""
        INSERT INTO movie_new (
            id, name, description, userRate, imdbRate, rottenRate,
            length, publishYear, type, category, status,
            link_video, link_sub, poster, thumbnail, user_id,
            slug, createAt
        )
        SELECT
            id, name, description, userRate, imdbRate, rottenRate,
            length, publishYear, type, category, status,
            link_video, link_sub, poster, thumbnail, user_id,
            slug, createAt
        FROM movie
    """)

    # 3. Xoá bảng cũ
    op.execute("DROP TABLE movie")

    # 4. Đổi tên bảng mới thành movie
    op.execute("ALTER TABLE movie_new RENAME TO movie")


def downgrade():
    # Downgrade tạm thời không hỗ trợ
    pass

