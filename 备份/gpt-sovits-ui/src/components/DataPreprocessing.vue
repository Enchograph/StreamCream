<template>
    <div class="gap" style="min-width: min(0px, 100%);">
        <!-- UVR5 语音伴奏分离 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>0a-UVR5人声伴奏分离&amp;去混响去延迟工具</p>
                    </span>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="gap" style="flex-grow: 3; min-width: min(320px, 100%);">
                <div class="stretch">
                    <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">UVR5进程输出信息</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    disabled style="overflow-y: scroll; height: 42px;" v-model="uvr5Output"></textarea>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button class="lg primary" @click="startUVR5" v-if="!uvr5Running"> 开启UVR5-WebUI</button>
            <button class="lg primary" @click="stopUVR5" v-else> 关闭UVR5-WebUI</button>
        </div>

        <!-- 语音切分工具 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>0b-语音切分工具</p>
                    </span>
                </div>
            </div>
        </div>

        <!-- 语音切分工具表单 -->
        <div class="stretch">
            <div class="gap" style="flex-grow: 3; min-width: min(320px, 100%);">
                <!-- 输入路径和输出路径 -->
                <div class="stretch">
                    <div class="form" style="flex-grow: 2; min-width: min(320px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">音频自动切分输入路径，可文件可文件夹</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="audioInputPath"></textarea>
                            </label>
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">切分后的子音频的输出根目录</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="audioOutputPath"></textarea>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- 切分参数 -->
                <div class="stretch">
                    <div class="form" style="flex-grow: 5; min-width: min(800px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">threshold:音量小于这个值视作静音的备选切割点</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="threshold"></textarea>
                            </label>
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">min_length:每段最小多长，如果第一段太短一直和后面段连起来直到超过这个值</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="minLength"></textarea>
                            </label>
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">min_interval:最短切割间隔</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="minInterval"></textarea>
                            </label>
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">hop_size:怎么算音量曲线，越小精度越大计算量越高（不是精度越大效果越好）</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="hopSize"></textarea>
                            </label>
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">max_sil_kept:切完后静音最多留多长</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    style="overflow-y: scroll; height: 42px;" v-model="maxSilKept"></textarea>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- 滑动参数 -->
                <div class="stretch">
                    <div class="form" style="flex-grow: 2; min-width: min(320px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_0">
                                        <span data-testid="block-info">max:归一化后最大值多少</span>
                                    </label>
                                    <input aria-label="number input for max:归一化后最大值多少" data-testid="number-input"
                                        type="number" min="0" max="1" step="0.05" v-model="maxNormValue">
                                </div>
                            </div>
                            <input type="range" id="range_id_0" name="cowbell" min="0" max="1" step="0.05"
                                aria-label="range slider for max:归一化后最大值多少" style="background-size: 90% 100%;"
                                v-model="maxNormValue">
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_1">
                                        <span data-testid="block-info">alpha_mix:混多少比例归一化后音频进来</span>
                                    </label>
                                    <input aria-label="number input for alpha_mix:混多少比例归一化后音频进来"
                                        data-testid="number-input" type="number" min="0" max="1" step="0.05"
                                        v-model="alphaMix">
                                </div>
                            </div>
                            <input type="range" id="range_id_1" name="cowbell" min="0" max="1" step="0.05"
                                aria-label="range slider for alpha_mix:混多少比例归一化后音频进来" style="background-size: 25% 100%;"
                                v-model="alphaMix">
                        </div>
                    </div>
                </div>

                <!-- 进程设置 -->
                <div class="stretch">
                    <div class="form" style="flex-grow: 2; min-width: min(320px, 100%);">
                        <div class="block padded"
                            style="border-style: solid; overflow: visible; min-width: min(160px, 100%);">
                            <div class="wrap">
                                <div class="head">
                                    <label for="range_id_2">
                                        <span data-testid="block-info">切割使用的进程数</span>
                                    </label>
                                    <input aria-label="number input for 切割使用的进程数" data-testid="number-input"
                                        type="number" min="1" max="22" step="1" v-model="processCount">
                                </div>
                            </div>
                            <input type="range" id="range_id_2" name="cowbell" min="1" max="22" step="1"
                                aria-label="range slider for 切割使用的进程数" style="background-size: 14.2857% 100%;"
                                v-model="processCount">
                        </div>
                        <div class="block padded"
                            style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                            <label class="container">
                                <span data-testid="block-info">语音切割进程输出信息</span>
                                <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                    disabled style="overflow-y: scroll; height: 42px;"
                                    v-model="splitProcessOutput"></textarea>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <button class="lg primary" @click="startSplit" v-if="!splitRunning"> 开启语音切割</button>
            <button class="lg primary" @click="stopSplit" v-else> 终止语音切割</button>
        </div>

        <!-- 剩余工具选择性实现，这里省略了降噪、ASR和标注工具 -->
        <!-- 可以按需添加类似上面的组件结构 -->
    </div>
</template>

<script setup>
import { ref } from 'vue';

// UVR5状态
const uvr5Running = ref(false);
const uvr5Output = ref('');

// 语音切分参数
const audioInputPath = ref('');
const audioOutputPath = ref('');
const threshold = ref('0.025');
const minLength = ref('3000');
const minInterval = ref('300');
const hopSize = ref('10');
const maxSilKept = ref('500');
const maxNormValue = ref('0.9');
const alphaMix = ref('0.25');
const processCount = ref('4');
const splitProcessOutput = ref('');
const splitRunning = ref(false);

// UVR5操作
const startUVR5 = () => {
    uvr5Running.value = true;
    uvr5Output.value = 'UVR5-WebUI 启动中...';
    // 模拟后端API调用
    setTimeout(() => {
        uvr5Output.value = 'UVR5-WebUI 已启动，可以通过 http://localhost:7860 访问';
    }, 1500);
};

const stopUVR5 = () => {
    uvr5Running.value = false;
    uvr5Output.value = 'UVR5-WebUI 已关闭';
};

// 语音切分操作
const startSplit = () => {
    if (!audioInputPath.value) {
        splitProcessOutput.value = '错误: 请指定输入路径';
        return;
    }
    if (!audioOutputPath.value) {
        splitProcessOutput.value = '错误: 请指定输出路径';
        return;
    }

    splitRunning.value = true;
    splitProcessOutput.value = '正在初始化语音切分...';

    // 模拟切分过程
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
            splitProcessOutput.value = `正在切分: ${progress}% 完成`;
        } else {
            clearInterval(interval);
            splitProcessOutput.value = '切分完成';
            splitRunning.value = false;
        }
    }, 500);
};

const stopSplit = () => {
    splitRunning.value = false;
    splitProcessOutput.value = '语音切分已终止';
};
</script>

<style scoped>
/* 组件特有样式可以在这里定义 */
</style>
