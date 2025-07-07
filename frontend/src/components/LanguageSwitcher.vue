<template>
  <div class="language-switcher">
    <div class="dropdown">
      <button class="dropdown-btn" @click="toggleDropdown">
        <span class="current-lang">{{ currentLangText }}</span>
        <span class="dropdown-arrow">▼</span>
      </button>
      <div class="dropdown-menu" v-if="isOpen">
        <button 
          class="dropdown-item" 
          :class="{ active: currentLocale === 'zh-CN' }"
          @click="switchLanguage('zh-CN')"
        >
          中文
        </button>
        <button 
          class="dropdown-item" 
          :class="{ active: currentLocale === 'en-US' }"
          @click="switchLanguage('en-US')"
        >
          English
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)
const isOpen = ref(false)

const currentLangText = computed(() => {
  return currentLocale.value === 'zh-CN' ? '中' : 'En'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  isOpen.value = false
}

// 点击外部关闭下拉菜单
const closeDropdown = (event) => {
  if (!event.target.closest('.language-switcher')) {
    isOpen.value = false
  }
}

// 监听点击事件
if (typeof window !== 'undefined') {
  document.addEventListener('click', closeDropdown)
}
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
  z-index: 99999;
}

.dropdown {
  position: relative;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.95);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  white-space: nowrap;
  min-width: 50px;
  justify-content: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.dropdown-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.dropdown-arrow {
  font-size: 10px;
  transition: transform 0.3s ease;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.dropdown-btn:hover .dropdown-arrow {
  transform: rotate(180deg);
  color: white;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 8px;
    background: rgba(0, 0, 0, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    z-index: 99999;
    overflow: hidden;
    min-width: 80px;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.dropdown-item:hover {
  background: rgba(102, 126, 234, 0.3);
  color: white;
  font-weight: 600;
}

.dropdown-item.active {
  background: rgba(102, 126, 234, 0.4);
  color: white;
  font-weight: 600;
}

.current-lang {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}
</style> 