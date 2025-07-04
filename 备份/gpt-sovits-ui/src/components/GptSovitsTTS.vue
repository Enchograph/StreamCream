<template>
    <div class="gpt-sovits-container">
        <!-- 配置卡片 -->
        <div class="config-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">⚙️</span>
                    模型配置
                </h2>
                <p class="section-description">配置GPT-SoVITS模型的基本参数和路径</p>
            </div>
            
            <div class="config-grid">
                <!-- 基础配置 -->
                <div class="config-card">
                    <h3 class="card-title">基础配置</h3>
                    <div class="form-row">
                        <div class="form-group flex-1">
                            <label class="form-label">
                                <span class="label-icon">🏷️</span>
                                实验/模型名
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="输入实验名称，例如：my-tts-model"
                                rows="1"
                                v-model="experimentName"
                            ></textarea>
                        </div>
                        
                        <div class="form-group flex-1">
                            <label class="form-label">
                                <span class="label-icon">🖥️</span>
                                显卡信息
                            </label>
                            <textarea 
                                class="form-input disabled" 
                                placeholder="自动检测显卡信息..."
                                rows="1"
                                disabled
                                v-model="gpuInfo"
                            ></textarea>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">📋</span>
                            版本选择
                        </label>
                        <div class="radio-group">
                            <label class="radio-item" :class="{ selected: version === 'v1' }">
                                <input type="radio" name="version" value="v1" v-model="version">
                                <span class="radio-custom"></span>
                                <span class="radio-text">v1</span>
                            </label>
                            <label class="radio-item" :class="{ selected: version === 'v2' }">
                                <input type="radio" name="version" value="v2" v-model="version">
                                <span class="radio-custom"></span>
                                <span class="radio-text">v2</span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <!-- 模型路径配置 -->
                <div class="config-card">
                    <h3 class="card-title">模型路径</h3>
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">🎵</span>
                            SoVITS-G模型路径
                        </label>
                        <textarea 
                            class="form-input" 
                            placeholder="预训练的SoVITS-G模型路径"
                            rows="2"
                            v-model="sovitsGPath"
                        ></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">🎵</span>
                            SoVITS-D模型路径
                        </label>
                        <textarea 
                            class="form-input" 
                            placeholder="预训练的SoVITS-D模型路径"
                            rows="2"
                            v-model="sovitsDPath"
                        ></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">🤖</span>
                            GPT模型路径
                        </label>
                        <textarea 
                            class="form-input" 
                            placeholder="预训练的GPT模型路径"
                            rows="2"
                            v-model="gptPath"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- 功能标签页 -->
        <div class="features-section">
            <TabsContainer 
                :tabs="['1A-训练集格式化工具', '1B-微调训练', '1C-推理']" 
                :activeTab="innerActiveTab"
                @change-tab="handleInnerTabChange"
            >
                <template v-slot:tab0>
                    <DataFormatting v-if="innerActiveTab === 0" />
                </template>
                <template v-slot:tab1>
                    <FineTuning v-if="innerActiveTab === 1" />
                </template>
                <template v-slot:tab2>
                    <Inference v-if="innerActiveTab === 2" />
                </template>
            </TabsContainer>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TabsContainer from './TabsContainer.vue';
import DataFormatting from './GptSovitsTTS/DataFormatting.vue';
import FineTuning from './GptSovitsTTS/FineTuning.vue';
import Inference from './GptSovitsTTS/Inference.vue';

// 主要配置
const experimentName = ref('my-tts-model');
const gpuInfo = ref('');
const version = ref('v2');
const sovitsGPath = ref('pretrained_models/sovits/sovits_g.pth');
const sovitsDPath = ref('pretrained_models/sovits/sovits_d.pth');
const gptPath = ref('pretrained_models/gpt/gpt.pth');

// 内部标签页管理
const innerActiveTab = ref(0);

const handleInnerTabChange = (index) => {
    innerActiveTab.value = index;
};

// 模拟获取GPU信息
onMounted(() => {
    // 假设这是从API获取的
    setTimeout(() => {
        gpuInfo.value = 'NVIDIA RTX 4090 24GB, Driver: 535.104.12';
    }, 1000);
});
</script>

<style scoped>
.gpt-sovits-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.config-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.section-header {
    text-align: center;
    margin-bottom: 1rem;
}

.section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.section-title .icon {
    font-size: 1.5rem;
}

.section-description {
    color: var(--text-secondary);
    font-size: 1rem;
    margin: 0;
}

.config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
}

.config-card {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
}

.config-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--border-color);
}

.form-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.flex-1 {
    flex: 1;
}

.form-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.label-icon {
    font-size: 1rem;
    opacity: 0.8;
}

.form-input {
    width: 100%;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    background: var(--surface-color);
    color: var(--text-primary);
    resize: vertical;
    min-height: 2.5rem;
}

.form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
}

.form-input.disabled {
    background-color: #f8fafc;
    color: var(--text-muted);
    cursor: not-allowed;
}

.radio-group {
    display: flex;
    gap: 1rem;
}

.radio-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease;
    background: var(--surface-color);
}

.radio-item:hover {
    border-color: var(--primary-color);
    background: rgba(99, 102, 241, 0.05);
}

.radio-item.selected {
    border-color: var(--primary-color);
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary-color);
    font-weight: 600;
}

.radio-item input[type="radio"] {
    display: none;
}

.radio-custom {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border-color);
    border-radius: 50%;
    position: relative;
    transition: all 0.2s ease;
}

.radio-item.selected .radio-custom {
    border-color: var(--primary-color);
    background: var(--primary-color);
}

.radio-item.selected .radio-custom::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
}

.radio-text {
    font-weight: 500;
}

.features-section {
    background: var(--surface-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .config-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .config-card {
        padding: 1rem;
    }
    
    .section-title {
        font-size: 1.5rem;
    }
    
    .form-row {
        flex-direction: column;
        gap: 1rem;
    }
    
    .radio-group {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .radio-item {
        justify-content: center;
    }
}
</style>
