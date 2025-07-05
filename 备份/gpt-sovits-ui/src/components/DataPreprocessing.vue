<template>
    <div class="data-preprocessing-container">
        <!-- UVR5 语音伴奏分离 -->
        <div class="tool-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">🎵</span>
                    UVR5人声伴奏分离工具
                </h2>
                <p class="section-description">使用UVR5进行人声伴奏分离、去混响和去延迟处理</p>
            </div>
            
            <div class="tool-card">
                <div class="form-group">
                    <label class="form-label">
                        <span class="label-icon">📊</span>
                        UVR5进程输出信息
                    </label>
                    <textarea 
                        class="form-input disabled" 
                        placeholder="UVR5处理进度和状态信息..."
                        rows="3"
                        disabled
                        v-model="uvr5Output"
                    ></textarea>
                </div>
                
                <div class="action-buttons">
                    <button 
                        class="action-button primary" 
                        @click="startUVR5" 
                        v-if="!uvr5Running"
                    >
                        <span class="button-icon">▶️</span>
                        开启UVR5-WebUI
                    </button>
                    <button 
                        class="action-button warning" 
                        @click="stopUVR5" 
                        v-else
                    >
                        <span class="button-icon">⏹️</span>
                        关闭UVR5-WebUI
                    </button>
                </div>
            </div>
        </div>

        <!-- 语音切分工具 -->
        <div class="tool-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">✂️</span>
                    语音切分工具
                </h2>
                <p class="section-description">自动切分音频文件，支持批量处理和参数调节</p>
            </div>
            
            <div class="tool-card">
                <!-- 路径配置 -->
                <div class="config-section">
                    <h3 class="subsection-title">路径配置</h3>
                    <div class="form-row">
                        <div class="form-group flex-1">
                            <label class="form-label">
                                <span class="label-icon">📁</span>
                                输入路径
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="音频自动切分输入路径，可文件可文件夹"
                                rows="2"
                                v-model="audioInputPath"
                            ></textarea>
                        </div>
                        
                        <div class="form-group flex-1">
                            <label class="form-label">
                                <span class="label-icon">📂</span>
                                输出路径
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="切分后的子音频的输出根目录"
                                rows="2"
                                v-model="audioOutputPath"
                            ></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- 切分参数 -->
                <div class="config-section">
                    <h3 class="subsection-title">切分参数</h3>
                    <div class="params-grid">
                        <div class="form-group">
                            <label class="form-label">
                                <span class="label-icon">🔊</span>
                                threshold
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="音量小于这个值视作静音的备选切割点"
                                rows="1"
                                v-model="threshold"
                            ></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">
                                <span class="label-icon">⏱️</span>
                                min_length
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="每段最小多长，如果第一段太短一直和后面段连起来直到超过这个值"
                                rows="1"
                                v-model="minLength"
                            ></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">
                                <span class="label-icon">⏲️</span>
                                min_interval
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="最短切割间隔"
                                rows="1"
                                v-model="minInterval"
                            ></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">
                                <span class="label-icon">📏</span>
                                hop_size
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="怎么算音量曲线，越小精度越大计算量越高"
                                rows="1"
                                v-model="hopSize"
                            ></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">
                                <span class="label-icon">🔇</span>
                                max_sil_kept
                            </label>
                            <textarea 
                                class="form-input" 
                                placeholder="切完后静音最多留多长"
                                rows="1"
                                v-model="maxSilKept"
                            ></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- 滑动参数 -->
                <div class="config-section">
                    <h3 class="subsection-title">高级参数</h3>
                    <div class="slider-grid">
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">📈</span>
                                    max: 归一化后最大值
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="0" 
                                    max="1" 
                                    step="0.05" 
                                    v-model="maxNormValue"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05"
                                class="slider"
                                v-model="maxNormValue"
                            >
                        </div>
                        
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">🎚️</span>
                                    alpha_mix: 混音比例
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="0" 
                                    max="1" 
                                    step="0.05" 
                                    v-model="alphaMix"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05"
                                class="slider"
                                v-model="alphaMix"
                            >
                        </div>
                        
                        <div class="slider-item">
                            <div class="slider-header">
                                <label class="slider-label">
                                    <span class="label-icon">⚙️</span>
                                    切割使用的进程数
                                </label>
                                <input 
                                    class="slider-input" 
                                    type="number" 
                                    min="1" 
                                    max="22" 
                                    step="1" 
                                    v-model="processCount"
                                >
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="22" 
                                step="1"
                                class="slider"
                                v-model="processCount"
                            >
                        </div>
                    </div>
                </div>
                
                <!-- 进程输出 -->
                <div class="config-section">
                    <h3 class="subsection-title">进程状态</h3>
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">📋</span>
                            语音切割进程输出信息
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="切割进程的实时输出信息..."
                            rows="3"
                            disabled
                            v-model="splitProcessOutput"
                        ></textarea>
                    </div>
                </div>
                
                <!-- 操作按钮 -->
                <div class="action-buttons">
                    <button 
                        class="action-button primary" 
                        @click="startSplit" 
                        v-if="!splitRunning"
                    >
                        <span class="button-icon">▶️</span>
                        开启语音切割
                    </button>
                    <button 
                        class="action-button warning" 
                        @click="stopSplit" 
                        v-else
                    >
                        <span class="button-icon">⏹️</span>
                        终止语音切割
                    </button>
                </div>
            </div>
        </div>
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
const threshold = ref('0.1');
const minLength = ref('0.5');
const minInterval = ref('0.1');
const hopSize = ref('0.1');
const maxSilKept = ref('0.5');
const maxNormValue = ref(0.9);
const alphaMix = ref(0.25);
const processCount = ref(4);
const splitProcessOutput = ref('');
const splitRunning = ref(false);

// UVR5控制函数
const startUVR5 = () => {
    uvr5Running.value = true;
    uvr5Output.value = '正在启动UVR5-WebUI...';
    // 这里添加实际的UVR5启动逻辑
};

const stopUVR5 = () => {
    uvr5Running.value = false;
    uvr5Output.value = 'UVR5-WebUI已关闭';
    // 这里添加实际的UVR5停止逻辑
};

// 语音切分控制函数
const startSplit = () => {
    splitRunning.value = true;
    splitProcessOutput.value = '正在启动语音切割进程...';
    // 这里添加实际的语音切割启动逻辑
};

const stopSplit = () => {
    splitRunning.value = false;
    splitProcessOutput.value = '语音切割进程已终止';
    // 这里添加实际的语音切割停止逻辑
};
</script>

<style scoped>
.data-preprocessing-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.tool-section {
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

.tool-card {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
}

.tool-card:hover {
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

.form-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.flex-1 {
    flex: 1;
}

.form-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.label-icon {
    font-size: 1rem;
    opacity: 0.8;
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

.params-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
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

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
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
    .tool-card {
        padding: 1.5rem;
    }
    
    .section-title {
        font-size: 1.5rem;
    }
    
    .form-row {
        flex-direction: column;
        gap: 1rem;
    }
    
    .params-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .slider-grid {
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
