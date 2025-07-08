<template>
    <div class="help-page">
        <div class="help-container">
            <div class="help-header">
                <h1 class="help-title">
                    <span class="title-icon">📚</span>
                    {{ $t('help.title') }}
                </h1>
                <p class="help-subtitle">{{ $t('help.subtitle') }}</p>
            </div>

            <div class="help-content">
                <!-- 快速开始 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">🚀</span>
                        {{ $t('help.quickStart') }}
                    </h2>
                    <div class="section-content">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h3>{{ $t('help.step1.title') }}</h3>
                                <p>{{ $t('help.step1.content') }}</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h3>{{ $t('help.step2.title') }}</h3>
                                <p>{{ $t('help.step2.content') }}</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h3>{{ $t('help.step3.title') }}</h3>
                                <p>{{ $t('help.step3.content') }}</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h3>{{ $t('help.step4.title') }}</h3>
                                <p>{{ $t('help.step4.content') }}</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">5</div>
                            <div class="step-content">
                                <h3>{{ $t('help.step5.title') }}</h3>
                                <p>{{ $t('help.step5.content') }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 主页面功能 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">🏠</span>
                        {{ $t('help.mainPageFeatures') }}
                    </h2>
                    <div class="section-content">
                        <div class="feature-grid">
                            <div class="feature-card">
                                <div class="feature-icon">🎵</div>
                                <h3>{{ $t('help.voiceLibrary.title') }}</h3>
                                <ul>
                                    <li><strong>{{ $t('help.voiceLibrary.modelSelection') }}</strong></li>
                                    <li><strong>{{ $t('help.voiceLibrary.referenceAudio') }}</strong></li>
                                    <li><strong>{{ $t('help.voiceLibrary.uploadModel') }}</strong></li>
                                    <li><strong>{{ $t('help.voiceLibrary.generateExample') }}</strong></li>
                                </ul>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🎭</div>
                                <h3>{{ $t('help.live2dModel.title') }}</h3>
                                <ul>
                                    <li><strong>{{ $t('help.live2dModel.modelSelection') }}</strong></li>
                                    <li><strong>{{ $t('help.live2dModel.customModel') }}</strong></li>
                                    <li><strong>{{ $t('help.live2dModel.realTimePreview') }}</strong></li>
                                </ul>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">📺</div>
                                <h3>{{ $t('help.streamingConfig.title') }}</h3>
                                <ul>
                                    <li><strong>{{ $t('help.streamingConfig.platformSelection') }}</strong></li>
                                    <li><strong>{{ $t('help.streamingConfig.streamSettings') }}</strong></li>
                                    <li><strong>{{ $t('help.streamingConfig.resolutionSettings') }}</strong></li>
                                    <li><strong>{{ $t('help.streamingConfig.backgroundSettings') }}</strong></li>
                                </ul>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🤖</div>
                                <h3>{{ $t('help.aiScriptGeneration.title') }}</h3>
                                <ul>
                                    <li><strong>{{ $t('help.aiScriptGeneration.topicInput') }}</strong></li>
                                    <li><strong>{{ $t('help.aiScriptGeneration.styleSelection') }}</strong></li>
                                    <li><strong>{{ $t('help.aiScriptGeneration.generateScript') }}</strong></li>
                                    <li><strong>{{ $t('help.aiScriptGeneration.testFunction') }}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 推流码获取页面 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">🔑</span>
                        {{ $t('help.streamKeyPage') }}
                    </h2>
                    <div class="section-content">
                        <div class="streaming-info">
                            <h3>{{ $t('help.streamKeyProcess.title') }}</h3>
                            <ul>
                                <li><strong>{{ $t('help.streamKeyProcess.accountSetup') }}</strong></li>
                                <li><strong>{{ $t('help.streamKeyProcess.autoGet') }}</strong></li>
                                <li><strong>{{ $t('help.streamKeyProcess.securityTip') }}</strong></li>
                                <li><strong>{{ $t('help.streamKeyProcess.troubleshooting') }}</strong></li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 设置页面 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">⚙️</span>
                        {{ $t('help.settingsPage') }}
                    </h2>
                    <div class="section-content">
                        <div class="settings-grid">
                            <div class="setting-card">
                                <h3>{{ $t('help.debugSettings.title') }}</h3>
                                <ul>
                                    <li><strong>{{ $t('help.debugSettings.debugMode') }}</strong></li>
                                    <li><strong>{{ $t('help.debugSettings.resetSettings') }}</strong></li>
                                    <li><strong>{{ $t('help.debugSettings.bannerColor') }}</strong></li>
                                </ul>
                            </div>
                            <div class="setting-card">
                                <h3>{{ $t('help.aiSettings.title') }}</h3>
                                <ul>
                                    <li><strong>{{ $t('help.aiSettings.modelProvider') }}</strong></li>
                                    <li><strong>{{ $t('help.aiSettings.apiKey') }}</strong></li>
                                    <li><strong>{{ $t('help.aiSettings.modelName') }}</strong></li>
                                    <li><strong>{{ $t('help.aiSettings.customEndpoint') }}</strong></li>
                                </ul>
                            </div>
                            <div class="setting-card">
                                <h3>{{ $t('help.liveSettings.title') }}</h3>
                                <ul>
                                    <li><strong>{{ $t('help.liveSettings.resolution') }}</strong></li>
                                    <li><strong>{{ $t('help.liveSettings.fps') }}</strong></li>
                                    <li><strong>{{ $t('help.liveSettings.background') }}</strong></li>
                                    <li><strong>{{ $t('help.liveSettings.streamInfo') }}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 直播页面 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">📹</span>
                        {{ $t('help.streamingPage') }}
                    </h2>
                    <div class="section-content">
                        <div class="streaming-info">
                            <h3>{{ $t('help.streamingFeatures.title') }}</h3>
                            <ul>
                                <li><strong>{{ $t('help.streamingFeatures.live2dDisplay') }}</strong></li>
                                <li><strong>{{ $t('help.streamingFeatures.voiceSynthesis') }}</strong></li>
                                <li><strong>{{ $t('help.streamingFeatures.scriptManagement') }}</strong></li>
                                <li><strong>{{ $t('help.streamingFeatures.realTimeInteraction') }}</strong></li>
                                <li><strong>{{ $t('help.streamingFeatures.streamControl') }}</strong></li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 常见问题 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">❓</span>
                        {{ $t('help.faq') }}
                    </h2>
                    <div class="section-content">
                        <div class="faq-list">
                            <div class="faq-item">
                                <h3>{{ $t('help.faq1.question') }}</h3>
                                <p>{{ $t('help.faq1.answer') }}</p>
                            </div>
                            <div class="faq-item">
                                <h3>{{ $t('help.faq2.question') }}</h3>
                                <p>{{ $t('help.faq2.answer') }}</p>
                            </div>
                            <div class="faq-item">
                                <h3>{{ $t('help.faq3.question') }}</h3>
                                <p>{{ $t('help.faq3.answer') }}</p>
                            </div>
                            <div class="faq-item">
                                <h3>{{ $t('help.faq4.question') }}</h3>
                                <p>{{ $t('help.faq4.answer') }}</p>
                            </div>
                            <div class="faq-item">
                                <h3>{{ $t('help.faq5.question') }}</h3>
                                <p>{{ $t('help.faq5.answer') }}</p>
                            </div>
                            <div class="faq-item">
                                <h3>{{ $t('help.faq6.question') }}</h3>
                                <p>{{ $t('help.faq6.answer') }}</p>
                            </div>
                            <div class="faq-item">
                                <h3>{{ $t('help.faq7.question') }}</h3>
                                <p>{{ $t('help.faq7.answer') }}</p>
                            </div>
                            <div class="faq-item">
                                <h3>{{ $t('help.faq8.question') }}</h3>
                                <p>{{ $t('help.faq8.answer') }}</p>
                            </div>
                            <div class="faq-item">
                                <h3>{{ $t('help.faq10.question') }}</h3>
                                <p>{{ $t('help.faq10.answer') }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 技术支持 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">🛠️</span>
                        {{ $t('help.techSupport') }}
                    </h2>
                    <div class="section-content">
                        <div class="support-info">
                            <p>{{ $t('help.supportInfo.title') }}</p>
                            <ul>
                                <li>{{ $t('help.supportInfo.checkNetwork') }}</li>
                                <li>{{ $t('help.supportInfo.checkApiKey') }}</li>
                                <li>{{ $t('help.supportInfo.checkConsole') }}</li>
                                <li>{{ $t('help.supportInfo.restartServices') }}</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <div class="help-footer">
                <button class="back-btn" @click="goBack">
                    <span class="btn-icon">←</span>
                    {{ $t('help.back') }}
                </button>
            </div>
        </div>
        <div class="help-copyright" v-html="$t('copyright.text')"></div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LanguageSwitcher from '../../components/LanguageSwitcher.vue'

const router = useRouter()

const goBack = () => {
    router.go(-1)
}
</script>

<style scoped>
.help-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f6f8fa 0%, #e9ecf3 100%);
    padding: 20px;
}

.help-container {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.help-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px;
    text-align: center;
}

.help-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.title-icon {
    font-size: 2rem;
}

.help-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0;
}

.help-content {
    padding: 40px;
}

.help-section {
    margin-bottom: 50px;
}

.section-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 15px;
    border-bottom: 3px solid #667eea;
}

.section-icon {
    font-size: 1.5rem;
}

.section-content {
    color: #555;
}

/* 快速开始步骤 */
.step-card {
    display: flex;
    align-items: flex-start;
    margin-bottom: 32px;
    padding: 28px 28px 28px 24px;
    background: linear-gradient(120deg, #f6f8fa 60%, #e0e7ff 100%);
    border-radius: 18px;
    border-left: 5px solid #667eea;
    box-shadow: 0 6px 24px rgba(102,126,234,0.08);
    transition: box-shadow 0.2s, transform 0.2s;
    position: relative;
}
.step-card:hover {
    box-shadow: 0 12px 32px rgba(102,126,234,0.13);
    transform: translateY(-2px) scale(1.01);
}
.step-number {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.6rem;
    margin-right: 28px;
    box-shadow: 0 2px 8px rgba(102,126,234,0.18);
    border: 3px solid #fff;
    flex-shrink: 0;
    transition: box-shadow 0.2s;
}
.step-card:hover .step-number {
    box-shadow: 0 4px 16px rgba(102,126,234,0.22);
}
.step-content h3 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1.25rem;
    font-weight: 700;
}
.step-content p {
    margin: 0;
    line-height: 1.7;
    color: #555;
    font-size: 1.05rem;
}
/* 步骤之间的流程线（PC端） */
@media (min-width: 700px) {
    .step-card:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 36px;
        top: 64px;
        width: 2px;
        height: calc(100% - 64px);
        background: repeating-linear-gradient(
            to bottom,
            #b3c0d1 0px,
            #b3c0d1 8px,
            transparent 8px,
            transparent 16px
        );
        z-index: 0;
    }
}

/* 功能网格 */
.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.feature-card {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 15px;
    border: 1px solid #e9ecef;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    display: block;
}

.feature-card h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.3rem;
}

.feature-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.feature-card li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    line-height: 1.5;
}

.feature-card li::before {
    content: "•";
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
}

/* 设置网格 */
.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.setting-card {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 15px;
    border: 1px solid #e9ecef;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.setting-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.setting-card h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.3rem;
}

.setting-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.setting-card li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    line-height: 1.5;
}

.setting-card li::before {
    content: "•";
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
}

/* 直播信息 */
.streaming-info {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 15px;
    border: 1px solid #e9ecef;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.streaming-info:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.streaming-info h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.3rem;
}

.streaming-info ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.streaming-info li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    line-height: 1.5;
}

.streaming-info li::before {
    content: "•";
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
}

/* FAQ列表 */
.faq-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.faq-item {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 15px;
    border: 1px solid #e9ecef;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faq-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.faq-item h3 {
    color: #333;
    margin-bottom: 10px;
    font-size: 1.2rem;
}

.faq-item p {
    margin: 0;
    line-height: 1.6;
    color: #666;
}

/* 技术支持 */
.support-info {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 15px;
    border: 1px solid #e9ecef;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.support-info:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.support-info p {
    margin-bottom: 15px;
    font-weight: 500;
    color: #333;
}

.support-info ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.support-info li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    line-height: 1.5;
}

.support-info li::before {
    content: "•";
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
}

/* 页脚 */
.help-footer {
    padding: 30px 40px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
    text-align: center;
}

.back-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.back-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-icon {
    font-size: 1.2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .help-page {
        padding: 10px;
    }
    
    .help-header {
        padding: 30px 20px;
    }
    
    .help-title {
        font-size: 2rem;
    }
    
    .help-content {
        padding: 20px;
    }
    
    .feature-grid,
    .settings-grid {
        grid-template-columns: 1fr;
    }
    
    .step-card {
        flex-direction: column;
        text-align: center;
    }
    
    .step-number {
        margin-right: 0;
        margin-bottom: 15px;
    }
}

.help-copyright {
  width: 100%;
  text-align: center;
  color: rgba(60,60,60,0.55);
  font-size: 15px;
  margin-top: 48px;
  margin-bottom: 12px;
  letter-spacing: 1px;
  user-select: none;
}
</style> 