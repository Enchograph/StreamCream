<template>
    <div class="live-preview">
        <!-- 嘴型变换按钮，点击后调用 mouthFn 方法 -->
        <button @click="mouthFn">嘴型变换</button>
        <!-- 随机动作按钮，点击后调用 randomMotionFn 方法 -->
        <button @click="randomMotionFn">随机动作</button>
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
    </div>
</template>

<script setup>
// 引入 Vue 的生命周期钩子和响应式 API
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
// 引入 PIXI.js
import * as PIXI from "pixi.js";
// 引入 pixi-live2d-display-lipsyncpatch 的 Live2DModel
import { Live2DModel } from "pixi-live2d-display-lipsyncpatch";


// 组件属性
const props = defineProps({
    title: {
        type: String,
        default: '直播界面'
    },
    placeholderText: {
        type: String,
        default: '直播画面区域'
    },
    resolution: {
        type: String,
        default: '1920x1080'
    },
    showTitle: {
        type: Boolean,
        default: true
    }
});

// 计算宽高比样式
const aspectRatioStyle = computed(() => {
    const [width, height] = props.resolution.split('x').map(Number);
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

// 可用表情名称数组
const expressionNames = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08'];
// 当前选中的表情，使用 ref 创建响应式变量
const selectedExpression = ref(expressionNames[0]);

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
    app = new PIXI.Application({
        view: document.querySelector("#myCanvas"),
        autoStart: true,
        resizeTo: document.querySelector(".canvasWrap"),
        backgroundAlpha: 0
    });

    // 添加背景图片
    console.log('开始加载背景图片...');
    try {
        const bgTexture = await PIXI.Texture.from('/api/get-background');
        console.log('背景图片加载成功:', bgTexture);
        const bgSprite = new PIXI.Sprite(bgTexture);
        bgSprite.width = app.screen.width;
        bgSprite.height = app.screen.height;
        app.stage.addChildAt(bgSprite, 0);
        console.log('背景图片已添加到舞台');
    } catch (error) {
        console.error('背景图片加载失败:', error);
        // 加载默认背景
        const defaultBg = await PIXI.Texture.from('/default.jpg');
        const defaultSprite = new PIXI.Sprite(defaultBg);
        defaultSprite.width = app.screen.width;
        defaultSprite.height = app.screen.height;
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
    let lastPosition = { x: localStorage.getItem('live2dX') ? parseInt(localStorage.getItem('live2dX')) : 0, y: localStorage.getItem('live2dY') ? parseInt(localStorage.getItem('live2dY')) : 0 };
    let currentScale = localStorage.getItem('live2dScale') ? parseFloat(localStorage.getItem('live2dScale')) : 0.12;

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
        }
    });

    // 鼠标释放停止拖动
    model.on('pointerup', () => {
        isDragging = false;
        localStorage.setItem('live2dX', model.x);
        localStorage.setItem('live2dY', model.y);
        localStorage.setItem('live2dScale', model.scale.x);
    });

    model.on('pointerupoutside', () => {
        isDragging = false;
    });

    // 滚轮缩放功能
    document.querySelector('#myCanvas').addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.95 : 1.05;
        model.scale.set(model.scale.x * delta);
        localStorage.setItem('live2dScale', model.scale.x);
    });

    // 缩放和位置调整
    model.scale.set(currentScale);
    model.y = lastPosition.y;
    model.x = lastPosition.x;

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
};
</script>

<style scoped>
/* 画布容器样式，使用动态宽高 */
/* .canvasWrap {
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
} */

/* 画布样式，铺满容器 */
#myCanvas {
    width: 100%;
    height: 100%;
}

.live-preview {
    width: 100%;
}

.canvasWrap {
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
}
</style>