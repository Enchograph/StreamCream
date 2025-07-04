import subprocess
import os
import time
import threading
from queue import Queue, Empty

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

# 用于线程间通信的队列
output_queue = Queue()

def enqueue_output(stream, process_name, is_error=False):
    """将流输出放入队列"""
    for line in iter(stream.readline, b''):
        output_queue.put((process_name, line.decode('utf-8').rstrip(), is_error))
    stream.close()

def print_output():
    """从队列中获取输出并打印"""
    while True:
        try:
            # 非阻塞获取队列中的项目
            process_name, line, is_error = output_queue.get(timeout=0.1)
            
            # 根据是否是错误输出设置不同的前缀
            prefix = f"[{process_name}] "
            if is_error:
                print(f"\033[91m{prefix}{line}\033[0m")  # 红色错误输出
            else:
                print(f"{prefix}{line}")
                
            output_queue.task_done()
            
        except Empty:
            # 队列为空，继续检查
            pass
        except KeyboardInterrupt:
            # 主程序会处理Ctrl+C，这里只需退出线程
            break

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
                bufsize=1,  # 行缓冲
                universal_newlines=True
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
                bufsize=1,  # 行缓冲
                universal_newlines=True
            )
        
        processes.append((app["name"], process))
        print(f'已启动 {app["name"]} (端口: {app["port"]})')
        
        # 创建并启动线程来处理标准输出和错误输出
        stdout_thread = threading.Thread(target=enqueue_output, args=(process.stdout, app["name"]))
        stderr_thread = threading.Thread(target=enqueue_output, args=(process.stderr, app["name"], True))
        
        stdout_thread.daemon = True
        stderr_thread.daemon = True
        
        stdout_thread.start()
        stderr_thread.start()
        
        return True
        
    except Exception as e:
        output_queue.put((app["name"], f'启动失败: {str(e)}', True))
        return False

def main():
    """主函数：启动所有应用并监控"""
    print("正在启动所有后端应用...")
    
    # 启动输出处理线程
    output_thread = threading.Thread(target=print_output)
    output_thread.daemon = True
    output_thread.start()
    
    # 依次启动所有应用
    for app in apps:
        start_app(app)
        time.sleep(2)  # 应用之间间隔2秒启动
    
    print("\n所有应用已启动。按 Ctrl+C 终止所有应用。")
    
    try:
        # 持续运行，让输出线程有机会处理输出
        while True:
            time.sleep(1)
            # 检查是否有进程意外退出
            for name, process in processes:
                if process.poll() is not None:
                    output_queue.put((name, f'已退出，状态码: {process.returncode}', True))
                    
    except KeyboardInterrupt:
        print("\n接收到终止信号，正在关闭所有应用...")
        
        # 优雅地终止所有进程
        for name, process in processes:
            output_queue.put((name, '正在关闭...', True))
            process.terminate()  # 发送SIGTERM信号
            
        # 等待所有进程结束
        for name, process in processes:
            try:
                process.wait(timeout=5)  # 等待5秒
                if process.poll() is None:
                    process.kill()  # 发送SIGKILL信号
                    output_queue.put((name, '已强制关闭', True))
                else:
                    output_queue.put((name, '已正常关闭', True))
            except Exception as e:
                output_queue.put((name, f'关闭时出错: {str(e)}', True))
        
        print("所有应用已成功关闭。")
        # 给输出线程一些时间来处理最后的消息
        time.sleep(0.5)

if __name__ == "__main__":
    main()