<template>
    <div class="page-container">
        <div class="container">
            <!-- 第一列 -->
            <div class="column column-1">
                <!-- 声音库选择 -->
                <div class="box box-1">
                    <h2>声音库选择</h2>
                    <p>选择已训练好的声音模型或上传声音模型文件</p>

                    <!-- 挂载ModelSelector.vue的容器 -->
                    <div id="model-selector"></div>

                    <div class="file-upload">
                        <label>上传声音模型文件:</label>
                        <input type="file" id="voice-model-file" accept=".mdl, .bin">
                    </div>

                    <button class="btn" id="apply-voice">应用声音</button>
                </div>

                <!-- 训练新声音 -->
                <div class="box box-2">
                    <h2>训练新声音</h2>
                    <p>上传声音样本以训练新的声音模型</p>

                    <div class="file-upload">
                        <label>上传声音样本文件 (MP3/WAV):</label>
                        <input type="file" id="voice-sample-file" accept=".mp3, .wav" multiple>
                    </div>

                    <p>上传至少10分钟的清晰语音样本以获得最佳效果</p>

                    <div class="file-upload">
                        <label>声音名称:</label>
                        <input type="text" id="voice-name" placeholder="为你的声音模型命名">
                    </div>

                    <button class="btn" id="start-training">开始训练</button>
                    <a href="#" class="link">高级语音模型训练设置</a>

                    <div id="training-status" style="margin-top: 15px;">
                        训练状态: <span class="status-badge not-ready">未开始</span>
                    </div>
                </div>
            </div>

            <!-- 第二列 -->
            <div class="column column-2">
                <!-- Live2D模型选择 -->
                <div class="box box-1">
                    <h2>Live2D模型选择</h2>
                    <p>选择或上传Live2D模型文件</p>

                    <div class="model-list">
                        <div class="model-item active">模型名1</div>
                        <div class="model-item">模型名2</div>
                        <div class="model-item">模型名3</div>
                        <div class="model-item">模型名4</div>
                    </div>

                    <div class="file-upload">
                        <label>上传Live2D模型文件:</label>
                        <input type="file" id="live2d-model-file" accept=".model3.json">
                    </div>

                    <button class="btn" id="apply-model">应用模型</button>
                    <a href="#" class="link">高级Live2D模型训练设置</a>

                    <div id="model-status" style="margin-top: 15px;">
                        模型状态: <span class="status-badge ready">已就绪</span>
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
                    <h2>直播效果预览</h2>
                    <!-- <LivePreview title="直播效果预览" placeholder-text="Live2D模型预览区域" :resolution="revolutionPreference"
                        :show-title="false" /> -->
                    <Live2DIframeContainer src="/live2d" :resolution="'1920x1080'" />

                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            状态: <span class="status-badge ready">预览就绪</span>
                        </div>
                        <div>
                            <button class="btn" id="refresh-preview"
                                style="margin: 0; background-color: #95a5a6;">刷新预览</button>
                        </div><button class="btn" id="test-stream" style="background-color: #27ae60;"
                            @click="goToNextPage">开始直播</button>
                        <!-- !!! 这里开始直播前要先检测一下 GPT-sovits, Live 2D, 大模型API的可用性。 -->

                    </div>
                </div>

                <!-- AI讲稿生成测试 -->
                <div class="box box-2">
                    <h2>AI讲稿生成测试</h2>
                    <p>生成AI讲稿并在预览区域测试效果</p>

                    <div class="file-upload">
                        <label>讲稿主题:</label>
                        <input type="text" v-model="topic" placeholder="输入讲稿主题">
                    </div>
                    <!-- <div class="file-upload">
                        <label>关键词 (用逗号分隔):</label>
                        <input type="text" v-model="keywords" placeholder="输入关键词，如：赛博朋克2077,补丁,更新">
                    </div> -->

                    <div class="file-upload">
                        <label>讲稿风格:</label>
                        <select v-model="speechStyle"
                            style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 15px;">
                            <option value="casual">轻松休闲</option>
                            <option value="professional">专业正式</option>
                            <option value="cute">可爱活泼</option>
                            <option value="humorous">幽默诙谐</option>
                        </select>
                    </div>

                    <button class="btn" @click="generateSpeech" :disabled="!topic || isGenerating">
                        {{ isGenerating ? '生成中...' : '生成讲稿' }}
                    </button>
                    <button class="btn" @click="testSpeech" style="background-color: #e67e22;">测试讲稿</button>

                    <div class="file-upload" style="margin-top: 15px;">
                        <label>生成的讲稿:</label>
                        <textarea v-model="generatedSpeech" placeholder="生成的AI讲稿将显示在这里..." readonly></textarea>
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
import streamConfig from '../../components/streamConfig.vue';


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

        // 选中的模型
        const selectedModel = ref(1);
        // 分辨率设置
        const revolutionPreference = ref('1920x1080');

        // AI讲稿生成相关数据
        const topic = ref('');
        const keywords = ref('');
        const speechStyle = ref('casual');
        const generatedSpeech = ref('');
        const isGenerating = ref(false);

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
                alert('请先配置API Key');
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
                    throw new Error(`API请求失败: ${response.status}`);
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
                alert('生成讲稿失败，请重试');
            } finally {
                isGenerating.value = false;
            }
        };

        const testSpeech = () => {
            if (!generatedSpeech.value) {
                alert('请先生成讲稿');
                return;
            }

            // 这里可以添加讲稿测试逻辑
            alert('讲稿测试功能将在后续实现');
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

            // AI讲稿生成相关
            topic,
            keywords,
            speechStyle,
            generatedSpeech,
            isGenerating,
            generateSpeech,
            testSpeech
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

.model-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
}

.model-item {
    border: 2px solid #e7eaee;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;
    width: calc(50% - 5px);
}

.model-item:hover,
.model-item.active {
    border-color: #3498db;
    background-color: rgba(52, 152, 219, 0.05);
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
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 14px;
}

textarea {
    min-height: 120px;
    resize: vertical;
}

.link {
    color: #3498db;
    text-decoration: none;
    display: inline-block;
    margin-top: 10px;
    font-size: 14px;
}

.link:hover {
    text-decoration: underline;
}

.status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 10px;
}

.status-badge.ready {
    background-color: #2ecc71;
    color: white;
}

.status-badge.training {
    background-color: #f39c12;
    color: white;
}

.status-badge.not-ready {
    background-color: #e74c3c;
    color: white;
}
</style>