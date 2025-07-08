<template>
  <div class="twitch-bg">
    <div class="twitch-header">
      <span class="twitch-logo">
        <svg width="40" height="40" viewBox="0 0 440 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_743_499)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M348.102 109.714V219.429H311.531V109.714H348.102ZM220.102 109.714H256.674V219.429H220.102V109.714ZM92.1024 0L0.673828 91.4286V420.571H110.388V512L201.817 420.571H274.96L439.531 256V0H92.1024ZM402.96 237.714L329.817 310.857H256.674L183.531 384V310.857H110.388V36.5714H402.96V237.714Z" fill="#9146FF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M329.817 310.857L402.96 237.714V36.5715H110.388V310.857H183.531V384L256.674 310.857H329.817ZM220.102 109.714H256.674V219.429H220.102V109.714ZM348.102 109.714H311.531V219.429H348.102V109.714Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_743_499">
              <rect width="438.857" height="512" fill="white" transform="translate(0.673828)"/>
            </clipPath>
          </defs>
        </svg>
      </span>
      <h1>{{ $t('twitch.streamKeyGuide.title') }}</h1>
    </div>
    <div class="twitch-card">
      <p class="twitch-desc">{{ $t('twitch.streamKeyGuide.description') }}</p>
      <ol class="twitch-steps">
        <li v-html="$t('twitch.streamKeyGuide.steps.step1', { twitch: '<a href=\'https://www.twitch.tv/\' class=\'twitch-link\' target=\'_blank\'>Twitch</a>' })"></li>
        <li v-html="$t('twitch.streamKeyGuide.steps.step2')"></li>
        <li v-html="$t('twitch.streamKeyGuide.steps.step3')"></li>
        <li v-html="$t('twitch.streamKeyGuide.steps.step4')"></li>
        <li v-html="$t('twitch.streamKeyGuide.steps.step5')"></li>
      </ol>
      <div class="twitch-warning">
        <span class="twitch-warning-icon">⚠️</span>
        <span>{{ $t('twitch.streamKeyGuide.warning.title') }}：{{ $t('twitch.streamKeyGuide.warning.content') }}</span>
      </div>
      <p class="twitch-tip">{{ $t('twitch.streamKeyGuide.tip') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.twitch-bg {
  min-height: 100vh;
  background: #f6f6fb;
  padding: 0;
}
.twitch-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 40px 0 24px 0;
  background: #9147FF;
  color: #fff;
  border-radius: 0 0 24px 24px;
  box-shadow: 0 4px 24px #9147ff33;
}
.twitch-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}
.twitch-header h1 {
  font-size: 2.1rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 2px;
}
.twitch-card {
  max-width: 700px;
  margin: 32px auto 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(145,71,255,0.08);
  padding: 36px 28px 32px 28px;
  font-size: 1.13rem;
  color: #333;
}
.twitch-desc {
  margin-bottom: 18px;
  font-size: 1.08rem;
}
.twitch-steps {
  list-style: decimal inside;
  margin: 0 0 18px 0;
  padding: 0 0 0 12px;
}
.twitch-steps li {
  margin-bottom: 14px;
  line-height: 1.8;
}
.twitch-warning {
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
.twitch-warning-icon {
  margin-right: 10px;
  font-size: 1.3em;
}
.twitch-tip {
  margin-top: 18px;
  color: #666;
  font-size: 1.02rem;
}
.twitch-link {
  color: #9147FF;
  text-decoration: underline;
}
@media (max-width: 600px) {
  .twitch-header {
    padding: 24px 0 16px 0;
    border-radius: 0 0 12px 12px;
  }
  .twitch-header h1 {
    font-size: 1.2rem;
  }
  .twitch-logo {
    width: 32px;
    height: 32px;
  }
  .twitch-card {
    padding: 16px 6px 18px 6px;
    border-radius: 10px;
  }
}
</style>