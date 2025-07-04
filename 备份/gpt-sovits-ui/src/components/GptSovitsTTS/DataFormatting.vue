<template>
    <div class="gap" style="min-width: min(0px, 100%);">
        <!-- 提示信息 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>输出logs/实验名目录下应有23456开头的文件和文件夹</p>
                    </span>
                </div>
            </div>
        </div>

        <!-- 基础配置 -->
        <div class="stretch">
            <div class="stretch">
                <div class="form" style="flex-grow: 10; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; flex-grow: 10; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">*文本标注文件</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                style="overflow-y: scroll; height: 42px;" v-model="textAnnotationFile"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 10; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; flex-grow: 10; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">*训练集音频文件目录</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr"
                                placeholder="填切割后音频所在目录！读取的音频文件完整路径=该目录-拼接-list文件里波形对应的文件名（不是全路径）。如果留空则使用.list文件里的绝对全路径。"
                                rows="1" style="overflow-y: scroll; height: 62px;" v-model="audioDir"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- 文本内容处理部分 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>1Aa-文本内容</p>
                    </span>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">GPU卡号以-分割，每个卡号一个进程</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                style="overflow-y: scroll; height: 42px;" v-model="gpuIds"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">预训练的中文BERT模型路径</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="2"
                                disabled style="overflow-y: scroll; height: 63px;" v-model="bertModelPath"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <div class="stretch">
                <button class="lg primary" @click="startTextExtraction" v-if="!textExtractionRunning"> 开启文本获取</button>
                <button class="lg primary hidden" @click="stopTextExtraction" v-else> 终止文本获取进程</button>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">文本进程输出信息</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                disabled style="overflow-y: scroll; height: 42px;"
                                v-model="textProcessOutput"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- SSL自监督特征提取 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>1Ab-SSL自监督特征提取</p>
                    </span>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">GPU卡号以-分割，每个卡号一个进程</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                style="overflow-y: scroll; height: 42px;" v-model="sslGpuIds"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">预训练的SSL模型路径</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="2"
                                disabled style="overflow-y: scroll; height: 63px;" v-model="sslModelPath"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <div class="stretch">
                <button class="lg primary" @click="startSSL" v-if="!sslRunning"> 开启SSL提取</button>
                <button class="lg primary hidden" @click="stopSSL" v-else> 终止SSL提取进程</button>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">SSL进程输出信息</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                disabled style="overflow-y: scroll; height: 42px;"
                                v-model="sslProcessOutput"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- 语义token提取 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>1Ac-语义token提取</p>
                    </span>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">GPU卡号以-分割，每个卡号一个进程</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                style="overflow-y: scroll; height: 42px;" v-model="tokenGpuIds"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">预训练的SoVITS-G模型路径</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="2"
                                disabled style="overflow-y: scroll; height: 63px;" v-model="tokenModelPath"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <div class="stretch">
                <button class="lg primary" @click="startTokenExtraction" v-if="!tokenExtractionRunning">
                    开启语义token提取</button>
                <button class="lg primary hidden" @click="stopTokenExtraction" v-else> 终止语义token提取进程</button>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">语义token提取进程输出信息</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                disabled style="overflow-y: scroll; height: 42px;"
                                v-model="tokenProcessOutput"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- 训练集格式化一键三连 -->
        <div class="block padded hide-container"
            style="border-style: solid; overflow: visible; min-width: min(0px, 100%);">
            <div>
                <div class="prose" data-testid="markdown" dir="ltr">
                    <span class="md">
                        <p>1Aabc-训练集格式化一键三连</p>
                    </span>
                </div>
            </div>
        </div>

        <div class="stretch">
            <div class="stretch">
                <button class="lg primary" @click="startAllProcess" v-if="!allProcessRunning"> 开启一键三连</button>
                <button class="lg primary hidden" @click="stopAllProcess" v-else> 终止一键三连</button>
            </div>
            <div class="stretch">
                <div class="form" style="flex-grow: 1; min-width: min(160px, 100%);">
                    <div class="block padded"
                        style="border-style: solid; overflow: hidden; min-width: min(160px, 100%);">
                        <label class="container">
                            <span data-testid="block-info">一键三连进程输出信息</span>
                            <textarea data-testid="textbox" class="scroll-hide" dir="ltr" placeholder="" rows="1"
                                disabled style="overflow-y: scroll; height: 42px;"
                                v-model="allProcessOutput"></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 基础配置
const textAnnotationFile = ref('');
const audioDir = ref('');

// 文本内容相关
const gpuIds = ref('0');
const bertModelPath = ref('/path/to/bert/model.pth');
const textExtractionRunning = ref(false);
const textProcessOutput = ref('');

// SSL相关
const sslGpuIds = ref('0');
const sslModelPath = ref('/path/to/ssl/model.pth');
const sslRunning = ref(false);
const sslProcessOutput = ref('');

// 语义token相关
const tokenGpuIds = ref('0');
const tokenModelPath = ref('/path/to/sovits/g/model.pth');
const tokenExtractionRunning = ref(false);
const tokenProcessOutput = ref('');

// 一键三连相关
const allProcessRunning = ref(false);
const allProcessOutput = ref('');

// 文本提取操作
const startTextExtraction = () => {
    if (!textAnnotationFile.value) {
        textProcessOutput.value = '错误: 请指定文本标注文件';
        return;
    }

    textExtractionRunning.value = true;
    textProcessOutput.value = '正在初始化文本提取...';

    // 模拟文本提取过程
    setTimeout(() => {
        textProcessOutput.value = '正在加载BERT模型...';
        setTimeout(() => {
            textProcessOutput.value = '正在处理文本数据...';
            setTimeout(() => {
                textProcessOutput.value = '文本提取完成';
                textExtractionRunning.value = false;
            }, 2000);
        }, 1500);
    }, 1000);
};

const stopTextExtraction = () => {
    textExtractionRunning.value = false;
    textProcessOutput.value = '文本提取已终止';
};

// SSL提取操作
const startSSL = () => {
    if (!textAnnotationFile.value) {
        sslProcessOutput.value = '错误: 请先完成文本提取';
        return;
    }

    sslRunning.value = true;
    sslProcessOutput.value = '正在初始化SSL特征提取...';

    // 模拟SSL提取过程
    setTimeout(() => {
        sslProcessOutput.value = '正在加载SSL模型...';
        setTimeout(() => {
            sslProcessOutput.value = '正在提取音频特征...';
            setTimeout(() => {
                sslProcessOutput.value = 'SSL特征提取完成';
                sslRunning.value = false;
            }, 2500);
        }, 1500);
    }, 1000);
};

const stopSSL = () => {
    sslRunning.value = false;
    sslProcessOutput.value = 'SSL特征提取已终止';
};

// 语义token提取操作
const startTokenExtraction = () => {
    if (!sslProcessOutput.value.includes('完成')) {
        tokenProcessOutput.value = '错误: 请先完成SSL特征提取';
        return;
    }

    tokenExtractionRunning.value = true;
    tokenProcessOutput.value = '正在初始化语义token提取...';

    // 模拟token提取过程
    setTimeout(() => {
        tokenProcessOutput.value = '正在加载SoVITS-G模型...';
        setTimeout(() => {
            tokenProcessOutput.value = '正在提取语义token...';
            setTimeout(() => {
                tokenProcessOutput.value = '语义token提取完成';
                tokenExtractionRunning.value = false;
            }, 2000);
        }, 1500);
    }, 1000);
};

const stopTokenExtraction = () => {
    tokenExtractionRunning.value = false;
    tokenProcessOutput.value = '语义token提取已终止';
};

// 一键三连操作
const startAllProcess = () => {
    if (!textAnnotationFile.value) {
        allProcessOutput.value = '错误: 请指定文本标注文件';
        return;
    }

    allProcessRunning.value = true;
    allProcessOutput.value = '一键三连启动中...';

    // 模拟一键三连过程
    let steps = [
        '正在进行文本内容提取...',
        '文本内容提取完成',
        '正在进行SSL特征提取...',
        'SSL特征提取完成',
        '正在进行语义token提取...',
        '语义token提取完成',
        '全部处理完成!'
    ];

    let currentStep = 0;
    const processInterval = setInterval(() => {
        allProcessOutput.value = steps[currentStep];
        currentStep++;

        if (currentStep >= steps.length) {
            clearInterval(processInterval);
            allProcessRunning.value = false;
        }
    }, 1500);
};

const stopAllProcess = () => {
    allProcessRunning.value = false;
    allProcessOutput.value = '一键三连已终止';
};

// 初始化模型路径
onMounted(() => {
    // 这里可以从父组件获取路径或从API获取
    bertModelPath.value = 'pretrained_models/bert/chinese-roberta-wwm-ext';
    sslModelPath.value = 'pretrained_models/ssl/wav2vec_small.pt';
    tokenModelPath.value = 'pretrained_models/sovits/sovits_g.pth';
});
</script>
