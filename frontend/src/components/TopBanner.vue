<template>
    <header class="top-banner" :style="bannerStyle">
        <div class="logo" @click="goToHome">StreamCream</div>
        <nav class="nav-links">
            <!-- <a href="#" class="nav-link">帮助</a> -->
            <a href="#" class="nav-link">文档</a>
            <a href="#" class="nav-link" @click.prevent="goToSettings">设置</a>
            <button v-if="showLogout" class="logout-btn" @click="handleLogout">登出</button>
        </nav>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { computed, ref, onMounted } from 'vue'

const router = useRouter()
const auth = useAuthStore()

const showLogout = computed(() => {
  return auth.isLoggedIn && router.currentRoute.value.path !== '/loginPage'
})

const bannerColor = ref(localStorage.getItem('bannerColor') || 'default')

const bannerStyle = computed(() => {
    switch (bannerColor.value) {
        case 'blue':
            return { backgroundColor: '#1976d2' }
        case 'purple':
            return { backgroundColor: '#764ba2' }
        default:
            return { backgroundColor: '#333' }
    }
})

function goToSettings() {
    // 获取当前路径，用于返回
    const currentPath = router.currentRoute.value.fullPath;
    router.push({
        path: '/settingPage',
        query: { redirect: currentPath }
    });
}

function handleLogout() {
    if (window.confirm('确定要登出吗？')) {
        auth.logout()
        alert('已成功登出！')
        router.push('/loginPage')
    }
}

onMounted(() => {
    window.addEventListener('storage', syncBannerColor)
})

function syncBannerColor() {
    bannerColor.value = localStorage.getItem('bannerColor') || 'default'
}

function goToHome() {
    router.push('/')
}
</script>


<style scoped>
.top-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: #333; 由js动态设置 */
    color: white;
    padding: 15px 30px;
    width: 100%;
    box-sizing: border-box;
    height: 10%;
}

.logo {
    font-family: 'Trajan Pro', Arial, sans-serif;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

.nav-links {
    display: flex;
    gap: 20px;
    align-items: center;
}

.nav-link {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav-link:hover {
    opacity: 0.8;
}

.logout-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 20px;
    transition: background 0.3s;
}
.logout-btn:hover {
    background-color: #c0392b;
}
</style>