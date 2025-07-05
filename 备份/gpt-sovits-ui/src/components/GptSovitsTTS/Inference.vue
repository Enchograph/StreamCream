<template>
    <div class="gap" style="min-width: min(0px, 100%);">
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>选择训练完存放在SoVITS_weights和GPT_weights下的模型。默认的一个是底模，体验5秒Zero Shot TTS用。</p>
                    </span>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="stretch">
                <div class="form" style="flex-grow: 2; min-width: min(320px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <div class="container">
                            <span data-testid="block-info">*GPT模型列表</span>
                            <div class="dropdown-wrapper">
                                <select v-model="selectedGptModel" aria-label="*GPT模型列表">
                                    <option v-for="model in gptModels" :key="model.value" :value="model.value">
                                        {{ model.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <div class="container">
                            <span data-testid="block-info">*SoVITS模型列表</span>
                            <div class="dropdown-wrapper">
                                <select v-model="selectedSovitsModel" aria-label="*SoVITS模型列表">
                                    <option v-for="model in sovitsModels" :key="model.value" :value="model.value">
                                        {{ model.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">GPU卡号,只能填1个整数</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                style="overflow-y: scroll; height: 42px;" v-model="inferenceGpuId"></textarea>
                        </label>
                    </div>
                </div>
                <button class="lg primary" @click="refreshModelPaths"> 刷新模型路径</button>
            </div>
        </div>

        <div class="stretch">
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                        <label>
                            <input type="checkbox" name="test" data-testid="checkbox" v-model="enableParallel">
                            <span class="ml-2">启用并行推理版本(推理速度更快)</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="stretch">
                <button class="lg primary" @click="startTtsInference" v-if="!ttsInferenceRunning"> 开启TTS推理WebUI</button>
                <button class="lg primary hidden" @click="stopTtsInference" v-else> 关闭TTS推理WebUI</button>
            </div>

            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">TTS推理WebUI进程输出信息</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                disabled style="overflow-y: scroll; height: 42px;"
                                v-model="ttsInferenceOutput"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 模型列表
const gptModels = ref([
    { label: '基础GPT模型 (底模)', value: 'pretrained_models/gpt/gpt_base.pth' },
    { label: 'GPT微调模型1', value: 'GPT_weights/model_1/model.pth' },
    { label: 'GPT微调模型2', value: 'GPT_weights/model_2/model.pth' }
]);

const sovitsModels = ref([
    { label: '基础SoVITS模型 (底模)', value: 'pretrained_models/sovits/sovits_base.pth' },
    { label: 'SoVITS微调模型1', value: 'SoVITS_weights/model_1/model.pth' },
    { label: 'SoVITS微调模型2', value: 'SoVITS_weights/model_2/model.pth' }
]);

// 选中的模型和参数
const selectedGptModel = ref(gptModels.value[0].value);
const selectedSovitsModel = ref(sovitsModels.value[0].value);
const inferenceGpuId = ref('0');
const enableParallel = ref(true);
const ttsInferenceRunning = ref(false);
const ttsInferenceOutput = ref('');

// 刷新模型路径
const refreshModelPaths = () => {
    ttsInferenceOutput.value = '正在扫描模型路径...';

    // 模拟API请求
    setTimeout(() => {
        // 模拟新添加的模型
        gptModels.value = [
            ...gptModels.value,
            { label: 'GPT微调模型3 (新)', value: 'GPT_weights/model_3/model.pth' }
        ];

        sovitsModels.value = [
            ...sovitsModels.value,
            { label: 'SoVITS微调模型3 (新)', value: 'SoVITS_weights/model_3/model.pth' }
        ];

        ttsInferenceOutput.value = '模型路径刷新完成，发现新模型！';
    }, 1500);
};

// 开启TTS推理
const startTtsInference = () => {
    if (!inferenceGpuId.value) {
        ttsInferenceOutput.value = '错误: 请指定GPU卡号';
        return;
    }

    ttsInferenceRunning.value = true;
    ttsInferenceOutput.value = '正在初始化TTS推理WebUI...';

    // 模拟启动过程
    setTimeout(() => {
        ttsInferenceOutput.value = '正在加载GPT模型...';
        setTimeout(() => {
            ttsInferenceOutput.value = '正在加载SoVITS模型...';
            setTimeout(() => {
                ttsInferenceOutput.value = `TTS推理WebUI已启动，可以通过 http://localhost:7860 访问\n使用模型: ${selectedGptModel.value} 和 ${selectedSovitsModel.value}`;
            }, 1500);
        }, 1000);
    }, 1000);
};

// 停止TTS推理
const stopTtsInference = () => {
    ttsInferenceRunning.value = false;
    ttsInferenceOutput.value = 'TTS推理WebUI已关闭';
};

// 初始化
onMounted(() => {
    // 这里可以从API获取实际的模型列表
    ttsInferenceOutput.value = '请选择模型并点击"开启TTS推理WebUI"';
});
</script>

<style scoped>
/* 组件特有样式 */
.dropdown-wrapper {
    position: relative;
    width: 100%;
}

select {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path fill='%23888' d='M3 4l3 3 3-3z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 10px center;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.ml-2 {
    margin-left: 8px;
}
</style>
