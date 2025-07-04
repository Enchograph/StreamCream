# 邮箱配置说明

## 配置步骤

### 1. 创建 .env 文件
在 `backend/loginBackend/` 目录下创建 `.env` 文件，内容如下：

```env
# 数据库配置
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
DB_NAME=streamcream

# 应用密钥
SECRET_KEY=wofiporia

# 邮箱配置（QQ邮箱示例）
EMAIL_USER=your_email@qq.com
EMAIL_PASSWORD=your_authorization_code

# 其他配置
FLASK_ENV=development
```

### 2. 获取QQ邮箱授权码

1. 登录QQ邮箱
2. 点击"设置" -> "账户"
3. 找到"POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务"
4. 开启"POP3/SMTP服务"
5. 按照提示获取授权码（不是QQ密码）
6. 将授权码填入 `.env` 文件的 `EMAIL_PASSWORD` 字段

### 3. 其他邮箱配置

#### Gmail
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```
注意：Gmail需要使用应用专用密码

#### 163邮箱
```env
EMAIL_USER=your_email@163.com
EMAIL_PASSWORD=your_authorization_code
```

#### 企业邮箱
根据企业邮箱服务商的要求配置SMTP服务器和端口

## 测试邮箱配置

配置完成后，重启后端服务，然后尝试注册新用户，系统会自动发送验证码邮件。

## 注意事项

1. 确保邮箱服务商的SMTP服务已开启
2. 使用授权码而不是邮箱密码
3. 如果使用企业邮箱，可能需要修改SMTP服务器地址和端口
4. 建议在测试环境中先验证邮箱配置是否正确 