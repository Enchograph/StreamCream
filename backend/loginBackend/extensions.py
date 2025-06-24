# extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# 创建全局 SQLAlchemy 实例
db = SQLAlchemy()
migrate = Migrate()

def init_app(app):
    """初始化数据库扩展"""
    db.init_app(app)
    migrate.init_app(app, db)