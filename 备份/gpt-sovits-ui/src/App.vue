<template>
    <div id="component-0" class="app-container">
        <div class="header">
            <h1 class="app-title">
                <span class="gradient-text">GPT-SoVITS</span>
                <span class="subtitle">AI语音合成平台</span>
            </h1>
        </div>
        
        <TabsContainer :tabs="['0-前置数据集获取工具', '1-GPT-SoVITS-TTS', '2-GPT-SoVITS-变声']" :activeTab="activeTab"
            @change-tab="handleTabChange">
            <template v-slot:tab0>
                <DataPreprocessing v-if="activeTab === 0" />
            </template>
            <template v-slot:tab1>
                <GptSovitsTTS v-if="activeTab === 1" />
            </template>
        </TabsContainer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TabsContainer from './components/TabsContainer.vue';
import DataPreprocessing from './components/DataPreprocessing.vue';
import GptSovitsTTS from './components/GptSovitsTTS.vue';

const activeTab = ref(1); // 默认显示 1-GPT-SoVITS-TTS

const handleTabChange = (index) => {
    activeTab.value = index;
};
</script>

<style>
/* 应用容器 */
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--background-color);
}

/* 头部样式 */
.header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    padding: 2rem 2rem 1.5rem;
    text-align: center;
    box-shadow: var(--shadow-lg);
}

.app-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
}

.gradient-text {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    letter-spacing: 0.05em;
}

/* 基础样式 */
.gap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* 通用样式 */
.block {
    border-radius: var(--border-radius);
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    background: var(--surface-color);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
}

.block:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
}

.padded {
    padding: 1.5rem;
}

.hide-container {
    position: relative;
}

.stretch {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* 现代化按钮样式 */
button.primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: white;
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
    position: relative;
    overflow: hidden;
}

button.primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

button.primary:hover::before {
    left: 100%;
}

button.primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

button.primary.hidden {
    display: none;
}

button.lg {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: var(--border-radius);
}

/* 表单样式 */
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* 文本域样式 */
textarea {
    width: 100%;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    padding: 0.875rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    resize: vertical;
    transition: all 0.2s ease;
    background: var(--surface-color);
    color: var(--text-primary);
    min-height: 2.5rem;
}

textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
}

textarea:disabled {
    background-color: #f8fafc;
    color: var(--text-muted);
    cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .header {
        padding: 1.5rem 1rem 1rem;
    }
    
    .gradient-text {
        font-size: 2rem;
    }
    
    .subtitle {
        font-size: 0.9rem;
    }
    
    .block {
        padding: 1rem;
    }
    
    .padded {
        padding: 1rem;
    }
}
</style>
