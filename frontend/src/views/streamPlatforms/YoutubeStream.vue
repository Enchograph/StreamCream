<template>
  <div class="yt-bg">
    <div class="yt-header">
      <span class="yt-logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="12" fill="#FF0000"/>
          <polygon points="16,12 30,20 16,28" fill="#fff"/>
        </svg>
      </span>
      <h1>如何获取 YouTube 直播推流码</h1>
    </div>
    <div class="yt-card">
      <p class="yt-desc">以下是获取 YouTube 推流码（Stream Key）的步骤：</p>
      <ol class="yt-steps">
        <li>
          登录 <a href="https://www.youtube.com/" class="yt-link" target="_blank">YouTube</a>，点击右上角的摄像机图标，选择 <strong>"开始直播"</strong>。
        </li>
        <li>
          如果是首次使用，可能需要验证账号（例如绑定手机号），并等待 24 小时激活直播功能。
        </li>
        <li>
          在直播控制面板中，点击左侧菜单的<strong>"直播编码器"</strong>（或英文界面为 "Stream"）。
        </li>
        <li>
          在"编码设置"下方，你可以看到以下两项：
          <ul class="yt-ul">
            <li><strong>推流网址（Stream URL）</strong>：例如 <code class="yt-code">rtmp://a.rtmp.youtube.com/live2</code></li>
            <li><strong>推流码（Stream Key）</strong>：是一串随机生成的字符串，如 <code class="yt-code">abcd-efgh-ijkl-mnop</code></li>
          </ul>
        </li>
        <li>
          点击"显示"按钮查看完整推流码，并复制它。你可以将它粘贴到推流软件（如 OBS）中进行直播。
        </li>
      </ol>
      <div class="yt-warning">
        <span class="yt-warning-icon">⚠️</span>
        <span>注意：不要公开你的推流码，否则他人可能会用你的账号直播！</span>
      </div>
      <p class="yt-tip">推荐搭配 <strong>OBS Studio</strong> 使用，在设置中选择服务为 "YouTube"，然后粘贴推流码即可。</p>
    </div>
  </div>
</template>

<script setup>
// 无需 JavaScript 逻辑
</script>

<style scoped>
/* 顶部渐变背景和logo */
.yt-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #fff 0%, #ffe5ea 40%, #ffb3c6 100%);
  padding: 0;
}
.yt-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 40px 0 24px 0;
  background: #FF0000;
  color: #fff;
  border-radius: 0 0 24px 24px;
  box-shadow: 0 4px 24px #ff244233;
}
.yt-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}
.yt-header h1 {
  font-size: 2.1rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 2px;
}
.yt-card {
  max-width: 700px;
  margin: 32px auto 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(255,0,0,0.08);
  padding: 36px 28px 32px 28px;
  font-size: 1.13rem;
  color: #333;
}
.yt-desc {
  margin-bottom: 18px;
  font-size: 1.08rem;
}
.yt-steps {
  list-style: decimal inside;
  margin: 0 0 18px 0;
  padding: 0 0 0 12px;
}
.yt-steps li {
  margin-bottom: 14px;
  line-height: 1.8;
}
.yt-ul {
  list-style: disc inside;
  margin-left: 18px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.yt-code {
  background: #fbeaea;
  color: #d32f2f;
  padding: 2px 7px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', 'Menlo', 'Consolas', monospace;
  font-size: 0.98em;
}
.yt-warning {
  display: flex;
  align-items: center;
  background: #fff8e6;
  border-left: 4px solid #ff9800;
  padding: 13px 16px;
  margin: 24px 0 18px 0;
  border-radius: 7px;
  font-size: 1.08rem;
  color: #d35400;
  font-weight: 600;
}
.yt-warning-icon {
  margin-right: 10px;
  font-size: 1.3em;
}
.yt-tip {
  margin-top: 18px;
  color: #666;
  font-size: 1.02rem;
}
@media (max-width: 600px) {
  .yt-header {
    padding: 24px 0 16px 0;
    border-radius: 0 0 12px 12px;
  }
  .yt-header h1 {
    font-size: 1.2rem;
  }
  .yt-logo {
    width: 32px;
    height: 32px;
  }
  .yt-card {
    padding: 16px 6px 18px 6px;
    border-radius: 10px;
  }
}
</style>