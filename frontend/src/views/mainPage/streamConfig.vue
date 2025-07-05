<template>
    <h2>直播平台选择与推流码</h2>
    <p>选择直播平台并输入推流码</p>
    <div class="platform-select">
        <el-select v-model="selectedPlatform" class="platform-selector" placeholder="选择直播平台">
            <el-option v-for="platform in platforms" :key="platform.value" :label="platform.label"
                :value="platform.value">
                <span class="platform-option">
                    <span class="platform-icon" :class="platform.value.toLowerCase()"></span>
                    {{ platform.label }}
                </span>
            </el-option>
        </el-select>
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
    <button class="btn get-streamkey-btn" @click="getStreamKey">
        <span class="btn-icon">🔑</span>{{ platformToolNames[selectedPlatform] || '获取推流码工具' }}
    </button>
    <button class="btn stop-stream-btn" @click="stopLive" :disabled="!isLiveActive">
        <span class="btn-icon">⏹️</span>停止直播
    </button>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import api from '/src/api/index.js'
import { useRouter } from 'vue-router';
import { ElMessage, ElSelect, ElOption } from 'element-plus'

const selectedPlatform = ref('抖音');
const streamUrl = ref('');
const streamKey = ref('');
const isLiveActive = ref(false);
const wsBaseUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8888';

// 平台列表数据
const platforms = [
    {
        value: '抖音',
        label: '抖音'
    },
    {
        value: 'B站',
        label: 'B站'
    },
    {
        value: '小红书',
        label: '小红书'
    },
    {
        value: '快手',
        label: '快手'
    },
    {
        value: 'YouTube',
        label: 'YouTube'
    },
    {
        value: 'Twitch',
        label: 'Twitch'
    }
];

const platformToolNames = {
    'B站': 'B站推流码获取工具',
    '抖音': '抖音推流码获取工具',
    '小红书': '小红书推流码获取工具',
    '快手': '快手推流码获取工具',
    'YouTube': 'YouTube推流码获取工具',
    'Twitch': 'Twitch推流码获取工具'
};

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

const platformUrls = {
    'B站': 'rtmp://live-push.bilivideo.com/live-bvc/',
    '抖音': 'rtmp://push-rtmp-13.douyincdn.com/third/',
    '小红书': 'rtmp://live-push.xhscdn.com/live/',
    '快手': 'rtmp://aliyun-open-push.voip.yximgs.com/gifshow/',
    'YouTube': 'rtmp://a.rtmp.youtube.com/live2/',
    'Twitch': 'rtmp://live.twitch.tv/app/'
};

// 监听平台选择变化
watch(selectedPlatform, (platform) => {
    streamUrl.value = platformUrls[platform] || '';
});

const router = useRouter();

function getStreamKey() {
    const platformRoutes = {
        'B站': '/bilibili',
        '抖音': '/douyin',
        '小红书': '/xiaohongshu',
        '快手': '/kuaishou',
        'YouTube': '/youtube',
        'Twitch': '/twitch'
    }[selectedPlatform.value];

    if (platformRoutes) {
        router.push(platformRoutes);
    } else {
        console.log('未找到对应平台的路由');
    }
}

async function testStream() {
    // 先打开Live2D页面
    window.open('/live2d', '_blank');

    let stream;
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    } catch (err) {
        ElMessage.error('用户取消了采集或浏览器不支持: ' + err)
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

        isLiveActive.value = true;

        // 不再自动断开，需用户手动关闭页面或刷新才会停止
    };

    ws.onerror = (e) => {
        ElMessage.error('WebSocket 连接失败: ' + e.message)
    };
}

function stopLive() {
    isLiveActive.value = false;
    // 这里可以添加更多停止直播的逻辑
}

// 监听来自BroadcastInterface.vue和BilibiliStream.vue的消息
onMounted(() => {
    window.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
        if (event.data.type === 'stopLive') {
            stopLive();
        } else if (event.data.type === 'updateStreamInfo') {
            console.log('Updating stream info:', event.data.server, event.data.code);
            streamUrl.value = event.data.server;
            streamKey.value = event.data.code;
            saveStreamPreferences();
        }
    });
});
</script>

<style scoped>
.platform-select {
    margin-bottom: 16px;
}

.platform-selector {
    width: 100%;
}

.platform-option {
    display: flex;
    align-items: center;
    padding: 8px;
}

.platform-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 8px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: middle;
}

/* Bilibili Logo */
.platform-icon.b站 {
    background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='7' y='14' width='34' height='25' rx='6' stroke='%2327BEF3' stroke-width='4'/%3E%3Cpath d='M31 25v2M17 25v2M29 14l5-5M19 14l-5-5' stroke='%2327BEF3' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}

/* Douyin Logo */
.platform-icon.抖音 {
    background-image: url("data:image/svg+xml,%3Csvg width='50' height='49' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 14a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8V14Z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M35 17a6 6 0 0 1-6-6h-5v18.5a3.5 3.5 0 1 1-3.5-3.5H22v-5h-1.5a8.5 8.5 0 1 0 8.5 8.5v-9.279A10.948 10.948 0 0 0 35 22h.5v-5H35Z' fill='%23FA1E5C'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M34 16a6 6 0 0 1-6-6h-5v18.5a3.5 3.5 0 1 1-3.5-3.5H21v-5h-1.5a8.5 8.5 0 1 0 8.5 8.5v-9.279A10.948 10.948 0 0 0 34 21h.5v-5H34Z' fill='%235FFDFF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M34.5 16.98a5.992 5.992 0 0 1-4.213-2.267A5.996 5.996 0 0 1 28.083 11H24v18.5a3.5 3.5 0 0 1-6.424 1.924A3.5 3.5 0 0 1 19.5 25H21v-4h-.5a8.5 8.5 0 0 0-6.49 13.99A8.5 8.5 0 0 0 28 28.5v-9.279A10.948 10.948 0 0 0 34 21h.5v-4.02Z' fill='%23fff'/%3E%3C/svg%3E");
}

/* Xiaohongshu Logo */
.platform-icon.小红书 {
    background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14 8H9V15H14V21H7V28H14V43H21V28H33.0312C33.9561 28 34 28.0733 34 29V35C34 35.9267 33.9561 36 33.0312 36H26V36C26 39.866 29.1653 43 33.0312 43V43C38 43 41 41 41 36V29C41 24 37 21 32 21V16C32 10.7488 28.2409 8 23 8H22C21.4477 8 21 7.55228 21 7V5H14V8ZM24 21C24.5523 21 25 20.5523 25 20V16C25 15.0733 24.6711 15 24 15H21V20C21 20.5523 21.4477 21 22 21H24Z' fill='%23FF2442'/%3E%3Cpath d='M41 10.5C41 12.433 39.433 14 37.5 14C36.5207 14 34 14 34 14C34 14 34 11.4537 34 10.5C34 8.567 35.567 7 37.5 7C39.433 7 41 8.567 41 10.5Z' fill='%23FF2442'/%3E%3C/svg%3E");
}

/* Kuaishou Logo */
.platform-icon.快手 {
    background-image: url("data:image/svg+xml,%3Csvg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M33.6765 23.7664C37.7981 23.7664 41.1373 27.0939 41.1373 31.1965V37.098C41.1373 41.2006 37.7981 44.5268 33.6765 44.5268H22.7047C21.1358 44.5293 19.606 44.0364 18.3329 43.1181C17.0597 42.1998 16.108 40.9028 15.613 39.4117L9.07648 42.6738C8.21875 43.1031 7.2263 43.1751 6.31579 42.874C5.40528 42.5729 4.65065 41.9233 4.21666 41.0669C3.96453 40.5659 3.83323 40.0126 3.83333 39.4515V28.8686C3.83333 26.8778 5.45469 25.2638 7.4537 25.2638C8.0216 25.2638 8.5824 25.396 9.08925 25.652L15.5974 28.9326C16.0845 27.4295 17.0349 26.1198 18.3119 25.1918C19.589 24.2637 21.1269 23.7652 22.7047 23.7678L33.6765 23.7664ZM33.6297 27.5917H22.8154C21.8393 27.5885 20.9011 27.9697 20.2031 28.6531C19.5051 29.3366 19.1033 30.2674 19.0843 31.2449V36.9871C19.0872 37.9644 19.4734 38.9015 20.1597 39.5963C20.8459 40.2911 21.7773 40.688 22.753 40.7015H33.5672C34.5428 40.7043 35.4805 40.3231 36.1781 39.64C36.8758 38.9569 37.2775 38.0266 37.2969 37.0497V31.306C37.294 30.3289 36.908 29.392 36.2221 28.6973C35.5361 28.0025 34.6051 27.6055 33.6297 27.5917ZM8.66049 29.8954C8.40257 29.8949 8.15477 29.9958 7.97028 30.1763C7.78579 30.3569 7.67933 30.6027 7.67376 30.8609V37.5132C7.67512 37.6803 7.71864 37.8444 7.80026 37.9901C7.88189 38.1359 7.99898 38.2585 8.14064 38.3468C8.2823 38.4351 8.44394 38.486 8.61054 38.4949C8.77713 38.5038 8.94327 38.4704 9.09351 38.3978L9.10913 38.3892L15.2439 35.2735V33.0694L9.10345 30.0006C8.96593 29.9316 8.81429 29.8956 8.66049 29.8954ZM17.7682 1.91667C19.5599 1.9139 21.32 2.38855 22.8681 3.29192C24.4162 4.19529 25.6965 5.49487 26.5778 7.05735C28.1818 5.57341 30.2862 4.7511 32.4697 4.75507C37.2572 4.75507 41.1373 8.62018 41.1373 13.3869C41.1373 18.1536 37.2572 22.0187 32.4697 22.0187C31.1058 22.0207 29.7606 21.7005 28.5435 21.084C27.3263 20.4675 26.2715 19.5722 25.4647 18.4707C24.515 19.5852 23.3349 20.4797 22.006 21.0923C20.677 21.7049 19.2311 22.021 17.7682 22.0187C12.1928 22.0187 7.67376 17.5179 7.67376 11.9662C7.67376 6.41459 12.1928 1.91667 17.7682 1.91667ZM17.7682 5.95811C14.4346 5.95811 11.7343 8.64862 11.7343 11.9677C11.7343 15.2867 14.4346 17.9772 17.7682 17.9772C21.1004 17.9772 23.8022 15.2867 23.8022 11.9677C23.8022 8.64862 21.1004 5.95811 17.7682 5.95811ZM32.4697 8.79936C31.8664 8.79767 31.2687 8.91503 30.7106 9.14474C30.1526 9.37444 29.6451 9.71199 29.2173 10.1381C28.7895 10.5642 28.4497 11.0706 28.2173 11.6283C27.9848 12.1859 27.8643 12.784 27.8626 13.3883C27.8643 13.9926 27.9848 14.5907 28.2173 15.1483C28.4497 15.706 28.7895 16.2123 29.2173 16.6385C29.6451 17.0646 30.1526 17.4021 30.7106 17.6318C31.2687 17.8615 31.8664 17.9789 32.4697 17.9772C33.0732 17.9791 33.6711 17.8619 34.2293 17.6322C34.7875 17.4026 35.2951 17.0651 35.7231 16.639C36.151 16.2128 36.491 15.7064 36.7235 15.1487C36.956 14.5909 37.0766 13.9927 37.0783 13.3883C37.0766 12.7839 36.956 12.1857 36.7235 11.6279C36.491 11.0702 36.151 10.5638 35.7231 10.1376C35.2951 9.71147 34.7875 9.37395 34.2293 9.14433C33.6711 8.91471 33.0732 8.79749 32.4697 8.79936Z' fill='%23FF3D13'/%3E%3C/svg%3E");
}

/* YouTube Logo */
.platform-icon.youtube {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 256 180'%3E%3Cpath fill='red' d='M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134'/%3E%3Cpath fill='%23FFF' d='m102.421 128.06l66.328-38.418l-66.328-38.418z'/%3E%3C/svg%3E");
}

/* Twitch Logo */
.platform-icon.twitch {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%239146FF' d='M391.2 103.5H352.5v109.7h38.7zM285 103H246.7v109.8H285zM120.8 0 24.3 91.4v329.2h115.9V512l96.5-91.4h77.3L487.7 256V0zm328.3 237.8l-77.2 73.1h-77.3l-67.6 64v-64h-87V36.6h309.1z'/%3E%3C/svg%3E");
}

.el-select-dropdown__item {
    padding: 0 !important;
}

.el-select-dropdown__item.selected {
    color: var(--el-color-primary);
}

.platform-option:hover {
    background-color: var(--el-select-option-hover-background);
}

:deep(.el-select) {
    width: 100%;
}

:deep(.el-select .el-input__wrapper) {
    background: linear-gradient(135deg, #e0e7ff 60%, #a5b4fc 100%);
    border: 1.5px solid #e7eaee;
    box-shadow: 0 1px 6px 0 rgba(163, 191, 250, 0.06);
    border-radius: 12px;
    padding: 8px 12px;
}

:deep(.el-select .el-input__wrapper.is-focus) {
    border-color: #a78bfa;
    box-shadow: 0 3px 16px 0 rgba(124, 58, 237, 0.18), 0 0 8px 0 #a78bfa55;
}

:deep(.el-select .el-input__wrapper:hover) {
    border-color: #6366f1;
    box-shadow: 0 2px 12px 0 rgba(124, 58, 237, 0.10);
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
    background: rgba(255, 255, 255, 0.13);
    padding: 3px 6px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08);
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