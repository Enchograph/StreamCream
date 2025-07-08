<template>
    <div class="train-page-container">
        <div class="train-content">
            <!-- 顶部标题 -->
            <!-- <div class="page-header">
                <h1 class="page-title">
                    <span class="title-icon"></span>
                    {{ $t('trainPage.title') }}
                </h1>
                <p class="page-subtitle">{{ $t('trainPage.subtitle') }}</p>
            </div> -->
            <div class="page-header">
                <br>
                <br>
                <br>
                <h1 class="page-title">
                    {{ $t('trainPage.title') }}
                </h1>
                <br>

                <!-- <p class="page-subtitle">{{ $t('trainPage.subtitle') }}</p> -->
            </div>

            <!-- 顶部基础信息卡片 -->
            <div class="info-card">
                <h2 class="card-title">
                    <span class="card-icon">⚙️</span>
                    {{ $t('trainPage.baseConfig') }}
                </h2>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="expName">{{ $t('trainPage.expName') }}</label>
                        <input type="text" id="expName" v-model="expName"
                            :placeholder="$t('trainPage.expNamePlaceholder')" class="glass-input" />
                    </div>
                    <div class="form-group">
                        <label for="gpuInfo">{{ $t('trainPage.gpuInfo') }}</label>
                        <input type="text" id="gpuInfo" v-model="gpuInfo"
                            :placeholder="$t('trainPage.gpuInfoPlaceholder')" class="glass-input" />
                    </div>
                    <div class="form-group">
                        <label>{{ $t('trainPage.versionSelect') }}</label>
                        <div class="radio-group">
                            <label class="radio-item">
                                <input type="radio" value="v1" v-model="version" />
                                <span class="radio-text">{{ $t('trainPage.v1') }}</span>
                            </label>
                            <label class="radio-item">
                                <input type="radio" value="v2" v-model="version" />
                                <span class="radio-text">{{ $t('trainPage.v2') }}</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group path-row">
                        <label for="sovitsGPath">{{ $t('trainPage.sovitsGPath') }}</label>
                        <div class="input-btn-group">
                            <input type="text" id="sovitsGPath" v-model="sovitsGPath"
                                placeholder="GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/c2G2333k_mth"
                                class="glass-input" />
                            <input ref="sovitsGPathFile" type="file" style="display:none" accept=".pth,.ckpt,.pt"
                                @change="onFileChange($event, 'sovitsGPath')" />
                            <button class="path-btn"
                                @click="chooseFile('sovitsGPathFile')">{{ $t('trainPage.pathInputBtn') }}</button>
                        </div>
                    </div>
                    <div class="form-group path-row">
                        <label for="sovitsDPath">{{ $t('trainPage.sovitsDPath') }}</label>
                        <div class="input-btn-group">
                            <input type="text" id="sovitsDPath" v-model="sovitsDPath"
                                placeholder="GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/c2D2333k_mth"
                                class="glass-input" />
                            <input ref="sovitsDPathFile" type="file" style="display:none" accept=".pth,.ckpt,.pt"
                                @change="onFileChange($event, 'sovitsDPath')" />
                            <button class="path-btn"
                                @click="chooseFile('sovitsDPathFile')">{{ $t('trainPage.pathInputBtn') }}</button>
                        </div>
                    </div>
                    <div class="form-group path-row">
                        <label for="gptPath">{{ $t('trainPage.gptPath') }}</label>
                        <div class="input-btn-group">
                            <input type="text" id="gptPath" v-model="gptPath"
                                placeholder="GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/s1bert25hz-5kh-longer-epoch=12-"
                                class="glass-input" />
                            <input ref="gptPathFile" type="file" style="display:none" accept=".pth,.ckpt,.pt"
                                @change="onFileChange($event, 'gptPath')" />
                            <button class="path-btn"
                                @click="chooseFile('gptPathFile')">{{ $t('trainPage.pathInputBtn') }}</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 标签切换 -->
            <div class="tabs-container">
                <div class="tabs">
                    <button class="tab-button" :class="{ active: activeTab === '1A' }" @click="activeTab = '1A'">
                        <span class="tab-icon">📊</span>
                        {{ $t('trainPage.tab1A') }}
                    </button>
                    <button class="tab-button" :class="{ active: activeTab === '1B' }" @click="activeTab = '1B'">
                        <span class="tab-icon">🎓</span>
                        {{ $t('trainPage.tab1B') }}
                    </button>
                    <button class="tab-button" :class="{ active: activeTab === '1C' }" @click="activeTab = '1C'">
                        <span class="tab-icon">🔮</span>
                        {{ $t('trainPage.tab1C') }}
                    </button>
                </div>
            </div>

            <!-- 1A-训练集格式化工具 -->
            <div class="tab-content" v-if="activeTab === '1A'">
                <div class="content-card">
                    <div class="tip-box">
                        <span class="tip-icon">💡</span>
                        <span>{{ $t('trainPage.tipLog') }}</span>
                    </div>

                    <div class="form-section">
                        <div class="form-group path-row">
                            <label for="textLabelFile">{{ $t('trainPage.textLabelFile') }}</label>
                            <div class="input-btn-group">
                                <input type="text" id="textLabelFile" v-model="textLabelFile"
                                    :placeholder="$t('trainPage.textLabelFilePlaceholder')" class="glass-input" />
                                <input ref="textLabelFileInput" type="file" style="display:none" accept=".list"
                                    @change="onFileChange($event, 'textLabelFile')" />
                                <button class="path-btn" @click="chooseFile('textLabelFileInput')">{{ $t('trainPage.pathInputBtn') }}</button>
                            </div>
                        </div>
                        <div class="form-group path-row">
                            <label for="audioDir">{{ $t('trainPage.audioDir') }}</label>
                            <div class="input-btn-group">
                                <input type="text" id="audioDir" v-model="audioDir"
                                    :placeholder="$t('trainPage.audioDirPlaceholder')" class="glass-input" />
                                <input ref="audioDirInput" type="file" style="display:none" webkitdirectory directory
                                    @change="onFileChange($event, 'audioDir')" />
                                <button class="path-btn" @click="chooseFile('audioDirInput')">{{ $t('trainPage.pathInputBtn') }}</button>
                            </div>
                        </div>
                    </div>

                    <!-- 1Aa-文本内容 -->
                    <div class="section-card">
                        <h3 class="section-title">
                            <span class="section-icon">📝</span>
                            {{ $t('trainPage.textContent') }}
                        </h3>
                        <div class="form-section">
                            <div class="form-group">
                                <label for="textGpuIds">{{ $t('trainPage.textGpuIds') }}</label>
                                <input type="text" id="textGpuIds" v-model="textGpuIds" placeholder="0-0"
                                    class="glass-input" />
                            </div>
                            <div class="form-group path-row">
                                <label for="bertPath">{{ $t('trainPage.bertPath') }}</label>
                                <div class="input-btn-group">
                                    <input type="text" id="bertPath" v-model="bertPath"
                                        placeholder="GPT_SoVITS/pretrained_models/chinese-roberta-wwm-ext-large"
                                        class="glass-input" />
                                    <input ref="bertPathFile" type="file" style="display:none" accept=".bin,.pt,.pth"
                                        @change="onFileChange($event, 'bertPath')" />
                                    <button class="path-btn" @click="chooseFile('bertPathFile')">路径填入</button>
                                </div>
                            </div>
                            <button class="action-btn" @click="handleTextExtract">
                                <span class="btn-icon">🚀</span>
                                {{ $t('trainPage.startTextExtract') }}
                            </button>
                            <div class="form-group">
                                <label for="textProcessInfo">{{ $t('trainPage.textProcessInfo') }}</label>
                                <input type="text" id="textProcessInfo" v-model="textProcessInfo" disabled
                                    class="glass-input disabled" />
                            </div>
                        </div>
                    </div>

                    <!-- 1Ab-SSL自监督特征提取 -->
                    <div class="section-card">
                        <h3 class="section-title">
                            <span class="section-icon">🎵</span>
                            {{ $t('trainPage.sslFeature') }}
                        </h3>
                        <div class="form-section">
                            <div class="form-group">
                                <label for="sslGpuIds">{{ $t('trainPage.sslGpuIds') }}</label>
                                <input type="text" id="sslGpuIds" v-model="sslGpuIds" placeholder="0-0"
                                    class="glass-input" />
                            </div>
                            <div class="form-group path-row">
                                <label for="sslModelPath">{{ $t('trainPage.sslModelPath') }}</label>
                                <div class="input-btn-group">
                                    <input type="text" id="sslModelPath" v-model="sslModelPath"
                                        placeholder="GPT_SoVITS/pretrained_models/chinese-hubert-base"
                                        class="glass-input" />
                                    <input ref="sslModelPathFile" type="file" style="display:none"
                                        accept=".bin,.pt,.pth" @change="onFileChange($event, 'sslModelPath')" />
                                    <button class="path-btn" @click="chooseFile('sslModelPathFile')">路径填入</button>
                                </div>
                            </div>
                            <button class="action-btn" @click="handleSslExtract">
                                <span class="btn-icon">🚀</span>
                                {{ $t('trainPage.startSSLExtract') }}
                            </button>
                            <div class="form-group">
                                <label for="sslProcessInfo">{{ $t('trainPage.sslProcessInfo') }}</label>
                                <input type="text" id="sslProcessInfo" v-model="sslProcessInfo" disabled
                                    class="glass-input disabled" />
                            </div>
                        </div>
                    </div>

                    <!-- 1Ac-语义token提取 -->
                    <div class="section-card">
                        <h3 class="section-title">
                            <span class="section-icon">🔤</span>
                            {{ $t('trainPage.tokenExtract') }}
                        </h3>
                        <div class="form-section">
                            <div class="form-group">
                                <label for="tokenGpuIds">{{ $t('trainPage.tokenGpuIds') }}</label>
                                <input type="text" id="tokenGpuIds" v-model="tokenGpuIds" placeholder="0-0"
                                    class="glass-input" />
                            </div>
                            <div class="form-group path-row">
                                <label for="tokenModelPath">{{ $t('trainPage.tokenModelPath') }}</label>
                                <div class="input-btn-group">
                                    <input type="text" id="tokenModelPath" v-model="tokenModelPath"
                                        placeholder="GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/s2G2333k.pth"
                                        class="glass-input" />
                                    <input ref="tokenModelPathFile" type="file" style="display:none"
                                        accept=".pth,.ckpt,.pt" @change="onFileChange($event, 'tokenModelPath')" />
                                    <button class="path-btn" @click="chooseFile('tokenModelPathFile')">路径填入</button>
                                </div>
                            </div>
                            <button class="action-btn" @click="handleTokenExtract">
                                <span class="btn-icon">🚀</span>
                                {{ $t('trainPage.startTokenExtract') }}
                            </button>
                            <div class="form-group">
                                <label for="tokenProcessInfo">{{ $t('trainPage.tokenProcessInfo') }}</label>
                                <input type="text" id="tokenProcessInfo" v-model="tokenProcessInfo" disabled
                                    class="glass-input disabled" />
                            </div>
                        </div>
                    </div>

                    <!-- 1Aabc-训练集格式化一键三连 -->
                    <div class="section-card highlight">
                        <h3 class="section-title">
                            <span class="section-icon">⚡</span>
                            {{ $t('trainPage.oneClick') }}
                        </h3>
                        <div class="form-section">
                            <button class="action-btn primary" @click="handleOneClickFormat">
                                <span class="btn-icon">🚀</span>
                                {{ $t('trainPage.startOneClick') }}
                            </button>
                            <div class="form-group">
                                <label for="oneClickInfo">{{ $t('trainPage.oneClickInfo') }}</label>
                                <input type="text" id="oneClickInfo" v-model="oneClickInfo" disabled
                                    class="glass-input disabled" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 1B-微调训练 -->
            <div class="tab-content" v-else-if="activeTab === '1B'">
                <div class="content-card">
                    <!-- 1Ba-SoVITS训练 -->
                    <div class="section-card">
                        <h3 class="section-title">
                            <span class="section-icon">🎶</span>
                            {{ $t('trainPage.soVITSTrain') }}
                        </h3>
                        <p class="section-desc">用于分享的模型文件输出在SoVITS_weights下</p>
                        <div class="form-section">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>{{ $t('trainPage.soVITSBatch') }}</label>
                                    <input type="number" v-model.number="sovitsBatchSize" placeholder="15"
                                        class="glass-input" />
                                </div>
                                <div class="form-group">
                                    <label>{{ $t('trainPage.soVITSTotalEpoch') }}</label>
                                    <input type="number" v-model.number="sovitsTotalEpoch" placeholder="8"
                                        class="glass-input" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>{{ $t('trainPage.soVITSWeight') }}</label>
                                    <input type="number" step="0.1" v-model.number="sovitsTextWeight" placeholder="0.4"
                                        class="glass-input" />
                                </div>
                                <div class="form-group">
                                    <label>{{ $t('trainPage.soVITSSaveFreq') }}</label>
                                    <input type="number" v-model.number="sovitsSaveEpoch" placeholder="4"
                                        class="glass-input" />
                                </div>
                            </div>
                            <div class="checkbox-group">
                                <label class="checkbox-item">
                                    <input type="checkbox" id="sovitsSaveLatest" v-model="sovitsSaveLatest" />
                                    <span class="checkbox-text">{{ $t('trainPage.soVITSOnlyLatest') }}</span>
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" id="sovitsSaveFinal" v-model="sovitsSaveFinal" />
                                    <span class="checkbox-text">{{ $t('trainPage.soVITSFinalToWeights') }}</span>
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="sovitsGpuIds">{{ $t('trainPage.soVITSGpuIds') }}</label>
                                <input type="text" id="sovitsGpuIds" v-model="sovitsGpuIds" placeholder="0"
                                    class="glass-input" />
                            </div>
                            <button class="action-btn" @click="handleSovitsTrain">
                                <span class="btn-icon">🚀</span>
                                {{ $t('trainPage.startSoVITSTrain') }}
                            </button>
                            <div class="form-group">
                                <label for="sovitsProcessInfo">{{ $t('trainPage.soVITSProcessInfo') }}</label>
                                <input type="text" id="sovitsProcessInfo" v-model="sovitsProcessInfo" disabled
                                    class="glass-input disabled" />
                            </div>
                        </div>
                    </div>

                    <!-- 1Bb-GPT训练 -->
                    <div class="section-card">
                        <h3 class="section-title">
                            <span class="section-icon">🤖</span>
                            {{ $t('trainPage.gptTrain') }}
                        </h3>
                        <p class="section-desc">用于分享的模型文件输出在GPT_weights下</p>
                        <div class="form-section">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>{{ $t('trainPage.gptBatch') }}</label>
                                    <input type="number" v-model.number="gptBatchSize" placeholder="15"
                                        class="glass-input" />
                                </div>
                                <div class="form-group">
                                    <label>{{ $t('trainPage.gptTotalEpoch') }}</label>
                                    <input type="number" v-model.number="gptTotalEpoch" placeholder="15"
                                        class="glass-input" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>{{ $t('trainPage.gptSaveFreq') }}</label>
                                    <input type="number" v-model.number="gptSaveEpoch" placeholder="5"
                                        class="glass-input" />
                                </div>
                            </div>
                            <div class="checkbox-group">
                                <label class="checkbox-item">
                                    <input type="checkbox" id="gptDdp" v-model="gptDdp" />
                                    <span class="checkbox-text">{{ $t('trainPage.gptDDP') }}</span>
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" id="gptSaveLatest" v-model="gptSaveLatest" />
                                    <span class="checkbox-text">{{ $t('trainPage.gptOnlyLatest') }}</span>
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" id="gptSaveFinal" v-model="gptSaveFinal" />
                                    <span class="checkbox-text">{{ $t('trainPage.gptFinalToWeights') }}</span>
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="gptGpuIds">{{ $t('trainPage.gptGpuIds') }}</label>
                                <input type="text" id="gptGpuIds" v-model="gptGpuIds" placeholder="0"
                                    class="glass-input" />
                            </div>
                            <button class="action-btn" @click="handleGptTrain">
                                <span class="btn-icon">🚀</span>
                                {{ $t('trainPage.startGPTTrain') }}
                            </button>
                            <div class="form-group">
                                <label for="gptProcessInfo">{{ $t('trainPage.gptProcessInfo') }}</label>
                                <input type="text" id="gptProcessInfo" v-model="gptProcessInfo" disabled
                                    class="glass-input disabled" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 1C-推理 -->
            <div class="tab-content" v-else-if="activeTab === '1C'">
                <div class="content-card">
                    <div class="tip-box">
                        <span class="tip-icon">💡</span>
                        <span>{{ $t('trainPage.inferTip') }}</span>
                    </div>

                    <div class="form-section">
                        <div class="form-group">
                            <label for="gptModelList">{{ $t('trainPage.gptModelList') }}</label>
                            <select id="gptModelList" v-model="gptModelList" class="glass-input">
                                <option value="GPT_SoVITS/pretrained_models/gsv-v2final-p">
                                    GPT_SoVITS/pretrained_models/gsv-v2final-p
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sovitsModelList">{{ $t('trainPage.soVITSModelList') }}</label>
                            <select id="sovitsModelList" v-model="sovitsModelList" class="glass-input">
                                <option value="GPT_SoVITS/pretrained_models/gsv-v2final-p">
                                    GPT_SoVITS/pretrained_models/gsv-v2final-p
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="inferGpuId">{{ $t('trainPage.inferGpuId') }}</label>
                            <input type="number" id="inferGpuId" v-model.number="inferGpuId" placeholder="0"
                                class="glass-input" />
                        </div>
                        <button class="action-btn" @click="handleRefreshModel">
                            <span class="btn-icon">🔄</span>
                            {{ $t('trainPage.refreshModelPath') }}
                        </button>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="enableParallel" v-model="enableParallel" />
                                <span class="checkbox-text">{{ $t('trainPage.enableParallelInfer') }}</span>
                            </label>
                        </div>
                        <button class="action-btn primary" @click="handleTtsInfer">
                            <span class="btn-icon">🔮</span>
                            {{ $t('trainPage.startTTSInfer') }}
                        </button>
                        <div class="form-group">
                            <label for="inferProcessInfo">{{ $t('trainPage.inferProcessInfo') }}</label>
                            <input type="text" id="inferProcessInfo" v-model="inferProcessInfo" disabled
                                class="glass-input disabled" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// 基础信息
const expName = ref('')
const gpuInfo = ref('0 CPU')
const version = ref('v2')
const sovitsGPath = ref('GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/c2G2333k_mth')
const sovitsDPath = ref('GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/c2D2333k_mth')
const gptPath = ref('GPT_SoVITS/pretrained_models/gsv-v2final-pretrained/s1bert25hz-5kh-longer-epoch=12-')

// 路径选择相关ref
const sovitsGPathFile = ref(null)
const sovitsDPathFile = ref(null)
const gptPathFile = ref(null)
const textLabelFileInput = ref(null)
const audioDirInput = ref(null)
const bertPathFile = ref(null)
const sslModelPathFile = ref(null)
const tokenModelPathFile = ref(null)

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

// 路径选择弹窗
function chooseFile(refName) {
    if (refName === 'sovitsGPathFile' && sovitsGPathFile.value) {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
    document.querySelector(`input[name='${refName}']`).value = e.target.files[0].path;
};
        input.click();
    }
    else if (refName === 'sovitsDPathFile' && sovitsDPathFile.value) {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
    document.querySelector(`input[name='${refName}']`).value = e.target.files[0].path;
};
        input.click();
    }
    else if (refName === 'gptPathFile' && gptPathFile.value) {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
    document.querySelector(`input[name='${refName}']`).value = e.target.files[0].path;
};
        input.click();
    }
    else if (refName === 'textLabelFileInput' && textLabelFileInput.value) {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
    document.querySelector(`input[name='${refName}']`).value = e.target.files[0].path;
};
        input.click();
    }
    else if (refName === 'audioDirInput' && audioDirInput.value) {
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        input.onchange = (e) => {
    const path = e.target.files[0].path.replace(/\\[^\\]+$/, '');
    document.querySelector(`input[name='${refName}']`).value = path;
};
        input.click();
    }
    else if (refName === 'bertPathFile' && bertPathFile.value) {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
    document.querySelector(`input[name='${refName}']`).value = e.target.files[0].path;
};
        input.click();
    }
    else if (refName === 'sslModelPathFile' && sslModelPathFile.value) {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
    document.querySelector(`input[name='${refName}']`).value = e.target.files[0].path;
};
        input.click();
    }
    else if (refName === 'tokenModelPathFile' && tokenModelPathFile.value) {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
    document.querySelector(`input[name='${refName}']`).value = e.target.files[0].path;
};
        input.click();
    }
}

function onFileChange(e, modelKey) {
    const file = e.target.files[0];
    if (file) {
        if (modelKey === 'sovitsGPath') sovitsGPath.value = file.name;
        else if (modelKey === 'sovitsDPath') sovitsDPath.value = file.name;
        else if (modelKey === 'gptPath') gptPath.value = file.name;
        else if (modelKey === 'textLabelFile') textLabelFile.value = file.name;
        else if (modelKey === 'audioDir') {
            // 对于文件夹，获取文件夹路径
            const path = file.webkitRelativePath.split('/')[0];
            audioDir.value = path;
        }
        else if (modelKey === 'bertPath') bertPath.value = file.name;
        else if (modelKey === 'sslModelPath') sslModelPath.value = file.name;
        else if (modelKey === 'tokenModelPath') tokenModelPath.value = file.name;
    }
}

// 方法定义
const handleTextExtract = () => {
    textProcessInfo.value = '文本获取已启动...'
    // 模拟后端响应
    setTimeout(() => {
        textProcessInfo.value = '文本获取完成！耗时: 14秒'
    }, 14000)
}

const handleSslExtract = () => {
    sslProcessInfo.value = 'SSL提取已启动...'

    // 模拟进度更新
    setTimeout(() => {
        sslProcessInfo.value = '正在分析音频特征... (20%)'
    }, 2000)

    setTimeout(() => {
        sslProcessInfo.value = '正在提取声学特征... (50%)'
    }, 3000)

    setTimeout(() => {
        sslProcessInfo.value = '正在优化特征参数... (80%)'
    }, 9000)

    // 最终完成
    setTimeout(() => {
        sslProcessInfo.value = 'SSL提取完成！\n特征维度: 256；\n分析码率: 256kbps'
    }, 12500)
}

const handleTokenExtract = () => {
    tokenProcessInfo.value = '语义token提取已启动...'
    // 模拟后端响应
    setTimeout(() => {
        tokenProcessInfo.value = '语义token提取完成！'
    }, 13500)
}

const handleOneClickFormat = () => {
    oneClickInfo.value = '一键三连已启动...'
    // 模拟后端响应
    setTimeout(() => {
        oneClickInfo.value = '一键三连处理完成！'
    }, 208000)
}

const handleSovitsTrain = () => {
    sovitsProcessInfo.value = 'SoVITS训练已启动...'
    // 模拟后端响应
    setTimeout(() => {
        sovitsProcessInfo.value = 'SoVITS训练完成！耗时: 45分12秒'
    }, 100000)
}

const handleGptTrain = () => {
    gptProcessInfo.value = 'GPT训练已启动...'
    // 模拟后端响应
    setTimeout(() => {
        gptProcessInfo.value = 'GPT训练完成！耗时: 1小时15分'
    }, 120000)
}

const handleRefreshModel = () => {
    // 实际项目中这里会刷新模型列表
    alert('模型路径已刷新')
}

const handleTtsInfer = () => {
    inferProcessInfo.value = 'TTS推理WebUI已启动...'
    // 模拟后端响应
    setTimeout(() => {
        inferProcessInfo.value = 'TTS推理WebUI已启动在 http://localhost:8000'
        alert('TTS推理WebUI已启动在 http://localhost:8000')
    }, 2000)
}
</script>

<style scoped>
.train-page-container {
    min-height: 100vh;
    width: 100vw;
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100vw !important;
    background: linear-gradient(270deg, #e0e7ff, #86a8e7, #91eac9, #f5f7fa, #e0e7ff);
    background-size: 200% 200%;
    animation: gradientFlow 8s ease-in-out infinite;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    box-sizing: border-box;
}

@keyframes gradientFlow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.train-content {
    max-width: 1200px;
    width: 100%;
    position: relative;
    z-index: 1;
}

/* 页面标题 */
.page-header {
    text-align: center;
    margin-bottom: 30px;
}

.page-title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.title-icon {
    font-size: 2rem;
}

.page-subtitle {
    font-size: 1.1rem;
    color: #666;
    font-weight: 400;
}

/* 卡片样式 */
.info-card,
.content-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.card-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.card-icon {
    font-size: 1.2rem;
}

/* 表单网格 */
.form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.form-section {
    margin-bottom: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-weight: 600;
    font-size: 0.95rem;
}

/* 玻璃态输入框 */
.glass-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 12px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease;
    font-family: inherit;
    box-sizing: border-box;
}

.glass-input:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
}

.glass-input:hover {
    border-color: #bdc3c7;
    background: rgba(255, 255, 255, 0.9);
}

.glass-input.disabled {
    background: rgba(245, 245, 245, 0.8);
    cursor: not-allowed;
    color: #666;
}

/* 单选按钮组 */
.radio-group {
    display: flex;
    gap: 20px;
}

.radio-item {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.radio-item input {
    margin-right: 8px;
    accent-color: #667eea;
}

.radio-text {
    font-weight: 500;
    color: #2c3e50;
}

/* 复选框组 */
.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 20px 0;
}

.checkbox-item {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.checkbox-item input {
    margin-right: 8px;
    accent-color: #667eea;
}

.checkbox-text {
    font-weight: 500;
    color: #2c3e50;
}

/* 路径按钮组 */
.path-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.input-btn-group {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
}

.path-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: 2px solid #5a6fd8;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
    white-space: nowrap;
    min-width: 80px;
}

.path-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    border-color: #4a5fc7;
}

.path-btn:active {
    transform: translateY(0);
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

/* 标签页 */
.tabs-container {
    margin-bottom: 30px;
}

.tabs {
    display: flex;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.5);
    gap: 8px;
}

.tab-button {
    flex: 1;
    padding: 12px 0;
    background: transparent;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: #666;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    min-width: 120px;
    box-sizing: border-box;
}

.tab-button.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.18);
    z-index: 1;
}

.tab-button:hover:not(.active) {
    color: #667eea;
    background: rgba(102, 126, 234, 0.08);
    transform: translateY(-1px);
}

.tab-button:active {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.25);
    transform: translateY(0);
}

.tab-icon {
    font-size: 1.2rem;
}

/* 内容区域 */
.tab-content {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 区块卡片 */
.section-card {
    background: rgba(245, 247, 250, 0.8);
    border-radius: 16px;
    padding: 25px;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.2s ease;
}

.section-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.section-card.highlight {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border: 1px solid rgba(102, 126, 234, 0.2);
}

.section-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-icon {
    font-size: 1.2rem;
}

.section-desc {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 20px;
    font-style: italic;
}

/* 提示框 */
.tip-box {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border: 1px solid rgba(102, 126, 234, 0.2);
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.tip-icon {
    font-size: 1.2rem;
    color: #667eea;
}

/* 按钮样式 */
.action-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0;
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.action-btn:active {
    transform: translateY(0);
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

.action-btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 14px 28px;
    font-size: 1.1rem;
}

.btn-icon {
    font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .train-page-container {
        padding: 10px;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .tabs {
        flex-direction: column;
    }

    .page-title {
        font-size: 2rem;
    }

    .info-card,
    .content-card {
        padding: 20px;
    }
}
</style>