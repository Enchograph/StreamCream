from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from models import db, User, UserSetting, Stream
import jwt
from datetime import datetime, timedelta
import os 
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
import json
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects.mysql import JSON

load_dotenv()

app = Flask(__name__)
# CORS 配置
CORS(app, supports_credentials=True, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "*"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# 数据库配置
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "streamcream")

# 创建数据库（如果不存在）并返回数据库URI
def create_database_if_not_exists():
    # 构造数据库连接URI（带数据库名）
    db_uri = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4'
    engine = create_engine(db_uri)
    
    try:
        # 尝试连接到指定数据库
        with engine.connect():
            print(f"数据库 '{DB_NAME}' 已存在")
            return db_uri
    except OperationalError as e:
        if "Unknown database" in str(e):
            print(f"数据库 '{DB_NAME}' 不存在，正在创建...")
            # 构造不带数据库名的连接URI
            default_uri = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/?charset=utf8mb4'
            default_engine = create_engine(default_uri)
            
            with default_engine.connect() as conn:
                # 使用text()函数包装SQL语句
                create_db_stmt = text(f"CREATE DATABASE IF NOT EXISTS {DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
                conn.execute(create_db_stmt)
                print(f"数据库 '{DB_NAME}' 创建成功")
                return db_uri
        else:
            raise e

# 执行数据库创建并获取URI
db_uri = create_database_if_not_exists()

# 继续配置应用
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'wofiporia')
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
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
            print("\n=== 检查模型导入 ===")
            # 直接检查导入的模型类
            print(f"User 模型: {User}")
            print(f"UserSetting 模型: {UserSetting}")
            print(f"Stream 模型: {Stream}")
            
            print("\n=== 开始创建数据库表 ===")
            db.create_all()
            
            # 检查数据库中实际存在的表
            inspector = db.inspect(db.engine)
            existing_tables = inspector.get_table_names()
            print("\n=== 数据库中实际存在的表 ===")
            for table in existing_tables:
                print(f"- {table}")
                # 输出表的列信息
                columns = inspector.get_columns(table)
                for column in columns:
                    print(f"  列: {column['name']}, 类型: {column['type']}")

            print("\n数据库表创建成功!")
            
        except Exception as e:
            print(f"\n创建数据库表失败: {str(e)}")
            import traceback
            print("\n详细错误信息:")
            print(traceback.format_exc())

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
# 简单的内存黑名单（生产环境建议使用Redis或数据库）
token_blacklist = set()

def generate_token(user_id):
    import secrets
    import time
    
    # 生成随机字符串作为token的唯一标识
    token_id = secrets.token_hex(16)
    # 添加时间戳
    issued_at = int(time.time())
    
    return jwt.encode({
        'user_id': user_id,
        'token_id': token_id,
        'iat': issued_at,  # 签发时间
        'jti': token_id    # JWT ID，用于唯一标识
    }, app.config['SECRET_KEY'], algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        
        # 检查token是否在黑名单中
        if payload.get('jti') in token_blacklist:
            return None
            
        return payload['user_id']
    except:
        return None

def revoke_token(token):
    """撤销token（加入黑名单）"""
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'], options={'verify_exp': False})
        token_blacklist.add(payload.get('jti'))
        return True
    except:
        return False

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
        return jsonify({'success': False, 'message': '未提供令牌'}), 400
    
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

# 令牌验证API
@app.route('/api/verify-token', methods=['POST'])
def verify_token_api():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'success': False, 'message': '未提供令牌'}), 400
    
    user_id = verify_token(token.split(' ')[1] if ' ' in token else token)
    if not user_id:
        return jsonify({'success': False, 'message': '无效令牌'}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': '用户不存在'}), 401
    
    return jsonify({
        'success': True,
        'message': '令牌有效',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    })

def get_user_id_from_token():
    token = request.headers.get('Authorization')
    if not token:
        return None
    user_id = verify_token(token.split(' ')[1] if ' ' in token else token)
    return user_id

@app.route('/api/preferences', methods=['GET'])
def get_preferences():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'success': False, 'message': '未登录'}), 401
    setting = UserSetting.query.filter_by(user_id=user_id).first()
    prefs = setting.preferences if setting and setting.preferences else {}
    # 可加默认值
    prefs.setdefault('debugMode', False)
    return jsonify(prefs)

@app.route('/api/upload-background', methods=['POST'])
def upload_background():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'success': False, 'message': '未登录'}), 401
    
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': '没有文件上传'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'message': '没有选择文件'}), 400
    
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join('backgrounds', filename))
        return jsonify({'success': True, 'filename': filename})
    
    return jsonify({'success': False, 'message': '上传失败'}), 500
    
from flask import send_from_directory

@app.route('/api/get-background')
def get_background():
    # 获取最新上传的背景图片
    backgrounds = os.listdir('backgrounds')
    if not backgrounds:
        return send_from_directory('backgrounds', 'default.jpg')
    latest_bg = max(backgrounds, key=lambda f: os.path.getmtime(os.path.join('backgrounds', f)))
    return send_from_directory('backgrounds', latest_bg)

@app.route('/api/preferences', methods=['POST'])
def save_preferences():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'success': False, 'message': '未登录'}), 401
    data = request.get_json()
    print("收到前端数据：", data)
    setting = UserSetting.query.filter_by(user_id=user_id).first()
    if not setting:
        setting = UserSetting(user_id=user_id)
        db.session.add(setting)
    print("保存前的 preferences：", setting.preferences)
    prefs = dict(setting.preferences or {})
    prefs.update(data)
    setting.preferences = prefs
    print("保存后的 preferences：", setting.preferences)
    db.session.commit()
    db.session.refresh(setting)
    print("commit+refresh后 preferences：", setting.preferences)
    return jsonify({'success': True})

@app.route('/api/reset-preferences', methods=['POST'])
def reset_preferences():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({'success': False, 'message': '未登录'}), 401
    setting = UserSetting.query.filter_by(user_id=user_id).first()
    if setting:
        setting.preferences = {}
        db.session.commit()
    return jsonify({'success': True})

if __name__ == '__main__':
    # 确保背景图片目录存在
    os.makedirs('backgrounds', exist_ok=True)
    create_tables()
    create_admin_user()
    app.run(debug=True, port=9080)
