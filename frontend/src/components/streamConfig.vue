<template>
    <h2>直播平台选择与推流码</h2>
    <p>选择直播平台并输入推流码</p>
    <div class="platform-select">
        <div class="platform-item" :class="{ active: selectedPlatform === '抖音' }" @click="selectPlatform('抖音')">抖音</div>
        <div class="platform-item" :class="{ active: selectedPlatform === 'B站' }" @click="selectPlatform('B站')">B站</div>
        <div class="platform-item" :class="{ active: selectedPlatform === 'YouTube' }" @click="selectPlatform('YouTube')">YouTube</div>
        <div class="platform-item" :class="{ active: selectedPlatform === 'Twitch' }" @click="selectPlatform('Twitch')">Twitch</div>
    </div>
    <div class="file-upload">
        <label>推流地址:</label>
        <input type="text" v-model="streamUrl" placeholder="输入推流地址">
    </div>
    <div class="file-upload">
        <label>推流码:</label>
        <input type="text" v-model="streamKey" placeholder="输入推流码">
    </div>
    <button class="btn test-connect-btn" @click="testStream">
        <span class="btn-icon">🔗</span>测试连接
    </button>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import api from '/src/api/index.js'

const selectedPlatform = ref('抖音');
const streamUrl = ref('');
const streamKey = ref('');
const wsBaseUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8888';

// 自动保存
watch(streamUrl, (val) => {
  localStorage.setItem('rtmp_url', val);
  // 同步到后端
  saveStreamPreferences();
});
watch(streamKey, (val) => {
  localStorage.setItem('stream_key', val);
  // 同步到后端
  saveStreamPreferences();
});

async function saveStreamPreferences() {
  try {
    await api.savePreferences({
      rtmp_url: streamUrl.value,
      stream_key: streamKey.value
    });
  } catch (e) {
    // 未登录或网络异常时忽略
  }
}

// 自动填充
onMounted(async () => {
  // 优先从后端获取
  let lastUrl = '';
  let lastKey = '';
  try {
    const prefs = await api.getPreferences();
    if (prefs && prefs.rtmp_url) lastUrl = prefs.rtmp_url;
    if (prefs && prefs.stream_key) lastKey = prefs.stream_key;
  } catch (e) {
    // 后端获取失败时再用本地
    lastUrl = localStorage.getItem('rtmp_url') || '';
    lastKey = localStorage.getItem('stream_key') || '';
  }
  if (lastUrl) streamUrl.value = lastUrl;
  if (lastKey) streamKey.value = lastKey;
});

function selectPlatform(platform) {
    selectedPlatform.value = platform;
}

async function testStream() {
    // 先打开Live2D页面
    window.open('/live2d', '_blank');
    
    let stream;
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    } catch (err) {
        alert('用户取消了采集或浏览器不支持: ' + err);
        return;
    }

    const ws = new WebSocket(wsBaseUrl);

    ws.onopen = () => {
        // 先发送推流信息
        ws.send(JSON.stringify({
            rtmp_url: streamUrl.value,
            stream_key: streamKey.value
        }));

        // 再推送视频流
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8,opus' });
        recorder.ondataavailable = (e) => {
            if (ws && ws.readyState === 1) {
                ws.send(e.data);
            }
        };
        recorder.start(100);

        // 不再自动断开，需用户手动关闭页面或刷新才会停止
    };

    ws.onerror = (e) => {
        alert('WebSocket 连接失败: ' + e.message);
    };
}
</script>

<style scoped>
.platform-select {
    display: flex;
    gap: 18px;
    margin-bottom: 16px;
    justify-content: flex-start;
}
.platform-item {
    border: 1.5px solid #e7eaee;
    border-radius: 12px;
    padding: 2px 0 0 0;
    cursor: pointer;
    transition: all 0.18s cubic-bezier(.4,0,.2,1);
    text-align: center;
    width: 72px;
    font-size: 1.05rem;
    font-weight: 500;
    background: linear-gradient(135deg, #e0e7ff 60%, #a5b4fc 100%);
    box-shadow: 0 1px 6px 0 rgba(163,191,250,0.06);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 36px;
    height: 36px;
    justify-content: center;
    color: #4f46e5;
}
.platform-item::before {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    margin-bottom: 1px;
    background-size: contain;
    background-repeat: no-repeat;
}
.platform-item:nth-child(1)::before { background-image: url('https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/douyin.svg'); }
.platform-item:nth-child(2)::before { background-image: url('https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/bilibili.svg'); }
.platform-item:nth-child(3)::before { background-image: url('https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg'); }
.platform-item:nth-child(4)::before { background-image: url('https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitch.svg'); }
.platform-item.active {
    border-color: #a78bfa;
    background: linear-gradient(90deg, #a78bfa 0%, #6366f1 100%);
    color: #fff;
    font-weight: bold;
    box-shadow: 0 3px 16px 0 rgba(124,58,237,0.18), 0 0 8px 0 #a78bfa55;
    text-shadow: 0 1px 6px #a78bfa88;
    transform: translateY(-1px) scale(1.04);
}
.platform-item:hover:not(.active) {
    border-color: #6366f1;
    background: linear-gradient(90deg, #6366f1 0%, #7c3aed 100%);
    color: #fff;
    box-shadow: 0 2px 12px 0 rgba(124,58,237,0.10);
    transform: translateY(-1px) scale(1.03);
}
.file-upload {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}
.file-upload label {
    margin-bottom: 8px;
    color: #2c3e50;
    font-weight: 500;
}
.file-upload input {
    margin-bottom: 10px;
}
input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 14px;
}
.btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: 500;
    margin-right: 10px;
    margin-bottom: 10px;
}
.btn:hover {
    background-color: #2980b9;
}
.test-connect-btn {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
    color: #fff;
    border: none;
    padding: 11px 26px 11px 18px;
    border-radius: 14px;
    font-weight: 700;
    font-size: 15px;
    margin-top: 8px;
    margin-bottom: 8px;
    box-shadow: 0 4px 18px rgba(16, 185, 129, 0.18), 0 0 0 2px #d1fae5 inset;
    letter-spacing: 0.7px;
    min-width: 120px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.test-connect-btn .btn-icon {
    font-size: 1.25em;
    margin-right: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.13);
    padding: 3px 6px;
    box-shadow: 0 2px 8px rgba(102,126,234,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
}
.test-connect-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
    transition: left 0.5s;
}
.test-connect-btn:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 28px rgba(16, 185, 129, 0.22), 0 0 0 2px #6ee7b7 inset;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
.test-connect-btn:hover::before {
    left: 100%;
}
.test-connect-btn:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.18);
}
</style>