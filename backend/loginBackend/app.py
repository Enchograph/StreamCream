from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db, User
import jwt
from datetime import datetime, timedelta
from config import Config
import os 
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
# CORS 配置
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
# 数据库配置
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'wofiporia')
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mysql+pymysql://'
    f'{os.getenv("DB_USER", "root")}:'
    f'{os.getenv("DB_PASSWORD", "")}@'
    f'{os.getenv("DB_HOST", "localhost")}:'
    f'{os.getenv("DB_PORT", "3306")}/'
    f'{os.getenv("DB_NAME", "streamcream")}'
    '?charset=utf8mb4'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 10,
    'pool_recycle': 300,
    'pool_pre_ping': True
}

# 初始化数据库扩展
db.init_app(app)

# 根路由
@app.route('/')
def home():
    try:
        # 测试数据库连接
        result = db.session.execute('SELECT 1')
        return "数据库连接成功!"
    except Exception as e:
        return f"数据库连接失败: {str(e)}"

# 创建数据库表
def create_tables():
    with app.app_context():
        try:
            db.create_all()
            print("数据库表创建成功!")
        except Exception as e:
            print(f"创建数据库表失败: {str(e)}")

# 创建管理员用户
def create_admin_user():
    with app.app_context():
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(username='admin', email='admin@streamcream.com')
            admin.set_password('admin_password')
            db.session.add(admin)
            db.session.commit()
            print("管理员用户创建成功!")



# JWT配置
def generate_token(user_id):
    return jwt.encode({
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload['user_id']
    except:
        return None

# 用户注册
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not all([username, email, password]):
        return jsonify({'success': False, 'message': '所有字段都是必填的'}), 400
    
    # 检查用户名和邮箱是否已存在
    if User.query.filter_by(username=username).first():
        return jsonify({'success': False, 'message': '用户名已被使用'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': '邮箱已被使用'}), 400
    
    # 创建新用户
    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': '注册成功',
        'token': generate_token(new_user.id)
    }), 201

# 用户登录
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    
    if not user or not user.check_password(password):
        return jsonify({'success': False, 'message': '用户名或密码错误'}), 401
    
    return jsonify({
        'success': True,
        'message': '登录成功',
        'token': generate_token(user.id)
    })

# 受保护路由示例
@app.route('/api/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'success': False, 'message': '未提供令牌'}), 401
    
    user_id = verify_token(token.split(' ')[1] if ' ' in token else token)
    if not user_id:
        return jsonify({'success': False, 'message': '无效令牌'}), 401
    
    user = User.query.get(user_id)
    return jsonify({
        'success': True,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    })
if __name__ == '__main__':
    create_tables()
    create_admin_user()
    app.run(debug=True)

