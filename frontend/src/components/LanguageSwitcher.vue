<template>
    <div class="language-switcher" :class="{ 'fixed-position': fixedPosition }" ref="switcherRef">
        <button class="lang-btn" @click="toggleDropdown" :class="{ 'active': isOpen }" ref="btnRef">
            <span class="lang-code">{{ currentLangCode }}</span>
            <svg class="arrow" :class="{ 'rotated': isOpen }" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>

        <transition name="fade">
            <teleport to="body" v-if="isOpen">
                <div class="lang-menu" :style="menuStyle" ref="menuRef">
                    <button class="lang-item" :class="{ 'selected': currentLocale === 'zh-CN' }"
                        @click="switchLanguage('zh-CN')">
                        <span class="item-text">中文</span>
                    </button>
                    <button class="lang-item" :class="{ 'selected': currentLocale === 'en-US' }"
                        @click="switchLanguage('en-US')">
                        <span class="item-text">English</span>
                    </button>
                    <button class="lang-item" :class="{ 'selected': currentLocale === 'ja-JP' }"
                        @click="switchLanguage('ja-JP')">
                        <span class="item-text">日本語</span>
                    </button>
                </div>
            </teleport>
        </transition>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
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
const btnRef = ref(null)
const menuRef = ref(null)
const switcherRef = ref(null)
const menuStyle = ref({})

const currentLangCode = computed(() => {
    if (currentLocale.value === 'zh-CN') return '中'
    if (currentLocale.value === 'ja-JP') return '日'
    return 'En'
})

const updateMenuPosition = () => {
    if (!btnRef.value || !menuRef.value) return
    const btnRect = btnRef.value.getBoundingClientRect()
    const menu = menuRef.value
    const menuWidth = btnRect.width
    const left = btnRect.left + window.scrollX
    const top = btnRect.bottom + window.scrollY + 2
    menuStyle.value = {
        position: 'absolute',
        top: top + 'px',
        left: left + 'px',
        width: menuWidth + 'px',
        minWidth: menuWidth + 'px',
        zIndex: 999999
    }
}

const toggleDropdown = async () => {
    isOpen.value = !isOpen.value
    await nextTick()
    if (isOpen.value) updateMenuPosition()
}

const switchLanguage = (lang) => {
    locale.value = lang
    localStorage.setItem('locale', lang)

    // 更新 HTML 的 lang 属性
    if (typeof document !== 'undefined') {
        document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : lang === 'ja-JP' ? 'ja-JP' : 'en'
    }

    isOpen.value = false
}

// 点击外部关闭下拉菜单
const closeDropdown = (event) => {
    if (!switcherRef.value) return
    if (!switcherRef.value.contains(event.target) && (!menuRef.value || !menuRef.value.contains(event.target))) {
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
    window.addEventListener('resize', updateMenuPosition)
    window.addEventListener('scroll', updateMenuPosition, true)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
    document.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', updateMenuPosition)
    window.removeEventListener('scroll', updateMenuPosition, true)
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
    padding: 12px 28px;
    background: rgba(255, 255, 255, 0.18);
    border: 2px solid #e3e8f7;
    border-radius: 14px;
    color: #4a5fa7;
    font-size: 22px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s cubic-bezier(.4, 0, .2, 1);
    backdrop-filter: blur(8px);
    min-width: 80px;
    justify-content: center;
    box-shadow: 0 2px 8px 0 rgba(102, 126, 234, 0.04);
}

.lang-btn:hover,
.lang-btn.active {
    background: rgba(102, 126, 234, 0.10);
    border-color: #b3c6f7;
    color: #667eea;
}

.lang-code {
    font-weight: 700;
    letter-spacing: 0.5px;
}

.arrow {
    width: 13px;
    height: 13px;
    transition: transform 0.2s cubic-bezier(.4, 0, .2, 1);
    opacity: 0.8;
}

.arrow.rotated {
    transform: rotate(180deg);
}

.lang-menu {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.98);
    border: 1.5px solid #e3e8f7;
    border-radius: 10px;
    box-shadow: 0 8px 32px 0 rgba(102, 126, 234, 0.10), 0 1.5px 6px 0 rgba(102, 126, 234, 0.04);
    overflow: hidden;
    min-width: 80px;
    padding: 0;
    z-index: 999999;
    margin-top: 0;
    font-size: 14px;
}

.lang-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    border: none;
    background: transparent;
    color: #222;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    text-align: center;
    justify-content: center;
    outline: none;
}

.lang-item:hover {
    background: #f0f4ff;
    color: #667eea;
}

.lang-item.selected {
    background: #eef3ff;
    color: #4a5fa7;
    font-weight: 700;
}

.item-text {
    flex: 1;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s cubic-bezier(.4, 0, .2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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
@media (max-width: 600px) {

    .lang-btn,
    .lang-menu {
        font-size: 13px;
        min-width: 48px;
        border-radius: 8px;
    }

    .lang-menu {
        box-shadow: 0 4px 16px 0 rgba(102, 126, 234, 0.10);
    }
}
</style>