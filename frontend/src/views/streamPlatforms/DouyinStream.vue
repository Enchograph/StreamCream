<template>
    <div class="page-container">
        <div class="container">
            <div class="header-section">
                <h1 class="main-title">
                    <span class="title-icon">
                        <svg width="50" height="49" fill="none" xmlns="http://www.w3.org/2000/svg" class="douyin-logo">
                            <path d="M6 14a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8V14Z" fill="#000"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35 17a6 6 0 0 1-6-6h-5v18.5a3.5 3.5 0 1 1-3.5-3.5H22v-5h-1.5a8.5 8.5 0 1 0 8.5 8.5v-9.279A10.948 10.948 0 0 0 35 22h.5v-5H35Z" fill="#FA1E5C"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M34 16a6 6 0 0 1-6-6h-5v18.5a3.5 3.5 0 1 1-3.5-3.5H21v-5h-1.5a8.5 8.5 0 1 0 8.5 8.5v-9.279A10.948 10.948 0 0 0 34 21h.5v-5H34Z" fill="#5FFDFF"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.5 16.98a5.992 5.992 0 0 1-4.213-2.267A5.996 5.996 0 0 1 28.083 11H24v18.5a3.5 3.5 0 0 1-6.424 1.924A3.5 3.5 0 0 1 19.5 25H21v-4h-.5a8.5 8.5 0 0 0-6.49 13.99A8.5 8.5 0 0 0 28 28.5v-9.279A10.948 10.948 0 0 0 34 21h.5v-4.02Z" fill="#fff"/>
                        </svg>
                    </span>
                    抖音直播推流工具
                </h1>
                <p class="subtitle">专业的抖音直播推流码获取和管理工具</p>
            </div>

            <div class="tabs-container">
                <div class="tabs">
                    <button v-for="tab in tabs" :key="tab.id" :class="['tab-button', { active: currentTab === tab.id }]"
                        @click="currentTab = tab.id">
                        <span class="tab-icon">{{ tab.id === 'account' ? '🔐' : tab.id === 'live' ? '📡' : '📊' }}</span>
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
                        <label>Session ID:</label>
                        <input type="password" v-model="accountInfo.session_id" placeholder="请输入Session ID" />
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
                    <h2>直播分类</h2>
                    <div class="form-row">
                        <label for="main-category">选择分类:</label>
                        <select id="main-category" v-model="liveSettings.selected_category" @change="updateSubCategories" class="model-select">
                            <option value="">请选择分类</option>
                            <option v-for="category in mainCategories" :key="category" :value="category">{{ category }}</option>
                        </select>
                        <label for="sub-category" style="margin-left:24px;">选择子分类:</label>
                        <select id="sub-category" v-model="liveSettings.selected_sub_category" class="model-select">
                            <option value="">请选择子分类</option>
                            <option v-for="subCategory in subCategories" :key="subCategory" :value="subCategory">{{ subCategory }}</option>
                        </select>
                        <button class="btn primary" @click="updateCategory">
                            <span class="btn-icon">✅</span>
                            更新分类
                        </button>
                        <button class="btn secondary" @click="refreshCategories">
                            <span class="btn-icon">🔄</span>
                            刷新分类
                        </button>
                    </div>
                </div>

                <div class="section">
                    <h2>发送评论</h2>
                    <div class="form-row">
                        <label for="comment-input">输入评论内容:</label>
                        <input id="comment-input" type="text" v-model="commentMessage" class="comment-input" placeholder="输入评论内容" />
                        <button class="btn success" @click="sendComment">
                            <span class="btn-icon">📤</span>
                            发送评论
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
                        <div v-for="(log, index) in logs" :key="index" :class="['log-entry', `log-${log.type}`]">
                            <span class="log-time">{{ log.timeString }}</span>
                            <span class="log-icon">{{ getLogIcon(log.type) }}</span>
                            <span class="log-message">{{ log.message }}</span>
                        </div>
                        <div v-if="logs.length === 0" class="no-logs">
                            暂无操作日志
                        </div>
                    </div>
                    <div class="log-actions">
                        <button class="btn secondary small" @click="clearLogs">
                            <span class="btn-icon">🗑️</span>
                            清空日志
                        </button>
                        <button class="btn secondary small" @click="exportLogs">
                            <span class="btn-icon">📄</span>
                            导出日志
                        </button>
                    </div>
                </div>
            </div>

            <!-- 推流信息 Tab -->
            <div v-if="currentTab === 'stream'" class="tab-content">
                <div class="section">
                    <h2>推流信息</h2>
                    <div class="stream-info">
                        <div class="form-group">
                            <label>推流地址:</label>
                            <div class="input-with-copy">
                                <input type="text" v-model="streamInfo.server" readonly class="stream-input" />
                                <button class="btn copy-btn" @click="copyServer">
                                    <span class="btn-icon">📋</span>
                                    复制
                                </button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>推流密钥:</label>
                            <div class="input-with-copy">
                                <input type="text" v-model="streamInfo.code" readonly class="stream-input" />
                                <button class="btn copy-btn" @click="copyCode">
                                    <span class="btn-icon">📋</span>
                                    复制
                                </button>
                            </div>
                        </div>

                        <div class="export-buttons">
                            <button class="btn secondary" @click="exportToDesktop">
                                <span class="btn-icon">💾</span>
                                导出到桌面
                            </button>
                            <button class="btn secondary" @click="exportToFile">
                                <span class="btn-icon">📄</span>
                                导出到文件
                            </button>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h2>直播控制</h2>
                    <div class="control-buttons">
                        <button class="btn danger" @click="stopLive">
                            <span class="btn-icon">⏹️</span>
                            停止直播
                        </button>
                        <button class="btn secondary" @click="refreshStreamInfo">
                            <span class="btn-icon">🔄</span>
                            刷新推流信息
                        </button>
                    </div>
                </div>
            </div>

            <!-- 状态栏 -->
            <div class="status-bar">
                <div class="status-content">
                    <span class="status-icon">📊</span>
                    <span class="status-text">{{ statusMessage }}</span>
                </div>
                <div class="status-actions">
                    <button class="btn secondary small" @click="startTutorial" v-if="hasShownTutorial">
                        <span class="btn-icon">🎓</span>
                        重新教程
                    </button>
                    <button class="btn secondary small" @click="showQuickActions = !showQuickActions">
                        <span class="btn-icon">⚡</span>
                        快捷操作
                    </button>
                </div>
            </div>

            <!-- 智能提示 -->
            <div v-if="showSmartTip" class="smart-tip">
                <span class="tip-icon">💡</span>
                <span class="tip-text">{{ currentTip }}</span>
                <button class="tip-close" @click="showSmartTip = false">×</button>
            </div>
        </div>

        <!-- 二维码对话框 -->
        <el-dialog v-model="showQRCode" title="扫码登录" width="30%" class="qr-dialog">
            <div class="qr-container">
                <canvas ref="qrcodeCanvas" v-if="qrcodeUrl" class="qr-canvas"></canvas>
                <p class="qr-tip">请使用抖音APP扫描二维码登录</p>
                <div class="qr-steps">
                    <div class="step">
                        <span class="step-number">1</span>
                        <span>打开抖音APP</span>
                    </div>
                    <div class="step">
                        <span class="step-number">2</span>
                        <span>点击右上角"+"号</span>
                    </div>
                    <div class="step">
                        <span class="step-number">3</span>
                        <span>选择"扫一扫"</span>
                    </div>
                    <div class="step">
                        <span class="step-number">4</span>
                        <span>扫描上方二维码</span>
                    </div>
                </div>
            </div>
        </el-dialog>

        <!-- 帮助对话框 -->
        <el-dialog v-model="showHelpDialog" title="使用说明" width="640px" class="help-dialog" :lock-scroll="false" :auto-focus="false">
            <div class="help-content">
                <pre>{{ helpContent }}</pre>
            </div>
        </el-dialog>

        <!-- 新手引导遮罩 -->
        <div v-if="showTutorial" class="tutorial-overlay" @click="closeTutorial">
            <div class="tutorial-content" @click.stop>
                <div class="tutorial-step" v-if="tutorialStep === 1">
                    <h3>欢迎使用抖音直播推流工具！</h3>
                    <p>让我来帮你快速上手这个工具</p>
                    <button class="btn primary" @click="nextTutorialStep">开始教程</button>
                </div>
                <div class="tutorial-step" v-if="tutorialStep === 2">
                    <h3>第一步：账号设置</h3>
                    <p>首先需要设置你的抖音账号信息</p>
                    <div class="tutorial-highlight" style="top: 120px; left: 50%; transform: translateX(-50%);">
                        <div class="highlight-arrow"></div>
                    </div>
                    <button class="btn primary" @click="nextTutorialStep">下一步</button>
                </div>
                <div class="tutorial-step" v-if="tutorialStep === 3">
                    <h3>第二步：直播设置</h3>
                    <p>设置直播标题和分类</p>
                    <button class="btn primary" @click="nextTutorialStep">下一步</button>
                </div>
                <div class="tutorial-step" v-if="tutorialStep === 4">
                    <h3>第三步：开始直播</h3>
                    <p>获取推流信息并开始直播</p>
                    <button class="btn primary" @click="finishTutorial">完成教程</button>
                </div>
            </div>
        </div>

        <!-- 快捷操作面板 -->
        <div class="quick-actions" v-if="showQuickActions">
            <div class="quick-action-item" @click="quickAction('copyStreamInfo')">
                <span class="action-icon">📋</span>
                <span>复制推流信息</span>
            </div>
            <div class="quick-action-item" @click="quickAction('exportInfo')">
                <span class="action-icon">💾</span>
                <span>导出配置</span>
            </div>
            <div class="quick-action-item" @click="quickAction('refreshData')">
                <span class="action-icon">🔄</span>
                <span>刷新数据</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import axios from 'axios';
import QRCode from 'qrcode';
import { useRouter } from 'vue-router';

// API 基础 URL
const API_BASE = 'http://localhost:9702/api';

// 标签页管理
const tabs = [
    { id: 'account', name: '账号设置' },
    { id: 'live', name: '直播设置' },
    { id: 'stream', name: '推流信息' }
];
const currentTab = ref('account');

// 状态和日志
const statusMessage = ref('就绪');
const logs = ref([]);

// 账号信息
const accountInfo = ref({
    room_id: '',
    cookie_str: '',
    session_id: ''
});
const autoGetLoading = ref(false);

// 直播设置
const liveSettings = ref({
    live_title: '我的抖音直播',
    selected_category: '',
    selected_sub_category: ''
});
const categoryData = ref({});
const mainCategories = computed(() => Object.keys(categoryData.value));
const subCategories = ref([]);
const commentMessage = ref('');

// 推流信息
const streamInfo = ref({
    server: '',
    code: ''
});
const isLiveActive = ref(false);
const router = useRouter();

// 二维码相关
const qrcodeUrl = ref('');
const qrcodeCanvas = ref(null);
const showQRCode = ref(false);

// 帮助对话框
const showHelpDialog = ref(false);
const helpContent = `
【抖音直播推流工具使用说明】\n\n1. 账号设置：\n- 支持Cookies文件导入、自动扫码获取、手动输入三种方式。\n- 建议优先使用自动扫码，安全便捷。\n\n2. 直播设置：\n- 可设置直播标题、分类、子分类。\n- 支持一键发送评论、开始直播。\n\n3. 推流信息：\n- 获取推流地址和推流密钥。\n- 支持一键复制和导出功能。\n\n4. 常见问题：\n- 若分类/子分类无法选择，请先刷新分类。\n- 若推流信息获取失败，请检查Cookies或账号状态。\n\n5. 技术支持：\n如遇到无法解决的问题，请联系开发团队或查阅项目文档。\n`;

// 新手引导相关
const showTutorial = ref(false);
const tutorialStep = ref(1);
const hasShownTutorial = ref(localStorage.getItem('douyin_tutorial_shown') === 'true');

// 快捷操作面板
const showQuickActions = ref(false);

// 智能提示系统
const smartTips = ref([]);
const showSmartTip = ref(false);
const currentTip = ref('');

// 操作历史
const operationHistory = ref([]);
const maxHistoryLength = 10;

// 日志函数
function addLog(message, type = 'info') {
    const timestamp = new Date();
    const logEntry = {
        message,
        type,
        timestamp,
        timeString: timestamp.toLocaleTimeString()
    };
    
    // 限制日志数量以提高性能
    if (logs.value.length >= 50) {
        logs.value = logs.value.slice(0, 40);
    }
    logs.value.unshift(logEntry);
    statusMessage.value = message;
    
    // 添加到操作历史
    addToHistory(message, type);
    
    // 智能提示
    checkSmartTip(message, type);
    
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// 添加到操作历史
function addToHistory(message, type) {
    const historyEntry = {
        message,
        type,
        timestamp: new Date(),
        tab: currentTab.value
    };
    
    operationHistory.value.unshift(historyEntry);
    if (operationHistory.value.length > maxHistoryLength) {
        operationHistory.value = operationHistory.value.slice(0, maxHistoryLength);
    }
}

// 智能提示检查
function checkSmartTip(message, type) {
    const tips = {
        'error': [
            '遇到错误？试试刷新页面或重新登录',
            '检查网络连接是否正常',
            '确认账号信息是否正确'
        ],
        'success': [
            '操作成功！可以继续下一步',
            '推流信息已获取，可以开始直播了'
        ],
        'warning': [
            '建议先完成账号设置',
            '请确保选择了正确的直播分类'
        ]
    };
    
    if (tips[type] && Math.random() < 0.3) { // 30%概率显示提示
        currentTip.value = tips[type][Math.floor(Math.random() * tips[type].length)];
        showSmartTip.value = true;
        setTimeout(() => {
            showSmartTip.value = false;
        }, 4000);
    }
}

// 账号设置相关函数
async function loadCookiesFile() {
    try {
        const response = await axios.get(`${API_BASE}/account`);
        if (response.data.success) {
            accountInfo.value = response.data.data;
            addLog('成功加载Cookies文件', 'success');
            currentTab.value = 'live';
        }
    } catch (error) {
        addLog(`加载Cookies文件失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

async function generateQRCode() {
    try {
        const response = await axios.get(`${API_BASE}/qrcode`);
        if (response.data.success) {
            qrcodeUrl.value = response.data.data.url;
            QRCode.toCanvas(qrcodeCanvas.value, qrcodeUrl.value, { width: 200 });
        }
    } catch (error) {
        addLog(`获取二维码失败: ${error.message}`, 'error');
    }
}

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
            addLog('账号信息获取成功', 'success');
            currentTab.value = 'live';
        }
    } catch (error) {
        addLog(`获取账号信息失败: ${error.response?.data?.message || error.message}`, 'error');
    } finally {
        autoGetLoading.value = false;
    }
}

async function saveAccountSettings() {
    if (!accountInfo.value.room_id || !accountInfo.value.cookie_str || !accountInfo.value.session_id) {
        addLog('请填写所有账号信息字段', 'warning');
        return;
    }

    try {
        const response = await axios.post(`${API_BASE}/account`, accountInfo.value);
        if (response.data.success) {
            addLog('账号信息保存成功', 'success');
            currentTab.value = 'live';
        }
    } catch (error) {
        addLog(`保存账号信息失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

// 直播设置相关函数
function updateSubCategories() {
    const category = liveSettings.value.selected_category;
    if (category && categoryData.value[category]) {
        subCategories.value = Object.values(categoryData.value[category]);
        if (subCategories.value.length > 0) {
            liveSettings.value.selected_sub_category = subCategories.value[0];
        }
    } else {
        subCategories.value = [];
    }
}

async function loadCategoryData() {
    try {
        const response = await axios.get(`${API_BASE}/categories`);
        if (response.data.success) {
            categoryData.value = response.data.data;
            updateSubCategories();
            addLog('分类数据加载成功', 'success');
        }
    } catch (error) {
        addLog(`加载分类数据失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

async function refreshCategories() {
    addLog('正在获取直播分类...');
    try {
        const response = await axios.post(`${API_BASE}/categories/refresh`);
        if (response.data.success) {
            categoryData.value = response.data.data;
            updateSubCategories();
            addLog('直播分类获取成功', 'success');
        }
    } catch (error) {
        addLog(`获取直播分类失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

async function updateTitle() {
    if (!liveSettings.value.live_title) {
        addLog('请填写直播标题', 'warning');
        return;
    }

    addLog('正在更新直播标题...');
    try {
        const response = await axios.post(`${API_BASE}/title/update`, {
            title: liveSettings.value.live_title
        });
        if (response.data.success) {
            addLog('直播标题已更新', 'success');
        }
    } catch (error) {
        addLog(`更新直播标题失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

async function updateCategory() {
    if (!liveSettings.value.selected_category || !liveSettings.value.selected_sub_category) {
        addLog('请选择直播分类', 'warning');
        return;
    }

    addLog('正在更新直播分类...');
    try {
        const response = await axios.post(`${API_BASE}/category/update`, {
            main_category: liveSettings.value.selected_category,
            sub_category: liveSettings.value.selected_sub_category
        });
        if (response.data.success) {
            addLog('直播分类已更新', 'success');
        }
    } catch (error) {
        addLog(`更新直播分类失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

async function sendComment() {
    if (!commentMessage.value.trim()) {
        addLog('请输入评论内容', 'warning');
        return;
    }

    try {
        const response = await axios.post(`${API_BASE}/comment/send`, {
            message: commentMessage.value
        });
        if (response.data.success) {
            addLog(`评论发送成功: ${commentMessage.value}`, 'success');
            commentMessage.value = ''; // 清空输入
        }
    } catch (error) {
        addLog(`发送评论失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

const startLiveAndRedirect = async () => {
    await startLive();
    router.push('/mainPage');
};

async function startLive() {
    if (!liveSettings.value.live_title) {
        addLog('请设置直播标题', 'warning');
        return;
    }

    if (!liveSettings.value.selected_category || !liveSettings.value.selected_sub_category) {
        addLog('请选择直播分类', 'warning');
        return;
    }

    if (isLiveActive.value) {
        addLog('正在进行直播！', 'warning');
        return;
    }

    addLog('正在开始直播...');
    try {
        const response = await axios.post(`${API_BASE}/live/start`, {
            title: liveSettings.value.live_title,
            main_category: liveSettings.value.selected_category,
            sub_category: liveSettings.value.selected_sub_category
        });

        if (response.data.success) {
            streamInfo.value.server = response.data.data.server;
            streamInfo.value.code = response.data.data.code;
            addLog('直播已开启！请使用推流信息进行直播', 'success');
            isLiveActive.value = true;
            currentTab.value = 'stream';

            // 自动填充推流信息到streamConfig.vue
            console.log('Sending stream info to parent:', response.data.data.server, response.data.data.code);
            window.parent.postMessage({
                type: 'updateStreamInfo',
                server: response.data.data.server,
                code: response.data.data.code
            }, '*');
        }
    } catch (error) {
        addLog(`开始直播失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

// 推流信息相关函数
async function stopLive() {
    if (!isLiveActive.value) {
        addLog('没有正在进行的直播！', 'warning');
        return;
    }

    addLog('正在停止直播...');
    try {
        const response = await axios.post(`${API_BASE}/live/stop`);
        if (response.data.success) {
            streamInfo.value.server = '';
            streamInfo.value.code = '';
            addLog('直播已停止！', 'success');
            isLiveActive.value = false;
            currentTab.value = 'live';
        }
    } catch (error) {
        addLog(`停止直播失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

function copyServer() {
    if (streamInfo.value.server) {
        navigator.clipboard.writeText(streamInfo.value.server);
        addLog('已复制推流地址到剪贴板', 'success');
    }
}

function copyCode() {
    if (streamInfo.value.code) {
        navigator.clipboard.writeText(streamInfo.value.code);
        addLog('已复制推流密钥到剪贴板', 'success');
    }
}

function exportToDesktop() {
    if (!streamInfo.value.server || !streamInfo.value.code) {
        addLog('没有可导出的推流信息！', 'warning');
        return;
    }

    downloadStreamInfo('桌面');
}

function exportToFile() {
    if (!streamInfo.value.server || !streamInfo.value.code) {
        addLog('没有可导出的推流信息！', 'warning');
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
    a.download = 'douyin_stream_info.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    addLog(`推流信息已导出到${type}`, 'success');
}

async function refreshStreamInfo() {
    try {
        const response = await axios.get(`${API_BASE}/stream/info`);
        if (response.data.success) {
            streamInfo.value = response.data.data;
            addLog('推流信息已刷新', 'success');
        }
    } catch (error) {
        addLog(`刷新推流信息失败: ${error.response?.data?.message || error.message}`, 'error');
    }
}

function showHelp() {
    showHelpDialog.value = true;
}

// 新手引导相关函数
function startTutorial() {
    showTutorial.value = true;
    tutorialStep.value = 1;
}

function nextTutorialStep() {
    tutorialStep.value++;
}

function closeTutorial() {
    showTutorial.value = false;
}

function finishTutorial() {
    showTutorial.value = false;
    localStorage.setItem('douyin_tutorial_shown', 'true');
    hasShownTutorial.value = true;
    addLog('新手引导已完成', 'success');
}

// 快捷操作
function quickAction(action) {
    switch (action) {
        case 'copyStreamInfo':
            if (streamInfo.value.server && streamInfo.value.code) {
                const info = `推流地址: ${streamInfo.value.server}\n推流密钥: ${streamInfo.value.code}`;
                navigator.clipboard.writeText(info);
                addLog('推流信息已复制到剪贴板', 'success');
            } else {
                addLog('没有可复制的推流信息', 'warning');
            }
            break;
        case 'exportInfo':
            exportToFile();
            break;
        case 'refreshData':
            refreshCategories();
            refreshStreamInfo();
            addLog('数据已刷新', 'success');
            break;
    }
    showQuickActions.value = false;
}

// 键盘快捷键
function handleKeydown(event) {
    // Ctrl/Cmd + K 显示快捷操作
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        showQuickActions.value = !showQuickActions.value;
    }
    
    // Ctrl/Cmd + H 显示帮助
    if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
        event.preventDefault();
        showHelp();
    }
    
    // Ctrl/Cmd + R 刷新数据
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        quickAction('refreshData');
    }
}

// 初始化
async function loadSettings() {
    try {
        const response = await axios.get(`${API_BASE}/settings`);
        if (response.data.success) {
            liveSettings.value = response.data.data;
        }
    } catch (error) {
        addLog(`加载设置失败: ${error.response?.data?.message || error.message}`, 'error');
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
        addLog('加载历史日志失败', 'error');
    }
}

// 监听标签页变化
watch(currentTab, async (newTab) => {
    if (newTab === 'live') {
        await loadCategoryData();
    } else if (newTab === 'stream' && !isLiveActive.value) {
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
    addLog('抖音直播推流工具已初始化', 'success');
    await loadSettings();
    await loadCategoryData();
    await loadLogs();

    // 每30秒刷新一次日志
    setInterval(loadLogs, 30000);
    
    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeydown);
    
    // 检查是否需要显示新手引导
    if (!hasShownTutorial.value) {
        setTimeout(() => {
            startTutorial();
        }, 1000);
    }
    
    // 显示快捷键提示
    setTimeout(() => {
        addLog('💡 提示：按 Ctrl+K 打开快捷操作面板', 'info');
    }, 3000);
});

// 获取日志图标
function getLogIcon(type) {
    const icons = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

// 清空日志
function clearLogs() {
    logs.value = [];
    addLog('日志已清空', 'info');
}

// 导出日志
function exportLogs() {
    const logText = logs.value.map(log => 
        `[${log.timeString}] [${log.type.toUpperCase()}] ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `douyin_logs_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    addLog('日志已导出', 'success');
}

// 组件卸载时清理
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* 页面容器 */
.page-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    font-family: 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    overflow: hidden;
}

/* 头部区域 */
.header-section {
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    color: white;
    padding: 40px 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.header-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.main-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 10px 0;
    position: relative;
    z-index: 1;
}

.title-icon {
    margin-right: 15px;
    display: flex;
    align-items: center;
    animation: float 3s ease-in-out infinite;
}

.douyin-logo {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;
}

.title-icon:hover .douyin-logo {
    transform: scale(1.1);
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
}

.subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
    position: relative;
    z-index: 1;
}

/* 标签页容器 */
.tabs-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.tabs {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 600px;
    margin: 0 auto;
}

.tab-button {
    flex: 1;
    padding: 20px 30px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.tab-button::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background: white;
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.tab-button:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
}

.tab-button.active {
    color: white;
    background: rgba(255, 255, 255, 0.2);
}

.tab-button.active::before {
    width: 80%;
}

.tab-icon {
    font-size: 1.2rem;
}

/* 内容区域 */
.tab-content {
    padding: 30px;
    min-height: 500px;
}

.section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.section:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.section h2 {
    font-size: 1.3rem;
    margin: 0 0 20px 0;
    color: #fe2c55;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
}

.section h2::before {
    content: '';
    width: 4px;
    height: 20px;
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    border-radius: 2px;
}

/* Cookie和自动获取行 */
.cookie-auto-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 30px;
    align-items: start;
}

.cookie-block,
.auto-block {
    text-align: center;
}

.vertical-divider {
    width: 2px;
    background: linear-gradient(to bottom, transparent, #ddd, transparent);
    height: 100px;
    margin: 0 auto;
}

/* 表单样式 */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8f9fa;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #fe2c55;
    background: white;
    box-shadow: 0 0 0 3px rgba(254, 44, 85, 0.1);
}

.form-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 15px;
    align-items: center;
    margin-bottom: 20px;
}

.form-row label {
    margin: 0;
    white-space: nowrap;
    font-weight: 600;
    color: #333;
}

.title-input,
.comment-input,
.stream-input,
.model-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8f9fa;
}

.title-input:focus,
.comment-input:focus,
.stream-input:focus,
.model-select:focus {
    outline: none;
    border-color: #fe2c55;
    background: white;
    box-shadow: 0 0 0 3px rgba(254, 44, 85, 0.1);
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
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    color: white;
}

.btn.primary:hover {
    background: linear-gradient(135deg, #e6254a 0%, #e55a8a 100%);
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

.btn.danger {
    background: linear-gradient(135deg, #f56c6c 0%, #f78989 100%);
    color: white;
}

.btn.danger:hover {
    background: linear-gradient(135deg, #e45656 0%, #e57575 100%);
}

.btn.pulse {
    animation: pulse 3s infinite;
    margin: 20px 0;
    width: 100%;
    font-size: 16px;
    padding: 15px 30px;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(254, 44, 85, 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(254, 44, 85, 0); }
    100% { box-shadow: 0 0 0 0 rgba(254, 44, 85, 0); }
}

.btn-icon {
    font-size: 16px;
    transition: transform 0.2s ease;
}

.btn:hover .btn-icon {
    transform: scale(1.05);
}

/* 分隔线 */
.divider {
    height: 1px;
    background: linear-gradient(to right, transparent, #ddd, transparent);
    margin: 30px 0;
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
    border-left: 3px solid #fe2c55;
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
    margin: 20px 30px 30px 30px;
}

.status-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.status-icon {
    font-size: 1.2rem;
    color: #fe2c55;
    flex-shrink: 0;
}

.status-text {
    color: #333;
    font-weight: 500;
    word-break: break-word;
}

/* 推流信息样式 */
.stream-info {
    background: rgba(254, 44, 85, 0.05);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(254, 44, 85, 0.1);
}

.input-with-copy {
    display: flex;
    gap: 10px;
    align-items: center;
}

.input-with-copy input {
    flex: 1;
}

.copy-btn {
    white-space: nowrap;
    min-width: 80px;
}

.export-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.control-buttons {
    display: flex;
    gap: 15px;
    margin-top: 20px;
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
}

.qr-tip {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
}

/* 帮助对话框 */
.help-dialog {
    border-radius: 15px;
}

.help-content {
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
}

.help-content pre {
    white-space: pre-wrap;
    font-family: 'Microsoft YaHei', monospace;
    line-height: 1.6;
    color: #333;
    margin: 0;
}

/* 新手引导样式 */
.tutorial-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.tutorial-content {
    background: white;
    border-radius: 20px;
    padding: 40px;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    position: relative;
}

.tutorial-step h3 {
    color: #fe2c55;
    margin-bottom: 15px;
    font-size: 1.5rem;
}

.tutorial-step p {
    color: #666;
    margin-bottom: 25px;
    line-height: 1.6;
}

.tutorial-highlight {
    position: absolute;
    width: 200px;
    height: 100px;
    border: 3px solid #fe2c55;
    border-radius: 10px;
    background: rgba(254, 44, 85, 0.1);
    animation: pulse 2s infinite;
}

.highlight-arrow {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #fe2c55;
}

/* 快捷操作面板 */
.quick-actions {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
}

.quick-action-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    margin-bottom: 8px;
}

.quick-action-item:hover {
    background: #f8f9fa;
    transform: translateX(5px);
}

.action-icon {
    font-size: 1.2rem;
}

/* 智能提示 */
.smart-tip {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(254, 44, 85, 0.3);
    z-index: 1001;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 300px;
    animation: slideInRight 0.3s ease;
}

.tip-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
}

.tip-text {
    flex: 1;
    font-size: 0.9rem;
    line-height: 1.4;
}

.tip-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s ease;
}

.tip-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* 状态栏增强 */
.status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status-actions {
    display: flex;
    gap: 10px;
}

.btn.small {
    padding: 8px 16px;
    font-size: 12px;
    min-height: 32px;
}

/* 日志增强 */
.log-entry {
    display: flex;
    align-items: center;
    gap: 10px;
}

.log-icon {
    font-size: 1rem;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
}

.log-success {
    border-left-color: #67c23a;
    background: rgba(103, 194, 58, 0.05);
}

.log-error {
    border-left-color: #f56c6c;
    background: rgba(245, 108, 108, 0.05);
}

.log-warning {
    border-left-color: #e6a23c;
    background: rgba(230, 162, 60, 0.05);
}

.log-info {
    border-left-color: #409eff;
    background: rgba(64, 158, 255, 0.05);
}

.log-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    justify-content: flex-end;
}

/* 二维码步骤 */
.qr-steps {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.step {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 0.9rem;
}

.step-number {
    background: white;
    color: #fe2c55;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
}

/* 动画 */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translate(-50%, -60%);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .page-container {
        padding: 10px;
    }
    
    .main-title {
        font-size: 2rem;
    }
    
    .tab-content {
        padding: 20px;
    }
    
    .cookie-auto-row {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .vertical-divider {
        display: none;
    }
    
    .form-row {
        grid-template-columns: 1fr;
        gap: 10px;
    }
    
    .export-buttons,
    .control-buttons {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
    }
    
    .status-bar {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }
    
    .status-actions {
        justify-content: center;
    }
    
    .smart-tip {
        left: 20px;
        right: 20px;
        max-width: none;
    }
    
    .tutorial-content {
        margin: 20px;
        padding: 30px 20px;
    }
    
    .qr-steps {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .main-title {
        font-size: 1.8rem;
    }
    
    .title-icon {
        margin-right: 10px;
    }
    
    .douyin-logo {
        width: 40px;
        height: 39px;
    }
    
    .subtitle {
        font-size: 1rem;
    }
    
    .tab-button {
        padding: 15px 20px;
        font-size: 0.9rem;
    }
    
    .section {
        padding: 20px;
    }
    
    .quick-actions {
        width: 90%;
        max-width: 300px;
    }
}
</style>