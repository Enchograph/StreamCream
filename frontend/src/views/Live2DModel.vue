<template>
    <div class="live-preview">
        <!-- <button @click="mouthFn">嘴型变换</button>
        <button @click="randomMotionFn">随机动作</button>
        <label for="expression-select">表情:</label>
        <select v-model="selectedExpression" @change="applyExpression" id="expression-select">
            <option v-for="name in expressionNames" :key="name" :value="name">{{ name }}</option>
        </select> -->
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
    });

// 组件卸载前销毁 PIXI 应用，释放资源
onBeforeUnmount(() => {
    if (app) {
        app.destroy(true, true); // 销毁 PIXI 应用和所有子对象
    }
    app = null;
    model = null;
});

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
    // 加载 Live2D 模型（Haru），autoInteract 设为 false 禁用默认交互
    model = await Live2DModel.from("live2d/Mao/Mao.model3.json", {
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
</style>
