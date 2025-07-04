<template>
    <div class="data-formatting-container">
        <!-- 提示信息 -->
        <div class="info-section">
            <div class="info-card">
                <div class="info-content">
                    <span class="info-icon">ℹ️</span>
                    <span class="info-text">输出logs/实验名目录下应有23456开头的文件和文件夹</span>
                </div>
            </div>
        </div>

        <!-- 基础配置 -->
        <div class="config-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">⚙️</span>
                    基础配置
                </h2>
            </div>
            
            <div class="config-card">
                <div class="form-row">
                    <div class="form-group flex-1">
                        <label class="form-label">
                            <span class="label-icon">📄</span>
                            文本标注文件
                        </label>
                        <textarea 
                            class="form-input" 
                            placeholder="选择文本标注文件路径"
                            rows="1"
                            v-model="textAnnotationFile"
                        ></textarea>
                    </div>
                    
                    <div class="form-group flex-1">
                        <label class="form-label">
                            <span class="label-icon">🎵</span>
                            训练集音频文件目录
                        </label>
                        <textarea 
                            class="form-input" 
                            placeholder="填切割后音频所在目录！读取的音频文件完整路径=该目录-拼接-list文件里波形对应的文件名（不是全路径）。如果留空则使用.list文件里的绝对全路径。"
                            rows="2"
                            v-model="audioDir"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- 文本内容处理部分 -->
        <div class="tool-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">📝</span>
                    文本内容处理
                </h2>
                <p class="section-description">使用BERT模型进行文本特征提取</p>
            </div>
            
            <div class="tool-card">
                <div class="form-row">
                    <div class="form-group flex-1">
                        <label class="form-label">
                            <span class="label-icon">🖥️</span>
                            GPU卡号以-分割，每个卡号一个进程
                        </label>
                        <textarea 
                            class="form-input" 
                            placeholder="例如：0-1-2"
                            rows="1"
                            v-model="gpuIds"
                        ></textarea>
                    </div>
                    
                    <div class="form-group flex-1">
                        <label class="form-label">
                            <span class="label-icon">🤖</span>
                            预训练的中文BERT模型路径
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="自动检测BERT模型路径..."
                            rows="2"
                            disabled
                            v-model="bertModelPath"
                        ></textarea>
                    </div>
                </div>
                
                <div class="action-section">
                    <div class="action-buttons">
                        <button 
                            class="action-button primary" 
                            @click="startTextExtraction" 
                            v-if="!textExtractionRunning"
                        >
                            <span class="button-icon">▶️</span>
                            开启文本获取
                        </button>
                        <button 
                            class="action-button warning" 
                            @click="stopTextExtraction" 
                            v-else
                        >
                            <span class="button-icon">⏹️</span>
                            终止文本获取进程
                        </button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">📋</span>
                            文本进程输出信息
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="文本处理进程的实时输出信息..."
                            rows="3"
                            disabled
                            v-model="textProcessOutput"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- SSL自监督特征提取 -->
        <div class="tool-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">🔍</span>
                    SSL自监督特征提取
                </h2>
                <p class="section-description">使用SSL模型进行音频特征提取</p>
            </div>
            
            <div class="tool-card">
                <div class="form-row">
                    <div class="form-group flex-1">
                        <label class="form-label">
                            <span class="label-icon">🖥️</span>
                            GPU卡号以-分割，每个卡号一个进程
                        </label>
                        <textarea 
                            class="form-input" 
                            placeholder="例如：0-1-2"
                            rows="1"
                            v-model="sslGpuIds"
                        ></textarea>
                    </div>
                    
                    <div class="form-group flex-1">
                        <label class="form-label">
                            <span class="label-icon">🎯</span>
                            预训练的SSL模型路径
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="自动检测SSL模型路径..."
                            rows="2"
                            disabled
                            v-model="sslModelPath"
                        ></textarea>
                    </div>
                </div>
                
                <div class="action-section">
                    <div class="action-buttons">
                        <button 
                            class="action-button primary" 
                            @click="startSSL" 
                            v-if="!sslRunning"
                        >
                            <span class="button-icon">▶️</span>
                            开启SSL提取
                        </button>
                        <button 
                            class="action-button warning" 
                            @click="stopSSL" 
                            v-else
                        >
                            <span class="button-icon">⏹️</span>
                            终止SSL提取进程
                        </button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">📋</span>
                            SSL进程输出信息
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="SSL处理进程的实时输出信息..."
                            rows="3"
                            disabled
                            v-model="sslProcessOutput"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- 语义token提取 -->
        <div class="tool-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="icon">🎵</span>
                    语义token提取
                </h2>
                <p class="section-description">使用SoVITS模型进行语义token提取</p>
            </div>
            
            <div class="tool-card">
                <div class="form-row">
                    <div class="form-group flex-1">
                        <label class="form-label">
                            <span class="label-icon">🖥️</span>
                            GPU卡号以-分割，每个卡号一个进程
                        </label>
                        <textarea 
                            class="form-input" 
                            placeholder="例如：0-1-2"
                            rows="1"
                            v-model="tokenGpuIds"
                        ></textarea>
                    </div>
                    
                    <div class="form-group flex-1">
                        <label class="form-label">
                            <span class="label-icon">🎵</span>
                            预训练的SoVITS-G模型路径
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="自动检测SoVITS-G模型路径..."
                            rows="2"
                            disabled
                            v-model="tokenModelPath"
                        ></textarea>
                    </div>
                </div>
                
                <div class="action-section">
                    <div class="action-buttons">
                        <button 
                            class="action-button primary" 
                            @click="startTokenExtraction" 
                            v-if="!tokenExtractionRunning"
                        >
                            <span class="button-icon">▶️</span>
                            开启语义token提取
                        </button>
                        <button 
                            class="action-button warning" 
                            @click="stopTokenExtraction" 
                            v-else
                        >
                            <span class="button-icon">⏹️</span>
                            终止语义token提取进程
                        </button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-icon">📋</span>
                            语义token提取进程输出信息
                        </label>
                        <textarea 
                            class="form-input disabled" 
                            placeholder="语义token提取进程的实时输出信息..."
                            rows="3"
                            disabled
                            v-model="tokenProcessOutput"
                        ></textarea>
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
const bertModelPath = ref('pretrained_models/bert/chinese-bert-wwm-ext');
const textExtractionRunning = ref(false);
const textProcessOutput = ref('');

// SSL相关
const sslGpuIds = ref('0');
const sslModelPath = ref('pretrained_models/ssl/wavlm-base-plus');
const sslRunning = ref(false);
const sslProcessOutput = ref('');

// 语义token相关
const tokenGpuIds = ref('0');
const tokenModelPath = ref('pretrained_models/sovits/sovits_g.pth');
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

<style scoped>
.data-formatting-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.info-section {
    margin-bottom: 1rem;
}

.info-card {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border: 1px solid #93c5fd;
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: var(--shadow-sm);
}

.info-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.info-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
}

.info-text {
    color: #1e40af;
    font-weight: 500;
    line-height: 1.5;
}

.config-section,
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
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.section-title .icon {
    font-size: 1.3rem;
}

.section-description {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin: 0;
}

.config-card,
.tool-card {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
}

.config-card:hover,
.tool-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
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
    .config-card,
    .tool-card {
        padding: 1.5rem;
    }
    
    .section-title {
        font-size: 1.3rem;
    }
    
    .form-row {
        flex-direction: column;
        gap: 1rem;
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
