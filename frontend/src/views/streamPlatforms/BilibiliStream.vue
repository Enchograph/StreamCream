<template>
    <div class="page-container">
        <div class="container">
            <div class="header-section">
                <h1 class="main-title">
                    <span class="title-icon">📺</span>
                    B站推流码获取工具
                </h1>
                <p class="subtitle">专业的B站直播推流码获取和管理工具</p>
            </div>

            <div class="tabs-container">
                <div class="tabs">
                    <button v-for="tab in tabs" :key="tab.id" :class="['tab-button', { active: currentTab === tab.id }]"
                        @click="currentTab = tab.id">
                        <span class="tab-icon">{{ tab.id === 'account' ? '🔐' : '📡' }}</span>
                        {{ tab.name }}
                    </button>
                </div>
            </div>

            <!-- 账号设置 Tab -->
            <div v-if="currentTab === 'account'" class="tab-content">
                <div class="section">
                    <div class="cookie-auto-row">
                        <div class="cookie-block">
                            <h2>Cookies文件</h2>
                            <button class="btn primary" @click="loadCookiesFile">
                                <span class="btn-icon">📂</span>
                                使用Cookies文件
                            </button>
                        </div>
                        <div class="vertical-divider"></div>
                        <div class="auto-block">
                            <h2>自动获取</h2>
                            <button class="btn success" @click="autoGetAccount" :disabled="autoGetLoading">
                                <span class="btn-icon">{{ autoGetLoading ? '⏳' : '🔍' }}</span>
                                {{ autoGetLoading ? '获取中...' : '自动获取账号信息' }}
                            </button>
                            <p v-if="autoGetLoading" class="loading-text">获取中，请稍候...</p>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="section">
                    <h2>手动输入</h2>
                    <div class="form-group">
                        <label>Room ID:</label>
                        <input type="password" v-model="accountInfo.room_id" placeholder="请输入房间ID" />
                    </div>

                    <div class="form-group">
                        <label>Cookies:</label>
                        <input type="password" v-model="accountInfo.cookie_str" placeholder="请输入Cookies字符串" />
                    </div>

                    <div class="form-group">
                        <label>CSRF Token:</label>
                        <input type="password" v-model="accountInfo.csrf" placeholder="请输入CSRF Token" />
                    </div>

                    <button class="btn primary" @click="saveAccountSettings">
                        <span class="btn-icon">💾</span>
                        保存设置
                    </button>
                </div>

                <div class="help-section">
                    <button class="btn secondary" @click="showHelp">
                        <span class="btn-icon">📖</span>
                        查看使用说明
                    </button>
                </div>
            </div>

            <!-- 直播设置 Tab -->
            <div v-if="currentTab === 'live'" class="tab-content">
                <div class="section">
                    <h2>直播标题</h2>
                    <div class="form-row">
                        <label for="live-title">请输入直播标题:</label>
                        <input id="live-title" type="text" v-model="liveSettings.live_title" class="title-input" placeholder="输入直播标题" />
                        <button class="btn primary" @click="updateTitle">
                            <span class="btn-icon">🔄</span>
                            更新标题
                        </button>
                    </div>
                </div>

                <div class="section">
                    <h2>直播分区</h2>
                    <div class="form-row">
                        <label for="main-area">选择分区:</label>
                        <select id="main-area" v-model="liveSettings.selected_area" @change="updateSubPartitions" class="model-select">
                            <option value="">请选择分区</option>
                            <option v-for="area in mainAreas" :key="area" :value="area">{{ area }}</option>
                        </select>
                        <label for="sub-area" style="margin-left:24px;">选择子分区:</label>
                        <select id="sub-area" v-model="liveSettings.selected_sub_area" class="model-select">
                            <option value="">请选择子分区</option>
                            <option v-for="subArea in subAreas" :key="subArea" :value="subArea">{{ subArea }}</option>
                        </select>
                        <button class="btn primary" @click="updatePartition">
                            <span class="btn-icon">✅</span>
                            更新分区
                        </button>
                        <button class="btn secondary" @click="refreshPartitions">
                            <span class="btn-icon">🔄</span>
                            刷新分区
                        </button>
                    </div>
                </div>

                <div class="section">
                    <h2>发送弹幕</h2>
                    <div class="form-row">
                        <label for="bullet-input">输入弹幕内容:</label>
                        <input id="bullet-input" type="text" v-model="bulletMessage" class="bullet-input" placeholder="输入弹幕内容" />
                        <button class="btn success" @click="sendBullet">
                            <span class="btn-icon">📤</span>
                            发送弹幕
                        </button>
                    </div>
                </div>

                <button class="btn success pulse" @click="startLiveAndRedirect">
                    <span class="btn-icon">🎬</span>
                    开始直播
                </button>

                <div class="section">
                    <h2>操作日志</h2>
                    <div class="log-area">
                        <div v-for="(log, index) in logs" :key="index" class="log-entry">
                            <span class="log-time">{{ new Date().toLocaleTimeString() }}</span>
                            <span class="log-message">{{ log }}</span>
                        </div>
                        <div v-if="logs.length === 0" class="no-logs">
                            暂无操作日志
                        </div>
                    </div>
                </div>
            </div>

            <!-- 状态栏 -->
            <div class="status-bar">
                <div class="status-content">
                    <span class="status-icon">📊</span>
                    <span class="status-text">{{ statusMessage }}</span>
                </div>
            </div>
        </div>

        <!-- 二维码对话框 -->
        <el-dialog v-model="showQRCode" title="扫码登录" width="30%" class="qr-dialog">
            <div class="qr-container">
                <canvas ref="qrcodeCanvas" v-if="qrcodeUrl" class="qr-canvas"></canvas>
                <p class="qr-tip">请使用B站APP扫描二维码登录</p>
            </div>
        </el-dialog>

        <el-dialog v-model="showHelpDialog" title="使用说明" width="640px" class="help-dialog" :lock-scroll="false" :auto-focus="false">
            <div class="help-content">
                <pre>{{ helpContent }}</pre>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>

import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import QRCode from 'qrcode';


// API 基础 URL
const API_BASE = 'http://localhost:9701/api';

// 标签页管理
const tabs = [
    { id: 'account', name: '账号设置' },
    { id: 'live', name: '直播设置' }
];
const currentTab = ref('account');

// 状态和日志
const statusMessage = ref('就绪');
const logs = ref([]);

// 账号信息
const accountInfo = ref({
    room_id: '',
    cookie_str: '',
    csrf: ''
});
const autoGetLoading = ref(false);

// 直播设置
const liveSettings = ref({
    live_title: '我的B站直播',
    selected_area: '',
    selected_sub_area: ''
});
const partitionData = ref({});
const mainAreas = computed(() => Object.keys(partitionData.value));
const subAreas = ref([]);
const bulletMessage = ref('');

const showHelpDialog = ref(false);
const helpContent = `
【B站推流码获取工具使用说明】\n\n1. 账号设置：\n- 支持Cookies文件导入、自动扫码获取、手动输入三种方式。\n- 建议优先使用自动扫码，安全便捷。\n\n2. 直播设置：\n- 可设置直播标题、分区、子分区。\n- 支持一键发送弹幕、开始直播。\n\n3. 常见问题：\n- 若分区/子分区无法选择，请先刷新分区。\n- 若推流码获取失败，请检查Cookies或账号状态。\n\n4. 技术支持：\n如遇到无法解决的问题，请联系开发团队或查阅项目文档。\n`;

// 日志函数
function addLog(message) {
    // 限制日志数量以提高性能
    if (logs.value.length >= 50) {
        logs.value = logs.value.slice(0, 40);
    }
    logs.value.unshift(message);
    statusMessage.value = message;
    console.log(message);
}

// 账号设置相关函数
async function loadCookiesFile() {
    try {
        const response = await axios.get(`${API_BASE}/account`);
        if (response.data.success) {
            accountInfo.value = response.data.data;
            addLog('成功加载Cookies文件');
            currentTab.value = 'live';
        }
    } catch (error) {
        addLog(`加载Cookies文件失败: ${error.response?.data?.message || error.message}`);
    }
}

const qrcodeUrl = ref('');
const qrcodeCanvas = ref(null);

async function generateQRCode() {
    try {
        const response = await axios.get(`${API_BASE}/qrcode`);
        if (response.data.success) {
            qrcodeUrl.value = response.data.data.url;
            QRCode.toCanvas(qrcodeCanvas.value, qrcodeUrl.value, { width: 200 });
        }
    } catch (error) {
        addLog(`获取二维码失败: ${error.message}`);
    }
}

const showQRCode = ref(false);

async function autoGetAccount() {
    autoGetLoading.value = true;

    // 检查是否已有cookies
    if (!accountInfo.value.cookie_str) {
        showQRCode.value = true;
        await generateQRCode();
    }

    try {
        const response = await axios.get(`${API_BASE}/account/auto`);
        if (response.data.success) {
            accountInfo.value.room_id = response.data.data.room_id;
            // 敏感信息不直接显示，但已保存到服务器
            addLog('账号信息获取成功');
            currentTab.value = 'live';
        }
    } catch (error) {
        addLog(`获取账号信息失败: ${error.response?.data?.message || error.message}`);
    } finally {
        autoGetLoading.value = false;
    }
}

async function saveAccountSettings() {
    if (!accountInfo.value.room_id || !accountInfo.value.cookie_str || !accountInfo.value.csrf) {
        addLog('请填写所有账号信息字段');
        return;
    }

    try {
        const response = await axios.post(`${API_BASE}/account`, accountInfo.value);
        if (response.data.success) {
            addLog('账号信息保存成功');
            currentTab.value = 'live';
        }
    } catch (error) {
        addLog(`保存账号信息失败: ${error.response?.data?.message || error.message}`);
    }
}

// 直播设置相关函数
function updateSubPartitions() {
    const area = liveSettings.value.selected_area;
    if (area && partitionData.value[area]) {
        subAreas.value = Object.values(partitionData.value[area]);
        if (subAreas.value.length > 0) {
            liveSettings.value.selected_sub_area = subAreas.value[0];
        }
    } else {
        subAreas.value = [];
    }
}

async function loadPartitionData() {
    try {
        const response = await axios.get(`${API_BASE}/partitions`);
        if (response.data.success) {
            partitionData.value = response.data.data;
            updateSubPartitions();
        }
    } catch (error) {
        addLog(`加载分区数据失败: ${error.response?.data?.message || error.message}`);
    }
}

async function refreshPartitions() {
    addLog('正在获取直播分区...');
    try {
        const response = await axios.post(`${API_BASE}/partitions/refresh`);
        if (response.data.success) {
            partitionData.value = response.data.data;
            updateSubPartitions();
            addLog('直播分区获取成功');
        }
    } catch (error) {
        addLog(`获取直播分区失败: ${error.response?.data?.message || error.message}`);
    }
}

async function updateTitle() {
    if (!liveSettings.value.live_title) {
        addLog('请填写直播标题');
        return;
    }

    addLog('正在更新直播标题...');
    try {
        const response = await axios.post(`${API_BASE}/title/update`, {
            title: liveSettings.value.live_title
        });
        if (response.data.success) {
            addLog('直播标题已更新');
        }
    } catch (error) {
        addLog(`更新直播标题失败: ${error.response?.data?.message || error.message}`);
    }
}

async function updatePartition() {
    if (!liveSettings.value.selected_area || !liveSettings.value.selected_sub_area) {
        addLog('请选择直播分区');
        return;
    }

    addLog('正在更新直播分区...');
    try {
        const response = await axios.post(`${API_BASE}/partition/update`, {
            main_area: liveSettings.value.selected_area,
            sub_area: liveSettings.value.selected_sub_area
        });
        if (response.data.success) {
            addLog('直播分区已更新');
        }
    } catch (error) {
        addLog(`更新直播分区失败: ${error.response?.data?.message || error.message}`);
    }
}

async function sendBullet() {
    if (!bulletMessage.value.trim()) {
        addLog('请输入弹幕内容');
        return;
    }

    try {
        const response = await axios.post(`${API_BASE}/bullet/send`, {
            message: bulletMessage.value
        });
        if (response.data.success) {
            addLog(`弹幕发送成功: ${bulletMessage.value}`);
            bulletMessage.value = ''; // 清空输入
        }
    } catch (error) {
        addLog(`发送弹幕失败: ${error.response?.data?.message || error.message}`);
    }
}

import { useRouter } from 'vue-router';

const router = useRouter();

const startLiveAndRedirect = async () => {
    await startLive();
    router.push('/mainPage');
};

const streamInfo = ref({
    server: '',
    code: ''
});
const isLiveActive = ref(false);

async function startLive() {
    if (!liveSettings.value.live_title) {
        addLog('请设置直播标题');
        return;
    }

    if (!liveSettings.value.selected_area || !liveSettings.value.selected_sub_area) {
        addLog('请选择直播分区');
        return;
    }

    if (isLiveActive.value) {
        addLog('正在进行直播！');
        return;
    }

    addLog('正在开始直播...');
    try {
        const response = await axios.post(`${API_BASE}/live/start`, {
            title: liveSettings.value.live_title,
            main_area: liveSettings.value.selected_area,
            sub_area: liveSettings.value.selected_sub_area
        });

        if (response.data.success) {
            streamInfo.value.server = response.data.data.server;
            streamInfo.value.code = response.data.data.code;
            addLog('直播已开启！请使用推流码进行直播');
            isLiveActive.value = true;

            // 自动填充推流码到streamConfig.vue
            console.log('Sending stream info to parent:', response.data.data.server, response.data.data.code);
            window.parent.postMessage({
                type: 'updateStreamInfo',
                server: response.data.data.server,
                code: response.data.data.code
            }, '*');
        }
    } catch (error) {
        addLog(`开始直播失败: ${error.response?.data?.message || error.message}`);
    }
}

// 推流信息相关函数
async function stopLive() {
    if (!isLiveActive.value) {
        addLog('没有正在进行的直播！');
        return;
    }

    addLog('正在停止直播...');
    try {
        const response = await axios.post(`${API_BASE}/live/stop`);
        if (response.data.success) {
            streamInfo.value.server = '';
            streamInfo.value.code = '';
            addLog('直播已停止！');
            currentTab.value = 'live';
        }
    } catch (error) {
        addLog(`停止直播失败: ${error.response?.data?.message || error.message}`);
    }
}

function copyServer() {
    if (streamInfo.value.server) {
        navigator.clipboard.writeText(streamInfo.value.server);
        addLog('已复制服务器地址到剪贴板');
    }
}

function copyCode() {
    if (streamInfo.value.code) {
        navigator.clipboard.writeText(streamInfo.value.code);
        addLog('已复制推流码到剪贴板');
    }
}

function exportToDesktop() {
    if (!streamInfo.value.server || !streamInfo.value.code) {
        addLog('没有可导出的推流信息！');
        return;
    }

    downloadStreamInfo('桌面');
}

function exportToFile() {
    if (!streamInfo.value.server || !streamInfo.value.code) {
        addLog('没有可导出的推流信息！');
        return;
    }

    downloadStreamInfo('文件');
}

function downloadStreamInfo(type) {
    const url = `${API_BASE}/export?server=${encodeURIComponent(streamInfo.value.server)}&code=${encodeURIComponent(streamInfo.value.code)}`;

    // 创建一个隐藏的 a 标签并触发下载
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    addLog(`推流信息已导出到${type}`);
}

function showHelp() {
    showHelpDialog.value = true;
}

// 初始化
async function loadSettings() {
    try {
        const response = await axios.get(`${API_BASE}/settings`);
        if (response.data.success) {
            liveSettings.value = response.data.data;
        }
    } catch (error) {
        addLog(`加载设置失败: ${error.response?.data?.message || error.message}`);
    }
}

async function loadLogs() {
    try {
        const response = await axios.get(`${API_BASE}/logs`);
        if (response.data.success) {
            logs.value = response.data.data;
        }
    } catch (error) {
        console.error('加载日志失败:', error);
    }
}

// 监听标签页变化
watch(currentTab, async (newTab) => {
    if (newTab === 'live') {
        await loadPartitionData();
    }
});

// 组件挂载时执行
onMounted(async () => {
    addLog('B站推流码获取工具已初始化');
    
    // 并行加载数据以提高性能
    await Promise.all([
        loadSettings(),
        loadPartitionData(),
        loadLogs()
    ]);

    // 每60秒刷新一次日志（减少频率）
    setInterval(loadLogs, 60000);
});
</script>

<style scoped>
.page-container {
    min-height: 100vh;
    width: 100vw;
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100vw !important;
    background: linear-gradient(270deg, #e0e7ff, #86a8e7, #91eac9, #f5f7fa, #e0e7ff);
    background-size: 200% 200%;
    animation: gradientFlow 8s ease-in-out infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
}

@keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.container {
    max-width: 1000px;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    flex-direction: column;
}

/* 头部区域 */
.header-section {
    text-align: center;
    margin-bottom: 30px;
}

.main-title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.title-icon {
    font-size: 2rem;
}

.subtitle {
    font-size: 1.1rem;
    color: #666;
    font-weight: 400;
}

/* 标签页容器 */
.tabs-container {
    margin-bottom: 30px;
}

.tabs {
    display: flex;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.5);
    gap: 8px;
}

.tab-button {
    flex: 1;
    padding: 12px 0; /* 减小左右内边距，避免高亮时变宽 */
    background: transparent;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: #666;
    transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    min-width: 120px;
    box-sizing: border-box;
    /* 移除overflow:hidden，避免动画溢出 */
}

.tab-button.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.18); /* 更小更柔和的阴影 */
    z-index: 1;
    /* 不增加padding，不改变宽度 */
}

.tab-button:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.08);
    transform: translateY(-1px);
}

.tab-button:active {
    background: rgba(102, 126, 234, 0.15);
}

.tab-icon {
    font-size: 1.2rem;
}

/* 内容区域 */
.tab-content {
    flex: 1;
}

/* 区块样式 */
.section {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.2s ease;
}

.section:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.section h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #667eea, transparent);
    margin: 30px 0;
    opacity: 0.3;
}

/* 表单样式 */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-weight: 600;
    font-size: 0.95rem;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    font-size: 14px;
    background: #f8f9fa;
    transition: all 0.2s ease;
    font-family: inherit;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
}

.form-group input:hover,
.form-group select:hover {
    border-color: #bdc3c7;
    background: white;
}

.form-group.with-button {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 15px;
    align-items: end;
}

.form-group.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    align-items: end;
}

/* 选择框样式 */
.model-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 40px;
}

/* 按钮样式 */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    min-height: 44px;
    white-space: nowrap;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.3s ease;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:hover::before {
    left: 100%;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}

.btn:disabled:hover {
    transform: none !important;
    box-shadow: none !important;
}

.btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn.primary:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

.btn.success {
    background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
    color: white;
}

.btn.success:hover {
    background: linear-gradient(135deg, #5daf34 0%, #73c25a 100%);
}

.btn.secondary {
    background: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
}

.btn.secondary:hover {
    background: #e9ecef;
    color: #333;
}

.btn.pulse {
    animation: pulse 3s infinite;
    margin: 20px 0;
    width: 100%;
    font-size: 16px;
    padding: 15px 30px;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(103, 194, 58, 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(103, 194, 58, 0); }
    100% { box-shadow: 0 0 0 0 rgba(103, 194, 58, 0); }
}

.btn-icon {
    font-size: 16px;
    transition: transform 0.2s ease;
}

.btn:hover .btn-icon {
    transform: scale(1.05);
}

/* 帮助区域 */
.help-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

/* 日志区域 */
.log-area {
    background: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    padding: 15px;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid rgba(0, 0, 0, 0.08);
    scroll-behavior: smooth;
}

.log-entry {
    padding: 8px 12px;
    margin-bottom: 8px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    font-size: 0.9rem;
    border-left: 3px solid #667eea;
    display: flex;
    align-items: center;
    gap: 10px;
}

.log-time {
    color: #999;
    font-size: 0.8rem;
    min-width: 80px;
    flex-shrink: 0;
}

.log-message {
    color: #333;
    flex: 1;
    word-break: break-word;
}

.no-logs {
    text-align: center;
    color: #999;
    font-style: italic;
    padding: 20px;
}

/* 加载文本 */
.loading-text {
    color: #e6a23c;
    margin-top: 10px;
    font-style: italic;
    text-align: center;
}

/* 状态栏 */
.status-bar {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 15px 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-top: 20px;
}

.status-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.status-icon {
    font-size: 1.2rem;
    color: #667eea;
    flex-shrink: 0;
}

.status-text {
    color: #333;
    font-weight: 500;
    word-break: break-word;
}

/* 二维码对话框 */
.qr-dialog {
    border-radius: 15px;
}

.qr-container {
    text-align: center;
    padding: 20px;
}

.qr-canvas {
    border: 2px solid #e1e8ed;
    border-radius: 12px;
    margin-bottom: 15px;
    max-width: 100%;
    height: auto;
}

.qr-tip {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .container {
        padding: 20px;
        margin: 10px;
    }
    
    .main-title {
        font-size: 2rem;
    }
    
    .form-group.with-button,
    .form-group.grid {
        grid-template-columns: 1fr;
    }
    
    .tabs {
        flex-direction: column;
        gap: 4px;
    }
    
    .tab-button {
        min-width: 0;
        width: 100%;
        padding: 10px 0;
    }
    
    .btn-icon {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .page-container {
        padding: 10px;
    }
    
    .container {
        padding: 15px;
    }
    
    .main-title {
        font-size: 1.8rem;
        flex-direction: column;
        gap: 10px;
    }
    
    .section {
        padding: 20px;
    }
    
    .section h2 {
        font-size: 1.2rem;
    }
}

/* 性能优化 */
* {
    box-sizing: border-box;
}

/* 优化滚动性能 */
.log-area {
    -webkit-overflow-scrolling: touch;
}

/* 减少动画复杂度 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

.form-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
    flex-wrap: wrap;
    border: 1px solid #b3c0d1;
    border-radius: 14px;
    background: #fafdff;
    padding: 18px 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(102,126,234,0.03);
}
.form-row label {
    font-weight: bold;
    min-width: 90px;
    margin-bottom: 0;
    white-space: nowrap;
}
.form-row input,
.form-row select {
    flex: 1 1 0%;
    min-width: 120px;
    max-width: 100%;
    border: 1px solid #b3c0d1;
    border-radius: 8px;
    background: #fff;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 8px 14px;
    font-size: 1rem;
}
.form-row input:focus,
.form-row select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102,126,234,0.12);
    outline: none;
}
.form-row button {
    margin-left: 18px;
    flex-shrink: 0;
}
@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }
    .form-row label {
        min-width: 0;
    }
    .form-row input,
    .form-row select {
        max-width: 100%;
    }
    .form-row button {
        margin-left: 0;
    }
}

.help-dialog ::v-deep .el-dialog {
    border-radius: 22px;
    box-shadow: 0 8px 32px rgba(102,126,234,0.18);
    background: linear-gradient(135deg, #fafdff 80%, #e0e7ff 100%);
    padding-bottom: 8px;
}
.help-dialog ::v-deep .el-dialog__header {
    border-bottom: none;
    padding: 24px 28px 10px 28px;
    text-align: center;
}
.help-dialog ::v-deep .el-dialog__title {
    font-size: 1.35rem;
    font-weight: 700;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.help-dialog ::v-deep .el-dialog__close {
    font-size: 1.3rem;
    color: #667eea;
    transition: color 0.2s;
}
.help-dialog ::v-deep .el-dialog__close:hover {
    color: #764ba2;
}
.help-dialog ::v-deep .el-dialog__body {
    padding: 22px 32px 18px 32px;
    max-height: 520px;
    overflow-y: auto;
    background: rgba(255,255,255,0.92);
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(102,126,234,0.06);
}
.help-content {
    font-size: 1.08rem;
    color: #333;
    line-height: 1.8;
    white-space: pre-wrap;
    font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}

.cookie-auto-row {
    display: flex;
    align-items: stretch;
    gap: 0;
}
.cookie-block, .auto-block {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 18px 0;
}
.cookie-block h2, .auto-block h2 {
    font-size: 1.18rem;
    font-weight: 700;
    margin-bottom: 18px;
    color: #2c3e50;
}
.vertical-divider {
    width: 1.5px;
    background: linear-gradient(180deg, #e0e7ff 0%, #b3c0d1 100%);
    margin: 0 32px;
    border-radius: 2px;
    min-height: 80px;
    align-self: center;
}
@media (max-width: 900px) {
    .cookie-auto-row {
        flex-direction: column;
        gap: 18px;
    }
    .vertical-divider {
        width: 100%;
        height: 1.5px;
        min-height: 0;
        margin: 24px 0;
        background: linear-gradient(90deg, #e0e7ff 0%, #b3c0d1 100%);
    }
}
</style>

<style>
body .help-dialog .el-dialog {
    border-radius: 22px !important;
    box-shadow: 0 8px 32px rgba(102,126,234,0.18) !important;
    background: linear-gradient(135deg, #fafdff 80%, #e0e7ff 100%) !important;
    padding-bottom: 8px !important;
}
body .help-dialog .el-dialog__header {
    border-bottom: none !important;
    padding: 24px 28px 10px 28px !important;
    text-align: center !important;
}
body .help-dialog .el-dialog__title {
    font-size: 1.35rem !important;
    font-weight: 700 !important;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
}
body .help-dialog .el-dialog__close {
    font-size: 1.3rem !important;
    color: #667eea !important;
    transition: color 0.2s !important;
}
body .help-dialog .el-dialog__close:hover {
    color: #764ba2 !important;
}
body .help-dialog .el-dialog__body {
    padding: 22px 32px 18px 32px !important;
    max-height: 520px !important;
    overflow-y: auto !important;
    background: rgba(255,255,255,0.92) !important;
    border-radius: 16px !important;
    box-shadow: 0 2px 8px rgba(102,126,234,0.06) !important;
}
body .help-dialog .help-content {
    font-size: 1.08rem !important;
    color: #333 !important;
    line-height: 1.8 !important;
    white-space: pre-wrap !important;
    font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif !important;
}
</style>
