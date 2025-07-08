<template>
  <div class="yt-bg">
    <div class="yt-header">
      <span class="yt-logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="12" fill="#FF0000"/>
          <polygon points="16,12 30,20 16,28" fill="#fff"/>
        </svg>
      </span>
      <h1>{{ $t('youtube.streamKeyGuide.title') }}</h1>
    </div>
    <div class="yt-card">
      <p class="yt-desc">{{ $t('youtube.streamKeyGuide.description') }}</p>
      <ol class="yt-steps">
        <li v-html="$t('youtube.streamKeyGuide.steps.step1', { youtube: '<a href=\'https://www.youtube.com/\' class=\'yt-link\' target=\'_blank\'>YouTube</a>' })">
        </li>
        <li>
          {{ $t('youtube.streamKeyGuide.steps.step2') }}
        </li>
        <li>
          {{ $t('youtube.streamKeyGuide.steps.step3') }}
        </li>
        <li>
          {{ $t('youtube.streamKeyGuide.steps.step4') }}
          <ul class="yt-ul">
            <li><strong>{{ $t('youtube.streamKeyGuide.streamInfo.streamUrl') }}</strong>：{{ $t('youtube.streamKeyGuide.streamInfo.streamUrlExamplePrefix') }} <code class="yt-code">{{ $t('youtube.streamKeyGuide.streamInfo.streamUrlExample') }}</code></li>
            <li><strong>{{ $t('youtube.streamKeyGuide.streamInfo.streamKey') }}</strong>：{{ $t('youtube.streamKeyGuide.streamInfo.streamKeyExamplePrefix') }} <code class="yt-code">{{ $t('youtube.streamKeyGuide.streamInfo.streamKeyExample') }}</code></li>
          </ul>
        </li>
        <li>
          {{ $t('youtube.streamKeyGuide.steps.step5') }}
        </li>
      </ol>
      <div class="yt-warning">
        <span class="yt-warning-icon">⚠️</span>
        <span>{{ $t('youtube.streamKeyGuide.warning.title') }}：{{ $t('youtube.streamKeyGuide.warning.content') }}</span>
      </div>
      <p class="yt-tip">{{ $t('youtube.streamKeyGuide.tip') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
/* 顶部渐变背景和logo */
.yt-bg {
  min-height: 100vh;
  background: #f5f5f7;
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