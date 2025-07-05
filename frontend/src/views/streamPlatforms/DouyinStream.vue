<template>
    <div class="page-container">
        <!-- 背景装饰 -->
        <div class="bg-decoration">
            <div class="floating-shape shape-1"></div>
            <div class="floating-shape shape-2"></div>
            <div class="floating-shape shape-3"></div>
            <div class="floating-shape shape-4"></div>
        </div>

        <div class="main-container">
            <!-- 顶部导航栏 -->
            <nav class="top-nav">
                <div class="nav-brand">
                    <div class="logo-container">
                        <svg width="40" height="39" fill="none" xmlns="http://www.w3.org/2000/svg" class="douyin-logo">
                            <path d="M6 14a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8V14Z" fill="#000"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35 17a6 6 0 0 1-6-6h-5v18.5a3.5 3.5 0 1 1-3.5-3.5H22v-5h-1.5a8.5 8.5 0 1 0 8.5 8.5v-9.279A10.948 10.948 0 0 0 35 22h.5v-5H35Z" fill="#FA1E5C"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M34 16a6 6 0 0 1-6-6h-5v18.5a3.5 3.5 0 1 1-3.5-3.5H21v-5h-1.5a8.5 8.5 0 1 0 8.5 8.5v-9.279A10.948 10.948 0 0 0 34 21h.5v-5H34Z" fill="#5FFDFF"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.5 16.98a5.992 5.992 0 0 1-4.213-2.267A5.996 5.996 0 0 1 28.083 11H24v18.5a3.5 3.5 0 0 1-6.424 1.924A3.5 3.5 0 0 1 19.5 25H21v-4h-.5a8.5 8.5 0 0 0-6.49 13.99A8.5 8.5 0 0 0 28 28.5v-9.279A10.948 10.948 0 0 0 34 21h.5v-4.02Z" fill="#fff"/>
                        </svg>
                    </div>
                    <div class="brand-text">
                        <h1 class="brand-title">抖音直播推流工具</h1>
                        <p class="brand-subtitle">专业的直播推流码获取与管理平台</p>
                    </div>
                </div>
                <div class="nav-actions">
                    <button class="nav-btn" @click="showHelp">
                        <span class="nav-btn-icon">📖</span>
                        帮助
                    </button>
                    <button class="nav-btn" @click="showQuickActions = !showQuickActions">
                        <span class="nav-btn-icon">⚡</span>
                        快捷操作
                    </button>
                    <button class="nav-btn" @click="startTutorial">
                        <span class="nav-btn-icon">🎓</span>
                        教程
                    </button>
                    <button class="nav-btn" @click="resetTutorial" title="重置教程状态">
                        <span class="nav-btn-icon">🔄</span>
                        重置教程
                    </button>
                </div>
            </nav>

            <!-- 标签页导航 -->
            <div class="tab-navigation">
                <div class="tab-list">
                    <button v-for="tab in tabs" :key="tab.id" 
                        :class="['tab-item', { active: currentTab === tab.id }]"
                        @click="currentTab = tab.id">
                        <div class="tab-content">
                            <span class="tab-icon">{{ tab.icon }}</span>
                            <div class="tab-info">
                                <span class="tab-name">{{ tab.name }}</span>
                                <span class="tab-desc">{{ tab.description }}</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <!-- 主内容区域 -->
            <main class="main-content">
                <!-- 账号设置 Tab -->
                <div v-if="currentTab === 'account'" class="content-panel">
                    <div class="panel-header">
                        <h2 class="panel-title">
                            <span class="title-icon">🔐</span>
                            账号设置
                        </h2>
                        <p class="panel-subtitle">配置您的抖音账号信息，支持多种登录方式</p>
                    </div>

                    <div class="panel-grid">
                        <!-- Cookies文件导入 -->
                        <div class="feature-card">
                            <div class="card-header">
                                <div class="card-icon">📂</div>
                                <h3>Cookies文件导入</h3>
                            </div>
                            <p class="card-desc">从本地文件导入Cookies信息</p>
                            <button class="card-btn primary" @click="loadCookiesFile">
                                <span class="btn-icon">📂</span>
                                选择文件
                            </button>
                        </div>

                        <!-- 自动获取 -->
                        <div class="feature-card">
                            <div class="card-header">
                                <div class="card-icon">🔍</div>
                                <h3>自动获取</h3>
                            </div>
                            <p class="card-desc">通过扫码自动获取账号信息</p>
                            <button class="card-btn success" @click="autoGetAccount" :disabled="autoGetLoading">
                                <span class="btn-icon">{{ autoGetLoading ? '⏳' : '🔍' }}</span>
                                {{ autoGetLoading ? '获取中...' : '开始获取' }}
                            </button>
                            <div v-if="autoGetLoading" class="loading-indicator">
                                <div class="spinner"></div>
                                <span>正在获取账号信息...</span>
                            </div>
                        </div>
                    </div>

                    <!-- 手动输入表单 -->
                    <div class="form-section">
                        <div class="section-header">
                            <h3>手动输入</h3>
                            <p>如果您已有账号信息，可以直接输入</p>
                        </div>
                        
                        <div class="form-grid">
                            <div class="form-field">
                                <label class="field-label">房间ID</label>
                                <input type="password" v-model="accountInfo.room_id" 
                                    class="field-input" placeholder="请输入房间ID" />
                            </div>
                            
                            <div class="form-field">
                                <label class="field-label">Cookies</label>
                                <input type="password" v-model="accountInfo.cookie_str" 
                                    class="field-input" placeholder="请输入Cookies字符串" />
                            </div>
                            
                            <div class="form-field">
                                <label class="field-label">Session ID</label>
                                <input type="password" v-model="accountInfo.session_id" 
                                    class="field-input" placeholder="请输入Session ID" />
                            </div>
                        </div>

                        <div class="form-actions">
                            <button class="action-btn primary" @click="saveAccountSettings">
                                <span class="btn-icon">💾</span>
                                保存设置
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 直播设置 Tab -->
                <div v-if="currentTab === 'live'" class="content-panel">
                    <div class="panel-header">
                        <h2 class="panel-title">
                            <span class="title-icon">📡</span>
                            直播设置
                        </h2>
                        <p class="panel-subtitle">配置直播标题、分类和互动功能</p>
                    </div>

                    <!-- 直播标题设置 -->
                    <div class="setting-section">
                        <div class="section-header">
                            <h3>直播标题</h3>
                            <p>设置您的直播标题</p>
                        </div>
                        <div class="input-group">
                            <input type="text" v-model="liveSettings.live_title" 
                                class="modern-input" placeholder="输入直播标题" />
                            <button class="action-btn primary" @click="updateTitle">
                                <span class="btn-icon">🔄</span>
                                更新标题
                            </button>
                        </div>
                    </div>

                    <!-- 直播分类设置 -->
                    <div class="setting-section">
                        <div class="section-header">
                            <h3>直播分类</h3>
                            <p>选择适合的直播分类</p>
                        </div>
                        <div class="category-grid">
                            <div class="select-group">
                                <label class="select-label">主分类</label>
                                <select v-model="liveSettings.selected_category" @change="updateSubCategories" class="modern-select">
                                    <option value="">请选择分类</option>
                                    <option v-for="category in mainCategories" :key="category" :value="category">{{ category }}</option>
                                </select>
                            </div>
                            <div class="select-group">
                                <label class="select-label">子分类</label>
                                <select v-model="liveSettings.selected_sub_category" class="modern-select">
                                    <option value="">请选择子分类</option>
                                    <option v-for="subCategory in subCategories" :key="subCategory" :value="subCategory">{{ subCategory }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="action-group">
                            <button class="action-btn primary" @click="updateCategory">
                                <span class="btn-icon">✅</span>
                                更新分类
                            </button>
                            <button class="action-btn secondary" @click="refreshCategories">
                                <span class="btn-icon">🔄</span>
                                刷新分类
                            </button>
                        </div>
                    </div>

                    <!-- 评论发送 -->
                    <div class="setting-section">
                        <div class="section-header">
                            <h3>发送评论</h3>
                            <p>与观众互动</p>
                        </div>
                        <div class="input-group">
                            <input type="text" v-model="commentMessage" 
                                class="modern-input" placeholder="输入评论内容" />
                            <button class="action-btn success" @click="sendComment">
                                <span class="btn-icon">📤</span>
                                发送评论
                            </button>
                        </div>
                    </div>

                    <!-- 开始直播按钮 -->
                    <div class="live-action">
                        <button class="live-btn" @click="startLiveAndRedirect">
                            <span class="live-icon">🎬</span>
                            <span class="live-text">开始直播</span>
                        </button>
                    </div>

                    <!-- 操作日志 -->
                    <div class="log-section">
                        <div class="section-header">
                            <h3>操作日志</h3>
                            <div class="log-actions">
                                <button class="action-btn small secondary" @click="clearLogs">
                                    <span class="btn-icon">🗑️</span>
                                    清空
                                </button>
                                <button class="action-btn small secondary" @click="exportLogs">
                                    <span class="btn-icon">📄</span>
                                    导出
                                </button>
                            </div>
                        </div>
                        <div class="log-container">
                            <div v-for="(log, index) in logs" :key="index" :class="['log-item', `log-${log.type}`]">
                                <span class="log-time">{{ log.timeString }}</span>
                                <span class="log-icon">{{ getLogIcon(log.type) }}</span>
                                <span class="log-message">{{ log.message }}</span>
                            </div>
                            <div v-if="logs.length === 0" class="empty-log">
                                <span class="empty-icon">📝</span>
                                <span>暂无操作日志</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 推流信息 Tab -->
                <div v-if="currentTab === 'stream'" class="content-panel">
                    <div class="panel-header">
                        <h2 class="panel-title">
                            <span class="title-icon">📊</span>
                            推流信息
                        </h2>
                        <p class="panel-subtitle">获取和管理您的直播推流信息</p>
                    </div>

                    <!-- 推流信息展示 -->
                    <div class="stream-info-section">
                        <div class="info-card">
                            <div class="card-header">
                                <h3>推流地址</h3>
                                <button class="copy-btn" @click="copyServer">
                                    <span class="btn-icon">📋</span>
                                    复制
                                </button>
                            </div>
                            <div class="info-value">{{ streamInfo.server || '暂无推流地址' }}</div>
                        </div>

                        <div class="info-card">
                            <div class="card-header">
                                <h3>推流密钥</h3>
                                <button class="copy-btn" @click="copyCode">
                                    <span class="btn-icon">📋</span>
                                    复制
                                </button>
                            </div>
                            <div class="info-value">{{ streamInfo.code || '暂无推流密钥' }}</div>
                        </div>
                    </div>

                    <!-- 导出选项 -->
                    <div class="export-section">
                        <div class="section-header">
                            <h3>导出选项</h3>
                            <p>将推流信息保存到本地</p>
                        </div>
                        <div class="export-actions">
                            <button class="action-btn secondary" @click="exportToDesktop">
                                <span class="btn-icon">💾</span>
                                导出到桌面
                            </button>
                            <button class="action-btn secondary" @click="exportToFile">
                                <span class="btn-icon">📄</span>
                                导出到文件
                            </button>
                        </div>
                    </div>

                    <!-- 直播控制 -->
                    <div class="control-section">
                        <div class="section-header">
                            <h3>直播控制</h3>
                            <p>管理直播状态</p>
                        </div>
                        <div class="control-actions">
                            <button class="action-btn danger" @click="stopLive">
                                <span class="btn-icon">⏹️</span>
                                停止直播
                            </button>
                            <button class="action-btn secondary" @click="refreshStreamInfo">
                                <span class="btn-icon">🔄</span>
                                刷新推流信息
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <!-- 状态栏 -->
            <div class="status-bar">
                <div class="status-content">
                    <span class="status-icon">📊</span>
                    <span class="status-text">{{ statusMessage }}</span>
                </div>
                <div class="status-actions">
                    <button class="nav-btn small" @click="startTutorial">
                        <span class="nav-btn-icon">🎓</span>
                        教程
                    </button>
                    <button class="nav-btn small" @click="resetTutorial" title="重置教程状态">
                        <span class="nav-btn-icon">🔄</span>
                        重置
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
                    <button class="action-btn primary" @click="nextTutorialStep">开始教程</button>
                </div>
                <div class="tutorial-step" v-if="tutorialStep === 2">
                    <h3>第一步：账号设置</h3>
                    <p>首先需要设置你的抖音账号信息，支持多种登录方式</p>
                    <div class="tutorial-highlight" style="top: 120px; left: 50%; transform: translateX(-50%);">
                        <div class="highlight-arrow"></div>
                    </div>
                    <button class="action-btn primary" @click="nextTutorialStep">下一步</button>
                </div>
                <div class="tutorial-step" v-if="tutorialStep === 3">
                    <h3>第二步：直播设置</h3>
                    <p>设置直播标题、分类和互动功能</p>
                    <button class="action-btn primary" @click="nextTutorialStep">下一步</button>
                </div>
                <div class="tutorial-step" v-if="tutorialStep === 4">
                    <h3>第三步：开始直播</h3>
                    <p>获取推流信息并开始直播</p>
                    <button class="action-btn primary" @click="finishTutorial">完成教程</button>
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
    { 
        id: 'account', 
        name: '账号设置', 
        icon: '🔐',
        description: '账号登录与认证'
    },
    { 
        id: 'live', 
        name: '直播设置', 
        icon: '📡',
        description: '直播配置与管理'
    },
    { 
        id: 'stream', 
        name: '推流信息', 
        icon: '📊',
        description: '推流码获取与导出'
    }
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

// 调试教程状态
console.log('教程状态:', {
    hasShownTutorial: hasShownTutorial.value,
    showTutorial: showTutorial.value,
    tutorialStep: tutorialStep.value
});

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
    console.log('开始教程');
    showTutorial.value = true;
    tutorialStep.value = 1;
    addLog('教程已开始', 'info');
}

function nextTutorialStep() {
    console.log('下一步教程，当前步骤:', tutorialStep.value);
    tutorialStep.value++;
    if (tutorialStep.value > 4) {
        finishTutorial();
    }
}

function closeTutorial() {
    console.log('关闭教程');
    showTutorial.value = false;
    addLog('教程已关闭', 'info');
}

function finishTutorial() {
    console.log('完成教程');
    showTutorial.value = false;
    localStorage.setItem('douyin_tutorial_shown', 'true');
    hasShownTutorial.value = true;
    addLog('新手引导已完成', 'success');
}

function resetTutorial() {
    console.log('重置教程状态');
    localStorage.removeItem('douyin_tutorial_shown');
    hasShownTutorial.value = false;
    showTutorial.value = false;
    tutorialStep.value = 1;
    addLog('教程状态已重置，下次访问将显示教程', 'info');
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
        console.log('首次访问，准备显示教程');
        setTimeout(() => {
            startTutorial();
        }, 2000); // 增加延迟，确保页面完全加载
    } else {
        console.log('用户已完成教程');
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
/* 全局样式 */
* {
    box-sizing: border-box;
}

/* 页面容器 */
.page-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    position: relative;
    overflow-x: hidden;
}

/* 背景装饰 */
.bg-decoration {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
}

.floating-shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 6s ease-in-out infinite;
}

.shape-1 {
    width: 100px;
    height: 100px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
}

.shape-3 {
    width: 80px;
    height: 80px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
}

.shape-4 {
    width: 120px;
    height: 120px;
    top: 30%;
    right: 30%;
    animation-delay: 1s;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

/* 主容器 */
.main-container {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 24px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(20px);
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 20px;
}

/* 顶部导航栏 */
.top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    color: white;
    position: relative;
    overflow: hidden;
}

.top-nav::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 15px;
    position: relative;
    z-index: 1;
}

.logo-container {
    display: flex;
    align-items: center;
    animation: logoFloat 3s ease-in-out infinite;
}

.douyin-logo {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;
}

.logo-container:hover .douyin-logo {
    transform: scale(1.1);
}

@keyframes logoFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
}

.brand-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.brand-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
}

.brand-subtitle {
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 400;
}

.nav-actions {
    display: flex;
    gap: 12px;
    position: relative;
    z-index: 1;
}

.nav-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.nav-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-btn-icon {
    font-size: 1rem;
}

.nav-btn.small {
    padding: 8px 12px;
    font-size: 0.8rem;
}

/* 标签页导航 */
.tab-navigation {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(254, 44, 85, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-list {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 800px;
    margin: 0 auto;
}

.tab-item {
    flex: 1;
    padding: 20px 15px;
    background: transparent;
    border: none;
    color: #333;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
}

.tab-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.tab-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.tab-name {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.2;
}

.tab-desc {
    font-size: 0.75rem;
    opacity: 0.8;
    line-height: 1.1;
    font-weight: 400;
}

.tab-item::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background: #fe2c55;
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.tab-item:hover {
    color: #fe2c55;
    background: rgba(254, 44, 85, 0.1);
}

.tab-item.active {
    color: white;
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    box-shadow: 0 2px 8px rgba(254, 44, 85, 0.3);
}

.tab-item.active::before {
    width: 80%;
    background: white;
}

.tab-icon {
    font-size: 1.4rem;
    transition: transform 0.2s ease;
}

.tab-item:hover .tab-icon {
    transform: scale(1.1);
}

/* 主内容区域 */
.main-content {
    padding: 30px;
    min-height: 600px;
}

.content-panel {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.panel-header {
    text-align: center;
    margin-bottom: 40px;
}

.panel-title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.title-icon {
    font-size: 1.8rem;
}

.panel-subtitle {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
    font-weight: 400;
}

/* 功能卡片网格 */
.panel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
}

.feature-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    text-align: center;
}

.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.card-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    border-radius: 50%;
    color: white;
    box-shadow: 0 4px 12px rgba(254, 44, 85, 0.3);
}

.card-header h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin: 0;
}

.card-desc {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 20px 0;
    line-height: 1.5;
}

.card-btn {
    width: 100%;
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.card-btn.primary {
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    color: white;
}

.card-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(254, 44, 85, 0.4);
}

.card-btn.success {
    background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
    color: white;
}

.card-btn.success:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(103, 194, 58, 0.4);
}

.card-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}

.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
    color: #666;
    font-size: 0.9rem;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #fe2c55;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* 表单区域 */
.form-section {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.section-header {
    margin-bottom: 24px;
}

.section-header h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
}

.section-header p {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.5;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field-label {
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
}

.field-input {
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8f9fa;
}

.field-input:focus {
    outline: none;
    border-color: #fe2c55;
    background: white;
    box-shadow: 0 0 0 3px rgba(254, 44, 85, 0.1);
}

.form-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
}

/* 设置区域 */
.setting-section {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
}

.input-group {
    display: flex;
    gap: 12px;
    align-items: flex-end;
}

.modern-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8f9fa;
}

.modern-input:focus {
    outline: none;
    border-color: #fe2c55;
    background: white;
    box-shadow: 0 0 0 3px rgba(254, 44, 85, 0.1);
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

.select-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.select-label {
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
}

.modern-select {
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8f9fa;
    cursor: pointer;
}

.modern-select:focus {
    outline: none;
    border-color: #fe2c55;
    background: white;
    box-shadow: 0 0 0 3px rgba(254, 44, 85, 0.1);
}

.action-group {
    display: flex;
    gap: 12px;
    justify-content: center;
}

/* 按钮样式 */
.action-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
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

.action-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.3s ease;
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-btn:hover::before {
    left: 100%;
}

.action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}

.action-btn.primary {
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    color: white;
}

.action-btn.primary:hover {
    background: linear-gradient(135deg, #e6254a 0%, #e55a8a 100%);
}

.action-btn.success {
    background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
    color: white;
}

.action-btn.success:hover {
    background: linear-gradient(135deg, #5daf34 0%, #73c25a 100%);
}

.action-btn.secondary {
    background: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
}

.action-btn.secondary:hover {
    background: #e9ecef;
    color: #333;
}

.action-btn.danger {
    background: linear-gradient(135deg, #f56c6c 0%, #f78989 100%);
    color: white;
}

.action-btn.danger:hover {
    background: linear-gradient(135deg, #e45656 0%, #e57575 100%);
}

.action-btn.small {
    padding: 8px 16px;
    font-size: 0.85rem;
    min-height: 36px;
}

.btn-icon {
    font-size: 1rem;
    transition: transform 0.2s ease;
}

.action-btn:hover .btn-icon {
    transform: scale(1.05);
}

/* 直播操作 */
.live-action {
    text-align: center;
    margin: 40px 0;
}

.live-btn {
    padding: 20px 40px;
    border: none;
    border-radius: 16px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(103, 194, 58, 0.3);
    animation: pulse 2s infinite;
}

.live-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(103, 194, 58, 0.4);
}

.live-icon {
    font-size: 1.5rem;
}

.live-text {
    font-size: 1.2rem;
}

@keyframes pulse {
    0% { box-shadow: 0 8px 25px rgba(103, 194, 58, 0.3); }
    50% { box-shadow: 0 8px 25px rgba(103, 194, 58, 0.5); }
    100% { box-shadow: 0 8px 25px rgba(103, 194, 58, 0.3); }
}

/* 日志区域 */
.log-section {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.log-section .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.log-actions {
    display: flex;
    gap: 8px;
}

.log-container {
    background: rgba(0, 0, 0, 0.02);
    border-radius: 12px;
    padding: 16px;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid rgba(0, 0, 0, 0.08);
}

.log-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    margin-bottom: 8px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    border-left: 4px solid #fe2c55;
    font-size: 0.9rem;
}

.log-time {
    color: #999;
    font-size: 0.8rem;
    min-width: 80px;
    flex-shrink: 0;
}

.log-icon {
    font-size: 1rem;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
}

.log-message {
    color: #333;
    flex: 1;
    word-break: break-word;
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

.empty-log {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 40px 20px;
    color: #999;
    font-style: italic;
}

.empty-icon {
    font-size: 2rem;
    opacity: 0.5;
}

/* 推流信息区域 */
.stream-info-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 30px;
}

.info-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.info-card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.info-card .card-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin: 0;
}

.copy-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background: #f8f9fa;
    color: #666;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 4px;
}

.copy-btn:hover {
    background: #e9ecef;
    color: #333;
}

.info-value {
    background: #f8f9fa;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #333;
    word-break: break-all;
    min-height: 44px;
    display: flex;
    align-items: center;
}

.export-section,
.control-section {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
}

.export-actions,
.control-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

/* 状态栏 */
.status-bar {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 16px 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin: 20px 30px 30px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status-content {
    display: flex;
    align-items: center;
    gap: 12px;
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
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease;
}

.tutorial-content {
    background: white;
    border-radius: 24px;
    padding: 40px;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: slideIn 0.3s ease;
}

.tutorial-step h3 {
    color: #fe2c55;
    margin-bottom: 15px;
    font-size: 1.5rem;
    font-weight: 700;
}

.tutorial-step p {
    color: #666;
    margin-bottom: 25px;
    line-height: 1.6;
    font-size: 1rem;
}

.tutorial-highlight {
    position: absolute;
    width: 200px;
    height: 100px;
    border: 3px solid #fe2c55;
    border-radius: 12px;
    background: rgba(254, 44, 85, 0.1);
    animation: tutorialPulse 2s infinite;
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

@keyframes tutorialPulse {
    0% { 
        box-shadow: 0 0 0 0 rgba(254, 44, 85, 0.7);
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 0 0 10px rgba(254, 44, 85, 0);
        transform: scale(1.05);
    }
    100% { 
        box-shadow: 0 0 0 0 rgba(254, 44, 85, 0);
        transform: scale(1);
    }
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

/* 智能提示 */
.smart-tip {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #fe2c55 0%, #ff6b9d 100%);
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(254, 44, 85, 0.3);
    z-index: 1001;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 350px;
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
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s ease;
}

.tip-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* 快捷操作面板 */
.quick-actions {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    min-width: 280px;
}

.quick-action-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
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
@media (max-width: 1024px) {
    .main-container {
        margin: 10px;
        border-radius: 20px;
    }
    
    .panel-grid {
        grid-template-columns: 1fr;
    }
    
    .stream-info-section {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .top-nav {
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
    }
    
    .nav-brand {
        flex-direction: column;
        text-align: center;
    }
    
    .brand-title {
        font-size: 1.5rem;
    }
    
    .nav-actions {
        width: 100%;
        justify-content: center;
    }
    
    .tab-list {
        flex-direction: column;
        gap: 0;
    }
    
    .tab-item {
        min-height: 70px;
        padding: 15px 10px;
    }
    
    .tab-name {
        font-size: 0.9rem;
    }
    
    .tab-desc {
        font-size: 0.7rem;
    }
    
    .main-content {
        padding: 20px;
    }
    
    .panel-title {
        font-size: 1.6rem;
    }
    
    .input-group {
        flex-direction: column;
        align-items: stretch;
    }
    
    .category-grid {
        grid-template-columns: 1fr;
    }
    
    .action-group {
        flex-direction: column;
    }
    
    .export-actions,
    .control-actions {
        flex-direction: column;
    }
    
    .status-bar {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
        margin: 15px 20px 20px 20px;
    }
    
    .smart-tip {
        left: 20px;
        right: 20px;
        max-width: none;
    }
    
    .quick-actions {
        width: 90%;
        max-width: 320px;
    }
}

@media (max-width: 480px) {
    .brand-title {
        font-size: 1.3rem;
    }
    
    .brand-subtitle {
        font-size: 0.8rem;
    }
    
    .douyin-logo {
        width: 35px;
        height: 34px;
    }
    
    .panel-title {
        font-size: 1.4rem;
    }
    
    .title-icon {
        font-size: 1.5rem;
    }
    
    .feature-card {
        padding: 20px;
    }
    
    .card-icon {
        width: 50px;
        height: 50px;
        font-size: 2rem;
    }
    
    .setting-section,
    .form-section,
    .log-section,
    .export-section,
    .control-section {
        padding: 20px;
    }
    
    .live-btn {
        padding: 16px 32px;
        font-size: 1.1rem;
    }
    
    .live-icon {
        font-size: 1.3rem;
    }
    
    .live-text {
        font-size: 1.1rem;
    }
}
</style>