import os
import sys
import time
import subprocess
import tempfile
import signal
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import cv2
import numpy as np
import threading

class StreamHandler:
    def __init__(self, target_url, rtmp_url):
        self.target_url = target_url
        self.rtmp_url = rtmp_url
        self.process = None
        self.is_streaming = False
        self.temp_dir = tempfile.mkdtemp()
        self.stop_event = threading.Event()

    def setup_browser(self):
        """设置和初始化Chrome浏览器"""
        chrome_options = Options()
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--disable-infobars")
        chrome_options.add_argument("--disable-notifications")
        # 不使用无头模式，以便可以看到浏览器窗口
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.set_window_size(1920, 1080)
        
        return driver

    def capture_and_stream(self, driver):
        """捕获网页内容并推流"""
        # 加载指定的URL
        driver.get(self.target_url)
        print(f"网页已加载: {self.target_url}")
        time.sleep(3)  # 等待页面完全加载
        
        # 创建临时视频文件路径
        video_path = os.path.join(self.temp_dir, "temp_stream.mp4")
        
        # 设置视频参数
        width = 1920
        height = 1080
        fps = 30
        
        # 创建视频编码器
        fourcc = cv2.VideoWriter_fourcc(*'avc1')  # 使用H.264编码
        
        # 创建命名管道用于FFmpeg输入
        pipe_path = None
        if os.name == 'nt':  # Windows
            pipe_path = os.path.join(self.temp_dir, "stream_pipe.h264")
            # Windows不支持命名管道，使用临时文件
        else:  # Unix/Linux
            pipe_path = os.path.join(self.temp_dir, "stream_pipe")
            try:
                os.mkfifo(pipe_path)
            except OSError:
                print("命名管道创建失败，可能已存在")
        
        # 启动FFmpeg进程从管道读取并推送到RTMP
        ffmpeg_cmd = [
            'ffmpeg',
            '-re',  # 使用原始帧率
            '-f', 'rawvideo',
            '-vcodec', 'rawvideo',
            '-pix_fmt', 'bgr24',
            '-s', f'{width}x{height}',
            '-r', str(fps),
            '-i', '-',  # 从stdin读取
            '-c:v', 'libx264',
            '-preset', 'ultrafast',
            '-tune', 'zerolatency',
            '-b:v', '2500k',
            '-maxrate', '2500k',
            '-bufsize', '5000k',
            '-pix_fmt', 'yuv420p',
            '-g', '60',
            '-f', 'flv',
            self.rtmp_url
        ]
        
        print(f"启动FFmpeg命令: {' '.join(ffmpeg_cmd)}")
        
        self.process = subprocess.Popen(
            ffmpeg_cmd,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            bufsize=10**8
        )
        
        self.is_streaming = True
        start_time = time.time()
        frames_captured = 0
        
        try:
            print("开始捕获和推流网页内容...")
            while not self.stop_event.is_set():
                # 截取网页内容
                screenshot = driver.get_screenshot_as_png()
                
                # 将PNG转换为OpenCV格式
                nparr = np.frombuffer(screenshot, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                
                # 调整图像大小以保持一致性
                img = cv2.resize(img, (width, height))
                
                # 将帧写入FFmpeg进程的stdin
                self.process.stdin.write(img.tobytes())
                
                frames_captured += 1
                if frames_captured % 30 == 0:  # 每30帧打印一次状态
                    elapsed = time.time() - start_time
                    print(f"已捕获 {frames_captured} 帧，运行时间: {elapsed:.2f} 秒，FPS: {frames_captured/elapsed:.2f}")
                
                # 控制帧率
                time.sleep(1/fps)
        
        except Exception as e:
            print(f"捕获和推流过程中出错: {str(e)}")
        finally:
            # 清理资源
            if self.process:
                self.process.stdin.close()
                try:
                    self.process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    self.process.kill()
            
            self.is_streaming = False
            print("捕获和推流已停止")

    def start_streaming(self):
        """开始流式传输过程"""
        try:
            driver = self.setup_browser()
            self.capture_and_stream(driver)
            
        except Exception as e:
            print(f"流媒体错误: {str(e)}")
        finally:
            self.is_streaming = False
            if driver:
                driver.quit()

    def stop_streaming(self):
        """停止流式传输"""
        self.stop_event.set()
        
        if self.process:
            try:
                self.process.stdin.close()
            except:
                pass
                
            # 尝试正常终止进程
            try:
                self.process.terminate()
                self.process.wait(timeout=5)
            except:
                # 如果无法正常终止，则强制结束
                if os.name == 'nt':
                    subprocess.call(['taskkill', '/F', '/T', '/PID', str(self.process.pid)])
                else:
                    try:
                        os.killpg(os.getpgid(self.process.pid), signal.SIGTERM)
                    except:
                        self.process.kill()
            
        self.is_streaming = False
