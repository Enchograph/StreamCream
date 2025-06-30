# models.py
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
import re
from datetime import datetime
from sqlalchemy.dialects.mysql import JSON

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # 关系
    settings = db.relationship('UserSetting', backref='user', lazy=True)
    streams = db.relationship('Stream', backref='user', lazy=True)
    
    def set_password(self, password):
        """创建密码哈希"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """验证密码"""
        return check_password_hash(self.password_hash, password)
    
    @staticmethod
    def is_valid_username(username):
        """验证用户名格式"""
        return bool(re.match(r'^[a-zA-Z0-9_]{3,20}$', username))
    
    @staticmethod
    def is_valid_email(email):
        """验证邮箱格式"""
        return bool(re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email))
    
    def __repr__(self):
        return f'<User {self.username}>'

class UserSetting(db.Model):
    __tablename__ = 'user_settings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    preferences = db.Column(JSON, default={})  # 所有偏好都存这里
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, 
                          onupdate=datetime.utcnow)

class Stream(db.Model):
    __tablename__ = 'streams'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    stream_key = db.Column(db.String(64), unique=True, nullable=False)
    is_live = db.Column(db.Boolean, default=False)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Stream {self.title}>'