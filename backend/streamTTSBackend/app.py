from flask import Flask, request, jsonify, send_from_directory
import os
import time
import requests
import json
from flask_cors import CORS
import re
import uuid
from pypinyin import pinyin, Style

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

            # 估算音频时长（基于文本长度，每字符约0.3秒）
            estimated_duration = len(text) * 0.3

            # 返回音频文件的URL路径和相关信息
            return jsonify({
                "audio_url": f"/static/audio/{filename}",
                "text": text,
                "duration": estimated_duration
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

def extract_vowel(py):
    """
    从拼音中提取元音，支持更多元音类型
    返回小写元音字符串
    """
    py = py.lower()  # 确保小写
    
    # 复合元音优先级更高，先检查复合元音
    compound_vowels = [
        'ai', 'ao', 'ei', 'ou', 'ia', 'ie', 'ua', 'uo',
        'an', 'en', 'in', 'un', 'ang', 'eng', 'ing', 'ong'
    ]
    
    for vowel in compound_vowels:
        if vowel in py:
            return vowel
    
    # 基本元音
    basic_vowels = ['a', 'o', 'e', 'i', 'u', 'ü']
    for vowel in basic_vowels:
        if vowel in py:
            return vowel
    
    return ''



@app.route('/text2mouth_timeline', methods=['POST'])
def text2mouth_timeline():
    data = request.json
    text = data.get('text', '')
    duration = float(data.get('duration', 1.0))
    
    # 改进的字符处理：保留所有字符，包括空格
    chars = list(text)
    timeline = []
    current_time = 0.0
    
    for i, char in enumerate(chars):
        if char.strip():  # 非空格字符
            try:
                # 获取拼音
                pinyin_result = pinyin(char, style=Style.NORMAL, strict=False)
                if pinyin_result and pinyin_result[0]:
                    vowel = extract_vowel(pinyin_result[0][0])
                    # 根据字符类型调整时长
                    char_duration = get_char_duration(char, vowel)
                else:
                    vowel = ''
                    char_duration = 0.1  # 默认短时长
            except:
                vowel = ''
                char_duration = 0.1
        else:  # 空格字符
            vowel = ''
            char_duration = 0.05  # 空格较短时长
        
        timeline.append({
            'start': current_time,
            'end': current_time + char_duration,
            'vowel': vowel,
            'char': char
        })
        current_time += char_duration
    
    # 如果总时长不匹配，进行缩放调整
    if current_time > 0 and abs(current_time - duration) > 0.1:
        scale_factor = duration / current_time
        for item in timeline:
            item['start'] *= scale_factor
            item['end'] *= scale_factor
    
    return jsonify({'timeline': timeline})

def get_char_duration(char, vowel):
    """
    根据字符和元音类型返回合适的发音时长
    """
    # 基础时长配置
    base_duration = 0.2  # 基础时长
    
    # 根据元音类型调整时长
    vowel_durations = {
        'a': 0.3,    # 开口音，较长
        'o': 0.25,   # 圆唇音，中等
        'e': 0.2,    # 中元音，标准
        'i': 0.15,   # 闭口音，较短
        'u': 0.15,   # 闭口音，较短
        'ü': 0.15,   # 闭口音，较短
        'ai': 0.35,  # 复合元音，较长
        'ao': 0.3,   # 复合元音，较长
        'ei': 0.25,  # 复合元音，中等
        'ou': 0.25,  # 复合元音，中等
        'an': 0.3,   # 鼻音，较长
        'en': 0.25,  # 鼻音，中等
        'ang': 0.35, # 鼻音，较长
        'eng': 0.3,  # 鼻音，较长
    }
    
    # 获取元音对应的时长
    vowel_duration = vowel_durations.get(vowel, base_duration)
    
    # 根据字符类型微调
    if char in '，。！？；：':  # 标点符号
        return 0.1  # 标点符号较短
    elif char in '一二三四五六七八九十':  # 数字
        return vowel_duration * 0.8  # 数字稍短
    elif char in '的地得着了过':  # 轻声字
        return vowel_duration * 0.6  # 轻声字更短
    
    return vowel_duration

@app.route('/text2mouth_param', methods=['POST'])
def text2mouth_param():
    data = request.json
    text = data.get('text', '')
    duration = float(data.get('duration', 1.0))
    fps = int(data.get('fps', 30))
    chars = [ch for ch in text if ch.strip()]
    phonemes = [extract_vowel(pinyin(ch, style=Style.NORMAL, strict=False)[0][0]) for ch in chars]
    seg_count = len(phonemes)
    seg_duration = duration / seg_count if seg_count else duration
    mouth_map = {'a': 1.0, 'o': 0.7, 'e': 0.8, 'i': 0.5, 'u': 0.6, 'ü': 0.6, '': 0.2}
    mouth_param = []
    for frame in range(int(duration * fps)):
        t = frame / fps
        idx = min(int(t // seg_duration), seg_count - 1) if seg_count else 0
        vowel = phonemes[idx] if seg_count else ''
        mouth_open = mouth_map.get(vowel, 0.2)
        mouth_param.append(mouth_open)
    return jsonify({'mouth_param': mouth_param})

if __name__ == '__main__':
    app.run(port=5001)