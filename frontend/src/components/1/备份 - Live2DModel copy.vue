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

    const [canvasWidth, canvasHeight] = effectiveResolution.value.split('x').map(Number);
    app = new PIXI.Application({
        view: document.querySelector("#myCanvas"),
        autoStart: true,
        width: canvasWidth,
        height: canvasHeight,
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    });

    // 添加背景图片
    console.log('开始加载背景图片...');
    try {
        const bgTexture = await PIXI.Texture.from('/api/get-background');
        console.log('背景图片加载成功:', bgTexture);
        const bgSprite = new PIXI.Sprite(bgTexture);
        const [canvasWidth, canvasHeight] = effectiveResolution.value.split('x').map(Number);

        // 计算裁剪比例和区域
        const targetRatio = canvasWidth / canvasHeight;
        const sourceRatio = bgSprite.width / bgSprite.height;
        
        let cropWidth, cropHeight;
        
        if (sourceRatio > targetRatio) {
            // 源图更宽，裁剪左右
            cropHeight = bgSprite.height;
            cropWidth = cropHeight * targetRatio;
        } else {
            // 源图更高，裁剪上下
            cropWidth = bgSprite.width;
            cropHeight = cropWidth / targetRatio;
        }
        
        // 计算裁剪区域
        const cropX = (bgSprite.width - cropWidth) / 2;
        const cropY = (bgSprite.height - cropHeight) / 2;
        
        // 创建裁剪矩形并应用
        const cropRect = new PIXI.Rectangle(cropX, cropY, cropWidth, cropHeight);
        bgTexture.frame = cropRect;
        
        // 设置精灵尺寸和位置
        bgSprite.width = canvasWidth;
        bgSprite.height = canvasHeight;
        bgSprite.x = 0;
        bgSprite.y = 0;

        app.stage.addChildAt(bgSprite, 0);
        console.log('背景图片已添加到舞台');
    } catch (error) {
        console.error('背景图片加载失败:', error);
        // 加载默认背景
        const defaultBg = await PIXI.Texture.from('/default.jpg');
        const defaultSprite = new PIXI.Sprite(defaultBg);
        const [canvasWidth, canvasHeight] = effectiveResolution.value.split('x').map(Number);

        // 计算居中裁剪的比例
        const scale = Math.min(
            canvasWidth / defaultSprite.width,
            canvasHeight / defaultSprite.height
        );

        // 设置精灵尺寸和位置
        defaultSprite.width = defaultSprite.width * scale;
        defaultSprite.height = defaultSprite.height * scale;
        defaultSprite.x = (canvasWidth - defaultSprite.width) / 2;
        defaultSprite.y = (canvasHeight - defaultSprite.height) / 2;

        app.stage.addChildAt(defaultSprite, 0);
        console.log('已使用默认背景图片');
    }
    // 加载 Live2D 模型（Haru），autoInteract 设为 false 禁用默认交互
    model = await Live2DModel.from("live2d/Mao/Mao.model3.json", {
        autoHitTest: false,
        autoFocus: false
    });

    // 启用拖动功能
    model.buttonMode = true;
    model.interactive = true;

    let isDragging = false;
    live2DStore.loadState(); // 从store加载状态
    let lastPosition = { x: live2DStore.position.x, y: live2DStore.position.y };
    let currentScale = live2DStore.scale;

    // 鼠标按下开始拖动
    model.on('pointerdown', (e) => {
        isDragging = true;
        lastPosition = e.data.global.clone();
    });

    // 鼠标移动时拖动模型
    model.on('pointermove', (e) => {
        if (isDragging) {
            const newPosition = e.data.global;
            model.x += newPosition.x - lastPosition.x;
            model.y += newPosition.y - lastPosition.y;
            lastPosition = newPosition.clone();
            live2DStore.position = { x: model.x, y: model.y }; // 更新store中的位置
        }
    });

    // 鼠标释放停止拖动
    model.on('pointerup', () => {
        isDragging = false;
        live2DStore.position = { x: model.x, y: model.y };
        live2DStore.scale = model.scale.x;
        live2DStore.saveState(); // 保存状态到localStorage
    });

    model.on('pointerupoutside', () => {
        isDragging = false;
    });

    // 滚轮缩放功能
    document.querySelector('#myCanvas').addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.95 : 1.05;
        model.scale.set(model.scale.x * delta);
        live2DStore.scale = model.scale.x;
    });

    // 缩放和位置调整
    model.scale.set(currentScale);
    model.y = lastPosition.y;
    model.x = lastPosition.x;

    // 根据分辨率调整模型尺寸
    const [modelResWidth, modelResHeight] = effectiveResolution.value.split('x').map(Number);
    const targetWidth = modelResWidth * 0.8; // 模型占画布80%宽度
    const scale = targetWidth / model.width;
    model.scale.set(scale);

    // 将模型添加到舞台
    app.stage.addChild(model);
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
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>