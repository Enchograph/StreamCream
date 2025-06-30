from flask import Flask, request, jsonify, send_from_directory
import os
import time
import requests
import json
from flask_cors import CORS
import re
import uuid

app = Flask(__name__)
# CORS configuration to allow frontend origin
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "*"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# 配置
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
AUDIO_DIR = os.path.join(STATIC_DIR, "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

# GPT-SoVITS API配置
TTS_API_URL = "http://127.0.0.1:9880/tts"

# 演讲生成API
@app.route('/generate-speech', methods=['POST'])
def generate_speech():
    data = request.json
    topic = data.get('topic', '')

    if not topic:
        return jsonify({"error": "主题不能为空"}), 400

    # 生成演讲内容
    speech_content = generate_speech_content(topic)
    sentences = split_into_sentences(speech_content)

    return jsonify({
        "speech_content": speech_content,
        "sentences": sentences
    })

# 语音合成API
@app.route('/synthesize-speech', methods=['POST'])
def synthesize_speech():
    data = request.json
    text = data.get('text', '')
    voice = data.get('voice', 'default')

    if not text:
        return jsonify({"error": "文本不能为空"}), 400

    # 调用 GPT-SoVITS API 进行语音合成
    # 不传递ref_audio_path，让GPT-SoVITS使用内部维护的参考音频
    tts_params = {
        "text": text,
        "text_lang": "zh",
        "prompt_lang": "zh",
        "text_split_method": "cut5",
        "batch_size": 1,
        "media_type": "wav",
        "streaming_mode": True
    }

    try:
        response = requests.get(TTS_API_URL, params=tts_params)

        if response.status_code == 200:
            # 生成唯一文件名
            filename = f"speech_{int(time.time())}.wav"
            filepath = os.path.join(AUDIO_DIR, filename)

            # 保存音频文件
            with open(filepath, 'wb') as f:
                f.write(response.content)

            # 返回音频文件的URL路径（相对路径）
            return jsonify({
                "audio_url": f"/static/audio/{filename}"
            })
        else:
            return jsonify({"error": "语音合成失败", "details": response.text}), 400

    except Exception as e:
        return jsonify({"error": f"语音合成失败: {str(e)}"}), 500

# 静态文件服务
@app.route('/static/audio/<filename>')
def serve_audio(filename):
    return send_from_directory(AUDIO_DIR, filename)

# 辅助函数

def generate_speech_content(topic):
    # 现在由前端通过GPT API生成内容
    return ""

# 删除音频文件接口
@app.route('/delete-audio/<filename>', methods=['DELETE'])
def delete_audio(filename):
    try:
        file_path = os.path.join(AUDIO_DIR, filename)
        
        if not os.path.exists(file_path):
            return jsonify({"message": "文件不存在"}), 404
        
        os.remove(file_path)
        return jsonify({"message": "文件删除成功"}), 200
    except Exception as e:
        return jsonify({"error": f"删除文件失败: {str(e)}"}), 500
        
# 删除所有音频文件接口
@app.route('/delete-all-audio', methods=['DELETE'])
def delete_all_audio():
    try:
        # 删除目录下所有.wav文件
        for filename in os.listdir(AUDIO_DIR):
            if filename.endswith('.wav'):
                file_path = os.path.join(AUDIO_DIR, filename)
                os.remove(file_path)
        return jsonify({"message": "所有音频文件删除成功"}), 200
    except Exception as e:
        return jsonify({"error": f"删除所有音频文件失败: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=5001)