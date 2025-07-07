<template>
  <div class="language-switcher" :class="{ 'fixed-position': fixedPosition }">
    <button class="lang-btn" @click="toggleDropdown" :class="{ 'active': isOpen }">
      <span class="lang-code">{{ currentLangCode }}</span>
      <svg class="arrow" :class="{ 'rotated': isOpen }" viewBox="0 0 24 24" fill="none">
        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <transition name="fade">
      <div v-if="isOpen" class="lang-menu">
        <button 
          class="lang-item" 
          :class="{ 'selected': currentLocale === 'zh-CN' }"
          @click="switchLanguage('zh-CN')"
        >
          <span class="item-text">中文</span>
        </button>
        <button 
          class="lang-item" 
          :class="{ 'selected': currentLocale === 'en-US' }"
          @click="switchLanguage('en-US')"
        >
          <span class="item-text">English</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

// 定义 props
const props = defineProps({
  fixedPosition: {
    type: Boolean,
    default: false
  }
})

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)
const isOpen = ref(false)

const currentLangCode = computed(() => {
  return currentLocale.value === 'zh-CN' ? '中' : 'En'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  
  // 更新 HTML 的 lang 属性
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en'
  }
  
  isOpen.value = false
}

// 点击外部关闭下拉菜单
const closeDropdown = (event) => {
  if (!event.target.closest('.language-switcher')) {
    isOpen.value = false
  }
}

// 键盘事件处理
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
  z-index: 999999;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  min-width: 50px;
  justify-content: center;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.lang-btn.active {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.lang-code {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.arrow {
  width: 12px;
  height: 12px;
  transition: transform 0.2s ease;
  opacity: 0.8;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.lang-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  min-width: 80px;
  z-index: 999999;
}

.lang-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.8);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
  justify-content: center;
}

.lang-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.lang-item.selected {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  font-weight: 600;
}

.item-text {
  flex: 1;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* 固定定位样式 */
.language-switcher.fixed-position {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 999999 !important;
}

.language-switcher.fixed-position .lang-menu {
  position: fixed !important;
  top: 60px !important;
  right: 20px !important;
  left: auto !important;
  z-index: 999999 !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .lang-btn {
    padding: 5px 8px;
    font-size: 12px;
    min-width: 45px;
  }
  
  .lang-menu {
    min-width: 70px;
  }
  
  .lang-item {
    padding: 6px 10px;
    font-size: 12px;
  }
}
</style> 