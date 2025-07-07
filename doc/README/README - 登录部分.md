## 登录模块设计文档

### 系统概述

登录模块是StreamCream直播系统的核心认证组件，负责用户身份验证、会话管理和权限控制。该模块采用前后端分离架构，使用JWT（JSON Web Token）进行身份验证，支持用户注册、登录、登出等功能。

### 技术架构

#### 后端技术栈
- **框架**: Flask (Python)
- **数据库**: MySQL + SQLAlchemy ORM
- **认证方式**: JWT (JSON Web Token)
- **密码加密**: Werkzeug Security
- **跨域处理**: Flask-CORS

#### 前端技术栈
- **框架**: Vite + Vue 3 
- **状态管理**: Pinia
- **HTTP客户端**: Axios
- **路由**: Vue Router
- **样式**: CSS3 + 响应式设计

### 数据库设计

#### 用户表 (users)
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### 用户设置表 (user_settings)
```sql
CREATE TABLE user_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    preferences JSON DEFAULT '{}',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### 直播记录表 (streams)
```sql
CREATE TABLE streams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    stream_key VARCHAR(64) UNIQUE NOT NULL,
    is_live BOOLEAN DEFAULT FALSE,
    start_time DATETIME,
    end_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### API接口设计

#### 用户注册
- **端点**: `POST /api/register`
- **功能**: 创建新用户账户
- **请求参数**:
  ```json
  {
    "username": "string",
    "email": "string", 
    "password": "string"
  }
  ```
- **响应**:
  ```json
  {
    "success": true,
    "message": "注册成功",
    "token": "jwt_token"
  }
  ```

#### 用户登录
- **端点**: `POST /api/login`
- **功能**: 验证用户凭据并生成访问令牌
- **请求参数**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **响应**:
  ```json
  {
    "success": true,
    "message": "登录成功",
    "token": "jwt_token",
    "user": {
      "id": 1,
      "username": "string",
      "email": "string"
    }
  }
  ```

#### 令牌验证
- **端点**: `POST /api/verify-token`
- **功能**: 验证JWT令牌有效性
- **请求头**: `Authorization: Bearer <token>`
- **响应**:
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "username": "string",
      "email": "string"
    }
  }
  ```

#### 获取用户偏好
- **端点**: `GET /api/preferences`
- **功能**: 获取用户个性化设置
- **请求头**: `Authorization: Bearer <token>`
- **响应**:
  ```json
  {
    "aiSettings": {},
    "otherSettings": {}
  }
  ```

#### 保存用户偏好
- **端点**: `POST /api/preferences`
- **功能**: 保存用户个性化设置
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**:
  ```json
  {
    "aiSettings": {},
    "otherSettings": {}
  }
  ```

### 前端组件设计

#### 登录页面组件 (loginPage.vue)
- **功能**: 提供登录和注册界面
- **特性**:
  - 响应式表单切换
  - 实时表单验证
  - 错误提示显示

  

#### 认证状态管理 (auth.js)
- **功能**: 管理用户认证状态
- **状态**:
  - `token`: JWT访问令牌
  - `user`: 当前用户信息
  - `isLoggedIn`: 登录状态标志
- **方法**:
  - `login()`: 用户登录
  - `logout()`: 用户登出
  - `setUser()`: 设置用户信息
  - `verifyToken()`: 验证令牌有效性

### 安全机制

#### 密码安全
- 使用Werkzeug的`generate_password_hash()`进行密码加密
- 支持多种哈希算法（默认使用bcrypt）
- 密码验证使用`check_password_hash()`方法

#### JWT令牌管理
- 令牌包含用户ID、令牌ID、签发时间等信息
- 令牌无过期时间，通过黑名单控制有效性

#### 输入验证
- 用户名格式验证：3-20位字母数字下划线
- 邮箱格式验证：标准邮箱格式

#### 跨域安全
- 配置CORS允许特定域名访问
- 支持凭证传递（credentials）
- 限制允许的HTTP方法

### 用户体验设计

#### 界面特性
- 现代化渐变背景设计
- 平滑的表单切换动画
- 实时错误提示和验证反馈
- 响应式布局适配不同设备

#### 交互流程
1. 用户访问登录页面
2. 选择登录或注册模式
3. 填写表单信息
4. 系统验证输入并显示登录结果
5. 登录成功后获取令牌
6. 自动跳转到主页面

#### 错误处理
- 网络错误友好提示
- 表单验证实时反馈
- 认证失败自动跳转
- 令牌被修改自动登出

### 部署配置

#### 环境变量
```env
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=streamcream
SECRET_KEY=your_secret_key
```

#### 数据库初始化
- 自动创建数据库（如果不存在）
- 自动创建数据表结构
- 创建默认管理员账户

### 扩展性考虑

#### 功能扩展
- 支持第三方OAuth登录
- 添加邮箱验证功能
- 实现密码重置功能

#### 性能优化
- 数据库连接池配置
- JWT令牌缓存机制
- 用户会话管理优化
- API响应缓存策略

### 测试策略

#### 单元测试
- 用户模型方法测试
- API端点功能测试
- 认证逻辑验证测试

#### 集成测试
- 前后端交互测试
- 数据库操作测试
- 跨域请求测试

#### 安全测试
- 密码加密验证
- JWT令牌安全性测试
- 输入验证测试
- SQL注入防护测试 