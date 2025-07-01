import asyncio
import websockets
import json
import subprocess

PORT = 8888  # WebSocket监听端口

async def handle_stream(websocket, path):
    print("有客户端连接，等待推流参数...")
    ffmpeg = None
    try:
        # 1. 等待第一条消息（JSON，包含rtmp_url和stream_key）
        msg = await websocket.recv()
        try:
            params = json.loads(msg)
            rtmp_url = params.get('rtmp_url')
            stream_key = params.get('stream_key')
        except Exception as e:
            await websocket.send(json.dumps({'error': '首条消息必须为JSON，包含rtmp_url和stream_key'}))
            return
        if not rtmp_url or not stream_key:
            await websocket.send(json.dumps({'error': '缺少rtmp_url或stream_key'}))
            return
        full_rtmp_url = f"{rtmp_url}/{stream_key}"
        print(f"推流目标: {full_rtmp_url}")

        # 2. 启动ffmpeg进程
        ffmpeg_cmd = [
            'ffmpeg',
            '-re',
            '-i', '-',  # 从stdin读取
            '-c:v', 'libx264',
            '-preset', 'veryfast',
            '-tune', 'zerolatency',
            '-c:a', 'aac',
            '-f', 'flv',
            full_rtmp_url
        ]
        ffmpeg = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
        print("ffmpeg已启动，开始接收音视频流...")

        # 3. 持续接收二进制数据并写入ffmpeg
        async for data in websocket:
            if isinstance(data, bytes):
                ffmpeg.stdin.write(data)
                ffmpeg.stdin.flush()
            else:
                print("收到非二进制数据，忽略")
    except Exception as e:
        print(f"推流服务异常: {e}")
    finally:
        if ffmpeg:
            try:
                ffmpeg.stdin.close()
                ffmpeg.terminate()
            except Exception:
                pass
        print("连接断开，推流结束")

if __name__ == "__main__":
    print(f"WebSocket推流服务启动，监听端口 {PORT}")

    print(f"asyncio 版本: {asyncio.__version__ if hasattr(asyncio, '__version__') else '内置'}")
    print(f"websockets 版本: {websockets.__version__}")

    start_server = websockets.serve(handle_stream, '0.0.0.0', PORT, max_size=None, max_queue=None, read_limit=2**24, write_limit=2**24)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever() 

