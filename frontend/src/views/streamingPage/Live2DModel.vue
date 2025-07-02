<template>
    <div class="live-preview">
        <!-- 嘴型变换按钮，点击后调用 mouthFn 方法 -->
        <button @click="mouthFn">嘴型变换</button>
        <!-- 随机动作按钮，点击后调用 randomMotionFn 方法 -->
        <button @click="randomMotionFn">随机动作</button>
        <!-- 音频同步控制 -->
        <button @click="toggleAudioSync" :class="{ active: isAudioSyncActive }">
            {{ isAudioSyncActive ? '停止音频同步' : '开始音频同步' }}
        </button>
        <!-- 音频文件上传 -->
        <input type="file" ref="audioFileInput" @change="loadAudioFile" accept="audio/*" style="display: none">
        <button @click="$refs.audioFileInput.click()">选择音频文件</button>
        <!-- 表情选择下拉框，绑定 selectedExpression，切换时调用 applyExpression 方法 -->
        <label for="expression-select">表情:</label>
        <select v-model="selectedExpression" @change="applyExpression" id="expression-select">
            <!-- 遍历 expressionNames 数组生成选项 -->
            <option v-for="name in expressionNames" :key="name" :value="name">{{ name }}</option>
        </select>
        
        <!-- 画布容器 -->
        <div class="canvasWrap" :style="aspectRatioStyle">
            <!-- 用于渲染 Live2D 模型的 canvas -->
            <canvas id="myCanvas" />
        </div>
        <button @click="resetModel">重置模型位置</button>
    </div>
</template>

<script setup>
// 引入 Vue 的生命周期钩子和响应式 API
import { onMounted, onBeforeUnmount, ref, computed, watch } from "vue";
// 引入 PIXI.js
import * as PIXI from "pixi.js";
// 引入 pixi-live2d-display-lipsyncpatch 的 Live2DModel
import { Live2DModel } from "pixi-live2d-display-lipsyncpatch";
// 引入Live2D状态管理
import { useLive2DStore } from "../stores/live2d";

// 组件属性
const props = defineProps({
    resolution: {
        type: String,
        default: '1920x1080'
    }
});

// 获取实际使用的分辨率
const effectiveResolution = computed(() => {
    const live2DStore = useLive2DStore();
    return live2DStore.resolution || props.resolution;
});

// 计算宽高比样式
const aspectRatioStyle = computed(() => {
    const [width, height] = effectiveResolution.value.split('x').map(Number);
    const ratio = width / height;
    return {
        'aspect-ratio': `${width}/${height}`,
        'max-width': '100%',
        'max-height': '100%'
    };
});

// 将 PIXI 挂载到全局 window，部分库可能需要
window.PIXI = PIXI;

// 声明 PIXI 应用和 Live2D 模型的变量
let app;
let model;

// 使用Live2D状态管理
const live2DStore = useLive2DStore();

// 判断是否在iframe中加载
const isIframe = ref(window.self !== window.top);

// 音频相关变量
let audioContext;
let analyser;
let audioSource;
let isAudioSyncActive = ref(false);
let animationId;
let audioElement;
let lastAudioActivity = 0; // 记录上次音频活动时间
let audioActivityThreshold = 0.05; // 音频活动阈值

// 嘴型同步相关变量
let mouthOpenHistory = []; // 嘴型开合历史数据
let vowelDetector = null; // 元音检测器
let frameCount = 0; // 帧计数器
let lastVowelChange = 0; // 上次元音变化时间
let currentVowelDuration = 0; // 当前元音持续时间
let mouthVariationTimer = 0; // 嘴型变化计时器
let mouthVibrationPhase = 0; // 嘴型震动相位

// 元音频率范围定义 (Hz)
const vowelFrequencies = {
    'A': [600, 1200],   // 啊
    'E': [400, 2000],   // 诶
    'I': [300, 2200],   // 衣
    'O': [500, 800],    // 哦
    'U': [300, 600],    // 乌
    'AI': [500, 1500],  // 爱
    'AO': [400, 1000],  // 奥
    'EI': [350, 1800],  // 诶
    'OU': [400, 700]    // 欧
};

// 嘴型参数映射
const mouthParameters = {
    'ParamMouthOpenY': 0,      // 嘴型开合
    'ParamMouthForm': 0,       // 嘴型形状
    'ParamMouthOpenWidth': 0,  // 嘴型宽度
    'ParamMouthSmile': 0,      // 微笑
    'ParamMouthFrown': 0       // 撇嘴
};

// 可用表情名称数组
const expressionNames = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08'];
// 当前选中的表情，使用 ref 创建响应式变量
const selectedExpression = ref(expressionNames[0]);

// 监听分辨率变化
watch(() => live2DStore.resolution, () => {
    if (app) {
        app.destroy(true, true);
    }
    init();
});

// 组件挂载时初始化 PIXI 应用和 Live2D 模型
onMounted(() => {
    live2DStore.loadState();
    init();
<<<<<<< HEAD
    initAudioContext();
=======
>>>>>>> 95d189a5c3389c896ef9142f57b74334f8ad99c4
});

// 组件卸载前销毁 PIXI 应用，释放资源
onBeforeUnmount(() => {
    if (app) {
        app.destroy(true, true); // 销毁 PIXI 应用和所有子对象
    }
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (audioContext) {
        audioContext.close();
    }
    app = null;
    model = null;
});

// 初始化音频上下文
const initAudioContext = () => {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        
        // 优化音频分析器设置
        analyser.fftSize = 1024; // 增加FFT大小，提高频率分辨率
        analyser.smoothingTimeConstant = 0.4; // 减少平滑时间，提高响应速度
        analyser.minDecibels = -90; // 设置最小分贝
        analyser.maxDecibels = -10; // 设置最大分贝
        
        // 初始化元音检测器
        initVowelDetector();
        
    } catch (error) {
        console.error('音频上下文初始化失败:', error);
    }
};

// 初始化元音检测器
const initVowelDetector = () => {
    vowelDetector = {
        formants: [], // 共振峰
        dominantVowel: null, // 主导元音
        confidence: 0 // 置信度
    };
};

// 检测音频中的共振峰
const detectFormants = (frequencyData, sampleRate) => {
    const formants = [];
    const binSize = sampleRate / (analyser.frequencyBinCount * 2);
    
    // 寻找局部最大值作为共振峰
    for (let i = 2; i < frequencyData.length - 2; i++) {
        const current = frequencyData[i];
        const prev1 = frequencyData[i - 1];
        const prev2 = frequencyData[i - 2];
        const next1 = frequencyData[i + 1];
        const next2 = frequencyData[i + 2];
        
        // 检查是否为局部最大值
        if (current > prev1 && current > prev2 && current > next1 && current > next2) {
            const frequency = i * binSize;
            const amplitude = current / 255; // 归一化到0-1
            
            // 只保留人声频率范围内的共振峰 (80Hz - 3000Hz)
            if (frequency >= 80 && frequency <= 3000 && amplitude > 0.1) {
                formants.push({
                    frequency: frequency,
                    amplitude: amplitude
                });
            }
        }
    }
    
    // 按振幅排序，取前3个最强的共振峰
    formants.sort((a, b) => b.amplitude - a.amplitude);
    return formants.slice(0, 3);
};

// 识别元音类型
const identifyVowel = (formants) => {
    if (formants.length < 2) return { vowel: null, confidence: 0 };
    
    const f1 = formants[0]?.frequency || 0; // 第一共振峰
    const f2 = formants[1]?.frequency || 0; // 第二共振峰
    
    let bestVowel = null;
    let bestConfidence = 0;
    
    // 计算与每个元音的匹配度，提高灵敏度
    for (const [vowel, [f1Range, f2Range]] of Object.entries(vowelFrequencies)) {
        // 使用更宽松的匹配算法，提高灵敏度
        const f1Match = Math.max(0, 1 - Math.abs(f1 - f1Range) / (f1Range * 1.5));
        const f2Match = Math.max(0, 1 - Math.abs(f2 - f2Range) / (f2Range * 1.5));
        const confidence = (f1Match + f2Match) / 2;
        
        if (confidence > bestConfidence) {
            bestConfidence = confidence;
            bestVowel = vowel;
        }
    }
    
    // 降低置信度阈值，提高灵敏度
    if (bestConfidence < 0.2) {
        // 即使置信度较低，也尝试识别基本元音
        if (f1 < 400 && f2 < 1000) bestVowel = 'U';
        else if (f1 < 500 && f2 < 1200) bestVowel = 'O';
        else if (f1 > 600 && f2 > 1500) bestVowel = 'A';
        else if (f1 > 400 && f2 > 1800) bestVowel = 'E';
        else if (f1 < 400 && f2 > 2000) bestVowel = 'I';
        
        bestConfidence = Math.max(bestConfidence, 0.3);
    }
    
    return {
        vowel: bestVowel,
        confidence: bestConfidence
    };
};

// 计算嘴型开合大小
const calculateMouthOpen = (frequencyData, formants) => {
    // 计算整体音频强度
    let totalIntensity = 0;
    let validSamples = 0;
    
    // 主要关注人声频率范围 (85Hz-255Hz)
    const startIndex = Math.floor(85 * analyser.frequencyBinCount / (audioContext.sampleRate / 2));
    const endIndex = Math.floor(255 * analyser.frequencyBinCount / (audioContext.sampleRate / 2));
    
    for (let i = startIndex; i < endIndex && i < frequencyData.length; i++) {
        if (frequencyData[i] > 10) {
            totalIntensity += frequencyData[i];
            validSamples++;
        }
    }
    
    const averageIntensity = validSamples > 0 ? totalIntensity / validSamples : 0;
    
    // 使用对数映射处理音频强度
    const normalizedIntensity = Math.log10(averageIntensity + 1) / Math.log10(256);
    
    // 根据共振峰强度调整嘴型开合
    let formantBoost = 1;
    if (formants.length > 0) {
        const maxFormantAmplitude = Math.max(...formants.map(f => f.amplitude));
        formantBoost = 1 + maxFormantAmplitude * 0.5;
    }
    
    // 计算最终嘴型开合值
    const baseMouthOpen = normalizedIntensity * formantBoost;
    const threshold = 0.08;
    const filteredMouthOpen = baseMouthOpen > threshold ? baseMouthOpen : 0;
    
    // 限制最大开合程度
    const maxMouthOpen = 0.6;
    return Math.min(filteredMouthOpen, maxMouthOpen);
};

// 计算嘴型形状参数
const calculateMouthForm = (vowel, confidence) => {
    if (!vowel || confidence < 0.2) return 0; // 降低阈值，提高灵敏度
    
    // 扩展的嘴型形状映射
    const vowelShapes = {
        'A': 0.8,   // 啊 - 嘴巴张大
        'E': 0.6,   // 诶 - 嘴巴中等
        'I': 0.3,   // 衣 - 嘴巴较小
        'O': 0.7,   // 哦 - 嘴巴圆形
        'U': 0.2,   // 乌 - 嘴巴最小
        'AI': 0.75, // 爱 - 嘴巴较大
        'AO': 0.65, // 奥 - 嘴巴中等偏大
        'EI': 0.55, // 诶 - 嘴巴中等偏小
        'OU': 0.6   // 欧 - 嘴巴中等
    };
    
    return vowelShapes[vowel] || 0;
};

// 初始化函数，创建 PIXI 应用并加载 Live2D 模型
const init = async () => {
    const [width, height] = effectiveResolution.value.split('x').map(Number);

    // 销毁现有应用（如果存在）
    if (app) {
        app.destroy(true, true);
    }

    const container = document.querySelector('.canvasWrap');
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    app = new PIXI.Application({
        view: document.querySelector("#myCanvas"),
        autoStart: true,
        width: containerWidth,
        height: containerHeight,
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    });

    // 添加背景图片
    const bgDiv = document.createElement('div');
    bgDiv.className = 'background-image';
    bgDiv.style.backgroundImage = 'url(/api/get-background)';
    bgDiv.style.backgroundSize = 'cover';
    bgDiv.style.backgroundPosition = 'center';
    bgDiv.style.position = 'absolute';
    bgDiv.style.width = '100%';
    bgDiv.style.height = '100%';
    bgDiv.style.zIndex = '0';
    document.querySelector('.canvasWrap').prepend(bgDiv);

    // 确保canvas在背景之上
    const canvas = document.getElementById('myCanvas');
    canvas.style.position = 'relative';
    canvas.style.zIndex = '1';
<<<<<<< HEAD
    // 加载 Live2D 模型（Mao），autoInteract 设为 false 禁用默认交互
    model = await Live2DModel.from("live2d/Haru/Haru.model3.json", {
=======

    // 加载 Live2D 模型（Haru），autoInteract 设为 false 禁用默认交互
    model = await Live2DModel.from("live2d/Mao/Mao.model3.json", {
>>>>>>> 95d189a5c3389c896ef9142f57b74334f8ad99c4
        autoHitTest: false,
        autoFocus: false
    });

    // 启用拖动功能
    model.buttonMode = true;
    model.interactive = true;

    let isDragging = false;
    let lastPosition = { x: live2DStore.position.x, y: live2DStore.position.y };
    let containerRect = document.querySelector('.canvasWrap').getBoundingClientRect();

    // 鼠标按下开始拖动
    model.on('pointerdown', (e) => {
        isDragging = true;
        const rect = document.querySelector('#myCanvas').getBoundingClientRect();
        lastPosition = {
            x: (e.data.global.x - rect.left) / rect.width,
            y: (e.data.global.y - rect.top) / rect.height
        };
    });

    // 鼠标移动时拖动模型
    model.on('pointermove', (e) => {
        if (isDragging) {
            const rect = document.querySelector('#myCanvas').getBoundingClientRect();
            const newPosition = {
                x: (e.data.global.x - rect.left) / rect.width,
                y: (e.data.global.y - rect.top) / rect.height
            };

            model.x += (newPosition.x - lastPosition.x) * rect.width;
            model.y += (newPosition.y - lastPosition.y) * rect.height;
            lastPosition = newPosition;

            // 保存相对位置
            live2DStore.position = {
                x: (model.x - rect.left) / rect.width,
                y: (model.y - rect.top) / rect.height
            };
        }
    });

    // 鼠标释放停止拖动
    model.on('pointerup', () => {
        isDragging = false;
        const rect = document.querySelector('#myCanvas').getBoundingClientRect();
        live2DStore.position = {
            x: (model.x - rect.left) / rect.width,
            y: (model.y - rect.top) / rect.height
        };
        live2DStore.saveState(); // 保存状态到localStorage
    });

    model.on('pointerupoutside', () => {
        isDragging = false;
    });

    // 滚轮缩放功能
    document.querySelector('#myCanvas').addEventListener('wheel', (e) => {
        e.preventDefault();

        const delta = e.deltaY > 0 ? 0.95 : 1.05;
        // model.scale.set(model.scale.x * delta);

        const newScale = model.scale.x * delta;
        model.scale.set(newScale, newScale);
        live2DStore.saveState();
    });

    // 缩放和位置调整
    const rect = document.querySelector('#myCanvas').getBoundingClientRect();
    model.x = rect.left + lastPosition.x * rect.width;
    model.y = rect.top + lastPosition.y * rect.height;

    // 根据容器尺寸统一调整模型大小
    const initialScale = (containerWidth * live2DStore.relativeScale) / model.width;
    model.scale.set(initialScale);
    live2DStore.saveState();

    // 将模型添加到舞台
    app.stage.addChild(model);
};

// 加载音频文件
const loadAudioFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        // 创建音频元素
        audioElement = new Audio();
        audioElement.src = URL.createObjectURL(file);
        
        // 等待音频加载
        await new Promise((resolve, reject) => {
            audioElement.addEventListener('canplaythrough', resolve);
            audioElement.addEventListener('error', reject);
        });

        // 连接到音频分析器
        if (audioContext && analyser) {
            audioSource = audioContext.createMediaElementSource(audioElement);
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
        }

        console.log('音频文件加载成功');
    } catch (error) {
        console.error('音频文件加载失败:', error);
    }
};

// 切换音频同步状态
const toggleAudioSync = () => {
    if (!audioElement || !analyser) {
        alert('请先选择音频文件');
        return;
    }

    if (isAudioSyncActive.value) {
        // 停止音频同步
        stopAudioSync();
    } else {
        // 开始音频同步
        startAudioSync();
    }
};

// 开始音频同步
const startAudioSync = () => {
    if (!audioElement || !analyser) return;

    isAudioSyncActive.value = true;
    
    // 如果音频没有在播放，开始播放
    if (audioElement.paused) {
        audioElement.play();
    }
    
    updateMouthSync();
};

// 停止音频同步
const stopAudioSync = () => {
    isAudioSyncActive.value = false;
    
    if (audioElement && !audioElement.paused) {
        audioElement.pause();
    }
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // 平滑地重置嘴型到闭合状态
    if (model) {
        const currentMouthValue = model.internalModel.coreModel.getParameterValueById("ParamMouthOpenY");
        if (currentMouthValue > 0.02) {
            // 使用动画帧平滑闭合嘴巴
            const closeMouth = () => {
                const newValue = currentMouthValue * 0.9;
                if (newValue > 0.02) {
                    model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", newValue);
                    requestAnimationFrame(closeMouth);
                } else {
                    model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", 0.02);
                }
            };
            closeMouth();
        } else {
            model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", 0.02);
        }
    }
    
    // 重置音频活动状态
    lastAudioActivity = 0;
};

// 更新嘴型同步
const updateMouthSync = () => {
    if (!isAudioSyncActive.value || !analyser || !model || !audioElement) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    // 检测共振峰
    const formants = detectFormants(dataArray, audioContext.sampleRate);
    
    // 识别元音类型
    const vowelResult = identifyVowel(formants);
    
    // 计算嘴型开合大小
    const mouthOpenValue = calculateMouthOpen(dataArray, formants);
    
    // 计算嘴型形状
    const mouthFormValue = calculateMouthForm(vowelResult.vowel, vowelResult.confidence);
    
    // 检测音频活动
    const currentTime = Date.now();
    if (mouthOpenValue > audioActivityThreshold) {
        lastAudioActivity = currentTime;
    }
    
    // 如果超过600ms没有音频活动，逐渐闭合嘴巴（提高灵敏度）
    const timeSinceLastActivity = currentTime - lastAudioActivity;
    if (timeSinceLastActivity > 600) {
        const currentMouthValue = model.internalModel.coreModel.getParameterValueById("ParamMouthOpenY");
        const closedMouthValue = Math.max(currentMouthValue * 0.85, 0); // 完全闭合，最小值为0
        
        model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", closedMouthValue);
        
        // 重置嘴型形状
        model.internalModel.coreModel.setParameterValueById("ParamMouthForm", 0);
        model.internalModel.coreModel.setParameterValueById("ParamMouthOpenWidth", 0.5);
        model.internalModel.coreModel.setParameterValueById("ParamMouthSmile", 0);
        model.internalModel.coreModel.setParameterValueById("ParamMouthFrown", 0);
        
        // 重置变化计时器
        mouthVariationTimer = 0;
        lastVowelChange = currentTime;
        mouthVibrationPhase = 0; // 重置震动相位
        
        animationId = requestAnimationFrame(updateMouthSync);
        return;
    }
    
    // 检测元音变化
    const lastVowel = vowelDetector?.dominantVowel;
    if (vowelResult.vowel !== lastVowel) {
        lastVowelChange = currentTime;
        currentVowelDuration = 0;
        mouthVariationTimer = 0;
    } else {
        currentVowelDuration = currentTime - lastVowelChange;
    }
    
    // 更新元音检测器状态
    vowelDetector.formants = formants;
    vowelDetector.dominantVowel = vowelResult.vowel;
    vowelDetector.confidence = vowelResult.confidence;
    
    // 获取当前嘴型参数值
    const currentMouthOpen = model.internalModel.coreModel.getParameterValueById("ParamMouthOpenY");
    const currentMouthForm = model.internalModel.coreModel.getParameterValueById("ParamMouthForm");
    const currentMouthWidth = model.internalModel.coreModel.getParameterValueById("ParamMouthOpenWidth");
    const currentMouthSmile = model.internalModel.coreModel.getParameterValueById("ParamMouthSmile") || 0;
    const currentMouthFrown = model.internalModel.coreModel.getParameterValueById("ParamMouthFrown") || 0;
    
    // 应用更快的平滑插值，提高灵敏度
    const smoothFactor = 0.15; // 降低平滑因子，让变化更缓慢自然，避免闪烁
    
    // 计算基础嘴型参数值
    let newMouthOpen = currentMouthOpen + (mouthOpenValue - currentMouthOpen) * smoothFactor;
    let newMouthForm = currentMouthForm + (mouthFormValue - currentMouthForm) * smoothFactor;
    
    // 根据元音类型调整嘴型宽度和形状
    let targetMouthWidth = 0.5; // 默认宽度
    let targetMouthForm = newMouthForm;
    let targetMouthSmile = 0;
    let targetMouthFrown = 0;
    
    if (vowelResult.vowel) {
        // 扩展的元音嘴型配置
        const vowelWidths = {
            'A': 0.8,   // 啊 - 嘴巴宽
            'E': 0.6,   // 诶 - 嘴巴中等
            'I': 0.3,   // 衣 - 嘴巴窄
            'O': 0.7,   // 哦 - 嘴巴圆形
            'U': 0.2,   // 乌 - 嘴巴最窄
            'AI': 0.75, // 爱 - 嘴巴较宽
            'AO': 0.65, // 奥 - 嘴巴中等偏宽
            'EI': 0.55, // 诶 - 嘴巴中等偏窄
            'OU': 0.6   // 欧 - 嘴巴中等
        };
        const vowelForms = {
            'A': 0.8,   // 啊 - 嘴型圆
            'E': 0.5,   // 诶 - 嘴型中等
            'I': 0.2,   // 衣 - 嘴型扁
            'O': 0.7,   // 哦 - 嘴型偏圆
            'U': 0.1,   // 乌 - 嘴型最扁
            'AI': 0.75, // 爱 - 嘴型较圆
            'AO': 0.65, // 奥 - 嘴型中等偏圆
            'EI': 0.45, // 诶 - 嘴型中等偏扁
            'OU': 0.55  // 欧 - 嘴型中等
        };
        
        // 根据元音类型添加表情变化
        const vowelExpressions = {
            'A': { smile: 0.1, frown: 0 },    // 啊 - 轻微微笑
            'E': { smile: 0.05, frown: 0 },   // 诶 - 很轻微微笑
            'I': { smile: 0, frown: 0.1 },    // 衣 - 轻微撇嘴
            'O': { smile: 0.15, frown: 0 },   // 哦 - 微笑
            'U': { smile: 0, frown: 0.2 },    // 乌 - 撇嘴
            'AI': { smile: 0.2, frown: 0 },   // 爱 - 明显微笑
            'AO': { smile: 0.1, frown: 0 },   // 奥 - 轻微微笑
            'EI': { smile: 0.05, frown: 0.05 }, // 诶 - 中性
            'OU': { smile: 0.08, frown: 0 }   // 欧 - 轻微微笑
        };
        
        targetMouthWidth = vowelWidths[vowelResult.vowel] || 0.5;
        targetMouthForm = vowelForms[vowelResult.vowel] || newMouthForm;
        targetMouthSmile = vowelExpressions[vowelResult.vowel]?.smile || 0;
        targetMouthFrown = vowelExpressions[vowelResult.vowel]?.frown || 0;
    }
    
    // 添加动态变化机制，避免同一个口型长时间保持
    mouthVariationTimer += 16; // 假设60fps，每帧约16ms
    
    // 每200-400ms添加一次随机变化
    if (mouthVariationTimer > 200 + Math.random() * 200) {
        mouthVariationTimer = 0;
        
        // 添加随机微调
        const randomVariation = (Math.random() - 0.5) * 0.1;
        const timeBasedVariation = Math.sin(currentTime / 100) * 0.05;
        
        // 根据持续时间调整变化强度
        let variationIntensity = 0.05;
        if (currentVowelDuration > 1000) variationIntensity = 0.15; // 1秒后增加变化
        if (currentVowelDuration > 2000) variationIntensity = 0.25; // 2秒后大幅变化
        
        // 应用变化到嘴型参数
        newMouthOpen += (randomVariation + timeBasedVariation) * variationIntensity;
        targetMouthWidth += (Math.random() - 0.5) * 0.1 * variationIntensity;
        targetMouthForm += (Math.random() - 0.5) * 0.1 * variationIntensity;
        
        // 表情也添加微调
        targetMouthSmile += (Math.random() - 0.5) * 0.05 * variationIntensity;
        targetMouthFrown += (Math.random() - 0.5) * 0.05 * variationIntensity;
    }
    
    // 添加嘴型震动效果
    mouthVibrationPhase += 0.2; // 降低震动频率
    const vibrationAmplitude = Math.min(newMouthOpen * 0.05, 0.02); // 大幅降低震动幅度，最大不超过0.02
    const vibration = Math.sin(mouthVibrationPhase) * vibrationAmplitude;
    
    // 只在嘴型开合较大时添加震动
    if (newMouthOpen > 0.15) { // 提高触发阈值，只在嘴型开合较大时震动
        newMouthOpen += vibration;
    }
    
    // 如果同一个元音持续时间过长，强制切换
    if (currentVowelDuration > 3000) { // 3秒后强制变化
        const alternativeVowels = ['A', 'E', 'I', 'O', 'U'];
        const randomVowel = alternativeVowels[Math.floor(Math.random() * alternativeVowels.length)];
        
        // 临时切换到随机元音
        const tempVowelWidths = { 'A': 0.8, 'E': 0.6, 'I': 0.3, 'O': 0.7, 'U': 0.2 };
        const tempVowelForms = { 'A': 0.8, 'E': 0.5, 'I': 0.2, 'O': 0.7, 'U': 0.1 };
        
        targetMouthWidth = tempVowelWidths[randomVowel] || 0.5;
        targetMouthForm = tempVowelForms[randomVowel] || 0.5;
        
        // 重置计时器
        lastVowelChange = currentTime;
        currentVowelDuration = 0;
    }
    
    const newMouthWidth = currentMouthWidth + (targetMouthWidth - currentMouthWidth) * smoothFactor;
    const finalMouthForm = currentMouthForm + (targetMouthForm - currentMouthForm) * smoothFactor;
    const newMouthSmile = currentMouthSmile + (targetMouthSmile - currentMouthSmile) * smoothFactor;
    const newMouthFrown = currentMouthFrown + (targetMouthFrown - currentMouthFrown) * smoothFactor;
    
    // 添加最小阈值，避免嘴型完全闭合
    const minMouthOpen = 0; // 允许完全闭合
    const finalMouthOpen = Math.max(newMouthOpen, minMouthOpen);
    
    // 设置嘴型参数
    model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", finalMouthOpen);
    model.internalModel.coreModel.setParameterValueById("ParamMouthForm", finalMouthForm);
    model.internalModel.coreModel.setParameterValueById("ParamMouthOpenWidth", newMouthWidth);
    
    // 设置表情参数（如果模型支持）
    try {
        model.internalModel.coreModel.setParameterValueById("ParamMouthSmile", newMouthSmile);
        model.internalModel.coreModel.setParameterValueById("ParamMouthFrown", newMouthFrown);
    } catch (e) {
        // 如果模型不支持这些参数，忽略错误
    }
    
    // 继续下一帧
    animationId = requestAnimationFrame(updateMouthSync);
};

// 重置模型位置和大小
const resetModel = () => {
    if (!model) return;

    const rect = document.querySelector('#myCanvas').getBoundingClientRect();
    const containerWidth = rect.width;
    const initialScale = (containerWidth * live2DStore.relativeScale) / model.width;

    model.scale.set(initialScale);
    model.x = rect.width / 2;
    model.y = rect.height / 2;

    live2DStore.position = {
        x: 0.5,
        y: 0.5
    };
    live2DStore.saveState();
};

// 嘴型变换函数，随机设置嘴巴张开程度
const mouthFn = () => {
    if (!model) return;
    let n = Math.random(); // 生成 0~1 的随机数
    console.log("随机数0~1控制嘴巴Y轴高度-->", n);
    // 设置嘴巴张开参数
    model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", n);
};

// 随机动作函数，触发模型的 TapBody 动作
const randomMotionFn = () => {
    if (!model) return;
    model.motion('TapBody');
};

// 应用表情函数，根据下拉框选择切换模型表情
const applyExpression = () => {
    if (!model) return;
    model.expression(selectedExpression.value);
    live2DStore.currentExpression = selectedExpression.value;
};
</script>

<style scoped>
/* 画布样式，直接访问时固定分辨率，iframe嵌入时保持比例 */
#myCanvas {
    width: 100%;
    height: 100%;
    display: block;
}

.live-preview {
    width: 100%;
}

.canvasWrap {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

<<<<<<< HEAD
/* 按钮样式 */
button {
    margin: 5px;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: #f0f0f0;
}

button.active {
    background: #4CAF50;
    color: white;
    border-color: #4CAF50;
}

select {
    margin: 5px;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
}

label {
    margin: 5px;
    font-weight: bold;
=======


button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
>>>>>>> 95d189a5c3389c896ef9142f57b74334f8ad99c4
}
</style>
