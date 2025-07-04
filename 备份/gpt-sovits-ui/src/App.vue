<template>
    <div id="component-0" class="gap" :style="{ minWidth: 'min(0px, 100%)' }">
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
/* 基础样式 */
.gap {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* 通用样式 */
.block {
    border-radius: 4px;
    padding: 10px;
    border-width: 1px;
}

.padded {
    padding: 10px;
}

.hide-container {
    position: relative;
}

.stretch {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

button.primary {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

button.primary.hidden {
    display: none;
}

button.lg {
    padding: 12px 20px;
    font-size: 16px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

textarea {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    font-family: inherit;
    resize: vertical;
}

textarea:disabled {
    background-color: #f5f5f5;
    color: #666;
}
</style>
