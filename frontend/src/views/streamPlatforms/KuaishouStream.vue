<template>
    <div class="kuaishou-stream-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h1>{{ $t('kuaishou.title') }}</h1>
            <!-- <p>{{ $t('kuaishou.subtitle') }}</p> -->
        </div>

        <!-- 导航操作栏 -->
        <div class="nav-actions">
            <div class="action-buttons">
                <button @click="showHelp" class="action-btn">
                    <i class="fas fa-question-circle"></i>
                    {{ $t('kuaishou.actions.help') }}
                </button>
                <button @click="showQuickActions" class="action-btn">
                    <i class="fas fa-bolt"></i>
                    {{ $t('kuaishou.actions.quickActions') }}
                </button>
                <button @click="showTutorial" class="action-btn">
                    <i class="fas fa-graduation-cap"></i>
                    {{ $t('kuaishou.actions.tutorial') }}
                </button>
                <button @click="resetTutorial" class="action-btn">
                    <i class="fas fa-redo"></i>
                    {{ $t('kuaishou.actions.resetTutorial') }}
                </button>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="main-content">
            <!-- 标签页导航 -->
            <div class="tabs-container">
                <div class="tabs">
                    <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
                        :class="['tab-btn', { active: activeTab === tab.key }]">
                        <i :class="tab.icon"></i>
                        <span>{{ $t(`kuaishou.tabs.${tab.key}.name`) }}</span>
                        <small>{{ $t(`kuaishou.tabs.${tab.key}.description`) }}</small>
                    </button>
                </div>
            </div>

            <!-- 标签页内容 -->
            <div class="tab-content">
                <!-- 账号设置 -->
                <div v-if="activeTab === 'account'" class="tab-panel">
                    <div class="panel-header">
                        <h2>{{ $t('kuaishou.account.title') }}</h2>
                        <p>{{ $t('kuaishou.account.subtitle') }}</p>
                    </div>

                    <div class="settings-grid">
                        <!-- Cookies文件导入 -->
                        <div class="setting-card">
                            <h3>{{ $t('kuaishou.account.cookiesImport.title') }}</h3>
                            <p>{{ $t('kuaishou.account.cookiesImport.description') }}</p>
                            <div class="file-input-container">
                                <input type="file" @change="handleFileUpload" accept=".txt,.json" class="file-input" />
                                <label class="file-label">{{ $t('kuaishou.account.cookiesImport.selectFile') }}</label>
                            </div>
                        </div>

                        <!-- 自动获取 -->
                        <div class="setting-card">
                            <h3>{{ $t('kuaishou.account.autoGet.title') }}</h3>
                            <p>{{ $t('kuaishou.account.autoGet.description') }}</p>
                            <button @click="startAutoGet" :disabled="isGetting" class="primary-btn">
                                <i v-if="isGetting" class="fas fa-spinner fa-spin"></i>
                                <span v-if="isGetting">{{ $t('kuaishou.account.autoGet.getting') }}</span>
                                <span v-else>{{ $t('kuaishou.account.autoGet.startGet') }}</span>
                            </button>
                        </div>

                        <!-- 手动输入 -->
                        <div class="setting-card">
                            <h3>{{ $t('kuaishou.account.manualInput.title') }}</h3>
                            <p>{{ $t('kuaishou.account.manualInput.description') }}</p>
                            <div class="input-group">
                                <label>{{ $t('kuaishou.account.manualInput.roomId') }}</label>
                                <input v-model="manualInput.roomId"
                                    :placeholder="$t('kuaishou.account.manualInput.roomIdPlaceholder')" type="text" />
                            </div>
                            <div class="input-group">
                                <label>{{ $t('kuaishou.account.manualInput.cookies') }}</label>
                                <textarea v-model="manualInput.cookies"
                                    :placeholder="$t('kuaishou.account.manualInput.cookiesPlaceholder')"
                                    rows="3"></textarea>
                            </div>
                            <div class="input-group">
                                <label>{{ $t('kuaishou.account.manualInput.sessionId') }}</label>
                                <input v-model="manualInput.sessionId"
                                    :placeholder="$t('kuaishou.account.manualInput.sessionIdPlaceholder')"
                                    type="text" />
                            </div>
                            <button @click="saveManualSettings" class="primary-btn">
                                {{ $t('kuaishou.account.manualInput.saveSettings') }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 直播设置 -->
                <div v-if="activeTab === 'live'" class="tab-panel">
                    <div class="panel-header">
                        <h2>{{ $t('kuaishou.live.title') }}</h2>
                        <p>{{ $t('kuaishou.live.subtitle') }}</p>
                    </div>

                    <div class="settings-grid">
                        <!-- 直播标题 -->
                        <div class="setting-card">
                            <h3>{{ $t('kuaishou.live.titleSetting.title') }}</h3>
                            <p>{{ $t('kuaishou.live.titleSetting.description') }}</p>
                            <div class="input-group">
                                <input v-model="liveSettings.title"
                                    :placeholder="$t('kuaishou.live.titleSetting.placeholder')" type="text" />
                                <button @click="updateLiveTitle" class="secondary-btn">
                                    {{ $t('kuaishou.live.titleSetting.updateTitle') }}
                                </button>
                            </div>
                        </div>

                        <!-- 直播分类 -->
                        <div class="setting-card">
                            <h3>{{ $t('kuaishou.live.category.title') }}</h3>
                            <p>{{ $t('kuaishou.live.category.description') }}</p>
                            <div class="input-group">
                                <label>{{ $t('kuaishou.live.category.mainCategory') }}</label>
                                <select v-model="liveSettings.mainCategory">
                                    <option value="">{{ $t('kuaishou.live.category.selectCategory') }}</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label>{{ $t('kuaishou.live.category.subCategory') }}</label>
                                <select v-model="liveSettings.subCategory">
                                    <option value="">{{ $t('kuaishou.live.category.selectSubCategory') }}</option>
                                    <option v-for="subCategory in subCategories" :key="subCategory.id"
                                        :value="subCategory.id">
                                        {{ subCategory.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="button-group">
                                <button @click="updateCategory" class="secondary-btn">
                                    {{ $t('kuaishou.live.category.updateCategory') }}
                                </button>
                                <button @click="refreshCategories" class="secondary-btn">
                                    {{ $t('kuaishou.live.category.refreshCategories') }}
                                </button>
                            </div>
                        </div>

                        <!-- 发送评论 -->
                        <div class="setting-card">
                            <h3>{{ $t('kuaishou.live.comment.title') }}</h3>
                            <p>{{ $t('kuaishou.live.comment.description') }}</p>
                            <div class="input-group">
                                <textarea v-model="commentText" :placeholder="$t('kuaishou.live.comment.placeholder')"
                                    rows="3"></textarea>
                                <button @click="sendComment" class="secondary-btn">
                                    {{ $t('kuaishou.live.comment.sendComment') }}
                                </button>
                            </div>
                        </div>

                        <!-- 开始直播 -->
                        <div class="setting-card">
                            <button @click="startLive" class="primary-btn large">
                                <i class="fas fa-play"></i>
                                {{ $t('kuaishou.live.startLive.text') }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 推流信息 -->
                <div v-if="activeTab === 'stream'" class="tab-panel">
                    <div class="panel-header">
                        <h2>{{ $t('kuaishou.stream.title') }}</h2>
                        <p>{{ $t('kuaishou.stream.subtitle') }}</p>
                    </div>

                    <div class="stream-info-grid">
                        <!-- 推流地址 -->
                        <div class="info-card">
                            <h3>{{ $t('kuaishou.stream.server.title') }}</h3>
                            <div class="info-content">
                                <div v-if="streamInfo.server" class="info-value">
                                    <code>{{ streamInfo.server }}</code>
                                    <button @click="copyToClipboard(streamInfo.server)" class="copy-btn">
                                        <i class="fas fa-copy"></i>
                                        {{ $t('kuaishou.stream.server.copy') }}
                                    </button>
                                </div>
                                <div v-else class="info-empty">
                                    {{ $t('kuaishou.stream.server.empty') }}
                                </div>
                            </div>
                        </div>

                        <!-- 推流密钥 -->
                        <div class="info-card">
                            <h3>{{ $t('kuaishou.stream.code.title') }}</h3>
                            <div class="info-content">
                                <div v-if="streamInfo.code" class="info-value">
                                    <code>{{ streamInfo.code }}</code>
                                    <button @click="copyToClipboard(streamInfo.code)" class="copy-btn">
                                        <i class="fas fa-copy"></i>
                                        {{ $t('kuaishou.stream.code.copy') }}
                                    </button>
                                </div>
                                <div v-else class="info-empty">
                                    {{ $t('kuaishou.stream.code.empty') }}
                                </div>
                            </div>
                        </div>

                        <!-- 导出选项 -->
                        <div class="info-card">
                            <h3>{{ $t('kuaishou.stream.export.title') }}</h3>
                            <p>{{ $t('kuaishou.stream.export.description') }}</p>
                            <div class="button-group">
                                <button @click="exportToDesktop" class="secondary-btn">
                                    {{ $t('kuaishou.stream.export.exportToDesktop') }}
                                </button>
                                <button @click="exportToFile" class="secondary-btn">
                                    {{ $t('kuaishou.stream.export.exportToFile') }}
                                </button>
                            </div>
                        </div>

                        <!-- 直播控制 -->
                        <div class="info-card">
                            <h3>{{ $t('kuaishou.stream.control.title') }}</h3>
                            <p>{{ $t('kuaishou.stream.control.description') }}</p>
                            <div class="button-group">
                                <button @click="stopLive" class="danger-btn">
                                    {{ $t('kuaishou.stream.control.stopLive') }}
                                </button>
                                <button @click="refreshStreamInfo" class="secondary-btn">
                                    {{ $t('kuaishou.stream.control.refreshStream') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 操作日志 -->
        <div class="logs-section">
            <div class="logs-header">
                <h3>{{ $t('kuaishou.logs.title') }}</h3>
                <div class="logs-actions">
                    <button @click="clearLogs" class="secondary-btn small">
                        {{ $t('kuaishou.logs.clear') }}
                    </button>
                    <button @click="exportLogs" class="secondary-btn small">
                        {{ $t('kuaishou.logs.export') }}
                    </button>
                </div>
            </div>
            <div class="logs-content">
                <div v-if="logs.length === 0" class="logs-empty">
                    {{ $t('kuaishou.logs.empty') }}
                </div>
                <div v-else class="logs-list">
                    <div v-for="(log, index) in logs" :key="index" class="log-item">
                        <span class="log-time">{{ log.time }}</span>
                        <span class="log-level" :class="log.level">{{ log.level }}</span>
                        <span class="log-message">{{ log.message }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 状态栏 -->
        <div class="status-bar">
            <div class="status-left">
                <span class="status-item">
                    <i class="fas fa-info-circle"></i>
                    {{ $t('kuaishou.status.tutorial') }}
                </span>
            </div>
            <div class="status-right">
                <button @click="resetAll" class="text-btn">
                    {{ $t('kuaishou.status.reset') }}
                </button>
            </div>
        </div>

        <!-- 二维码对话框 -->
        <div v-if="showQRDialog" class="modal-overlay" @click="closeQRDialog">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3>{{ $t('kuaishou.qrDialog.title') }}</h3>
                    <button @click="closeQRDialog" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="qr-container">
                        <div class="qr-code-placeholder">
                            <i class="fas fa-qrcode"></i>
                            <p>QR Code</p>
                        </div>
                    </div>
                    <div class="qr-tips">
                        <p>{{ $t('kuaishou.qrDialog.tip') }}</p>
                        <ol>
                            <li>{{ $t('kuaishou.qrDialog.step1') }}</li>
                            <li>{{ $t('kuaishou.qrDialog.step2') }}</li>
                            <li>{{ $t('kuaishou.qrDialog.step3') }}</li>
                            <li>{{ $t('kuaishou.qrDialog.step4') }}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- 帮助对话框 -->
        <div v-if="showHelpDialog" class="modal-overlay" @click="closeHelpDialog">
            <div class="modal-content large" @click.stop>
                <div class="modal-header">
                    <h3>{{ $t('kuaishou.helpDialog.title') }}</h3>
                    <button @click="closeHelpDialog" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="help-content">
                        <pre>{{ $t('kuaishou.helpDialog.content') }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KuaishouStream',
    data() {
        return {
            activeTab: 'account',
            isGetting: false,
            showQRDialog: false,
            showHelpDialog: false,
            manualInput: {
                roomId: '',
                cookies: '',
                sessionId: ''
            },
            liveSettings: {
                title: '',
                mainCategory: '',
                subCategory: ''
            },
            commentText: '',
            streamInfo: {
                server: '',
                code: ''
            },
            categories: [],
            subCategories: [],
            logs: [],
            tabs: [
                { key: 'account', icon: 'fas fa-user-cog' },
                { key: 'live', icon: 'fas fa-video' },
                { key: 'stream', icon: 'fas fa-stream' }
            ]
        }
    },
    methods: {
        // 文件上传处理
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.addLog('info', `Selected file: ${file.name}`);
                // 这里添加文件处理逻辑
            }
        },

        // 开始自动获取
        startAutoGet() {
            this.isGetting = true;
            this.showQRDialog = true;
            this.addLog('info', this.$t('kuaishou.account.autoGet.gettingInfo'));

            // 模拟获取过程
            setTimeout(() => {
                this.isGetting = false;
                this.showQRDialog = false;
                this.addLog('success', 'Account information obtained successfully');
            }, 3000);
        },

        // 保存手动设置
        saveManualSettings() {
            this.addLog('info', 'Manual settings saved');
            // 这里添加保存逻辑
        },

        // 更新直播标题
        updateLiveTitle() {
            this.addLog('info', `Live title updated: ${this.liveSettings.title}`);
            // 这里添加更新逻辑
        },

        // 更新分类
        updateCategory() {
            this.addLog('info', 'Category updated');
            // 这里添加更新逻辑
        },

        // 刷新分类
        refreshCategories() {
            this.addLog('info', 'Refreshing categories...');
            // 这里添加刷新逻辑
        },

        // 发送评论
        sendComment() {
            if (this.commentText.trim()) {
                this.addLog('info', `Comment sent: ${this.commentText}`);
                this.commentText = '';
                // 这里添加发送逻辑
            }
        },

        // 开始直播
        startLive() {
            this.addLog('info', 'Starting live stream...');
            // 这里添加开始直播逻辑
        },

        // 复制到剪贴板
        copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.addLog('success', 'Copied to clipboard');
            }).catch(() => {
                this.addLog('error', 'Failed to copy to clipboard');
            });
        },

        // 导出到桌面
        exportToDesktop() {
            this.addLog('info', 'Exporting to desktop...');
            // 这里添加导出逻辑
        },

        // 导出到文件
        exportToFile() {
            this.addLog('info', 'Exporting to file...');
            // 这里添加导出逻辑
        },

        // 停止直播
        stopLive() {
            this.addLog('warning', 'Stopping live stream...');
            // 这里添加停止直播逻辑
        },

        // 刷新推流信息
        refreshStreamInfo() {
            this.addLog('info', 'Refreshing stream information...');
            // 这里添加刷新逻辑
        },

        // 清空日志
        clearLogs() {
            this.logs = [];
        },

        // 导出日志
        exportLogs() {
            this.addLog('info', 'Exporting logs...');
            // 这里添加导出逻辑
        },

        // 重置所有
        resetAll() {
            this.addLog('warning', 'Resetting all settings...');
            // 这里添加重置逻辑
        },

        // 显示帮助
        showHelp() {
            this.showHelpDialog = true;
        },

        // 关闭帮助对话框
        closeHelpDialog() {
            this.showHelpDialog = false;
        },

        // 显示快捷操作
        showQuickActions() {
            this.addLog('info', 'Quick actions menu opened');
            // 这里添加快捷操作逻辑
        },

        // 显示教程
        showTutorial() {
            this.addLog('info', 'Tutorial started');
            // 这里添加教程逻辑
        },

        // 重置教程
        resetTutorial() {
            this.addLog('info', 'Tutorial reset');
            // 这里添加重置教程逻辑
        },

        // 关闭二维码对话框
        closeQRDialog() {
            this.showQRDialog = false;
            this.isGetting = false;
        },

        // 添加日志
        addLog(level, message) {
            const time = new Date().toLocaleTimeString();
            this.logs.unshift({ time, level, message });

            // 限制日志数量
            if (this.logs.length > 100) {
                this.logs = this.logs.slice(0, 100);
            }
        }
    },
    mounted() {
        this.addLog('info', 'Kuaishou streaming page loaded');
    }
}
</script>

<style scoped>
.kuaishou-stream-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.page-header {
    text-align: center;
    margin-bottom: 30px;
}

.page-header h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
}

.page-header p {
    font-size: 1.1rem;
    color: #666;
}

.nav-actions {
    margin-bottom: 30px;
}

.action-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-btn:hover {
    background: #f5f5f5;
    border-color: #ccc;
}

.action-btn i {
    font-size: 1.1rem;
}

.main-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.tabs-container {
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}

.tabs {
    display: flex;
    gap: 0;
}

.tab-btn {
    flex: 1;
    padding: 20px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;
}

.tab-btn:hover {
    background: #e9ecef;
}

.tab-btn.active {
    background: white;
    border-bottom-color: #007bff;
    color: #007bff;
}

.tab-btn i {
    font-size: 1.5rem;
}

.tab-btn span {
    font-weight: 600;
    font-size: 1rem;
}

.tab-btn small {
    font-size: 0.8rem;
    opacity: 0.7;
}

.tab-content {
    padding: 30px;
}

.tab-panel {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.panel-header {
    margin-bottom: 30px;
    text-align: center;
}

.panel-header h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 10px;
}

.panel-header p {
    color: #666;
    font-size: 1rem;
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
}

.setting-card {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid #e9ecef;
}

.setting-card h3 {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 10px;
}

.setting-card p {
    color: #666;
    margin-bottom: 20px;
    line-height: 1.5;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #333;
}

.input-group input,
.input-group textarea,
.input-group select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.input-group input:focus,
.input-group textarea:focus,
.input-group select:focus {
    outline: none;
    border-color: #007bff;
}

.file-input-container {
    position: relative;
}

.file-input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.file-label {
    display: inline-block;
    padding: 12px 20px;
    background: #007bff;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.file-label:hover {
    background: #0056b3;
}

.button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.primary-btn,
.secondary-btn,
.danger-btn {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.primary-btn {
    background: #007bff;
    color: white;
}

.primary-btn:hover {
    background: #0056b3;
}

.primary-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.primary-btn.large {
    padding: 15px 30px;
    font-size: 1.1rem;
}

.secondary-btn {
    background: #6c757d;
    color: white;
}

.secondary-btn:hover {
    background: #545b62;
}

.secondary-btn.small {
    padding: 8px 15px;
    font-size: 0.9rem;
}

.danger-btn {
    background: #dc3545;
    color: white;
}

.danger-btn:hover {
    background: #c82333;
}

.text-btn {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
}

.text-btn:hover {
    color: #0056b3;
}

.stream-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
}

.info-card {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid #e9ecef;
}

.info-card h3 {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 15px;
}

.info-content {
    margin-top: 15px;
}

.info-value {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.info-value code {
    flex: 1;
    background: #e9ecef;
    padding: 10px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    word-break: break-all;
}

.copy-btn {
    padding: 8px 12px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
}

.copy-btn:hover {
    background: #218838;
}

.info-empty {
    color: #666;
    font-style: italic;
    text-align: center;
    padding: 20px;
}

.logs-section {
    margin-top: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.logs-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}

.logs-header h3 {
    margin: 0;
    color: #333;
}

.logs-actions {
    display: flex;
    gap: 10px;
}

.logs-content {
    max-height: 300px;
    overflow-y: auto;
}

.logs-empty {
    padding: 40px;
    text-align: center;
    color: #666;
    font-style: italic;
}

.logs-list {
    padding: 0;
}

.log-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 30px;
    border-bottom: 1px solid #f1f3f4;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
}

.log-item:last-child {
    border-bottom: none;
}

.log-time {
    color: #666;
    min-width: 80px;
}

.log-level {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: none;
    min-width: 60px;
    text-align: center;
}

.log-level.info {
    background: #d1ecf1;
    color: #0c5460;
}

.log-level.success {
    background: #d4edda;
    color: #155724;
}

.log-level.warning {
    background: #fff3cd;
    color: #856404;
}

.log-level.error {
    background: #f8d7da;
    color: #721c24;
}

.log-message {
    flex: 1;
    color: #333;
}

.status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
    margin-top: 20px;
    border-radius: 8px;
}

.status-left {
    display: flex;
    gap: 20px;
}

.status-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 0.9rem;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-content.large {
    max-width: 800px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    color: #333;
}

.modal-body {
    padding: 30px;
}

.qr-container {
    text-align: center;
    margin-bottom: 30px;
}

.qr-code-placeholder {
    width: 200px;
    height: 200px;
    border: 2px dashed #ddd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: #666;
}

.qr-code-placeholder i {
    font-size: 3rem;
    margin-bottom: 10px;
}

.qr-tips {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
}

.qr-tips p {
    margin-bottom: 15px;
    color: #333;
    font-weight: 600;
}

.qr-tips ol {
    margin: 0;
    padding-left: 20px;
    color: #666;
    line-height: 1.6;
}

.help-content {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    max-height: 400px;
    overflow-y: auto;
}

.help-content pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #333;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .kuaishou-stream-container {
        padding: 15px;
    }

    .page-header h1 {
        font-size: 2rem;
    }

    .action-buttons {
        flex-direction: column;
    }

    .tabs {
        flex-direction: column;
    }

    .tab-btn {
        flex: none;
    }

    .settings-grid,
    .stream-info-grid {
        grid-template-columns: 1fr;
    }

    .tab-content {
        padding: 20px;
    }

    .logs-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }

    .status-bar {
        flex-direction: column;
        gap: 15px;
    }
}
</style>