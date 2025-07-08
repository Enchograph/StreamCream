<template>
    <v-container class="pa-4 setting-bg-glass">
        <v-card flat class="mx-auto setting-card-glass" max-width="1000">
            <v-card-title class="text-h5 font-weight-medium setting-title-glass text-left">
                <span class="title-bar-gradient"><v-icon color="#fff"
                        size="28">mdi-cog</v-icon></span>{{ $t('setting.title') }}
            </v-card-title>

            <v-row>
                <v-col cols="12">
                    <v-card flat class="mb-6 section-card-glass">
                        <v-card-title class="text-subtitle-1 font-weight-medium section-title-glass">
                            <span class="section-bar-gradient"><v-icon color="#fff"
                                    size="20">mdi-palette</v-icon></span>{{ $t('setting.themeTitle') }}
                        </v-card-title>

                        <v-col cols="12">
                            <v-row align="center" justify="space-between">
                                <v-col cols="12">
                                    <v-select v-model="bannerColor" :items="[
                                        { text: $t('setting.bannerDefault'), value: 'default' },
                                        { text: $t('setting.bannerBlue'), value: 'blue' },
                                        { text: $t('setting.bannerGreen'), value: 'green' },
                                        // { text: $t('setting.bannerRed'), value: 'red' },
                                        // { text: $t('setting.bannerPurple'), value: 'purple' },
                                        // { text: $t('setting.bannerWhite'), value: 'white' },
                                        // { text: $t('setting.bannerBrown'), value: 'brown' },
                                        { text: $t('setting.bannerYellow'), value: 'yellow' },
                                        { text: $t('setting.bannerPink'), value: 'pink' }
                                    ]" item-title="text" item-value="value" :label="$t('setting.bannerColor')" outlined
                                        dense class="rounded-input-glass"></v-select>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-end align-center">
                                    <v-select v-model="isBannerDispersed" :items="[
                                        { text: $t('setting.bannerDisperse'), value: true },
                                        { text: $t('setting.bannerGather'), value: false }
                                    ]" item-title="text" item-value="value" :label="$t('setting.bannerLayout')"
                                        outlined dense class="rounded-input-glass"
                                        @change="handleBannerLayoutChange"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-select v-model="locale" :items="[
                                        { text: '中文', value: 'zh-CN' },
                                        { text: 'English', value: 'en-US' },
                                        { text: '日本語', value: 'ja-JP' }
                                    ]" item-title="text" item-value="value" :label="$t('setting.languageTitle')"
                                        outlined dense class="rounded-input-glass" @update:model-value="switchLanguage">
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card>
                </v-col>
                <!-- <v-col cols="12">
                    <v-card flat class="mb-6 section-card-glass">
                        <v-card-title class="text-subtitle-1 font-weight-medium section-title-glass">
                            <span class="section-bar-gradient"><v-icon color="#fff"
                                    size="20">mdi-tools</v-icon></span>{{ $t('setting.debugTitle') }}
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn color="primary" variant="elevated" @click="resetPreferences"
                                        class="rounded-btn-glass">
                                        {{ $t('setting.resetAll') }}
                                    </v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-switch v-model="debugMode" :label="$t('setting.debugMode')" color="primary"
                                        :messages="debugMode ? $t('setting.enabled') : $t('setting.disabled')"
                                        class="rounded-switch-glass"></v-switch>
                                </v-col>

                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col> -->
                <v-col cols="12">
                    <v-card flat class="mb-6 section-card-glass">
                        <v-card-title class="text-subtitle-1 font-weight-medium section-title-glass">
                            <span class="section-bar-gradient"><v-icon color="#fff"
                                    size="20">mdi-robot</v-icon></span>{{ $t('setting.aiTitle') }}
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-select v-model="aiSettings.provider" :items="[
                                        { text: 'OpenAI', value: 'https://api.openai.com/v1/chat/completions' },
                                        { text: 'DeepSeek', value: 'https://api.deepseek.com/v1/chat/completions' },
                                        { text: 'Anthropic', value: 'https://api.anthropic.com/v1/messages' },
                                        { text: 'Google', value: 'https://generativelanguage.googleapis.com/v1beta/models' },
                                        { text: '硅基流动', value: 'https://api.siliconflow.cn/v1/chat/completions' },
                                        { text: '火山方舟', value: 'https://ark.volcengineapi.com/v1/chat/completions' },
                                        { text: '腾讯云', value: 'https://hunyuan.cloud.tencent.com/hyllm/v1/chat/completions' },
                                        { text: 'SORUX', value: 'https://api.soruxgpt.com/v1/chat/completions' },
                                        { text: $t('setting.providerCustom'), value: 'custom' }
                                    ]" item-title="text" item-value="value" :label="$t('setting.provider')" outlined
                                        dense class="rounded-input-glass" @change="handleProviderChange"></v-select>
                                    <v-text-field v-if="aiSettings.provider === 'custom'"
                                        v-model="aiSettings.customProvider" :label="$t('setting.apiEndpoint')"
                                        :placeholder="$t('setting.apiEndpointPlaceholder')" outlined dense
                                        class="mt-2 rounded-input-glass"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="aiSettings.apiKey" :label="$t('setting.apiKey')"
                                        :placeholder="$t('setting.apiKeyPlaceholder')" type="password" outlined dense
                                        class="rounded-input-glass"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select v-model="aiSettings.modelName" :items="[
                                        { text: 'GPT-4o', value: 'gpt-4o', group: 'OpenAI' },
                                        { text: 'GPT-4 Turbo', value: 'gpt-4-turbo', group: 'OpenAI' },
                                        { text: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo', group: 'OpenAI' },
                                        { text: 'Claude 3 Opus', value: 'claude-3-opus-20240229', group: 'Anthropic' },
                                        { text: 'Claude 3 Sonnet', value: 'claude-3-sonnet-20240229', group: 'Anthropic' },
                                        { text: 'Claude 3 Haiku', value: 'claude-3-haiku-20240307', group: 'Anthropic' },
                                        { text: 'Gemini 2.5 Pro', value: 'gemini-2.5-pro-preview-05-06', group: 'Google' },
                                        { text: 'Gemini 2.0 Flash', value: 'gemini-2.0-flash-exp', group: 'Google' },
                                        { text: 'DeepSeek V3', value: 'deepseek-v3', group: '其他' },
                                        { text: 'Grok-3', value: 'grok-3', group: '其他' },
                                        { text: 'GPT-4o-2024-05-13', value: 'gpt-4o-2024-05-13', group: 'OpenAI' },
                                        { text: 'GPT-4o-2024-08-06', value: 'gpt-4o-2024-08-06', group: 'OpenAI' },
                                        { text: 'GPT-4o-2024-11-20', value: 'gpt-4o-2024-11-20', group: 'OpenAI' },
                                        { text: 'GPT-4o-image-vip', value: 'gpt-4o-image-vip', group: 'OpenAI' },
                                        { text: 'GPT-4o-mini', value: 'gpt-4o-mini', group: 'OpenAI' },
                                        { text: 'Claude 3.5 Haiku', value: 'claude-3-5-haiku-20241022', group: 'Anthropic' },
                                        { text: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet-20240620', group: 'Anthropic' },
                                        { text: 'Claude 3.5 Sonnet 2024', value: 'claude-3-5-sonnet-20241022', group: 'Anthropic' },
                                        { text: 'Claude 3.7 Sonnet', value: 'claude-3-7-sonnet-20250219', group: 'Anthropic' },
                                        { text: 'Claude 3.7 Sonnet Thinking', value: 'claude-3-7-sonnet-thinking', group: 'Anthropic' },
                                        { text: 'Claude Opus 4', value: 'claude-opus-4', group: 'Anthropic' },
                                        { text: 'Claude Opus 4 2025', value: 'claude-opus-4-20250514', group: 'Anthropic' },
                                        { text: 'Claude Opus 4 Thinking', value: 'claude-opus-4-thinking', group: 'Anthropic' },
                                        { text: 'Claude Opus 4 All', value: 'claude-opus-4-all', group: 'Anthropic' },
                                        { text: 'Claude Opus 4 Thinking All', value: 'claude-opus-4-thinking-all', group: 'Anthropic' },
                                        { text: 'Claude Sonnet 4', value: 'claude-sonnet-4', group: 'Anthropic' },
                                        { text: 'Claude Sonnet 4 2025', value: 'claude-sonnet-4-20250514', group: 'Anthropic' },
                                        { text: 'Claude Sonnet 4 Thinking', value: 'claude-sonnet-4-thinking', group: 'Anthropic' },
                                        { text: 'Claude Sonnet 4 All', value: 'claude-sonnet-4-all', group: 'Anthropic' },
                                        { text: 'Claude Sonnet 4 Thinking All', value: 'claude-sonnet-4-thinking-all', group: 'Anthropic' },
                                        { text: 'DeepSeek R1', value: 'deepseek-r1', group: '其他' },
                                        { text: 'DeepSeek R1 0528', value: 'deepseek-r1-0528', group: '其他' },
                                        { text: 'DeepSeek Reasoner All', value: 'deepseek-reasoner-all', group: '其他' },
                                        { text: 'Gemini 2.0 Flash Thinking', value: 'gemini-2.0-flash-thinking-exp', group: 'Google' },
                                        { text: 'Gemini 2.0 Flash Thinking 01-21', value: 'gemini-2.0-flash-thinking-exp-01-21', group: 'Google' },
                                        { text: 'Gemini 2.0 Flash Thinking 1219', value: 'gemini-2.0-flash-thinking-exp-1219', group: 'Google' },
                                        { text: 'Gemini 2.5 Flash Preview', value: 'gemini-2.5-flash-preview-04-17', group: 'Google' },
                                        { text: 'Gemini 2.5 Flash Thinking', value: 'gemini-2.5-flash-preview-04-17-thinking', group: 'Google' },
                                        { text: 'Gemini 2.5 Pro Exp', value: 'gemini-2.5-pro-exp-03-25', group: 'Google' },
                                        { text: 'Grok-3 DeepSearch', value: 'grok-3-deepsearch', group: '其他' },
                                        { text: 'Grok-3 Reasoning', value: 'grok-3-reasoning', group: '其他' },
                                        { text: 'MJ Chat', value: 'mj-chat', group: '其他' },
                                        { text: 'Net DeepSeek R1', value: 'net-deepseek-r1', group: '其他' },
                                        { text: 'O1', value: 'o1', group: '其他' },
                                        { text: 'O1 Mini', value: 'o1-mini', group: '其他' },
                                        { text: 'O3', value: 'o3', group: '其他' },
                                        { text: 'O3 All', value: 'o3-all', group: '其他' },
                                        { text: 'Text Embedding Ada 002', value: 'text-embedding-ada-002', group: '其他' }
                                    ]" :label="$t('setting.modelName')" outlined dense item-title="text"
                                        item-value="value" :filter="modelFilter" :search-input.sync="modelSearch"
                                        clearable :no-data-text="$t('setting.noModelFound')"
                                        class="rounded-input-glass">
                                        <template v-slot:prepend-item>
                                            <v-text-field v-model="modelSearch" :label="$t('setting.searchModel')"
                                                prepend-inner-icon="mdi-magnify" clearable hide-details
                                                class="px-4 rounded-input-glass"></v-text-field>
                                        </template>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" v-if="aiSettings.modelName === 'custom'">
                                    <v-text-field v-model="aiSettings.customModelName"
                                        :label="$t('setting.customModelName')"
                                        :placeholder="$t('setting.customModelNamePlaceholder')" outlined dense
                                        class="rounded-input-glass"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <v-btn color="primary" class="mr-4" @click="testLLMConnection">
                                        {{ $t('setting.testConnection') }}
                                    </v-btn>
                                    <v-btn color="success" @click="saveAISettings"
                                        @update:model-value="handleResolutionChange">
                                        {{ $t('setting.saveSettings') }}
                                    </v-btn>
                                </v-col>

                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <!-- <v-row class="mt-6">
                <v-col cols="12" class="text-center">
                    <v-btn color="primary" variant="flat" @click="saveSettings" class="rounded-btn-glass">
                        保存
                    </v-btn>
                </v-col>
            </v-row> -->
            <!-- <v-row>
                <v-col cols="12">
                    <v-card flat class="mb-6 section-card-glass">
                        <v-card-title class="text-subtitle-1 font-weight-medium section-title-glass">
                            <span class="section-bar-gradient"><v-icon color="#fff"
                                    size="20">mdi-translate</v-icon></span>{{ $t('setting.languageTitle') }}
                        </v-card-title>
                        <v-card-text>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row> -->
            <v-row>
                <v-col cols="12">
                    <v-card flat class="mb-6 section-card-glass">
                        <v-card-title class="text-subtitle-1 font-weight-medium section-title-glass">
                            <span class="section-bar-gradient"><v-icon color="#fff"
                                    size="20">mdi-video-wireless</v-icon></span>{{ $t('setting.liveTitle') }}
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-select v-model="revolutionPreference" :items="[
                                        { text: '1920×1080 (16:9)', value: '1920x1080' },
                                        { text: '1280×720 (16:9)', value: '1280x720' },
                                        { text: '2048×1080 (≈17:9)', value: '2048x1080' },
                                        { text: '1080×1920 (=9:16)', value: '1080x1920' }
                                    ]" item-title="text" item-value="value" :label="$t('setting.resolution')" outlined
                                        dense class="rounded-input-glass"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="fpsPreference" :items="[
                                        { text: '30fps', value: '30' },
                                        { text: '60fps', value: '60' }
                                    ]" item-title="text" item-value="value" :label="$t('setting.fps')" outlined dense
                                        class="rounded-input-glass"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="bgPreference" :items="[
                                        { text: $t('setting.bgDefault'), value: 'default' },
                                        ...customBackgrounds.map(bg => ({ text: bg, value: bg }))
                                    ]" item-title="text" item-value="value" :label="$t('setting.bg')" outlined dense
                                        class="rounded-input-glass"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-btn color="primary" variant="elevated" block height="44"
                                        @click="$refs.bgUpload.click()" class="rounded-btn-glass">
                                        {{ $t('setting.uploadBg') }}
                                    </v-btn>
                                    <input type="file" ref="bgUpload" @change="handleBgUpload" accept="image/*"
                                        style="display: none">
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="platformPreference" :items="[
                                        { text: $t('setting.platformBilibili'), value: 'bilibili' },
                                        { text: '抖音', value: 'douyin' },
                                        { text: '快手', value: 'kuaishou' },
                                        { text: '虎牙', value: 'huya' },
                                        { text: '斗鱼', value: 'douyu' },
                                        { text: 'YY直播', value: 'yy' }
                                    ]" item-title="text" item-value="value" :label="$t('setting.platform')" outlined
                                        dense class="rounded-input-glass"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-btn color="secondary" variant="elevated" block height="44"
                                        class="mb-4 rounded-btn-glass">
                                        {{ $t('setting.getStreamKey') }}
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="streamDomain" :label="$t('setting.streamDomain')"
                                        :placeholder="$t('setting.inputStreamDomain')" outlined dense
                                        class="rounded-input-glass"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="streamKey" :label="$t('setting.streamKey')"
                                        :placeholder="$t('setting.inputStreamKey')" outlined dense
                                        class="rounded-input-glass"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <v-btn color="primary" class="mr-4" @click="testStreamConnection">
                                        {{ $t('setting.testConnection') }}
                                    </v-btn>
                                    <v-btn color="success" @click="saveStreamSettings"
                                        @update:model-value="handleResolutionChange">
                                        {{ $t('setting.saveSettings') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <!-- <v-row>
                <v-col cols="12">
                    <v-card class="mb-4" outlined>
                        <v-card-title class="text-h5">{{ $t('setting.ttsTitle') }}</v-card-title>
                        <v-card-text>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card class="mb-4" outlined>
                        <v-card-title class="text-h5">{{ $t('setting.live2dTitle') }}</v-card-title>
                        <v-card-text>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row> -->
            <div class="finish-btn-wrapper">
                <v-btn color="primary" variant="elevated" @click="completeSetting" class="rounded-btn-glass">
                    {{ $t('setting.finish') }}
                </v-btn>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import api from '/src/api/index.js'
import { useRouter } from 'vue-router'
import { useLive2DStore } from '../../stores/live2d';
import { ElMessage } from 'element-plus';
import LanguageSwitcher from '../../components/LanguageSwitcher.vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'


export default {
    name: 'settingPage',
    components: { LanguageSwitcher },
    data() {
        return {
            debugMode: localStorage.getItem('debugMode') === 'true',
            bannerColor: localStorage.getItem('bannerColor') || 'default',
            resolution: localStorage.getItem('resolution') || '1920x1080',
            locale: localStorage.getItem('locale') || 'zh-CN',
            revolutionPreference: localStorage.getItem('revolutionPreference') || '1920x1080',
            fpsPreference: localStorage.getItem('fpsPreference') || '30',
            bgPreference: localStorage.getItem('bgPreference') || 'default',
            platformPreference: localStorage.getItem('platformPreference') || 'bilibili',
            streamDomain: localStorage.getItem('streamDomain') || '',
            streamKey: localStorage.getItem('streamKey') || '',
            modelSearch: '',
            aiSettings: {
                provider: localStorage.getItem('aiProvider') || 'https://api.openai.com/v1/chat/completions',
                customProvider: localStorage.getItem('aiCustomProvider') || '',
                apiKey: localStorage.getItem('aiApiKey') || '',
                modelName: localStorage.getItem('aiModelName') || '',
                temperature: parseFloat(localStorage.getItem('aiTemperature')) || 0.7,
                maxTokens: parseInt(localStorage.getItem('aiMaxTokens')) || 1000
            },
            customBackgrounds: [],
            modelSearch: '',
            showModelSearch: false,
            allModels: [
                { value: 'gpt-4o', label: 'GPT-4o', group: 'OpenAI' },
                { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', group: 'OpenAI' },
                { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', group: 'OpenAI' },
                { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus', group: 'Anthropic' },
                { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet', group: 'Anthropic' },
                { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', group: 'Anthropic' },
                { value: 'gemini-2.5-pro-preview-05-06', label: 'Gemini 2.5 Pro', group: 'Google' },
                { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash', group: 'Google' },
                { value: 'deepseek-v3', label: 'DeepSeek V3', group: '其他' },
                { value: 'grok-3', label: 'Grok-3', group: '其他' },
                { value: 'gpt-4o-2024-05-13', label: 'GPT-4o-2024-05-13', group: 'OpenAI' },
                { value: 'gpt-4o-2024-08-06', label: 'GPT-4o-2024-08-06', group: 'OpenAI' },
                { value: 'gpt-4o-2024-11-20', label: 'GPT-4o-2024-11-20', group: 'OpenAI' },
                { value: 'gpt-4o-image-vip', label: 'GPT-4o-image-vip', group: 'OpenAI' },
                { value: 'gpt-4o-mini', label: 'GPT-4o-mini', group: 'OpenAI' },
                { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku', group: 'Anthropic' },
                { value: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet', group: 'Anthropic' },
                { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet 2024', group: 'Anthropic' },
                { value: 'claude-3-7-sonnet-20250219', label: 'Claude 3.7 Sonnet', group: 'Anthropic' },
                { value: 'claude-3-7-sonnet-thinking', label: 'Claude 3.7 Sonnet Thinking', group: 'Anthropic' },
                { value: 'claude-opus-4', label: 'Claude Opus 4', group: 'Anthropic' },
                { value: 'claude-opus-4-20250514', label: 'Claude Opus 4 2025', group: 'Anthropic' },
                { value: 'claude-opus-4-thinking', label: 'Claude Opus 4 Thinking', group: 'Anthropic' },
                { value: 'claude-opus-4-all', label: 'Claude Opus 4 All', group: 'Anthropic' },
                { value: 'claude-opus-4-thinking-all', label: 'Claude Opus 4 Thinking All', group: 'Anthropic' },
                { value: 'claude-sonnet-4', label: 'Claude Sonnet 4', group: 'Anthropic' },
                { value: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4 2025', group: 'Anthropic' },
                { value: 'claude-sonnet-4-thinking', label: 'Claude Sonnet 4 Thinking', group: 'Anthropic' },
                { value: 'claude-sonnet-4-all', label: 'Claude Sonnet 4 All', group: 'Anthropic' },
                { value: 'claude-sonnet-4-thinking-all', label: 'Claude Sonnet 4 Thinking All', group: 'Anthropic' },
                { value: 'deepseek-r1', label: 'DeepSeek R1', group: '其他' },
                { value: 'deepseek-r1-0528', label: 'DeepSeek R1 0528', group: '其他' },
                { value: 'deepseek-reasoner-all', label: 'DeepSeek Reasoner All', group: '其他' },
                { value: 'gemini-2.0-flash-thinking-exp', label: 'Gemini 2.0 Flash Thinking', group: 'Google' },
                { value: 'gemini-2.0-flash-thinking-exp-01-21', label: 'Gemini 2.0 Flash Thinking 01-21', group: 'Google' },
                { value: 'gemini-2.0-flash-thinking-exp-1219', label: 'Gemini 2.0 Flash Thinking 1219', group: 'Google' },
                { value: 'gemini-2.5-flash-preview-04-17', label: 'Gemini 2.5 Flash Preview', group: 'Google' },
                { value: 'gemini-2.5-flash-preview-04-17-thinking', label: 'Gemini 2.5 Flash Thinking', group: 'Google' },
                { value: 'gemini-2.5-pro-exp-03-25', label: 'Gemini 2.5 Pro Exp', group: 'Google' },
                { value: 'grok-3-deepsearch', label: 'Grok-3 DeepSearch', group: '其他' },
                { value: 'grok-3-reasoning', label: 'Grok-3 Reasoning', group: '其他' },
                { value: 'mj-chat', label: 'MJ Chat', group: '其他' },
                { value: 'net-deepseek-r1', label: 'Net DeepSeek R1', group: '其他' },
                { value: 'o1', label: 'O1', group: '其他' },
                { value: 'o1-mini', label: 'O1 Mini', group: '其他' },
                { value: 'o3', label: 'O3', group: '其他' },
                { value: 'o3-all', label: 'O3 All', group: '其他' },
                { value: 'text-embedding-ada-002', label: 'Text Embedding Ada 002', group: '其他' }
            ],
            isBannerDispersed: localStorage.getItem('topBannerDispersed') === 'true'
        }
    },
    watch: {
        debugMode(newVal) {
            localStorage.setItem('debugMode', newVal)
        },
        bannerColor(newVal) {
            localStorage.setItem('bannerColor', newVal)
            window.dispatchEvent(new Event('storage'))
        },
        resolution(newVal) {
            localStorage.setItem('resolution', newVal)
            window.dispatchEvent(new Event('storage'))
        },
        revolutionPreference(newVal) {
            localStorage.setItem('revolutionPreference', newVal)
            window.dispatchEvent(new Event('storage'))
        },
        fpsPreference(newVal) {
            localStorage.setItem('fpsPreference', newVal)
            window.dispatchEvent(new Event('storage'))
        },
        bgPreference(newVal) {
            localStorage.setItem('bgPreference', newVal)
            window.dispatchEvent(new Event('storage'))
        },
        platformPreference(newVal) {
            localStorage.setItem('platformPreference', newVal)
            window.dispatchEvent(new Event('storage'))
        },
        streamDomain(newVal) {
            localStorage.setItem('streamDomain', newVal)
            window.dispatchEvent(new Event('storage'))
        },
        streamKey(newVal) {
            localStorage.setItem('streamKey', newVal)
            window.dispatchEvent(new Event('storage'))
        },
        'aiSettings.provider'(newVal) {
            localStorage.setItem('aiProvider', newVal)
        },
        'aiSettings.customProvider'(newVal) {
            localStorage.setItem('aiCustomProvider', newVal)
        },
        'aiSettings.apiKey'(newVal) {
            localStorage.setItem('aiApiKey', newVal)
        },
        'aiSettings.modelName'(newVal) {
            localStorage.setItem('aiModelName', newVal)
        },
        'aiSettings.temperature'(newVal) {
            localStorage.setItem('aiTemperature', newVal)
        },
        'aiSettings.maxTokens'(newVal) {
            localStorage.setItem('aiMaxTokens', newVal)
        },
        isBannerDispersed(newVal) {
            localStorage.setItem('topBannerDispersed', newVal)
            window.dispatchEvent(new Event('topBannerLayoutChange'))
        }
    },
    async mounted() {
        this.fetchCustomBackgrounds();
        // 优先从后端获取
        try {
            const prefs = await api.getPreferences();

            // 只有当后端有aiSettings且本地没有保存过设置时，才使用后端的设置
            if (prefs && prefs.aiSettings && !localStorage.getItem('aiProvider')) {
                this.aiSettings = prefs.aiSettings;
                // 保存到localStorage的各个字段
                localStorage.setItem('aiProvider', this.aiSettings.provider);
                localStorage.setItem('aiCustomProvider', this.aiSettings.customProvider);
                localStorage.setItem('aiApiKey', this.aiSettings.apiKey);
                localStorage.setItem('aiModelName', this.aiSettings.modelName);
                localStorage.setItem('aiTemperature', this.aiSettings.temperature);
                localStorage.setItem('aiMaxTokens', this.aiSettings.maxTokens);
            }

            // 加载Live2D模型设置
            if (prefs.live2dSettings) {
                localStorage.setItem('live2dX', prefs.live2dSettings.x);
                localStorage.setItem('live2dY', prefs.live2dSettings.y);
                localStorage.setItem('live2dScale', prefs.live2dSettings.scale);
            }
        } catch (e) {
            // 后端获取失败时，localStorage已经在data()中设置了默认值
            console.error('加载Live2D设置失败:', e);
        }
        if (localStorage.getItem('debugMode') !== null) {
            this.debugMode = localStorage.getItem('debugMode') === 'true'
        }
        if (localStorage.getItem('bannerColor') !== null) {
            this.bannerColor = localStorage.getItem('bannerColor')
        }

    },
    methods: {
        handleResolutionChange(newResolution) {
            const live2DStore = useLive2DStore();
            live2DStore.setResolution(newResolution);
            localStorage.setItem('revolutionPreference', newResolution);
        },
        async handleBgUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('/api/upload-background', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const fileName = response.data.filename;
                this.customBackgrounds.push(fileName);
                localStorage.setItem('customBackgrounds', JSON.stringify(this.customBackgrounds));
            } catch (error) {
                console.error('上传失败:', error);
            }
        },
        handleProviderChange() {
            if (this.aiSettings.provider !== 'custom') {
                this.aiSettings.customProvider = '';
            }
        },
        filterModels() {
            // 实现模型搜索过滤逻辑
            const searchTerm = this.modelSearch.toLowerCase();
            this.showModelSearch = searchTerm.length > 0;

            if (this.showModelSearch) {
                // 这里可以添加动态过滤逻辑
                // 例如: 根据搜索词过滤allModels数组
            }
        },
        modelFilter(item, queryText, itemText) {
            const search = queryText.toLowerCase();
            return (
                item.text.toLowerCase().includes(search) ||
                item.value.toLowerCase().includes(search) ||
                item.group.toLowerCase().includes(search)
            );
        },
        async completeSetting() {
            // 保存AI设置到localStorage（兼容streamingPage.vue的读取方式）
            localStorage.setItem('aiSettings', JSON.stringify(this.aiSettings));
            // 先自动测试LLM连接
            // const llmOk = await this.testLLMConnection(false);
            // if (!llmOk) {
            //     alert('AI设置保存失败');
            //     return;
            // }
            // this.saveAISettings(false);
            try {
                await api.savePreferences({
                    debugMode: this.debugMode,
                    bannerColor: this.bannerColor,
                    resolution: this.resolution,
                    aiSettings: this.aiSettings  // 添加AI设置保存
                })
            } catch (e) {
                // 可选：提示保存失败
            }
            ElMessage.success({
                message: '设置完成',
                duration: 2000
            });
            const redirectPath = this.$route.query.redirect || '/mainPage'
            this.$router.push(redirectPath).then(() => {
                window.location.reload();
            });
        },
        async resetPreferences() {
            try {
                await api.resetPreferences();
                localStorage.clear();
                ElMessage.success('所有偏好设置已重置');
            } catch (error) {
                ElMessage.error('重置失败: ' + error.message);
            }
        },
        testStreamConnection() {
            // Implement stream connection test logic here
            console.log('Testing stream connection');
        },
        saveStreamSettings() {
            // Implement save settings logic here
            console.log('Saving stream settings');
        },
        async handleBgUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            try {
                const response = await api.uploadBackground(file);
                this.customBackgrounds.push(response.filename);
                this.bgPreference = response.filename;
                localStorage.setItem('bgPreference', response.filename);
                window.dispatchEvent(new Event('storage'));
            } catch (error) {
                console.error('上传背景失败:', error);
                ElMessage.error('上传背景失败');
            }
            event.target.value = ''; // 重置input
        },
        async saveStreamSettings(showAlert = true) {
            localStorage.setItem('revolutionPreference', this.revolutionPreference);
            localStorage.setItem('fpsPreference', this.fpsPreference);
            localStorage.setItem('bgPreference', this.bgPreference);
            localStorage.setItem('platformPreference', this.platformPreference);
            localStorage.setItem('streamDomain', this.streamDomain);
            localStorage.setItem('streamKey', this.streamKey);

            try {
                await api.savePreferences({
                    revolutionPreference: this.revolutionPreference,
                    fpsPreference: this.fpsPreference,
                    bgPreference: this.bgPreference,
                    platformPreference: this.platformPreference,
                    streamDomain: this.streamDomain,
                    streamKey: this.streamKey
                });
                const live2dStore = useLive2DStore();
                live2dStore.setResolution(this.resolution);
                if (showAlert) ElMessage.success('直播设置已保存！');
            } catch (e) {
                if (showAlert) ElMessage.error('直播设置保存失败：' + e.message);
            }
        },

        handleResolutionChange(newVal) {
            const live2dStore = useLive2DStore();
            live2dStore.setResolution(newVal);
        },

        async saveAISettings(showAlert = true) {
            // 自动测试LLM连接
            const llmOk = await this.testLLMConnection(false);
            if (!llmOk) {
                alert('AI设置保存失败');
                return;
            }
            localStorage.setItem('aiSettings', JSON.stringify(this.aiSettings));
            // 保存到后端
            api.savePreferences({ aiSettings: this.aiSettings });
            if (showAlert) {
                alert('AI设置已保存！');
            }
        },
        async testLLMConnection(showAlert = true) {
            // 构造测试请求参数
            const { provider, apiKey, modelName, temperature } = this.aiSettings;
            if (!provider || !apiKey || !modelName) {
                if (showAlert) alert('请填写完整的API地址、API密钥和模型名称！');
                return false;
            }
            try {
                // 以OpenAI兼容API为例
                const res = await fetch(provider, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: modelName,
                        messages: [
                            { role: 'user', content: '你好，请不多不少地只回复"测试成功"四个字。' }
                        ],
                        temperature: temperature || 0.7,
                        max_tokens: 16
                    })
                });
                const data = await res.json();
                if (res.ok && data.choices && data.choices.length > 0) {
                    // if (showAlert) alert('LLM服务连接成功！返回内容：' + (data.choices[0].message?.content || '无'));
                    if (showAlert) alert('LLM服务连接成功！');
                    return true;
                } else {
                    if (showAlert) alert('LLM服务连接失败！' + (data.error?.message || JSON.stringify(data)));
                    return false;
                }
            } catch (e) {
                if (showAlert) alert('LLM服务连接异常：' + e);
                return false;
            }
        },
        handleBannerLayoutChange() {
            localStorage.setItem('topBannerDispersed', this.isBannerDispersed)
            window.dispatchEvent(new Event('topBannerLayoutChange'))
        },
        switchLanguage(newLocale) {
            localStorage.setItem('locale', this.locale);
            this.$i18n.locale = this.locale;
            window.dispatchEvent(new Event('languageChange'));
        },
        async fetchCustomBackgrounds() {
            try {
                const res = await fetch('http://localhost:9080/api/list-backgrounds');
                const data = await res.json();
                this.customBackgrounds = data.backgrounds || [];
            } catch (e) {
                this.customBackgrounds = [];
            }
        }
    },
    computed: {
        // finishBtnColor() {
        //     if (this.bannerColor === 'blue') return '#1976d2';
        //     if (this.bannerColor === 'purple') return '#7c3aed';
        //     return '#409eff';
        // }
    }
}
</script>

<style scoped>
.setting-bg-glass {
    min-height: 100vh;
    width: 100vw;
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100vw !important;
    background: linear-gradient(270deg, #e0e7ff, #86a8e7, #91eac9, #f5f7fa, #e0e7ff);
    background-size: 200% 200%;
    animation: gradientFlow 8s ease-in-out infinite;
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

.setting-content {
    position: relative;
    z-index: 1;
}

.setting-card-glass {
    border-radius: 32px;
    padding: 40px 32px 32px 32px;
    background: rgba(255, 255, 255, 0.55);
    border: 1.5px solid #e3e8f7;
    position: relative;
    z-index: 1;
}

.setting-title-glass {
    display: flex;
    align-items: center;
    font-size: 2.4rem;
    margin-bottom: 28px;
    letter-spacing: 2px;
    font-weight: 700;
    position: relative;
    z-index: 1;
    text-transform: none !important;
}

.title-content {
    display: flex;
    align-items: center;
}

.title-text {
    margin-left: 18px;
}

.language-switcher-container {
    position: relative;
    z-index: 999999;
    margin-left: 16px;
    margin-top: -8px;
}

/* 当使用固定定位时，隐藏原始容器 */
.language-switcher-container .language-switcher.fixed-position {
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    z-index: 999999 !important;
    margin: 0 !important;
}

.language-setting-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
}

.title-bar-gradient {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #7f7fd5 0%, #86a8e7 50%, #91eac9 100%);
    border-radius: 16px;
    margin-right: 18px;
}

.section-card-glass {
    background: rgba(245, 247, 250, 0.45);
    border-radius: 24px;
    margin-bottom: 36px;
    padding-bottom: 12px;
    border: 1px solid #e3e8f7;
}

.section-title-glass {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    margin-bottom: 12px;
    font-weight: 600;
    text-transform: none !important;
}

.section-bar-gradient {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #7f7fd5 0%, #86a8e7 50%, #91eac9 100%);
    border-radius: 10px;
    margin-right: 12px;
}

.rounded-btn-glass {
    border-radius: 28px !important;
    font-size: 1.08rem;
    padding: 10px 32px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    line-height: 1;
    letter-spacing: 2px;
    text-transform: none !important;
}

.rounded-btn-glass:hover {
    background: linear-gradient(90deg, #7f7fd5 0%, #86a8e7 100%);
    color: #fff;
}

.rounded-input-glass .v-input__control,
.rounded-input-glass .v-field {
    border-radius: 22px !important;
    background: rgba(255, 255, 255, 0.7) !important;
    border: 1px solid #e3e8f7;
}

.rounded-switch-glass .v-input__control {
    border-radius: 22px !important;
    background: rgba(255, 255, 255, 0.7) !important;
    border: 1px solid #e3e8f7;
}

.finish-btn-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
    margin-bottom: 8px;
}

/* 覆盖Vuetify的默认大写样式 */
.text-h5,
.text-subtitle-1,
.v-card-title {
    text-transform: none !important;
    font-variant: normal !important;
}

/* 确保所有按钮文本不会大写 */
.v-btn {
    text-transform: none !important;
    font-variant: normal !important;
}

/* 确保所有输入框和选择框的文本不会大写 */
.v-text-field,
.v-select,
.v-switch {
    text-transform: none !important;
    font-variant: normal !important;
}

@media (max-width: 700px) {
    .setting-card-glass {
        padding: 12px 2vw 12px 2vw;
        max-width: 100vw;
    }

    .floating-finish-btn-glass {
        left: 50%;
        bottom: 10px;
        padding: 10px 18px;
        font-size: 15px;
        transform: translateX(-50%);
    }
}
</style>