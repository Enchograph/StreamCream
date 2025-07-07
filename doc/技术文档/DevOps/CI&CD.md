# CI&CD

## 1. 环境搭建

### 1.1 方案简介
本项目后端为多服务Python架构，推荐在Ubuntu 22.04+/24.04+环境下搭建CI&CD。建议使用Jenkins作为持续集成与持续部署平台。

### 1.2 基础环境准备
- Ubuntu 22.04/24.04
- 已安装git、python3.11+、pip3
- **必须安装Miniconda/Anaconda（所有后端服务依赖conda环境管理）**
- Jenkins（建议使用LTS版本）

#### 安装Jenkins
参考官方文档：https://pkg.origin.jenkins.io/debian-stable/ 进行安装。

#### 安装Python依赖
```sh
sudo apt update
sudo apt install python3 python3-pip python3-venv git -y
## 安装conda
# 参考 https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html
```

## 2. Jenkins配置

### 2.1 配置凭证
- 在Jenkins"凭证"中添加Git仓库访问凭证（如SSH Key或用户名密码）。
- 如需自动部署到服务器，可配置目标服务器SSH凭证。

### 2.2 创建Jenkins任务
- 新建"自由风格项目"或"流水线项目"，如：`StreamCream-Python-Backend`。

### 2.3 源码管理
- 配置Git仓库地址及分支，选择刚才添加的凭证。

## 3. 构建与测试流程

### 3.1 构建脚本（Shell示例）
项目根目录结构如下：
```
streamcream/
├── backend/
│   ├── requirements.txt
│   ├── loginBackend/
│   ├── streamingBackend/
│   ├── streamTTSBackend/
│   └── GPT-SoVITS/
├── frontend/
...
```

#### 典型构建步骤：
```sh
# 进入后端目录
cd backend

# 创建/激活虚拟环境（推荐）
python3 -m venv .venv
source .venv/bin/activate

# 安装所有后端依赖
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 代码静态检查（Ruff）
ruff check .

# 运行单元测试
python -m unittest discover ../tests

# 启动所有后端服务（如需集成测试/部署）
# python ../start_all_backends.py &
```

### 3.2 关键点说明
- **依赖管理**：统一使用`backend/requirements.txt`，覆盖所有后端服务依赖。
- **代码质量**：强制执行Ruff静态检查，保证代码风格和安全。
- **自动化测试**：推荐所有后端服务均编写unittest，Jenkins中自动执行。
- **多服务支持**：如需集成测试，可通过`start_all_backends.py`一键启动所有后端服务。

### 3.3 构建后操作
- 可归档测试报告、日志文件。
- 可配置自动部署脚本（如rsync/ssh/scp到生产服务器）。

## 4. 自动化部署（可选）

### 4.1 方案一：Jenkins内置Shell脚本
```sh
# 构建成功后自动部署到目标服务器
scp -r ../backend user@your-server:/opt/streamcream/backend
ssh user@your-server 'cd /opt/streamcream/backend && source .venv/bin/activate && nohup python start_all_backends.py > backend.log 2>&1 &'
```

### 4.2 方案二：Jenkins Pipeline（Jenkinsfile）
```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'your-credential-id', url: 'git@your.git.repo:streamcream.git', branch: 'main'
            }
        }
        stage('Setup Python') {
            steps {
                sh '''
                cd backend
                python3 -m venv .venv
                source .venv/bin/activate
                pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
                '''
            }
        }
        stage('Lint & Test') {
            steps {
                sh '''
                cd backend
                source .venv/bin/activate
                ruff check .
                python -m unittest discover ../tests
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                scp -r backend user@your-server:/opt/streamcream/backend
                ssh user@your-server 'cd /opt/streamcream/backend && source .venv/bin/activate && nohup python start_all_backends.py > backend.log 2>&1 &'
                '''
            }
        }
    }
}
```

## 5. 常见问题与建议
- **依赖安装慢/失败**：建议使用国内PyPI镜像。
- **多服务端口冲突**：确保`start_all_backends.py`中端口配置不冲突。
- **环境隔离**：强烈建议每次CI流程都新建/清理虚拟环境，避免依赖污染。
- **安全**：敏感信息（如数据库密码、服务器密钥）建议用Jenkins凭证管理，不要写死在脚本中。

## 6. 参考资料
- [Jenkins官方文档](https://www.jenkins.io/zh/doc/)
- [Ruff官方文档](https://docs.astral.sh/ruff/)
- [Python unittest官方文档](https://docs.python.org/zh-cn/3/library/unittest.html)
- [StreamCream项目README] 