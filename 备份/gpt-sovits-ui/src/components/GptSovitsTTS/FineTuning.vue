<template>
    <div class="gap" style="min-width: min(0px, 100%);">
        <!-- SoVITS训练部分 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>1Ba-SoVITS训练。用于分享的模型文件输出在SoVITS_weights下。</p>
                    </span>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="gap" style="flex-grow: 1; min-width: min(320px, 100%);">
                <div class="stretch">
                    <div class="form" style="flex-grow: 2; min-width: min(320px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_3">
                                        <span data-testid="block-info">每张显卡的batch_size</span>
                                    </label>
                                    <input aria-label="number input for 每张显卡的batch_size" data-testid="number-input"
                                        type="number" min="1" max="40" step="1" v-model="sovitsBatchSize">
                                </div>
                            </div>
                            <input type="range" id="range_id_3" name="cowbell" min="1" max="40" step="1"
                                aria-label="range slider for 每张显卡的batch_size" style="background-size: 35.8974% 100%;"
                                v-model="sovitsBatchSize">
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_4">
                                        <span data-testid="block-info">总训练轮数total_epoch，不建议太高</span>
                                    </label>
                                    <input aria-label="number input for 总训练轮数total_epoch" data-testid="number-input"
                                        type="number" min="1" max="25" step="1" v-model="sovitsTotalEpoch">
                                </div>
                            </div>
                            <input type="range" id="range_id_4" name="cowbell" min="1" max="25" step="1"
                                aria-label="range slider for 总训练轮数total_epoch" style="background-size: 29.1667% 100%;"
                                v-model="sovitsTotalEpoch">
                        </div>
                    </div>
                </div>
                <div class="stretch">
                    <div class="form" style="flex-grow: 2; min-width: min(320px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_5">
                                        <span data-testid="block-info">文本模块学习率权重</span>
                                    </label>
                                    <input aria-label="number input for 文本模块学习率权重" data-testid="number-input"
                                        type="number" min="0.2" max="0.6" step="0.05" v-model="textLrWeight">
                                </div>
                            </div>
                            <input type="range" id="range_id_5" name="cowbell" min="0.2" max="0.6" step="0.05"
                                aria-label="range slider for 文本模块学习率权重" style="background-size: 50% 100%;"
                                v-model="textLrWeight">
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_6">
                                        <span data-testid="block-info">保存频率save_every_epoch</span>
                                    </label>
                                    <input aria-label="number input for 保存频率save_every_epoch" data-testid="number-input"
                                        type="number" min="1" max="25" step="1" v-model="sovitsSaveEvery">
                                </div>
                            </div>
                            <input type="range" id="range_id_6" name="cowbell" min="1" max="25" step="1"
                                aria-label="range slider for 保存频率save_every_epoch" style="background-size: 12.5% 100%;"
                                v-model="sovitsSaveEvery">
                        </div>
                    </div>
                </div>
            </div>
            <div class="gap" style="flex-grow: 1; min-width: min(320px, 100%);">
                <div class="gap" style="flex-grow: 1; min-width: min(320px, 100%);">
                    <div class="form" style="flex-grow: 0; min-width: min(0px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <label>
                                <input type="checkbox" name="test" data-testid="checkbox" v-model="sovitsKeepLatest">
                                <span class="ml-2">是否仅保存最新的ckpt文件以节省硬盘空间</span>
                            </label>
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <label>
                                <input type="checkbox" name="test" data-testid="checkbox" v-model="sovitsSaveToWeights">
                                <span class="ml-2">是否在每次保存时间点将最终小模型保存至weights文件夹</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="stretch">
                    <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">GPU卡号以-分割，每个卡号一个进程</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="sovitsGpuIds"></textarea>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="stretch">
                <button class="lg primary" @click="startSovitsTraining" v-if="!sovitsTrainingRunning">
                    开启SoVITS训练</button>
                <button class="lg primary hidden" @click="stopSovitsTraining" v-else> 终止SoVITS训练</button>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">SoVITS训练进程输出信息</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                disabled style="overflow-y: scroll; height: 42px;"
                                v-model="sovitsTrainingOutput"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- GPT训练部分 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>1Bb-GPT训练。用于分享的模型文件输出在GPT_weights下。</p>
                    </span>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="gap" style="flex-grow: 1; min-width: min(320px, 100%);">
                <div class="stretch">
                    <div class="form" style="flex-grow: 2; min-width: min(320px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_7">
                                        <span data-testid="block-info">每张显卡的batch_size</span>
                                    </label>
                                    <input aria-label="number input for 每张显卡的batch_size" data-testid="number-input"
                                        type="number" min="1" max="40" step="1" v-model="gptBatchSize">
                                </div>
                            </div>
                            <input type="range" id="range_id_7" name="cowbell" min="1" max="40" step="1"
                                aria-label="range slider for 每张显卡的batch_size" style="background-size: 35.8974% 100%;"
                                v-model="gptBatchSize">
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_8">
                                        <span data-testid="block-info">总训练轮数total_epoch</span>
                                    </label>
                                    <input aria-label="number input for 总训练轮数total_epoch" data-testid="number-input"
                                        type="number" min="2" max="50" step="1" v-model="gptTotalEpoch">
                                </div>
                            </div>
                            <input type="range" id="range_id_8" name="cowbell" min="2" max="50" step="1"
                                aria-label="range slider for 总训练轮数total_epoch" style="background-size: 27.0833% 100%;"
                                v-model="gptTotalEpoch">
                        </div>
                    </div>
                </div>
                <div class="stretch">
                    <div class="form" style="flex-grow: 2; min-width: min(320px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_9">
                                        <span data-testid="block-info">保存频率save_every_epoch</span>
                                    </label>
                                    <input aria-label="number input for 保存频率save_every_epoch" data-testid="number-input"
                                        type="number" min="1" max="50" step="1" v-model="gptSaveEvery">
                                </div>
                            </div>
                            <input type="range" id="range_id_9" name="cowbell" min="1" max="50" step="1"
                                aria-label="range slider for 保存频率save_every_epoch"
                                style="background-size: 8.16327% 100%;" v-model="gptSaveEvery">
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <label>
                                <input type="checkbox" name="test" data-testid="checkbox" v-model="enableDpo">
                                <span class="ml-2">是否开启dpo训练选项(实验性)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gap" style="flex-grow: 1; min-width: min(320px, 100%);">
                <div class="gap" style="flex-grow: 1; min-width: min(320px, 100%);">
                    <div class="form" style="flex-grow: 0; min-width: min(0px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <label>
                                <input type="checkbox" name="test" data-testid="checkbox" v-model="gptKeepLatest">
                                <span class="ml-2">是否仅保存最新的ckpt文件以节省硬盘空间</span>
                            </label>
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <label>
                                <input type="checkbox" name="test" data-testid="checkbox" v-model="gptSaveToWeights">
                                <span class="ml-2">是否在每次保存时间点将最终小模型保存至weights文件夹</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="stretch">
                    <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">GPU卡号以-分割，每个卡号一个进程</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="gptGpuIds"></textarea>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="stretch">
                <button class="lg primary" @click="startGptTraining" v-if="!gptTrainingRunning"> 开启GPT训练</button>
                <button class="lg primary hidden" @click="stopGptTraining" v-else> 终止GPT训练</button>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">GPT训练进程输出信息</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                disabled style="overflow-y: scroll; height: 42px;"
                                v-model="gptTrainingOutput"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// SoVITS训练参数
const sovitsBatchSize = ref(15);
const sovitsTotalEpoch = ref(8);
const textLrWeight = ref(0.4);
const sovitsSaveEvery = ref(4);
const sovitsKeepLatest = ref(true);
const sovitsSaveToWeights = ref(true);
const sovitsGpuIds = ref('0');
const sovitsTrainingRunning = ref(false);
const sovitsTrainingOutput = ref('');

// GPT训练参数
const gptBatchSize = ref(15);
const gptTotalEpoch = ref(15);
const gptSaveEvery = ref(5);
const enableDpo = ref(false);
const gptKeepLatest = ref(true);
const gptSaveToWeights = ref(true);
const gptGpuIds = ref('0');
const gptTrainingRunning = ref(false);
const gptTrainingOutput = ref('');

// SoVITS训练操作
const startSovitsTraining = () => {
    if (!sovitsGpuIds.value) {
        sovitsTrainingOutput.value = '错误: 请指定GPU卡号';
        return;
    }

    sovitsTrainingRunning.value = true;
    sovitsTrainingOutput.value = '正在初始化SoVITS训练...';

    // 模拟训练过程
    let epoch = 0;
    const trainInterval = setInterval(() => {
        epoch++;
        sovitsTrainingOutput.value = `正在训练 Epoch ${epoch}/${sovitsTotalEpoch.value}, 损失: ${(0.3 - (epoch * 0.02)).toFixed(4)}`;

        if (epoch % sovitsSaveEvery.value === 0) {
            sovitsTrainingOutput.value += ' (已保存模型)';
        }

        if (epoch >= sovitsTotalEpoch.value) {
            clearInterval(trainInterval);
            sovitsTrainingOutput.value = '训练完成! 模型已保存至SoVITS_weights文件夹';
            sovitsTrainingRunning.value = false;
        }
    }, 2000);
};

const stopSovitsTraining = () => {
    sovitsTrainingRunning.value = false;
    sovitsTrainingOutput.value = 'SoVITS训练已终止';
};

// GPT训练操作
const startGptTraining = () => {
    if (!gptGpuIds.value) {
        gptTrainingOutput.value = '错误: 请指定GPU卡号';
        return;
    }

    gptTrainingRunning.value = true;
    gptTrainingOutput.value = '正在初始化GPT训练...';

    // 模拟训练过程
    let epoch = 0;
    const trainInterval = setInterval(() => {
        epoch++;
        gptTrainingOutput.value = `正在训练 Epoch ${epoch}/${gptTotalEpoch.value}, 损失: ${(0.5 - (epoch * 0.01)).toFixed(4)}`;

        if (epoch % gptSaveEvery.value === 0) {
            gptTrainingOutput.value += ' (已保存模型)';
        }

        if (epoch >= gptTotalEpoch.value) {
            clearInterval(trainInterval);
            gptTrainingOutput.value = '训练完成! 模型已保存至GPT_weights文件夹';
            gptTrainingRunning.value = false;
        }
    }, 1500);
};

const stopGptTraining = () => {
    gptTrainingRunning.value = false;
    gptTrainingOutput.value = 'GPT训练已终止';
};
</script>

<style scoped>
/* 组件特有样式 */
.wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input[type="range"] {
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: #ddd;
    outline: none;
    -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
}

input[type="number"] {
    width: 60px;
    text-align: right;
    padding: 2px 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

input[type="checkbox"] {
    margin-right: 5px;
}

.ml-2 {
    margin-left: 8px;
}
</style>
