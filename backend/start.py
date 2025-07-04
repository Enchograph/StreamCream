import subprocess
import os
import time

# 定义应用列表，包含脚本路径、虚拟环境和端口
apps = [
    {
        "name": "Login Backend",
        "script": r"backend\loginBackend\app.py",
        "python_path": r"backend\loginBackend\venv\Scripts\python.exe",
        "port": 9080,
        "env": {}  # 可添加环境变量
    },
    {
        "name": "Stream TTS Backend",
        "script": r"backend\streamTTSBackend\app.py",
        "python_path": "python",  # 使用系统默认Python
        "port": 5001,
        "env": {}
    },
    {
        "name": "GPT-SoVITS API",
        "script": r"backend\GPT-SoVITS\api_v2.py",
        "python_path": "conda",  # 使用conda环境
        "port": 9880,
        "env": {"CONDA_ENV": "sovits"}  # conda环境名称
    },
    {
        "name": "Streaming Backend",
        "script": r"backend\streamingBackend\app.py",
        "python_path": "python",
        "port": 8888,
        "env": {}
    }
]

# 存储所有子进程
processes = []

def start_app(app):
    """启动单个应用"""
    try:
        # 构建命令
        if app["python_path"].endswith("conda"):
            # 处理conda环境
            conda_env = app["env"].get("CONDA_ENV", "")
            cmd = f'conda activate {conda_env} && python {app["script"]} --port {app["port"]}'
            # Windows需要使用cmd.exe执行
            process = subprocess.Popen(
                f'cmd.exe /c "{cmd}"',
                shell=False,
                env=os.environ.copy(),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
        else:
            # 处理普通Python环境
            cmd = f'{app["python_path"]} {app["script"]} --port {app["port"]}'
            process = subprocess.Popen(
                cmd,
                shell=False,
                env=os.environ.copy(),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
        
        processes.append((app["name"], process))
        print(f'已启动 {app["name"]} (端口: {app["port"]})')
        
        # 打印应用启动信息
        time.sleep(1)  # 等待1秒让应用有时间输出
        if process.stdout:
            print(f'{app["name"]} 输出:')
            print(process.stdout.readline().strip())
        if process.stderr:
            error_line = process.stderr.readline().strip()
            if error_line:
                print(f'{app["name"]} 错误: {error_line}')
                
        return True
        
    except Exception as e:
        print(f'启动 {app["name"]} 失败: {str(e)}')
        return False

def main():
    """主函数：启动所有应用并监控"""
    print("正在启动所有后端应用...")
    
    # 依次启动所有应用
    for app in apps:
        start_app(app)
        time.sleep(2)  # 应用之间间隔2秒启动
    
    print("\n所有应用已启动。按 Ctrl+C 终止所有应用。")
    
    try:
        # 持续监控进程
        while True:
            time.sleep(1)
            # 检查是否有进程意外退出
            for name, process in processes:
                if process.poll() is not None:
                    print(f'警告: {name} 已退出，状态码: {process.returncode}')
                    # 可选择在这里重新启动应用
                    
    except KeyboardInterrupt:
        print("\n接收到终止信号，正在关闭所有应用...")
        
        # 优雅地终止所有进程
        for name, process in processes:
            print(f'正在关闭 {name}...')
            process.terminate()  # 发送SIGTERM信号
            
        # 等待所有进程结束
        for name, process in processes:
            try:
                process.wait(timeout=5)  # 等待5秒
                if process.poll() is None:
                    process.kill()  # 发送SIGKILL信号
                print(f'{name} 已关闭')
            except Exception as e:
                print(f'关闭 {name} 时出错: {str(e)}')
        
        print("所有应用已成功关闭。")

if __name__ == "__main__":
    main()