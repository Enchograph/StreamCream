<template>
    <div class="help-page">
        <div class="help-container">
            <div class="help-header">
                <h1 class="help-title">
                    <span class="title-icon">📚</span>
                    StreamCream 使用指南
                </h1>
                <p class="help-subtitle">AI直播助手的完整使用说明</p>
            </div>

            <div class="help-content">
                <!-- 快速开始 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">🚀</span>
                        快速开始
                    </h2>
                    <div class="section-content">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h3>登录系统</h3>
                                <p>使用您的账号密码登录StreamCream系统。如果是首次使用，请先注册账号。</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h3>配置设置</h3>
                                <p>在设置页面配置AI模型、直播参数和推流信息。</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h3>开始直播</h3>
                                <p>在主页面配置完成后，点击"开始直播"即可开始AI直播。</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 主页面功能 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">🏠</span>
                        主页面功能
                    </h2>
                    <div class="section-content">
                        <div class="feature-grid">
                            <div class="feature-card">
                                <div class="feature-icon">🎵</div>
                                <h3>声音库选择</h3>
                                <ul>
                                    <li><strong>模型选择</strong>：从下拉菜单选择已训练好的GPT和SoVITS模型</li>
                                    <li><strong>参考音频</strong>：选择参考音频文件，用于语音合成</li>
                                    <li><strong>上传模型</strong>：支持上传自定义的.ckpt和.pth模型文件</li>
                                    <li><strong>生成示例</strong>：点击"生成示例语音"测试当前模型效果</li>
                                </ul>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🎭</div>
                                <h3>Live2D模型</h3>
                                <ul>
                                    <li><strong>模型选择</strong>：选择不同的Live2D虚拟形象</li>
                                    <li><strong>自定义模型</strong>：上传.model3.json格式的Live2D模型</li>
                                    <li><strong>实时预览</strong>：在右侧预览区域查看模型效果</li>
                                </ul>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">📺</div>
                                <h3>直播配置</h3>
                                <ul>
                                    <li><strong>平台选择</strong>：选择直播平台（B站、抖音等）</li>
                                    <li><strong>推流设置</strong>：配置推流地址和推流码</li>
                                    <li><strong>分辨率设置</strong>：选择直播分辨率和帧率</li>
                                    <li><strong>背景设置</strong>：选择或上传直播背景</li>
                                </ul>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🤖</div>
                                <h3>AI讲稿生成</h3>
                                <ul>
                                    <li><strong>主题输入</strong>：输入讲稿主题</li>
                                    <li><strong>风格选择</strong>：选择讲稿风格（轻松、专业、可爱等）</li>
                                    <li><strong>生成讲稿</strong>：点击生成AI讲稿</li>
                                    <li><strong>测试功能</strong>：测试生成的讲稿效果</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 推流码获取页面 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">🔑</span>
                        推流码获取页面
                    </h2>
                    <div class="section-content">
                        <div class="streaming-info">
                            <h3>推流码获取流程</h3>
                            <ul>
                                <li><strong>账号设置</strong>：进入"账号设置"页面，完成Cookies导入或扫码登录。</li>
                                <li><strong>自动获取</strong>：切换到"直播设置"页面，系统会自动获取并显示你的B站推流码和推流服务器地址。</li>
                                <li><strong>安全提示</strong>：推流码仅用于本次直播，请勿泄露给他人。</li>
                                <li><strong>故障排查</strong>：如推流码获取失败，请检查账号状态或重新登录。</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 设置页面 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">⚙️</span>
                        设置页面
                    </h2>
                    <div class="section-content">
                        <div class="settings-grid">
                            <div class="setting-card">
                                <h3>调试设置</h3>
                                <ul>
                                    <li><strong>调试模式</strong>：开启/关闭调试模式</li>
                                    <li><strong>重置设置</strong>：重置所有偏好设置</li>
                                    <li><strong>Banner颜色</strong>：自定义顶部横幅颜色</li>
                                </ul>
                            </div>
                            <div class="setting-card">
                                <h3>AI设置</h3>
                                <ul>
                                    <li><strong>模型提供商</strong>：选择AI服务提供商（OpenAI、Claude等）</li>
                                    <li><strong>API密钥</strong>：配置API访问密钥</li>
                                    <li><strong>模型名称</strong>：选择具体的AI模型</li>
                                    <li><strong>自定义端点</strong>：配置自定义API端点</li>
                                </ul>
                            </div>
                            <div class="setting-card">
                                <h3>直播设置</h3>
                                <ul>
                                    <li><strong>分辨率</strong>：设置直播分辨率（1920x1080等）</li>
                                    <li><strong>帧率</strong>：设置直播帧率（30fps/60fps）</li>
                                    <li><strong>背景</strong>：选择或上传直播背景</li>
                                    <li><strong>推流信息</strong>：配置推流地址和推流码</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 直播页面 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">📹</span>
                        直播页面
                    </h2>
                    <div class="section-content">
                        <div class="streaming-info">
                            <h3>直播界面功能</h3>
                            <ul>
                                <li><strong>Live2D显示</strong>：实时显示Live2D虚拟形象</li>
                                <li><strong>语音合成</strong>：将文本转换为语音并同步嘴型</li>
                                <li><strong>讲稿管理</strong>：管理和播放AI生成的讲稿</li>
                                <li><strong>实时互动</strong>：支持实时语音输入和响应</li>
                                <li><strong>推流控制</strong>：开始/停止直播推流</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 常见问题 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">❓</span>
                        常见问题
                    </h2>
                    <div class="section-content">
                        <div class="faq-list">
                            <div class="faq-item">
                                <h3>Q: 如何上传自定义声音模型？</h3>
                                <p>A: 在主页面"声音库选择"区域，点击"选择文件"按钮，选择.ckpt（GPT模型）或.pth（SoVITS模型）文件，然后点击"应用声音模型"。</p>
                            </div>
                            <div class="faq-item">
                                <h3>Q: 如何配置推流信息？</h3>
                                <p>A: 在设置页面的"直播设置"区域，选择直播平台，然后输入推流地址和推流码。也可以点击"获取推流码"按钮获取。</p>
                            </div>
                            <div class="faq-item">
                                <h3>Q: 如何生成AI讲稿？</h3>
                                <p>A: 在主页面"AI讲稿生成测试"区域，输入讲稿主题，选择风格，然后点击"生成讲稿"按钮。</p>
                            </div>
                            <div class="faq-item">
                                <h3>Q: 如何切换Live2D模型？</h3>
                                <p>A: 在主页面"Live2D模型选择"区域，从下拉菜单选择不同的模型，或上传自定义的.model3.json文件。</p>
                            </div>
                            <div class="faq-item">
                                <h3>Q: 如何配置AI模型？</h3>
                                <p>A: 在设置页面的"AI设置"区域，选择模型提供商，输入API密钥，选择具体的模型名称。</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 技术支持 -->
                <section class="help-section">
                    <h2 class="section-title">
                        <span class="section-icon">🛠️</span>
                        技术支持
                    </h2>
                    <div class="section-content">
                        <div class="support-info">
                            <p>如果您在使用过程中遇到问题，请：</p>
                            <ul>
                                <li>检查网络连接是否正常</li>
                                <li>确认API密钥配置是否正确</li>
                                <li>查看浏览器控制台的错误信息</li>
                                <li>重启相关后端服务</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <div class="help-footer">
                <button class="back-btn" @click="goBack">
                    <span class="btn-icon">←</span>
                    返回
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    router.go(-1)
}
</script>

<style scoped>
.help-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    margin-bottom: 25px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.step-number {
    background: #667eea;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 20px;
    flex-shrink: 0;
}

.step-content h3 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 1.3rem;
}

.step-content p {
    margin: 0;
    line-height: 1.6;
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
</style> 