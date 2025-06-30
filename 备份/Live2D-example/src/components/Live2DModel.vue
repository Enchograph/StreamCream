<template>
    <div>
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
        <div class="canvasWrap">
            <!-- 用于渲染 Live2D 模型的 canvas -->
            <canvas id="myCanvas" />
        </div>
    </div>
</template>

<script setup>
// 引入 Vue 的生命周期钩子和响应式 API
import { onMounted, onBeforeUnmount, ref } from "vue";
// 引入 PIXI.js
import * as PIXI from "pixi.js";
// 引入 pixi-live2d-display 的 Live2DModel
import { Live2DModel } from "pixi-live2d-display/cubism4";

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
        view: document.querySelector("#myCanvas"), // 指定渲染的 canvas
        autoStart: true, // 自动开始渲染
        resizeTo: document.querySelector(".canvasWrap"), // 跟随容器大小自适应
        backgroundAlpha: 0, // 背景透明
    });

    // 加载 Live2D 模型（Haru），autoInteract 设为 false 禁用默认交互
    model = await Live2DModel.from("/live2d/Haru/Haru.model3.json", {
        autoInteract: false,
    });

    // 缩放和位置调整
    model.scale.set(0.12);
    model.y = 0;
    model.x = -24;

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
/* 画布容器样式，固定宽高 */
.canvasWrap {
    width: 240px;
    height: 360px;
}

/* 画布样式，铺满容器 */
#myCanvas {
    width: 100%;
    height: 100%;
}
</style>