from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import threading
import time
import subprocess
import json
import signal
from stream_handler import StreamHandler
from werkzeug.utils import secure_filename

# 背景图片上传配置
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backgrounds')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# 确保上传目录存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# 全局变量存储当前的流程
current_stream = None
stream_process = None
stream_thread = None

@app.route('/api/start-stream', methods=['POST'])
def start_stream():
    global current_stream, stream_process, stream_thread
    
    if current_stream:
        return jsonify({
            'success': False,
            'message': '已经有一个直播在进行中，请先停止'
        })
    
    data = request.json
    rtmp_url = data.get('rtmpUrl')
    stream_key = data.get('streamKey')
    target_url = data.get('targetUrl')
    
    if not rtmp_url or not stream_key or not target_url:
        return jsonify({
            'success': False,
            'message': '缺少必要参数'
        })
    
    try:
        # 完整的RTMP地址
        full_rtmp_url = f"{rtmp_url}/{stream_key}"
        
        # 创建流处理器实例
        stream_handler = StreamHandler(target_url, full_rtmp_url)
        
        # 在后台线程中启动直播
        stream_thread = threading.Thread(target=stream_handler.start_streaming)
        stream_thread.daemon = True
        stream_thread.start()
        
        # 存储当前流信息
        current_stream = {
            'rtmp_url': rtmp_url,
            'stream_key': stream_key,
            'target_url': target_url,
            'start_time': time.time(),
            'stream_handler': stream_handler  # 保存handler实例以便后续停止
        }
        
        return jsonify({
            'success': True,
            'message': f'开始直播到 {rtmp_url}'
        })
    
    except Exception as e:
        print(f"启动直播出错: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'启动直播出错: {str(e)}'
        }), 500

@app.route('/api/stop-stream', methods=['POST'])
def stop_stream():
    global current_stream, stream_process, stream_thread
    
    if not current_stream:
        return jsonify({
            'success': False,
            'message': '当前没有直播在进行'
        })
    
    try:
        # 停止直播进程
        if hasattr(current_stream, 'stream_handler') and current_stream['stream_handler']:
            current_stream['stream_handler'].stop_streaming()
        
        # 重置状态
        duration = time.time() - current_stream['start_time']
        stream_info = current_stream
        current_stream = None
        stream_process = None
        stream_thread = None
        
        return jsonify({
            'success': True,
            'message': f'直播已停止，持续了 {int(duration)} 秒'
        })
    
    except Exception as e:
        print(f"停止直播出错: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'停止直播出错: {str(e)}'
        }), 500


@app.route('/api/stream-status', methods=['GET'])
def stream_status():
    if current_stream:
        duration = time.time() - current_stream['start_time']
        return jsonify({
            'streaming': True,
            'target_url': current_stream['target_url'],
            'rtmp_url': current_stream['rtmp_url'],
            'duration': int(duration)
        })
    else:
        return jsonify({
            'streaming': False
        })

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload-background', methods=['POST', 'OPTIONS'])
@app.route('/api/upload-background', methods=['OPTIONS'])
def handle_options():
    response = make_response('', 200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response
def upload_background():
    if request.method == 'OPTIONS':
        return '', 200
    
    if 'background' not in request.files:
        return jsonify({'success': False, 'message': '没有上传文件'}), 400
    
    file = request.files['background']
    if file.filename == '':
        return jsonify({'success': False, 'message': '没有选择文件'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return jsonify({'success': True, 'filename': filename})
    
    return jsonify({'success': False, 'message': '文件类型不允许'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9080)
