<template>
    <div class="gap" style="min-width: min(0px, 100%);">
        <!-- 顶部配置 -->
        <div class="stretch">
            <div class="stretch">
                <div class="form" style="flex-grow: 3; min-width: min(480px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">*实验/模型名</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                style="overflow-y: scroll; height: 42px;" v-model="experimentName"></textarea>
                        </label>
                    </div>

                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">显卡信息</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                disabled style="overflow-y: scroll; height: 42px;" v-model="gpuInfo"></textarea>
                        </label>
                    </div>

                    <fieldset class="block padded"
                        style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                        <span data-testid="block-info">版本</span>
                        <div class="wrap">
                            <label data-testid="v1-radio-label" :class="{ selected: version === 'v1' }">
                                <input type="radio" name="version" value="v1" aria-checked="false" v-model="version">
                                <span class="ml-2">v1</span>
                            </label>
                            <label data-testid="v2-radio-label" :class="{ selected: version === 'v2' }">
                                <input type="radio" name="version" value="v2" aria-checked="true" v-model="version">
                                <span class="ml-2">v2</span>
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div class="stretch">
                <div class="form" style="flex-grow: 28; min-width: min(480px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; flex-grow: 9; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">预训练的SoVITS-G模型路径</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="2"
                                style="overflow-y: scroll; height: 63px;" v-model="sovitsGPath"></textarea>
                        </label>
                    </div>

                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; flex-grow: 9; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">预训练的SoVITS-D模型路径</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="2"
                                style="overflow-y: scroll; height: 63px;" v-model="sovitsDPath"></textarea>
                        </label>
                    </div>

                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; flex-grow: 10; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">预训练的GPT模型路径</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="2"
                                style="overflow-y: scroll; height: 63px;" v-model="gptPath"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- 内部标签页 -->
        <TabsContainer :tabs="['1A-训练集格式化工具', '1B-微调训练', '1C-推理']" :activeTab="innerActiveTab"
            @change-tab="handleInnerTabChange">
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
/* 特定于该组件的样式 */
fieldset {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 0;
}

.wrap {
    display: flex;
    gap: 20px;
}

label.selected {
    font-weight: bold;
    color: #3498db;
}

.ml-2 {
    margin-left: 8px;
}
</style>
