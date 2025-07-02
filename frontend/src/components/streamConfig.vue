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
    <button class="btn" @click="testStream">测试连接</button>
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
    gap: 10px;
    margin-bottom: 15px;
}
.platform-item {
    border: 2px solid #e7eaee;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    width: 80px;
}
.platform-item:hover,
.platform-item.active {
    border-color: #3498db;
    background-color: rgba(52, 152, 219, 0.05);
}
.platform-item.active {
    font-weight: bold;
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
</style>