<template>
  <div class="language-switcher">
    <button 
      class="lang-btn" 
      :class="{ active: currentLocale === 'zh-CN' }"
      @click="switchLanguage('zh-CN')"
    >
      🇨🇳 中文
    </button>
    <button 
      class="lang-btn" 
      :class="{ active: currentLocale === 'en-US' }"
      @click="switchLanguage('en-US')"
    >
      🇺🇸 English
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const switchLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 8px;
  align-items: center;
}

.lang-btn {
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  white-space: nowrap;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-1px);
}

.lang-btn.active {
  background: rgba(254, 44, 85, 0.8);
  color: white;
  border-color: rgba(254, 44, 85, 0.8);
  box-shadow: 0 2px 8px rgba(254, 44, 85, 0.3);
}

.lang-btn:active {
  transform: translateY(0);
}
</style> 