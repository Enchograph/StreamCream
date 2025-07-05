<template>
    <div class="bili-live-tool">
        <h1 class="header">B站推流码获取工具</h1>

        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.id" :class="['tab-button', { active: currentTab === tab.id }]"
                @click="currentTab = tab.id">
                {{ tab.name }}
            </button>
        </div>

        <!-- 账号设置 Tab -->
        <div v-if="currentTab === 'account'" class="tab-content">
            <div class="section">
                <h2>Cookies文件</h2>
                <button class="button" @click="loadCookiesFile">使用Cookies文件</button>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2>自动获取</h2>
                <button class="button green" @click="autoGetAccount">自动获取账号信息</button>
                <p v-if="autoGetLoading" class="loading">获取中，请稍候...</p>
                <el-dialog v-model="showQRCode" title="扫码登录" width="30%">
                    <canvas ref="qrcodeCanvas" v-if="qrcodeUrl"></canvas>
                </el-dialog>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2>手动输入</h2>
                <div class="form-group">
                    <label>Room ID:</label>
                    <input type="password" v-model="accountInfo.room_id" />
                </div>

                <div class="form-group">
                    <label>Cookies:</label>
                    <input type="password" v-model="accountInfo.cookie_str" />
                </div>

                <div class="form-group">
                    <label>CSRF Token:</label>
                    <input type="password" v-model="accountInfo.csrf" />
                </div>

                <button class="button" @click="saveAccountSettings">保存设置</button>
            </div>

            <div class="help-section">
                <button class="button" @click="showHelp">查看使用说明</button>
            </div>
        </div>

        <!-- 直播设置 Tab -->
        <div v-if="currentTab === 'live'" class="tab-content">
            <div class="section">
                <h2>直播标题</h2>
                <div class="form-group with-button">
                    <label>请输入直播标题:</label>
                    <input type="text" v-model="liveSettings.live_title" class="title-input" />
                    <button class="button" @click="updateTitle">更新标题</button>
                </div>
            </div>

            <div class="section">
                <h2>直播分区</h2>
                <div class="form-group grid">
                    <label>选择分区:</label>
                    <select v-model="liveSettings.selected_area" @change="updateSubPartitions">
                        <option v-for="area in mainAreas" :key="area" :value="area">{{ area }}</option>
                    </select>

                    <label>选择子分区:</label>
                    <select v-model="liveSettings.selected_sub_area">
                        <option v-for="subArea in subAreas" :key="subArea" :value="subArea">{{ subArea }}</option>
                    </select>

                    <button class="button" @click="updatePartition">更新分区</button>
                    <button class="button" @click="refreshPartitions">刷新分区</button>
                </div>
            </div>

            <div class="section">
                <h2>发送弹幕</h2>
                <div class="form-group with-button">
                    <label>输入弹幕内容:</label>
                    <input type="text" v-model="bulletMessage" class="bullet-input" />
                    <button class="button" @click="sendBullet">发送弹幕</button>
                </div>
            </div>

            <button class="button green wide" @click="startLiveAndRedirect">开始直播</button>

            <div class="section">
                <h2>操作日志</h2>
                <div class="log-area">
                    <div v-for="(log, index) in logs" :key="index" class="log-entry">
                        {{ log }}
                    </div>
                </div>
            </div>
        </div>



        <!-- 状态栏 -->
        <div class="status-bar">
            {{ statusMessage }}
        </div>
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



// 日志函数
function addLog(message) {
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

const startLiveAndRedirect = async () => {
    await startLive();
    router.push('/mainPage');
};

import { useRouter } from 'vue-router';

const streamInfo = ref({
    server: '',
    code: ''
});
const isLiveActive = ref(false);
const router = useRouter();

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
    window.open('https://download.chacewebsite.cn/uploads/使用说明.txt', '_blank');
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
    } else if (newTab === 'result' && !isLiveActive.value) {
        // 如果切换到推流信息页，但没有直播，则切回直播设置页
        setTimeout(() => {
            if (!isLiveActive.value) {
                currentTab.value = 'live';
            }
        }, 100);
    }
});

// 组件挂载时执行
onMounted(async () => {
    addLog('B站推流码获取工具已初始化');
    await loadSettings();
    await loadPartitionData();
    await loadLogs();

    // 每30秒刷新一次日志
    setInterval(loadLogs, 30000);
});
</script>

<style scoped>
.bili-live-tool {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Microsoft YaHei', sans-serif;
    color: #333;
    background-color: #f5f5f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    text-align: center;
    color: #00a1d6;
    font-size: 24px;
    margin-bottom: 30px;
}

.tabs {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
}

.tab-button {
    padding: 10px 20px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-size: 16px;
    color: #666;
    transition: all 0.3s;
}

.tab-button:hover {
    color: #00a1d6;
}

.tab-button.active {
    color: #00a1d6;
    border-bottom-color: #00a1d6;
    font-weight: bold;
}

.tab-content {
    flex: 1;
}

.section {
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section h2 {
    font-size: 16px;
    margin: 0 0 15px;
    color: #00a1d6;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
}

.divider {
    height: 1px;
    background-color: #eee;
    margin: 20px 0;
}

.form-group {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

.form-group label {
    width: 120px;
    font-size: 14px;
}

.form-group input,
.form-group select {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.form-group.with-button {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 10px;
    align-items: center;
}

.form-group.grid {
    display: grid;
    grid-template-columns: 120px 1fr 120px 1fr auto auto;
    gap: 10px;
    align-items: center;
}

.button {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
}

.button:hover {
    background-color: #e0e0e0;
}

.button.green {
    background-color: #67c23a;
    color: white;
    border-color: #67c23a;
}

.button.green:hover {
    background-color: #5daf34;
}

.button.red {
    background-color: #f56c6c;
    color: white;
    border-color: #f56c6c;
}

.button.red:hover {
    background-color: #e45656;
}

.button.wide {
    width: 100%;
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
}

.button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.6;
}

.log-area {
    height: 200px;
    overflow-y: auto;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px;
    background-color: #fafafa;
    font-family: monospace;
    font-size: 12px;
}

.log-entry {
    padding: 3px 0;
    border-bottom: 1px solid #f0f0f0;
}

.title-input,
.bullet-input,
.stream-input {
    width: 100%;
}

.export-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
}

.status-bar {
    margin-top: 20px;
    padding: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
}

.loading {
    color: #e6a23c;
    margin-top: 5px;
    font-style: italic;
}

.help-section {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
}
</style>
