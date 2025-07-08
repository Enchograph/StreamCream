<template>
    <div class="live-preview">
        <!-- 画布容器 -->
        <div class="canvasWrap" :style="aspectRatioStyle">
            <!-- 用于渲染 Live2D 模型的 canvas -->
            <canvas id="myCanvas" />
        </div>
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
import { ElMessage } from 'element-plus'

// 添加音频分析相关变量
let microphone;
let dataArray;


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

// 字幕同步相关变量
const currentSubtitle = ref(null);
const isSubtitleSyncing = ref(false);
const subtitleSyncStartTime = ref(0);

// 全局暂停状态控制
const isPaused = ref(false);

// 音频相关变量
let audioSource;
let isAudioSyncActive = ref(false);
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

// 监听模型变化
watch(() => live2DStore.currentModel, () => {
    if (app) {
        app.destroy(true, true);
    }
    init();
});

// 组件挂载时初始化 PIXI 应用和 Live2D 模型
onMounted(() => {
    live2DStore.loadState();
    init();
    initAudioContext();
    setupSubtitleListener(); // 设置字幕监听器
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('页面隐藏，暂停动画');
            pauseAllAnimations();
        } else {
            console.log('页面显示，恢复动画');
            resumeAllAnimations();
        }
    });
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', handleResize);
});

// 组件卸载前销毁 PIXI 应用，释放资源
onBeforeUnmount(() => {
    // 立即暂停所有动画
    pauseAllAnimations();
    
    if (app) {
        app.destroy(true, true); // 销毁 PIXI 应用和所有子对象
    }
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (audioContext) {
        audioContext.close();
    }
    
    // 移除事件监听器
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
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

// 添加背景图片
let bgDiv;
function setBgByPreference() {
    const bg = localStorage.getItem('bgPreference') || 'default';
    if (bgDiv) {
        if (bg === 'default') {
            bgDiv.style.backgroundImage = 'url(/api/get-background)';
        } else {
            bgDiv.style.backgroundImage = `url(/api/get-background?name=${encodeURIComponent(bg)})`;
        }
    }
}

// 初始化函数，创建 PIXI 应用并加载 Live2D 模型
const init = async () => {
    const [width, height] = effectiveResolution.value.split('x').map(Number);

    // 销毁现有应用（如果存在）
    if (app) {
        app.destroy(true, true);
    }

    const container = document.querySelector('.canvasWrap');
    const containerWidth = container.offsetWidth || window.innerWidth;
    const containerHeight = container.offsetHeight || window.innerHeight;

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
    bgDiv = document.createElement('div');
    bgDiv.className = 'background-image';
    setBgByPreference();
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

    // 加载 Live2D 模型，使用状态管理中的模型路径
    const modelPath = live2DStore.getCurrentModelPath();
    model = await Live2DModel.from(modelPath, {
        autoHitTest: false,
        autoFocus: false
    });

    // 初始化音频分析
    initAudioAnalysis();

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

    // 根据容器尺寸统一调整模型大小
    const initialScale = (containerWidth * live2DStore.relativeScale) / model.width;
    model.scale.set(initialScale);
    
    // 设置模型位置 - 使用保存的相对位置
    model.x = lastPosition.x * containerWidth;
    model.y = lastPosition.y * containerHeight;
    
    live2DStore.saveState();

    // 将模型添加到舞台
    app.stage.addChild(model);
};

// 监听storage事件，实时切换背景
window.addEventListener('storage', (e) => {
    if (e.key === 'bgPreference') {
        setBgByPreference();
    }
});

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
        ElMessage.warning('请先选择音频文件')
        return
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

    // 如果全局暂停，立即停止
    if (isPaused.value) {
        return;
    }

    // 如果字幕同步正在进行，暂停音频驱动的嘴型同步
    if (isSubtitleSyncing.value) {
        animationId = requestAnimationFrame(updateMouthSync);
        return;
    }

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

    // 如果超过600ms没有音频活动，逐渐设置嘴巴为轻微张开状态（提高灵敏度）
    const timeSinceLastActivity = currentTime - lastAudioActivity;
    if (timeSinceLastActivity > 600) {
        const currentMouthValue = model.internalModel.coreModel.getParameterValueById("ParamMouthOpenY");
        const targetMouthValue = Math.max(currentMouthValue * 0.85, 0.2); // 轻微张开，最小值为0.2

        model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", targetMouthValue);

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
    const minMouthOpen = 0.2; // 最小轻微张开
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

// 字幕驱动的嘴型同步更新函数 - 精细版本
const updateSubtitleSync = (timelineResult) => {
    // 如果全局暂停，立即停止
    if (isPaused.value) {
        isSubtitleSyncing.value = false;
        return;
    }
    
    if (!model || !timelineResult || !timelineResult.timeline) {
        isSubtitleSyncing.value = false;
        // 字幕同步结束时，让嘴巴回到轻微张开状态
        if (model) {
            model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", 0.2);
            model.internalModel.coreModel.setParameterValueById("ParamMouthForm", 0);
            model.internalModel.coreModel.setParameterValueById("ParamMouthOpenWidth", 0.5);
            try {
                model.internalModel.coreModel.setParameterValueById("ParamMouthSmile", 0);
                model.internalModel.coreModel.setParameterValueById("ParamMouthFrown", 0);
            } catch (e) {
                // 如果模型不支持这些参数，忽略错误
            }
        }
        return;
    }

    const currentTime = Date.now() - subtitleSyncStartTime.value;
    const timeline = timelineResult.timeline;
    
    // 存储timelineResult用于递归调用
    const currentTimelineResult = timelineResult;
    
    // 找到当前时间对应的timeline项
    let currentItem = null;
    let nextItem = null;
    let progress = 0; // 在当前时间轴项中的进度 (0-1)
    
    for (let i = 0; i < timeline.length; i++) {
        const item = timeline[i];
        if (currentTime >= item.start * 1000 && currentTime <= item.end * 1000) {
            currentItem = item;
            nextItem = timeline[i + 1] || null;
            // 计算在当前项中的进度
            const itemDuration = (item.end - item.start) * 1000;
            const elapsedInItem = currentTime - item.start * 1000;
            progress = Math.min(elapsedInItem / itemDuration, 1);
            break;
        }
    }
    
    // 如果超出时间范围，停止同步并设置嘴巴为轻微张开状态
    if (!currentItem || currentTime > timeline[timeline.length - 1].end * 1000) {
        isSubtitleSyncing.value = false;
        console.log('字幕同步结束，设置嘴巴为轻微张开状态');
        // 让嘴巴回到轻微张开状态
        if (model) {
            model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", 0.2);
            model.internalModel.coreModel.setParameterValueById("ParamMouthForm", 0);
            model.internalModel.coreModel.setParameterValueById("ParamMouthOpenWidth", 0.5);
            try {
                model.internalModel.coreModel.setParameterValueById("ParamMouthSmile", 0);
                model.internalModel.coreModel.setParameterValueById("ParamMouthFrown", 0);
            } catch (e) {
                // 如果模型不支持这些参数，忽略错误
            }
        }
        return;
    }
    
    // 扩展的精细元音嘴型配置 - 全小写版本
    const vowelConfigs = {
        // 基本元音
        'a': {
            openY: 0.8,      // 嘴巴开合度
            width: 0.7,      // 嘴巴宽度
            form: 0.8,       // 嘴型形状（圆形）
            smile: 0.1,      // 微笑程度
            frown: 0         // 撇嘴程度
        },
        'o': {
            openY: 0.7,
            width: 0.6,
            form: 0.7,
            smile: 0.15,
            frown: 0
        },
        'e': {
            openY: 0.6,
            width: 0.5,
            form: 0.5,
            smile: 0.05,
            frown: 0
        },
        'i': {
            openY: 0.4,
            width: 0.3,
            form: 0.2,
            smile: 0,
            frown: 0.1
        },
        'u': {
            openY: 0.3,
            width: 0.2,
            form: 0.1,
            smile: 0,
            frown: 0.2
        },
        'ü': {
            openY: 0.35,
            width: 0.25,
            form: 0.15,
            smile: 0,
            frown: 0.15
        },
        
        // 复合元音
        'ai': {
            openY: 0.75,     // ai - 爱
            width: 0.65,
            form: 0.7,
            smile: 0.2,
            frown: 0
        },
        'ao': {
            openY: 0.7,      // ao - 奥
            width: 0.6,
            form: 0.65,
            smile: 0.1,
            frown: 0
        },
        'ei': {
            openY: 0.55,     // ei - 诶
            width: 0.45,
            form: 0.45,
            smile: 0.05,
            frown: 0.05
        },
        'ou': {
            openY: 0.6,      // ou - 欧
            width: 0.5,
            form: 0.55,
            smile: 0.08,
            frown: 0
        },
        'ia': {
            openY: 0.6,      // ia - 呀
            width: 0.5,
            form: 0.5,
            smile: 0.1,
            frown: 0
        },
        'ie': {
            openY: 0.5,      // ie - 耶
            width: 0.4,
            form: 0.35,
            smile: 0.05,
            frown: 0.05
        },
        'ua': {
            openY: 0.65,     // ua - 哇
            width: 0.55,
            form: 0.6,
            smile: 0.15,
            frown: 0
        },
        'uo': {
            openY: 0.55,     // uo - 我
            width: 0.45,
            form: 0.5,
            smile: 0.1,
            frown: 0.05
        },
        
        // 特殊元音
        'an': {
            openY: 0.7,      // an - 安
            width: 0.6,
            form: 0.65,
            smile: 0.05,
            frown: 0
        },
        'en': {
            openY: 0.55,     // en - 恩
            width: 0.45,
            form: 0.4,
            smile: 0,
            frown: 0.05
        },
        'in': {
            openY: 0.35,     // in - 因
            width: 0.25,
            form: 0.15,
            smile: 0,
            frown: 0.1
        },
        'un': {
            openY: 0.25,     // un - 温
            width: 0.15,
            form: 0.05,
            smile: 0,
            frown: 0.15
        },
        'ang': {
            openY: 0.75,     // ang - 昂
            width: 0.65,
            form: 0.7,
            smile: 0.1,
            frown: 0
        },
        'eng': {
            openY: 0.6,      // eng - 英
            width: 0.5,
            form: 0.45,
            smile: 0,
            frown: 0.05
        },
        'ing': {
            openY: 0.4,      // ing - 英
            width: 0.3,
            form: 0.2,
            smile: 0,
            frown: 0.1
        },
        'ong': {
            openY: 0.65,     // ong - 翁
            width: 0.55,
            form: 0.6,
            smile: 0.05,
            frown: 0
        }
    };
    
    const vowel = currentItem.vowel;
    const config = vowelConfigs[vowel] || vowelConfigs['a'];
    
    // 如果有下一个时间轴项，进行平滑过渡
    let finalConfig = { ...config };
    if (nextItem && progress > 0.7) { // 在最后30%时间开始过渡
        const nextVowel = nextItem.vowel;
        const nextConfig = vowelConfigs[nextVowel] || vowelConfigs['a'];
        const transitionProgress = (progress - 0.7) / 0.3; // 0-1的过渡进度
        
        // 平滑插值
        finalConfig = {
            openY: config.openY + (nextConfig.openY - config.openY) * transitionProgress,
            width: config.width + (nextConfig.width - config.width) * transitionProgress,
            form: config.form + (nextConfig.form - config.form) * transitionProgress,
            smile: config.smile + (nextConfig.smile - config.smile) * transitionProgress,
            frown: config.frown + (nextConfig.frown - config.frown) * transitionProgress
        };
    }
    
    // 添加轻微动态变化效果（减少幅度）
    const time = currentTime / 1000; // 转换为秒
    const vibrationPhase = time * 4; // 降低震动频率
    const vibrationAmplitude = Math.min(finalConfig.openY * 0.01, 0.005); // 大幅降低震动幅度
    
    // 只在嘴型开合较大时添加轻微震动
    if (finalConfig.openY > 0.4) {
        finalConfig.openY += Math.sin(vibrationPhase) * vibrationAmplitude;
    }
    
    // 添加极轻微的随机微调（每500ms，减少频率）
    const variationTimer = Math.floor(time * 2); // 每0.5秒一个周期
    if (variationTimer !== Math.floor((time - 0.016) * 2)) { // 新周期
        const randomVariation = (Math.random() - 0.5) * 0.005; // 极小幅度的随机变化
        finalConfig.openY += randomVariation;
        finalConfig.width += randomVariation * 0.3;
    }
    
    // 确保参数在合理范围内
    finalConfig.openY = Math.max(0.2, Math.min(1.0, finalConfig.openY));
    finalConfig.width = Math.max(0.1, Math.min(1.0, finalConfig.width));
    finalConfig.form = Math.max(0.0, Math.min(1.0, finalConfig.form));
    finalConfig.smile = Math.max(0.0, Math.min(0.3, finalConfig.smile));
    finalConfig.frown = Math.max(0.0, Math.min(0.3, finalConfig.frown));
    
    // 应用所有嘴型参数
    try {
        model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", finalConfig.openY);
        model.internalModel.coreModel.setParameterValueById("ParamMouthOpenWidth", finalConfig.width);
        model.internalModel.coreModel.setParameterValueById("ParamMouthForm", finalConfig.form);
        model.internalModel.coreModel.setParameterValueById("ParamMouthSmile", finalConfig.smile);
        model.internalModel.coreModel.setParameterValueById("ParamMouthFrown", finalConfig.frown);
    } catch (e) {
        // 如果模型不支持某些参数，只设置基本参数
        model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", finalConfig.openY);
    }
    
    // 继续下一帧
    requestAnimationFrame(() => updateSubtitleSync(currentTimelineResult));
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

// 初始化音频分析
const initAudioAnalysis = async () => {
    // 尝试从全局事件总线获取音频元素
    if (window.live2DAudioElement) {
        window.audioElement = window.live2DAudioElement;
    } else {
        // 尝试直接查找页面中的音频元素
        window.audioElement = document.querySelector('audio');

        if (!window.audioElement) {
            console.warn('无法找到音频元素');
            return false;
        }
    }

    console.log('Initializing audio analysis...');
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        // 连接到分析器
        const source = audioContext.createMediaElementSource(window.audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        console.log('Audio analysis initialized successfully');
    } catch (error) {
        console.error('Failed to initialize audio analysis:', error);
        return false;
    }

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    // 开始分析音频
    analyzeAudio();
};

// 分析音频并调整嘴型
const analyzeAudio = () => {
    if (!model || !analyser) {
        console.warn('Model or analyser not ready, skipping audio analysis');
        return;
    }

    // 如果全局暂停，立即停止
    if (isPaused.value) {
        return;
    }

    // 如果字幕同步正在进行，暂停音频分析
    if (isSubtitleSyncing.value) {
        animationId = requestAnimationFrame(analyzeAudio);
        return;
    }

    analyser.getByteFrequencyData(dataArray);

    // 计算平均音量
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    const average = sum / dataArray.length;

    // 平滑处理音量值
    const smoothedValue = average / 255;

    // 添加音量阈值，避免微小噪音触发嘴型变化
    const threshold = 0.05;
    const mouthOpenValue = smoothedValue > threshold ? Math.min(smoothedValue, 1) : 0;

    // 设置嘴型参数
    console.log(`Setting mouth parameter to: ${mouthOpenValue.toFixed(2)}`);
    model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", mouthOpenValue);

    // 继续分析
    animationId = requestAnimationFrame(analyzeAudio);
};

const setupSubtitleListener = () => {
    console.log('设置字幕监听器...');
    
    // 监听localStorage变化
    window.addEventListener('storage', (event) => {
        console.log('立即收到localStorage变化事件:', event.key, event.newValue);
        if (event.key === 'live2d_current_subtitle') {
            if (event.newValue === null) {
                // 如果字幕被清空，立即暂停所有动画
                pauseAllAnimations();
            } else {
                // 如果有新字幕，恢复动画并处理
                resumeAllAnimations();
                handleSubtitleChange(event.newValue);
            }
        }
    });
    
    // 监听字幕更新事件
    window.addEventListener('subtitleUpdated', (event) => {
        console.log('收到字幕更新事件:', event.detail);
        handleSubtitleChange(JSON.stringify(event.detail));
    });
    
    // 监听字幕清空事件
    window.addEventListener('subtitleCleared', () => {
        console.log('立即收到字幕清空事件');
        // 立即暂停所有动画
        pauseAllAnimations();
    });
    
    // 延迟检查当前字幕，避免与storage事件冲突
    setTimeout(() => {
        const currentSubtitleStored = localStorage.getItem('live2d_current_subtitle');
        if (currentSubtitleStored) {
            handleSubtitleChange(currentSubtitleStored);
        }
    }, 100);
};

// 防重复处理机制
let lastProcessedSubtitle = null;
let lastProcessedTime = 0;

// 全局暂停控制函数
const pauseAllAnimations = () => {
    console.log('立即暂停所有动画...');
    isPaused.value = true;
    
    // 立即设置嘴巴为轻微张开状态
    if (model) {
        model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", 0.2);
        model.internalModel.coreModel.setParameterValueById("ParamMouthForm", 0);
        model.internalModel.coreModel.setParameterValueById("ParamMouthOpenWidth", 0.5);
        try {
            model.internalModel.coreModel.setParameterValueById("ParamMouthSmile", 0);
            model.internalModel.coreModel.setParameterValueById("ParamMouthFrown", 0);
        } catch (e) {
            // 如果模型不支持这些参数，忽略错误
        }
    }
    
    // 停止所有动画循环
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    // 重置所有状态
    isSubtitleSyncing.value = false;
    currentSubtitle.value = null;
    lastProcessedSubtitle = null;
    
    console.log('所有动画已立即暂停');
};

// 恢复动画
const resumeAllAnimations = () => {
    console.log('恢复动画...');
    isPaused.value = false;
};

// 处理窗口大小变化
const handleResize = () => {
    if (app) {
        const container = document.querySelector('.canvasWrap');
        const containerWidth = container.offsetWidth || window.innerWidth;
        const containerHeight = container.offsetHeight || window.innerHeight;
        
        // 调整PIXI应用尺寸
        app.renderer.resize(containerWidth, containerHeight);
        
        // 重新调整模型位置和大小
        if (model) {
            const rect = document.querySelector('#myCanvas').getBoundingClientRect();
            const initialScale = (containerWidth * live2DStore.relativeScale) / model.width;
            model.scale.set(initialScale);
            
            // 保持模型在用户之前设置的位置，而不是强制居中
            // 如果模型位置超出新容器范围，则调整到可见区域
            const maxX = containerWidth / 2;
            const maxY = containerHeight / 2;
            const minX = -containerWidth / 2;
            const minY = -containerHeight / 2;
            
            model.x = Math.max(minX, Math.min(maxX, model.x));
            model.y = Math.max(minY, Math.min(maxY, model.y));
        }
    }
};

// 改进的字幕时长估算函数
const estimateSubtitleDuration = (text) => {
    if (!text) return 1.0;
    
    let totalDuration = 0;
    const chars = text.split('');
    
    for (const char of chars) {
        if (char.trim()) {
            // 根据字符类型估算时长
            if (/[，。！？；：]/.test(char)) {
                totalDuration += 0.1; // 标点符号
            } else if (/[一二三四五六七八九十]/.test(char)) {
                totalDuration += 0.2; // 数字
            } else if (/[的地得着了过]/.test(char)) {
                totalDuration += 0.15; // 轻声字
            } else {
                totalDuration += 0.25; // 普通字符
            }
        } else {
            totalDuration += 0.05; // 空格
        }
    }
    
    // 添加一些缓冲时间
    return Math.max(totalDuration, 0.5);
};

const handleSubtitleChange = async (subtitleData) => {
    // 如果全局暂停，不处理字幕变化
    if (isPaused.value && subtitleData) {
        console.log('系统暂停中，忽略字幕变化');
        return;
    }
    
    if (!subtitleData) {
        // 立即暂停所有动画
        pauseAllAnimations();
        return;
    }
    
    try {
        const subtitle = JSON.parse(subtitleData);
        const currentTime = Date.now();
        
        // 防重复处理：如果相同字幕在100ms内重复处理，则跳过
        if (lastProcessedSubtitle === subtitle.text && 
            currentTime - lastProcessedTime < 100) {
            console.log('跳过重复字幕处理:', subtitle.text);
            return;
        }
        
        console.log('处理字幕变化:', subtitle);
        currentSubtitle.value = subtitle;
        lastProcessedSubtitle = subtitle.text;
        lastProcessedTime = currentTime;
        
        // 改进的字幕时长估算
        const estimatedDuration = estimateSubtitleDuration(subtitle.text);
        
        // 自动请求timeline
        try {
            console.log('请求字幕时间轴，文本:', subtitle.text, '时长:', estimatedDuration);
            const response = await fetch('http://localhost:5001/text2mouth_timeline', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: subtitle.text,
                    duration: estimatedDuration
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('字幕时间轴结果:', result);
                console.log(`文本: "${subtitle.text}"`);
                console.log(`字符数: ${subtitle.text.length}`);
                console.log(`时间轴项数: ${result.timeline.length}`);
                console.log(`总时长: ${estimatedDuration}秒`);
                
                // 显示详细的时间轴信息
                result.timeline.forEach((item, index) => {
                    console.log(`[${index}] ${item.char || ' '} (${item.vowel || '无元音'}) ${item.start.toFixed(2)}s-${item.end.toFixed(2)}s`);
                });
                
                // 自动驱动嘴型
                isSubtitleSyncing.value = true;
                subtitleSyncStartTime.value = Date.now();
                updateSubtitleSync(result);
            } else {
                console.error('请求字幕时间轴失败:', response.status, response.statusText);
            }
        } catch (e) {
            console.error('字幕驱动嘴型失败', e);
        }
    } catch (e) {
        console.error('解析字幕数据失败', e);
    }
};
</script>

<style>
/* 隐藏所有滚动条 */
*::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none !important;
}
* {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
}

/* 画布样式，直接访问时固定分辨率，iframe嵌入时保持比例 */
#myCanvas {
    width: 100%;
    height: 100%;
    display: block;
}

.live-preview {
    width: 100vw;
    height: 100vh;
    overflow: hidden !important;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.canvasWrap {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden !important;
    position: relative;
}

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
}
</style>
