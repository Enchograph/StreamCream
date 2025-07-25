# models.py
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
import re
from datetime import datetime, timedelta
from sqlalchemy.dialects.mysql import JSON
import random
import string

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    email_verified = db.Column(db.Boolean, default=False)  # 邮箱是否已验证
    email_verification_code = db.Column(db.String(6))  # 邮箱验证码
    email_verification_expires = db.Column(db.DateTime)  # 验证码过期时间
    reset_password_code = db.Column(db.String(6))  # 重置密码验证码
    reset_password_expires = db.Column(db.DateTime)  # 重置密码验证码过期时间
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
    
    def generate_verification_code(self):
        """生成6位数字验证码"""
        self.email_verification_code = ''.join(random.choices(string.digits, k=6))
        self.email_verification_expires = datetime.utcnow() + timedelta(minutes=10)
    
    def verify_email_code(self, code):
        """验证邮箱验证码"""
        if (self.email_verification_code == code and 
            self.email_verification_expires and 
            datetime.utcnow() < self.email_verification_expires):
            self.email_verified = True
            self.email_verification_code = None
            self.email_verification_expires = None
            return True
        return False
    
    def generate_reset_password_code(self):
        """生成重置密码验证码"""
        self.reset_password_code = ''.join(random.choices(string.digits, k=6))
        self.reset_password_expires = datetime.utcnow() + timedelta(minutes=10)
    
    def verify_reset_password_code(self, code):
        """验证重置密码验证码（不清空验证码，仅返回校验结果）"""
        return (self.reset_password_code == code and 
                self.reset_password_expires and 
                datetime.utcnow() < self.reset_password_expires)
    
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