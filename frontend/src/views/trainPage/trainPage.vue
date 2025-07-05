<template>
    <div class="tts-train-infer">
        <!-- 顶部基础信息 -->
        <div class="top-section">
            <div class="form-row">
                <label for="expName">实验/模型名</label>
                <input type="text" id="expName" v-model="expName" placeholder="xxx" />
            </div>
            <div class="form-row">
                <label for="gpuInfo">显卡信息</label>
                <input type="text" id="gpuInfo" v-model="gpuInfo" placeholder="0 CPU" />
            </div>
            <div class="form-row version-radio">
                <label>版本</label>
                <label class="radio-label">
                    <input type="radio" value="v1" v-model="version" />
                    v1
                </label>
                <label class="radio-label">
                    <input type="radio" value="v2" v-model="version" />
                    v2
                </label>
            </div>
            <div class="form-row">
                <label for="sovitsGPath">预训练的SoVITS-G模型路径</label>
                <input type="text" id="sovitsGPath" v-model="sovitsGPath"
                    placeholder="GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/c2G2333k_mth" />
            </div>
            <div class="form-row">
                <label for="sovitsDPath">预训练的SoVITS-D模型路径</label>
                <input type="text" id="sovitsDPath" v-model="sovitsDPath"
                    placeholder="GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/c2D2333k_mth" />
            </div>
            <div class="form-row">
                <label for="gptPath">预训练的GPT模型路径</label>
                <input type="text" id="gptPath" v-model="gptPath"
                    placeholder="GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/s1bert25hz-5kh-longer-epoch=12-" />
            </div>
        </div>

        <!-- 标签切换：训练集格式化、微调训练、推理 -->
        <div class="tabs">
            <button class="tab-button" :class="{ active: activeTab === '1A' }" @click="activeTab = '1A'">
                1A-训练集格式化工具
            </button>
            <button class="tab-button" :class="{ active: activeTab === '1B' }" @click="activeTab = '1B'">
                1B-微调训练
            </button>
            <button class="tab-button" :class="{ active: activeTab === '1C' }" @click="activeTab = '1C'">
                1C-推理
            </button>
        </div>

        <!-- 1A-训练集格式化工具 -->
        <div class="tab-content" v-if="activeTab === '1A'">
            <p class="tip">输出log到实验目录下，目录下应有23456开头的文件和文件夹</p>
            <div class="form-row">
                <label for="textLabelFile">*文本标注文件</label>
                <input type="text" id="textLabelFile" v-model="textLabelFile"
                    placeholder="D:/RVC1006-GPT-SoVITS/raw/xxxx.list" />
            </div>
            <div class="form-row">
                <label for="audioDir">*训练集音频文件目录</label>
                <input type="text" id="audioDir" v-model="audioDir"
                    placeholder="填好训练后音频所在目录，读取的音频文件完整路径=该目录+拼接list文件里音频对应的文件名（不是全路径）" />
            </div>

            <!-- 1Aa-文本内容 -->
            <div class="sub-section">
                <h3>1Aa-文本内容</h3>
                <div class="form-row">
                    <label for="textGpuIds">GPU卡号以,分割，每个卡号一个进程</label>
                    <input type="text" id="textGpuIds" v-model="textGpuIds" placeholder="0-0" />
                </div>
                <div class="form-row">
                    <label for="bertPath">预训练的中文BERT模型路径</label>
                    <input type="text" id="bertPath" v-model="bertPath"
                        placeholder="GPT_SoVITS/pretrained_models/chinese-roberta-wwm-ext-large" />
                </div>
                <button class="action-btn" @click="handleTextExtract">开启文本获取</button>
                <div class="form-row">
                    <label for="textProcessInfo">文本进程输出信息</label>
                    <input type="text" id="textProcessInfo" v-model="textProcessInfo" disabled />
                </div>
            </div>

            <!-- 1Ab-SSL自监督特征提取 -->
            <div class="sub-section">
                <h3>1Ab-SSL自监督特征提取</h3>
                <div class="form-row">
                    <label for="sslGpuIds">GPU卡号以,分割，每个卡号一个进程</label>
                    <input type="text" id="sslGpuIds" v-model="sslGpuIds" placeholder="0-0" />
                </div>
                <div class="form-row">
                    <label for="sslModelPath">预训练的SSL模型路径</label>
                    <input type="text" id="sslModelPath" v-model="sslModelPath"
                        placeholder="GPT_SoVITS/pretrained_models/chinese-hubert-base" />
                </div>
                <button class="action-btn" @click="handleSslExtract">开启SSL提取</button>
                <div class="form-row">
                    <label for="sslProcessInfo">SSL进程输出信息</label>
                    <input type="text" id="sslProcessInfo" v-model="sslProcessInfo" disabled />
                </div>
            </div>

            <!-- 1Ac-语义token提取 -->
            <div class="sub-section">
                <h3>1Ac-语义token提取</h3>
                <div class="form-row">
                    <label for="tokenGpuIds">GPU卡号以,分割，每个卡号一个进程</label>
                    <input type="text" id="tokenGpuIds" v-model="tokenGpuIds" placeholder="0-0" />
                </div>
                <div class="form-row">
                    <label for="tokenModelPath">预训练的SoVITS-G模型路径</label>
                    <input type="text" id="tokenModelPath" v-model="tokenModelPath"
                        placeholder="GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/s2G2333k.pth" />
                </div>
                <button class="action-btn" @click="handleTokenExtract">开启语义token提取</button>
                <div class="form-row">
                    <label for="tokenProcessInfo">语义token提取进程输出信息</label>
                    <input type="text" id="tokenProcessInfo" v-model="tokenProcessInfo" disabled />
                </div>
            </div>

            <!-- 1Aabc-训练集格式化一键三连 -->
            <div class="sub-section">
                <button class="action-btn big-btn" @click="handleOneClickFormat">开启一键三连</button>
                <div class="form-row">
                    <label for="oneClickInfo">一键三连进程输出信息</label>
                    <input type="text" id="oneClickInfo" v-model="oneClickInfo" disabled />
                </div>
            </div>
        </div>

        <!-- 1B-微调训练 -->
        <div class="tab-content" v-else-if="activeTab === '1B'">
            <!-- 1Ba-SoVITS训练 -->
            <div class="sub-section">
                <h3>1Ba-SoVITS训练。用于分享的模型文件输出在SoVITS_weights下。</h3>
                <div class="form-row">
                    <label>每张显卡的batch_size</label>
                    <input type="number" v-model.number="sovitsBatchSize" placeholder="15" />
                </div>
                <div class="form-row">
                    <label>总训练轮数total_epoch，不建议太高</label>
                    <input type="number" v-model.number="sovitsTotalEpoch" placeholder="8" />
                </div>
                <div class="form-row">
                    <label>文本模块学习率权重</label>
                    <input type="number" step="0.1" v-model.number="sovitsTextWeight" placeholder="0.4" />
                </div>
                <div class="form-row">
                    <label>保存频率save_every_epoch</label>
                    <input type="number" v-model.number="sovitsSaveEpoch" placeholder="4" />
                </div>
                <div class="form-row">
                    <input type="checkbox" id="sovitsSaveLatest" v-model="sovitsSaveLatest" />
                    <label for="sovitsSaveLatest">是否仅保存最新的ckpt文件以节省硬盘空间</label>
                </div>
                <div class="form-row">
                    <input type="checkbox" id="sovitsSaveFinal" v-model="sovitsSaveFinal" />
                    <label for="sovitsSaveFinal">是否在每次保存时间点将最终小模型保存至weights文件夹</label>
                </div>
                <div class="form-row">
                    <label for="sovitsGpuIds">GPU卡号以,分割，每个卡号一个进程</label>
                    <input type="text" id="sovitsGpuIds" v-model="sovitsGpuIds" placeholder="0" />
                </div>
                <button class="action-btn" @click="handleSovitsTrain">开启SoVITS训练</button>
                <div class="form-row">
                    <label for="sovitsProcessInfo">SoVITS训练进程输出信息</label>
                    <input type="text" id="sovitsProcessInfo" v-model="sovitsProcessInfo" disabled />
                </div>
            </div>

            <!-- 1Bb-GPT训练 -->
            <div class="sub-section">
                <h3>1Bb-GPT训练。用于分享的模型文件输出在GPT_weights下。</h3>
                <div class="form-row">
                    <label>每张显卡的batch_size</label>
                    <input type="number" v-model.number="gptBatchSize" placeholder="15" />
                </div>
                <div class="form-row">
                    <label>总训练轮数total_epoch</label>
                    <input type="number" v-model.number="gptTotalEpoch" placeholder="15" />
                </div>
                <div class="form-row">
                    <label>保存频率save_every_epoch</label>
                    <input type="number" v-model.number="gptSaveEpoch" placeholder="5" />
                </div>
                <div class="form-row">
                    <input type="checkbox" id="gptDdp" v-model="gptDdp" />
                    <label for="gptDdp">是否开启ddp训练选项(实验性)</label>
                </div>
                <div class="form-row">
                    <input type="checkbox" id="gptSaveLatest" v-model="gptSaveLatest" />
                    <label for="gptSaveLatest">是否仅保存最新的ckpt文件以节省硬盘空间</label>
                </div>
                <div class="form-row">
                    <input type="checkbox" id="gptSaveFinal" v-model="gptSaveFinal" />
                    <label for="gptSaveFinal">是否在每次保存时间点将最终小模型保存至weights文件夹</label>
                </div>
                <div class="form-row">
                    <label for="gptGpuIds">GPU卡号以,分割，每个卡号一个进程</label>
                    <input type="text" id="gptGpuIds" v-model="gptGpuIds" placeholder="0" />
                </div>
                <button class="action-btn" @click="handleGptTrain">开启GPT训练</button>
                <div class="form-row">
                    <label for="gptProcessInfo">GPT训练进程输出信息</label>
                    <input type="text" id="gptProcessInfo" v-model="gptProcessInfo" disabled />
                </div>
            </div>
        </div>

        <!-- 1C-推理 -->
        <div class="tab-content" v-else-if="activeTab === '1C'">
            <p class="tip">选择训练完存放在SoVITS_weights和GPT_weights下的模型。默认的一个是底模，体验5秒Zero Shot TTS用。</p>
            <div class="form-row">
                <label for="gptModelList">*GPT模型列表</label>
                <select id="gptModelList" v-model="gptModelList">
                    <option value="GPT_SoVITS/pretrained_models/gsv-v2final-p">
                        GPT_SoVITS/pretrained_models/gsv-v2final-p
                    </option>
                    <!-- 可扩展更多选项 -->
                </select>
            </div>
            <div class="form-row">
                <label for="sovitsModelList">*SoVITS模型列表</label>
                <select id="sovitsModelList" v-model="sovitsModelList">
                    <option value="GPT_SoVITS/pretrained_models/gsv-v2final-p">
                        GPT_SoVITS/pretrained_models/gsv-v2final-p
                    </option>
                    <!-- 可扩展更多选项 -->
                </select>
            </div>
            <div class="form-row">
                <label for="inferGpuId">GPU卡号,只能填1个整数</label>
                <input type="number" id="inferGpuId" v-model.number="inferGpuId" placeholder="0" />
            </div>
            <button class="action-btn" @click="handleRefreshModel">刷新模型路径</button>
            <div class="form-row">
                <input type="checkbox" id="enableParallel" v-model="enableParallel" />
                <label for="enableParallel">启用并行推理版本(推理速度更快)</label>
            </div>
            <button class="action-btn big-btn" @click="handleTtsInfer">开启TTS推理WebUI</button>
            <div class="form-row">
                <label for="inferProcessInfo">TTS推理WebUI进程输出信息</label>
                <input type="text" id="inferProcessInfo" v-model="inferProcessInfo" disabled />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// 基础信息
const expName = ref('xxx')
const gpuInfo = ref('0 CPU')
const version = ref('v2')
const sovitsGPath = ref('GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/c2G2333k_mth')
const sovitsDPath = ref('GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/c2D2333k_mth')
const gptPath = ref('GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/s1bert25hz-5kh-longer-epoch=12-')

// 标签页状态
const activeTab = ref('1A')

// 1A-训练集格式化工具
const textLabelFile = ref('')
const audioDir = ref('')
const textGpuIds = ref('0-0')
const bertPath = ref('GPT_SoVITS/pretrained_models/chinese-roberta-wwm-ext-large')
const textProcessInfo = ref('')
const sslGpuIds = ref('0-0')
const sslModelPath = ref('GPT_SoVITS/pretrained_models/chinese-hubert-base')
const sslProcessInfo = ref('')
const tokenGpuIds = ref('0-0')
const tokenModelPath = ref('GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/s2G2333k.pth')
const tokenProcessInfo = ref('')
const oneClickInfo = ref('')

// 1B-微调训练
const sovitsBatchSize = ref(15)
const sovitsTotalEpoch = ref(8)
const sovitsTextWeight = ref(0.4)
const sovitsSaveEpoch = ref(4)
const sovitsSaveLatest = ref(true)
const sovitsSaveFinal = ref(true)
const sovitsGpuIds = ref('0')
const sovitsProcessInfo = ref('')
const gptBatchSize = ref(15)
const gptTotalEpoch = ref(15)
const gptSaveEpoch = ref(5)
const gptDdp = ref(false)
const gptSaveLatest = ref(true)
const gptSaveFinal = ref(true)
const gptGpuIds = ref('0')
const gptProcessInfo = ref('')

// 1C-推理
const gptModelList = ref('GPT_SoVITS/pretrained_models/gsv-v2final-p')
const sovitsModelList = ref('GPT_SoVITS/pretrained_models/gsv-v2final-p')
const inferGpuId = ref(0)
const enableParallel = ref(false)
const inferProcessInfo = ref('')

// 方法定义
const handleTextExtract = () => {
    textProcessInfo.value = '文本获取已启动...'
    // 实际项目中这里会调用后端API
}

const handleSslExtract = () => {
    sslProcessInfo.value = 'SSL提取已启动...'
    // 实际项目中这里会调用后端API
}

const handleTokenExtract = () => {
    tokenProcessInfo.value = '语义token提取已启动...'
    // 实际项目中这里会调用后端API
}

const handleOneClickFormat = () => {
    oneClickInfo.value = '一键三连已启动...'
    // 实际项目中这里会调用后端API
}

const handleSovitsTrain = () => {
    sovitsProcessInfo.value = 'SoVITS训练已启动...'
    // 实际项目中这里会调用后端API
}

const handleGptTrain = () => {
    gptProcessInfo.value = 'GPT训练已启动...'
    // 实际项目中这里会调用后端API
}

const handleRefreshModel = () => {
    // 实际项目中这里会刷新模型列表
    alert('模型路径已刷新')
}

const handleTtsInfer = () => {
    inferProcessInfo.value = 'TTS推理WebUI已启动...'
    // 实际项目中这里会调用后端API
}
</script>

<style scoped>
.tts-train-infer {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.top-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
}

.form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-row label {
    margin-bottom: 5px;
    font-weight: bold;
}

.form-row input,
.form-row select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.version-radio {
    flex-direction: row;
    align-items: center;
}

.version-radio label:not(:first-child) {
    margin-left: 20px;
}

.radio-label {
    display: flex;
    align-items: center;
    margin-right: 15px;
}

.radio-label input {
    margin-right: 5px;
}

.tabs {
    display: flex;
    margin-bottom: 20px;
}

.tab-button {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s;
}

.tab-button.active {
    background-color: #4CAF50;
    color: white;
    border-color: #4CAF50;
}

.tab-button:not(:last-child) {
    border-right: none;
}

.sub-section {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
}

.sub-section h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
}

.action-btn {
    padding: 8px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.action-btn:hover {
    background-color: #45a049;
}

.action-btn.big-btn {
    padding: 12px 25px;
    font-size: 16px;
}

.tip {
    color: #666;
    font-style: italic;
    margin-bottom: 15px;
}

input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}
</style>