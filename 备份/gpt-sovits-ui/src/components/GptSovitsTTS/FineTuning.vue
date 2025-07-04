<template>
    <div class="fine-tuning-container">
        <!-- SoVITS训练部分 -->
        <div class="training-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">🎵</span>
                    SoVITS训练
                </h2>
                <p class="section-description">用于分享的模型文件输出在SoVITS_weights下</p>
            </div>
            
            <div class="training-card">
                <!-- 训练参数 -->
                <div class="config-section">
                    <h3 class="subsection-title">训练参数</h3>
                    <div class="slider-grid">
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">📊</span>
                                    每张显卡的batch_size
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="1" 
                                    max="40" 
                                    step="1" 
                                    v-model="sovitsBatchSize"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="40" 
                                step="1"
                                class="slider"
                                v-model="sovitsBatchSize"
                            >
                        </div>
                        
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">🔄</span>
                                    总训练轮数total_epoch
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="1" 
                                    max="25" 
                                    step="1" 
                                    v-model="sovitsTotalEpoch"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="25" 
                                step="1"
                                class="slider"
                                v-model="sovitsTotalEpoch"
                            >
                        </div>
                        
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">📝</span>
                                    文本模块学习率权重
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="0.2" 
                                    max="0.6" 
                                    step="0.05" 
                                    v-model="textLrWeight"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="0.2" 
                                max="0.6" 
                                step="0.05"
                                class="slider"
                                v-model="textLrWeight"
                            >
                        </div>
                        
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">💾</span>
                                    保存频率save_every_epoch
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="1" 
                                    max="25" 
                                    step="1" 
                                    v-model="sovitsSaveEvery"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="25" 
                                step="1"
                                class="slider"
                                v-model="sovitsSaveEvery"
                            >
                        </div>
                    </div>
                </div>
                
                <!-- 其他设置 -->
                <div class="config-section">
                    <h3 class="subsection-title">其他设置</h3>
                    <div class="settings-grid">
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" v-model="sovitsKeepLatest">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-text">仅保存最新的ckpt文件以节省硬盘空间</span>
                            </label>
                            
                            <label class="checkbox-item">
                                <input type="checkbox" v-model="sovitsSaveToWeights">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-text">在每次保存时间点将最终小模型保存至weights文件夹</span>
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">
                                <span class="label-icon">🖥️</span>
                                GPU卡号以-分割，每个卡号一个进程
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="例如：0-1-2"
                                rows="1"
                                v-model="sovitsGpuIds"
                            ></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- 训练控制 -->
                <div class="action-section">
                    <div class="action-buttons">
                        <button 
                            class="action-button primary" 
                            @click="startSovitsTraining" 
                            v-if="!sovitsTrainingRunning"
                        >
                            <span class="button-icon">▶️</span>
                            开启SoVITS训练
                        </button>
                        <button 
                            class="action-button warning" 
                            @click="stopSovitsTraining" 
                            v-else
                        >
                            <span class="button-icon">⏹️</span>
                            终止SoVITS训练
                        </button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">📋</span>
                            SoVITS训练进程输出信息
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="训练进程的实时输出信息..."
                            rows="3"
                            disabled
                            v-model="sovitsTrainingOutput"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- GPT训练部分 -->
        <div class="training-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">🤖</span>
                    GPT训练
                </h2>
                <p class="section-description">用于分享的模型文件输出在GPT_weights下</p>
            </div>
            
            <div class="training-card">
                <!-- 训练参数 -->
                <div class="config-section">
                    <h3 class="subsection-title">训练参数</h3>
                    <div class="slider-grid">
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">📊</span>
                                    每张显卡的batch_size
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="1" 
                                    max="40" 
                                    step="1" 
                                    v-model="gptBatchSize"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="40" 
                                step="1"
                                class="slider"
                                v-model="gptBatchSize"
                            >
                        </div>
                        
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">🔄</span>
                                    总训练轮数total_epoch
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="2" 
                                    max="50" 
                                    step="1" 
                                    v-model="gptTotalEpoch"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="2" 
                                max="50" 
                                step="1"
                                class="slider"
                                v-model="gptTotalEpoch"
                            >
                        </div>
                        
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">💾</span>
                                    保存频率save_every_epoch
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="1" 
                                    max="50" 
                                    step="1" 
                                    v-model="gptSaveEvery"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="50" 
                                step="1"
                                class="slider"
                                v-model="gptSaveEvery"
                            >
                        </div>
                    </div>
                </div>
                
                <!-- 训练控制 -->
                <div class="action-section">
                    <div class="action-buttons">
                        <button 
                            class="action-button primary" 
                            @click="startGptTraining" 
                            v-if="!gptTrainingRunning"
                        >
                            <span class="button-icon">▶️</span>
                            开启GPT训练
                        </button>
                        <button 
                            class="action-button warning" 
                            @click="stopGptTraining" 
                            v-else
                        >
                            <span class="button-icon">⏹️</span>
                            终止GPT训练
                        </button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">📋</span>
                            GPT训练进程输出信息
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="训练进程的实时输出信息..."
                            rows="3"
                            disabled
                            v-model="gptTrainingOutput"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// SoVITS训练参数
const sovitsBatchSize = ref(12);
const sovitsTotalEpoch = ref(15);
const textLrWeight = ref(0.25);
const sovitsSaveEvery = ref(5);
const sovitsKeepLatest = ref(true);
const sovitsSaveToWeights = ref(true);
const sovitsGpuIds = ref('0');
const sovitsTrainingOutput = ref('');
const sovitsTrainingRunning = ref(false);

// GPT训练参数
const gptBatchSize = ref(12);
const gptTotalEpoch = ref(30);
const gptSaveEvery = ref(10);
const gptTrainingOutput = ref('');
const gptTrainingRunning = ref(false);

// SoVITS训练控制函数
const startSovitsTraining = () => {
    sovitsTrainingRunning.value = true;
    sovitsTrainingOutput.value = '正在启动SoVITS训练...';
    // 这里添加实际的训练启动逻辑
};

const stopSovitsTraining = () => {
    sovitsTrainingRunning.value = false;
    sovitsTrainingOutput.value = 'SoVITS训练已终止';
    // 这里添加实际的训练停止逻辑
};

// GPT训练控制函数
const startGptTraining = () => {
    gptTrainingRunning.value = true;
    gptTrainingOutput.value = '正在启动GPT训练...';
    // 这里添加实际的训练启动逻辑
};

const stopGptTraining = () => {
    gptTrainingRunning.value = false;
    gptTrainingOutput.value = 'GPT训练已终止';
    // 这里添加实际的训练停止逻辑
};
</script>

<style scoped>
.fine-tuning-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.training-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.section-header {
    text-align: center;
    margin-bottom: 1rem;
}

.section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.section-title .icon {
    font-size: 1.5rem;
}

.section-description {
    color: var(--text-secondary);
    font-size: 1rem;
    margin: 0;
}

.training-card {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
}

.training-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.config-section {
    margin-bottom: 2rem;
}

.subsection-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
}

.slider-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.slider-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: #f8fafc;
    padding: 1rem;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--border-color);
}

.slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.slider-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
    flex: 1;
}

.label-icon {
    font-size: 1rem;
    opacity: 0.8;
}

.slider-input {
    width: 80px;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    padding: 0.5rem;
    text-align: center;
    font-size: 0.9rem;
}

.slider-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
}

.slider {
    width: 100%;
    max-width: 200px;
    height: 6px;
    border-radius: 3px;
    background: var(--border-color);
    outline: none;
    -webkit-appearance: none;
    appearance: none;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
}

.slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: none;
    box-shadow: var(--shadow-sm);
}

.settings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease;
}

.checkbox-item:hover {
    background: rgba(99, 102, 241, 0.05);
    border-color: var(--primary-color);
}

.checkbox-item input[type="checkbox"] {
    display: none;
}

.checkbox-custom {
    width: 18px;
    height: 18px;
    border: 2px solid var(--border-color);
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.checkbox-item input[type="checkbox"]:checked + .checkbox-custom {
    background: var(--primary-color);
    border-color: var(--primary-color);
}

.checkbox-item input[type="checkbox"]:checked + .checkbox-custom::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
}

.checkbox-text {
    font-size: 0.9rem;
    color: var(--text-primary);
    line-height: 1.4;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.form-input {
    width: 100%;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    background: var(--surface-color);
    color: var(--text-primary);
    resize: vertical;
    min-height: 2.5rem;
}

.form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
}

.form-input.disabled {
    background-color: #f8fafc;
    color: var(--text-muted);
    cursor: not-allowed;
}

.action-section {
    margin-top: 2rem;
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
}

.action-button.primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: white;
}

.action-button.warning {
    background: linear-gradient(135deg, var(--warning-color) 0%, #d97706 100%);
    color: white;
}

.action-button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.button-icon {
    font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .training-card {
        padding: 1.5rem;
    }
    
    .section-title {
        font-size: 1.5rem;
    }
    
    .slider-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .settings-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .slider-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .slider-input {
        width: 100%;
    }
    
    .slider {
        max-width: 100%;
    }
    
    .action-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .action-button {
        width: 100%;
        max-width: 300px;
        justify-content: center;
    }
}
</style>
