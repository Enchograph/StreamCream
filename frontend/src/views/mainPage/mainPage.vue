<template>
    <div class="page-container">
        <div class="container">
            <!-- 第一列 -->
            <div class="column column-1">
                <!-- 声音库选择 -->
                <div class="box box-1">
                    <h2>{{ $t('mainPage.voiceLibTitle') }}</h2>
                    <p>{{ $t('mainPage.voiceLibDesc') }}</p>

                    <!-- 挂载ModelSelector.vue的容器 -->
                    <div id="model-selector"></div>

                    <div class="file-upload">
                        <label>{{ $t('mainPage.uploadVoiceModel') }}</label>
                        <input type="file" id="voice-model-file" accept=".ckpt, .pth" multiple @change="handleVoiceModelUpload">
                        <small style="color: #666; display: block; margin-top: 5px;">
                            {{ $t('mainPage.supportedFormat') }}
                        </small>
                        <div v-if="uploadedVoiceModels.length > 0" style="margin-top: 10px;">
                            <small style="color: #409eff; font-weight: bold;">{{ $t('mainPage.selectedFiles') }}:</small>
                            <div v-for="(model, index) in uploadedVoiceModels" :key="index" style="margin: 5px 0; padding: 5px; background: #f5f7fa; border-radius: 4px; font-size: 12px;">
                                📁 {{ model.name }} ({{ model.type }})
                            </div>
                        </div>
                    </div>

                    <button class="btn primary" @click="applyVoiceModel" :disabled="!uploadedVoiceModels.length">
                        <span class="btn-icon">🎵</span>
                        {{ $t('mainPage.applyVoiceModel') }}
                    </button>
                </div>

                <!-- 训练新声音 -->
                <div class="box box-2">
                    <h2>{{ $t('mainPage.trainNewVoice') }}</h2>
                    <p>{{ $t('mainPage.trainNewVoiceDesc') }}</p>

                    <div class="file-upload">
                        <label>{{ $t('mainPage.uploadVoiceSample') }}</label>
                        <input type="file" id="voice-sample-file" accept=".mp3, .wav" multiple>
                    </div>

                    <p>{{ $t('mainPage.trainTip') }}</p>

                    <div class="file-upload">
                        <label>{{ $t('mainPage.voiceName') }}</label>
                        <input type="text" id="voice-name" :placeholder="$t('mainPage.voiceNamePlaceholder')">
                    </div>

                    <button class="btn success" id="start-training">
                        <span class="btn-icon">⚡</span>
                        {{ $t('mainPage.startTraining') }}
                    </button>
                    <router-link to="/trainPage" class="link">{{ $t('mainPage.advancedTrain') }}</router-link>

                    <div id="training-status" style="margin-top: 15px;">
                        {{ $t('mainPage.trainStatus') }} <span class="status-badge not-ready">{{ $t('mainPage.notStarted') }}</span>
                    </div>
                </div>
            </div>

            <!-- 第二列 -->
            <div class="column column-2">
                <!-- Live2D模型选择 -->
                <div class="box box-1">
                    <h2>{{ $t('mainPage.live2dTitle') }}</h2>
                    <p>{{ $t('mainPage.live2dDesc') }}</p>

                    <div class="model-selector">
                        <label for="live2d-model-select">{{ $t('mainPage.selectBaseModel') }}</label>
                        <select id="live2d-model-select" v-model="live2DStore.currentModel"
                            @change="selectLive2DModel(live2DStore.currentModel)" class="model-select">
                            <option v-for="model in live2DStore.availableModels" :key="model.id" :value="model.id">
                                {{ model.name }} - {{ model.description }}
                            </option>
                        </select>
                    </div>

                    <div class="file-upload">
                        <label>{{ $t('mainPage.uploadLive2dModel') }}</label>
                        <input type="file" id="live2d-model-file" accept=".model3.json" @change="handleModelUpload">
                    </div>

                    <button class="btn primary" @click="applyCustomModel" :disabled="!customModelPath">
                        <span class="btn-icon">🎭</span>
                        {{ $t('mainPage.applyCustomModel') }}
                    </button>
                    <a href="#" class="link">{{ $t('mainPage.advancedLive2dTrain') }}</a>

                    <div id="model-status" style="margin-top: 15px;">
                        {{ $t('mainPage.currentModel') }} <span class="status-badge ready">{{ getCurrentModelName() }}</span>
                    </div>
                </div>

                <!-- 直播平台推流码 -->
                <div class="box box-2">
                    <streamConfig />
                </div>
            </div>

            <!-- 第三列 -->
            <div class="column column-3">
                <!-- 直播效果预览 -->
                <div class="box box-1">
                    <h2>{{ $t('mainPage.livePreviewTitle') }}</h2>
                    <!-- <LivePreview title="直播效果预览" placeholder-text="Live2D模型预览区域" :resolution="revolutionPreference"
                        :show-title="false" /> -->
                    <Live2DIframeContainer src="/live2d" :resolution="'1920x1080'" />

                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            {{ $t('mainPage.status') }} <span class="status-badge" :class="isRefreshing ? 'loading' : 'ready'">
                                {{ isRefreshing ? $t('mainPage.refreshing') : $t('mainPage.previewReady') }}
                            </span>
                        </div>
                        <div class="btn-group">
                            <button class="btn secondary" @click="refreshPreview" :disabled="isRefreshing">
                                <span class="btn-icon">{{ isRefreshing ? '⏳' : '🔄' }}</span>
                                {{ isRefreshing ? $t('mainPage.refreshing') : $t('mainPage.refreshPreview') }}
                            </button>
                            <button class="btn success pulse" id="test-stream" @click="goToNextPage">
                                <span class="btn-icon">📺</span>
                                {{ $t('mainPage.startLive') }}
                            </button>
                        </div>
                        <!-- !!! 这里开始直播前要先检测一下 GPT-sovits, Live 2D, 大模型API的可用性。 -->

                    </div>
                </div>

                <!-- AI讲稿生成测试 -->
                <div class="box box-2">
                    <h2>{{ $t('mainPage.aiScriptTestTitle') }}</h2>
                    <p>{{ $t('mainPage.aiScriptTestDesc') }}</p>

                    <div class="file-upload">
                        <label>{{ $t('mainPage.scriptTopic') }}</label>
                        <input type="text" v-model="topic" :placeholder="$t('mainPage.inputScriptTopic')">
                    </div>
                    <!-- <div class="file-upload">
                        <label>关键词 (用逗号分隔):</label>
                        <input type="text" v-model="keywords" placeholder="输入关键词，如：赛博朋克2077,补丁,更新">
                    </div> -->

                    <div class="file-upload">
                        <label>{{ $t('mainPage.scriptStyle') }}</label>
                        <select v-model="speechStyle"
                            style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 15px;">
                            <option value="casual">{{ $t('mainPage.styleCasual') }}</option>
                            <option value="professional">{{ $t('mainPage.styleProfessional') }}</option>
                            <option value="cute">{{ $t('mainPage.styleCute') }}</option>
                            <option value="humorous">{{ $t('mainPage.styleHumorous') }}</option>
                        </select>
                    </div>

                    <div class="btn-group">
                        <button class="btn primary animated" @click="generateSpeech" :disabled="!topic || isGenerating">
                            <span class="btn-icon">{{ isGenerating ? '⏳' : '🤖' }}</span>
                            {{ isGenerating ? $t('mainPage.generating') : $t('mainPage.generateScript') }}
                        </button>
                        <button class="btn warning" @click="testSpeech">
                            <span class="btn-icon">🎤</span>
                            {{ $t('mainPage.testScript') }}
                        </button>
                    </div>

                    <div class="file-upload" style="margin-top: 15px;">
                        <label>{{ $t('mainPage.generatedScript') }}</label>
                        <textarea v-model="generatedSpeech" :placeholder="$t('mainPage.generatedScriptPlaceholder')" readonly></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { createApp } from 'vue';
import ModelSelector from './ModelSelector.vue';
import Live2DIframeContainer from '../../components/Live2DIframeContainer.vue';
import streamConfig from './streamConfig.vue';
import { useLive2DStore } from '../../stores/live2d';
import { ElMessage } from 'element-plus'


export default {
    name: 'mainPage',
    components: {
        ModelSelector,
        Live2DIframeContainer,
        streamConfig
    },
    setup() {
        // 获取路由实例
        const router = useRouter();

        // 获取Live2D状态管理
        const live2DStore = useLive2DStore();

        // 选中的模型
        const selectedModel = ref(1);
        // 分辨率设置
        const revolutionPreference = ref('1920x1080');

        // 自定义模型相关
        const customModelPath = ref('');

        // 声音模型上传相关
        const uploadedVoiceModels = ref([]);

        // AI讲稿生成相关数据
        const topic = ref('');
        const keywords = ref('');
        const speechStyle = ref('casual');
        const generatedSpeech = ref('');
        const isGenerating = ref(false);
        
        // 刷新预览状态
        const isRefreshing = ref(false);

        // API配置
        let aiSettings = {};
        try {
            aiSettings = JSON.parse(localStorage.getItem('aiSettings')) || {};
        } catch (e) {
            aiSettings = {};
        }
        const apiEndpoint = ref(aiSettings.provider || 'https://api.soruxgpt.com/v1/chat/completions');
        const apiKey = ref(aiSettings.apiKey || '');
        const modelName = ref(aiSettings.modelName || '');
        const temperature = ref(aiSettings.temperature !== undefined ? aiSettings.temperature : 0.7);

        // 从本地存储或后端获取分辨率设置
        onMounted(() => {
            const savedResolution = localStorage.getItem('revolutionPreference');
            if (savedResolution) {
                revolutionPreference.value = savedResolution;
            }
        });

        // 处理模型变化
        const handleModelChange = (modelId) => {
            selectedModel.value = modelId;
            console.log('选中的模型已更改为:', modelId);
        };

        // Live2D模型选择相关方法
        const selectLive2DModel = (modelId) => {
            live2DStore.setCurrentModel(modelId);
            console.log('Live2D模型已切换为:', modelId);
        };

        const handleModelUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                customModelPath.value = URL.createObjectURL(file);
            }
        };

        const applyCustomModel = () => {
            ElMessage.info($t('mainPage.customModelFeatureDev'))
        }

        // 声音模型上传处理
        const handleVoiceModelUpload = (event) => {
            const files = Array.from(event.target.files);
            uploadedVoiceModels.value = files.map(file => ({
                name: file.name,
                type: file.name.endsWith('.ckpt') ? $t('mainPage.gptModel') : $t('mainPage.sovitsModel'),
                file: file
            }));
            console.log($t('mainPage.uploadedVoiceModels'), uploadedVoiceModels.value);
        };

        const applyVoiceModel = async () => {
            if (uploadedVoiceModels.value.length === 0) {
                ElMessage.warning($t('mainPage.selectModelFileWarning'));
                return;
            }

            try {
                // 这里应该实现文件上传到后端的逻辑
                // 目前先显示提示信息
                ElMessage.info($t('mainPage.voiceModelUploadFeatureDev'));
                console.log($t('mainPage.preparingApplyVoiceModel'), uploadedVoiceModels.value);
            } catch (error) {
                console.error($t('mainPage.applyVoiceModelFailed'), error);
                ElMessage.error($t('mainPage.applyVoiceModelFailed'));
            }
        };

        const getCurrentModelName = () => {
            const currentModel = live2DStore.availableModels.find(m => m.id === live2DStore.currentModel);
            return currentModel ? currentModel.name : $t('mainPage.unknownModel');
        };

        // 刷新预览功能 - 添加防抖机制
        let refreshTimeout = null;
        
        const refreshPreview = () => {
            // 防止重复点击
            if (isRefreshing.value) {
                console.log('刷新操作正在进行中，请稍候...');
                return;
            }
            
            // 清除之前的定时器
            if (refreshTimeout) {
                clearTimeout(refreshTimeout);
            }
            
            isRefreshing.value = true;
            
            // 使用更简单的方式刷新iframe - 通过重新加载src
            const iframe = document.querySelector('.iframe-container iframe');
            if (iframe) {
                try {
                    // 保存当前src
                    const currentSrc = iframe.src;
                    
                    // 清空src并立即重新设置，强制重新加载
                    iframe.src = '';
                    
                    refreshTimeout = setTimeout(() => {
                        iframe.src = currentSrc;
                        console.log('Live2D预览已刷新');
                        
                        // 延迟重置状态，给用户更多时间看到加载过程
                        setTimeout(() => {
                            isRefreshing.value = false;
                        }, 800);
                    }, 100);
                } catch (error) {
                    console.error('刷新预览失败:', error);
            
                    setTimeout(() => {
                        isRefreshing.value = false;
                    }, 500);
                }
            } else {
                console.warn('未找到Live2D预览iframe');
                // 未找到iframe时也延迟重置状态
                setTimeout(() => {
                    isRefreshing.value = false;
                }, 500);
            }
        };

        // 跳转到下一页
        const goToNextPage = () => {
            router.push({
                path: '/streamingPage',
                query: { model: selectedModel.value } // 可选：将选中的模型作为参数传递
            });
        };

        // AI讲稿生成相关方法
        const callOpenAI = async (prompt) => {
            if (!apiKey.value) {
                ElMessage.warning($t('mainPage.configureApiKeyWarning'))
                return '';
            }

            try {
                const response = await fetch(apiEndpoint.value, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey.value}`
                    },
                    body: JSON.stringify({
                        model: modelName.value,
                        messages: [{
                            role: 'user',
                            content: prompt
                        }],
                        temperature: temperature.value
                    })
                });

                if (!response.ok) {
                    throw new Error($t('mainPage.apiRequestFailed') + response.status);
                }

                const data = await response.json();
                return data.choices[0].message.content;
            } catch (error) {
                console.error('调用OpenAI API出错:', error);
                throw error;
            }
        };

        const generateSpeech = async () => {
            if (!topic.value) return;

            isGenerating.value = true;

            try {
                const prompt = `根据以下信息生成一篇${speechStyle.value}风格的讲稿:\n` +
                    `主题: ${topic.value}\n` +
                    (keywords.value ? `关键词: ${keywords.value}\n` : '') +
                    `要求: 语言流畅自然，符合${speechStyle.value}风格，长度约100字`;

                generatedSpeech.value = await callOpenAI(prompt);
            } catch (error) {
                console.error('生成讲稿出错:', error);
                ElMessage.error($t('mainPage.generateSpeechFailed'))
            } finally {
                isGenerating.value = false;
            }
        };

        const testSpeech = () => {
            if (!generatedSpeech.value) {
                ElMessage.warning($t('mainPage.generateSpeechFirstWarning'))
                return;
            }

            // 这里可以添加讲稿测试逻辑
            ElMessage.info($t('mainPage.speechTestFeatureDev'))
        };

        // 动态挂载ModelSelector到html容器
        onMounted(() => {
            const container = document.getElementById('model-selector');
            if (container) {
                createApp(ModelSelector).mount(container);
            }
        });

        // 返回需要在模板中使用的变量和方法
        return {
            selectedModel,
            revolutionPreference,
            handleModelChange,
            goToNextPage,

            // Live2D模型选择相关
            live2DStore,
            customModelPath,
            selectLive2DModel,
            handleModelUpload,
            applyCustomModel,
            getCurrentModelName,
            refreshPreview,

            // 声音模型上传相关
            uploadedVoiceModels,
            handleVoiceModelUpload,
            applyVoiceModel,

            // AI讲稿生成相关
            topic,
            keywords,
            speechStyle,
            generatedSpeech,
            isGenerating,
            generateSpeech,
            testSpeech,
            
            // 刷新预览相关
            isRefreshing
        };
    }
}
</script>

<style scoped>
.page-container {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

body {
    background-color: #f5f7fa;
    color: #333;
    padding: 20px;
}

.container {
    display: flex;
    width: 100%;
    min-height: 90vh;
    gap: 20px;
}

.column {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
}

.box {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
    transition: all 0.3s ease;
}

.iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    /* 16:9 比例 */
    height: 0;
    overflow: hidden;
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.box:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

h2 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.5rem;
    border-bottom: 2px solid #e7eaee;
    padding-bottom: 10px;
}

p {
    color: #5a6a85;
    margin-bottom: 15px;
    line-height: 1.6;
}

.column-1 .box-1 {
    flex: 0.4;
}

.column-1 .box-2 {
    flex: 0.6;
}

.column-2 .box-1 {
    flex: 0.6;
}

.column-2 .box-2 {
    flex: 0.4;
}

.column-3 .box-1 {
    flex: 0.4;
}

.column-3 .box-2 {
    flex: 0.6;
}

.btn {
    /* 基础样式 */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    margin-right: 12px;
    margin-bottom: 12px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    min-width: 120px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    transition: left 0.5s;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

.btn:hover::before {
    left: 100%;
}

.btn:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn:disabled {
    background: linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px rgba(189, 195, 199, 0.3);
}

.btn:disabled:hover {
    transform: none;
    box-shadow: 0 2px 8px rgba(189, 195, 199, 0.3);
}

/* 特殊按钮样式 */
.btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn.primary:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn.success {
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
}

.btn.success:hover {
    background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
    box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
}

.btn.warning {
    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
    box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
}

.btn.warning:hover {
    background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
    box-shadow: 0 8px 25px rgba(243, 156, 18, 0.4);
}

.btn.danger {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
}

.btn.danger:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
}

.btn.secondary {
    background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
    box-shadow: 0 4px 15px rgba(149, 165, 166, 0.3);
}

.btn.secondary:hover {
    background: linear-gradient(135deg, #7f8c8d 0%, #6c7b7d 100%);
    box-shadow: 0 8px 25px rgba(149, 165, 166, 0.4);
}

/* 按钮组样式 */
.btn-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.btn-group .btn {
    margin: 0;
    flex: 1;
    min-width: auto;
    height: 48px;
}

/* 按钮图标样式 */
.btn-icon {
    margin-right: 8px;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    transition: transform 0.3s ease;
}

.btn:hover .btn-icon {
    transform: scale(1.1);
}

/* 特殊按钮样式 */
.btn.info {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
}

.btn.info:hover {
    background: linear-gradient(135deg, #138496 0%, #117a8b 100%);
    box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
}

.btn.light {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #495057;
    box-shadow: 0 4px 15px rgba(248, 249, 250, 0.3);
}

.btn.light:hover {
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
    box-shadow: 0 8px 25px rgba(248, 249, 250, 0.4);
}

.btn.dark {
    background: linear-gradient(135deg, #343a40 0%, #212529 100%);
    box-shadow: 0 4px 15px rgba(52, 58, 64, 0.3);
}

.btn.dark:hover {
    background: linear-gradient(135deg, #212529 0%, #1a1d20 100%);
    box-shadow: 0 8px 25px rgba(52, 58, 64, 0.4);
}

/* 动画按钮 */
.btn.animated {
    position: relative;
    overflow: hidden;
}

.btn.animated::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn.animated:active::after {
    width: 300px;
    height: 300px;
}

/* 脉冲按钮 */
.btn.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    50% {
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.6);
    }

    100% {
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
}

/* 响应式按钮 */
@media (max-width: 768px) {
    .btn {
        padding: 10px 16px;
        font-size: 13px;
        min-width: 100px;
    }

    .btn-group {
        flex-direction: column;
    }

    .btn-group .btn {
        width: 100%;
    }

    .btn-icon {
        font-size: 14px;
        margin-right: 6px;
    }
}



/* 禁用状态样式 */
.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    animation: none !important;
}

.btn:disabled:hover {
    transform: none !important;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
}

.btn:disabled .btn-icon {
    transform: none !important;
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

.model-selector {
    margin-bottom: 15px;
}

.model-selector label {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-weight: 500;
}

.model-select,
select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    font-size: 14px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 40px;
}

.model-select:hover,
select:hover {
    border-color: #667eea;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    transform: translateY(-1px);
}

.model-select:focus,
select:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
}

.model-select option,
select option {
    padding: 12px;
    background: white;
    color: #333;
    font-size: 14px;
}

.model-select option:hover,
select option:hover {
    background: #667eea;
    color: white;
}

.model-item.active {
    font-weight: bold;
}

.preview-area {
    background-color: #000;
    border-radius: 8px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin-bottom: 15px;
}

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

input[type="text"],
input[type="file"],
textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    margin-bottom: 15px;
    font-size: 14px;
    background: #f8f9fa;
    transition: all 0.3s ease;
    font-family: inherit;
}

input[type="text"]:focus,
input[type="file"]:focus,
textarea:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
}

input[type="text"]:hover,
input[type="file"]:hover,
textarea:hover {
    border-color: #bdc3c7;
    background: white;
}

textarea {
    min-height: 120px;
    resize: vertical;
    line-height: 1.6;
}

/* 文件上传按钮美化 */
input[type="file"] {
    position: relative;
    cursor: pointer;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

input[type="file"]::file-selector-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-right: 10px;
    transition: all 0.3s ease;
    content: attr(data-button-text, "选择文件");
}

/* 英文环境下的文件选择按钮文本 */
html[lang="en"] input[type="file"]::file-selector-button {
    content: "Choose File";
}

/* 中文环境下的文件选择按钮文本 */
html[lang="zh-CN"] input[type="file"]::file-selector-button {
    content: "选择文件";
}

input[type="file"]::file-selector-button:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-1px);
}

.link {
    color: #667eea;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    margin-top: 15px;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
    transition: left 0.5s;
}

.link:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #5a6fd8;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.link:hover::before {
    left: 100%;
}

.link:active {
    transform: translateY(0);
}

.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-left: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.status-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.status-badge:hover::before {
    left: 100%;
}

.status-badge.ready {
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(46, 204, 113, 0.3);
}

.status-badge.ready:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
}

.status-badge.training {
    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(243, 156, 18, 0.3);
}

.status-badge.training:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(243, 156, 18, 0.4);
}

.status-badge.not-ready {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}

.status-badge.not-ready:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
}

.status-badge.loading {
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
    animation: loadingPulse 1.5s ease-in-out infinite;
}

.status-badge.loading:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

@keyframes loadingPulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}
</style>