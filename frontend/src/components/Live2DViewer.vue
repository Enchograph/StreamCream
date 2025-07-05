<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';
import { ElMessage } from 'element-plus';

// 注册 Live2D 插件到 PIXI
window.PIXI = PIXI;

// 定义props
const props = defineProps({
    width: {
        type: Number,
        default: 800
    },
    height: {
        type: Number,
        default: 600
    }
});

const canvasContainer = ref(null);
const app = ref(null);
const currentModel = ref(null);
const isLoading = ref(false);
const modelInfo = ref({
    expressions: [],
    motions: {}
});

// 初始化PIXI应用
const initPixiApp = () => {
    if (app.value) return;

    app.value = new PIXI.Application({
        width: props.width,
        height: props.height,
        backgroundAlpha: 0,
        antialias: true
    });

    canvasContainer.value.appendChild(app.value.view);
};

// 加载模型
const loadModel = async (modelPath) => {
    if (!app.value) return;
    
    isLoading.value = true;
    try {
        // 如果已有模型，先移除
        if (currentModel.value) {
            app.value.stage.removeChild(currentModel.value);
            currentModel.value.destroy();
            currentModel.value = null;
        }

        // 加载新模型
        const model = await Live2DModel.from(modelPath);
        
        // 自动调整模型大小和位置
        const scale = Math.min(
            props.width / model.width,
            props.height / model.height
        ) * 0.8; // 留出一些边距
        
        model.scale.set(scale);
        model.x = props.width / 2;
        model.y = props.height / 2;
        model.anchor.set(0.5, 0.5);

        // 启用拖拽
        model.draggable = true;

        // 存储模型信息
        modelInfo.value = {
            expressions: model.expressions.map(exp => exp.name),
            motions: model.motionGroups
        };

        // 添加到舞台
        app.value.stage.addChild(model);
        currentModel.value = model;

        ElMessage.success('模型加载成功！');
    } catch (error) {
        console.error('加载模型失败:', error);
        ElMessage.error('加载模型失败，请检查模型文件是否正确');
    } finally {
        isLoading.value = false;
    }
};

// 播放表情
const playExpression = async (expressionName) => {
    if (!currentModel.value) return;
    try {
        await currentModel.value.expression(expressionName);
    } catch (error) {
        console.error('播放表情失败:', error);
    }
};

// 播放动作
const playMotion = async (group, index) => {
    if (!currentModel.value) return;
    try {
        await currentModel.value.motion(group, index);
    } catch (error) {
        console.error('播放动作失败:', error);
    }
};

// 组件挂载时初始化
onMounted(() => {
    initPixiApp();
});

// 组件卸载时清理
onBeforeUnmount(() => {
    if (currentModel.value) {
        currentModel.value.destroy();
    }
    if (app.value) {
        app.value.destroy(true);
    }
});

// 暴露方法给父组件
defineExpose({
    loadModel,
    playExpression,
    playMotion
});
</script>

<template>
    <div class="live2d-viewer">
        <div ref="canvasContainer" class="canvas-container"></div>
        
        <!-- 控制面板 -->
        <div v-if="modelInfo.expressions.length || Object.keys(modelInfo.motions).length" class="control-panel">
            <!-- 表情控制 -->
            <div v-if="modelInfo.expressions.length" class="control-section">
                <h3>表情</h3>
                <div class="button-group">
                    <button
                        v-for="exp in modelInfo.expressions"
                        :key="exp"
                        class="control-btn"
                        @click="playExpression(exp)"
                    >
                        {{ exp }}
                    </button>
                </div>
            </div>

            <!-- 动作控制 -->
            <div v-if="Object.keys(modelInfo.motions).length" class="control-section">
                <h3>动作</h3>
                <div v-for="(motions, group) in modelInfo.motions" :key="group" class="motion-group">
                    <h4>{{ group }}</h4>
                    <div class="button-group">
                        <button
                            v-for="(motion, index) in motions"
                            :key="index"
                            class="control-btn"
                            @click="playMotion(group, index)"
                        >
                            动作 {{ index + 1 }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 加载提示 -->
        <div v-if="isLoading" class="loading-overlay">
            <div class="loading-spinner"></div>
            <span>加载模型中...</span>
        </div>
    </div>
</template>

<style scoped>
.live2d-viewer {
    position: relative;
    width: v-bind('width + "px"');
    height: v-bind('height + "px"');
    background: #f5f7fa;
    border-radius: 8px;
    overflow: hidden;
}

.canvas-container {
    width: 100%;
    height: 100%;
}

.control-panel {
    position: absolute;
    right: 10px;
    top: 10px;
    background: rgba(255, 255, 255, 0.9);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    max-height: calc(100% - 40px);
    overflow-y: auto;
    width: 200px;
}

.control-section {
    margin-bottom: 15px;
}

.control-section h3 {
    margin: 0 0 10px;
    font-size: 16px;
    color: #333;
}

.motion-group {
    margin-bottom: 10px;
}

.motion-group h4 {
    margin: 5px 0;
    font-size: 14px;
    color: #666;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.control-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background-color: #409eff;
    color: white;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.2s;
}

.control-btn:hover {
    background-color: #66b1ff;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.loading-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #409eff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style> 