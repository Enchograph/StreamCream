<template>
    <header class="top-banner" :style="bannerStyle">
        <div class="banner-content">
            <div class="logo-section" @click="goToHome">
                <div class="logo-text">
                    <span class="logo-main">StreamCream</span>
                    <span class="logo-subtitle">AI直播助手</span>
                </div>
            </div>
            
        <nav class="nav-links">
                <a href="#" class="nav-link" @click.prevent="goToHelp" title="使用帮助">
                    <span class="nav-text">帮助</span>
                </a>
                <a href="#" class="nav-link" @click.prevent="goToSettings" title="系统设置">
                    <span class="nav-text">设置</span>
                </a>
                <button v-if="showLogout" class="logout-btn" @click="handleLogout" title="退出登录">
                    <span class="btn-text">登出</span>
                </button>
        </nav>
        </div>
        
        <!-- 装饰性元素 -->
        <div class="banner-decoration">
            <div class="decoration-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        
        <!-- 流动背景效果 -->
        <div class="flowing-background">
            <div class="flow-wave wave-1"></div>
            <div class="flow-wave wave-2"></div>
            <div class="flow-wave wave-3"></div>
            <div class="flow-particles">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { computed, ref, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const auth = useAuthStore()

const showLogout = computed(() => {
  return auth.isLoggedIn && router.currentRoute.value.path !== '/loginPage'
})

const bannerColor = ref(localStorage.getItem('bannerColor') || 'default')

const bannerStyle = computed(() => {
    switch (bannerColor.value) {
        case 'blue':
            return { 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                '--flow-color': 'rgba(255, 255, 255, 0.15)',
                '--particle-color': 'rgba(255, 255, 255, 0.5)'
            }
        case 'purple':
            return { 
                background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
                '--flow-color': 'rgba(255, 255, 255, 0.12)',
                '--particle-color': 'rgba(255, 255, 255, 0.4)'
            }
        case 'red':
            return { 
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)',
                '--flow-color': 'rgba(255, 255, 255, 0.1)',
                '--particle-color': 'rgba(255, 255, 255, 0.3)'
            }
        default:
            return { 
                background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                boxShadow: '0 4px 20px rgba(31, 41, 55, 0.3)',
                '--flow-color': 'rgba(255, 255, 255, 0.08)',
                '--particle-color': 'rgba(255, 255, 255, 0.25)'
            }
    }
})

function goToHelp() {
    router.push('/helpPage');
}

function goToSettings() {
    // 获取当前路径，用于返回
    const currentPath = router.currentRoute.value.fullPath;
    router.push({
        path: '/settingPage',
        query: { redirect: currentPath }
    });
}

async function handleLogout() {
    try {
        await ElMessageBox.confirm(
            '确定要登出吗？',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
                customClass: 'logout-messagebox'
            }
        )
        auth.logout()
        ElMessage.success('已成功登出！')
        router.push('/loginPage')
    } catch (e) {
        // 用户取消，无需处理
    }
}

onMounted(() => {
    window.addEventListener('storage', syncBannerColor)
})

function syncBannerColor() {
    bannerColor.value = localStorage.getItem('bannerColor') || 'default'
}

function goToHome() {
    // 如果用户已登录，跳转到主页面；否则跳转到登录页面
    if (auth.isAuthenticated) {
        router.push('/mainPage')
    } else {
        router.push('/loginPage')
    }
}
</script>


<style scoped>
.top-banner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    height: 70px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.banner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 30px;
    position: relative;
    z-index: 2;
}

/* Logo 区域样式 */
.logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.logo-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
}

.logo-section:hover::before {
    left: 100%;
}

.logo-section:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}



.logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
}

.logo-main {
    font-family: 'Trajan Pro', 'Georgia', serif;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.logo-subtitle {
    font-size: 12px;
    opacity: 0.8;
    font-weight: 300;
    letter-spacing: 0.5px;
}

/* 导航链接样式 */
.nav-links {
    display: flex;
    gap: 8px;
    align-items: center;
}

.nav-link {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    font-weight: 500;
    font-size: 14px;
}

.nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
}

.nav-link:hover::before {
    left: 100%;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}



.nav-text {
    font-weight: 500;
}

/* 登出按钮样式 */
.logout-btn {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.logout-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.logout-btn:hover::before {
    left: 100%;
}

.logout-btn:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
}

.logout-btn:active {
    transform: translateY(0);
}



.btn-text {
    font-weight: 500;
}

/* 装饰性元素 */
.banner-decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.decoration-dots {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    display: flex;
    gap: 8px;
}

.decoration-dots span {
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: dotPulse 2s ease-in-out infinite;
}

.decoration-dots span:nth-child(2) {
    animation-delay: 0.3s;
}

.decoration-dots span:nth-child(3) {
    animation-delay: 0.6s;
}

@keyframes dotPulse {
    0%, 100% { 
        transform: scale(1);
        opacity: 0.3;
    }
    50% { 
        transform: scale(1.2);
        opacity: 0.8;
    }
}

/* 流动背景效果 */
.flowing-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.flow-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: var(--flow-color, rgba(255, 255, 255, 0.1));
    border-radius: 50% 50% 0 0;
    animation: waveFlow 8s ease-in-out infinite;
}

.wave-1 {
    animation-delay: 0s;
    opacity: 0.3;
    transform: translateX(-50%);
}

.wave-2 {
    animation-delay: 2s;
    opacity: 0.2;
    transform: translateX(-30%);
    animation-duration: 10s;
}

.wave-3 {
    animation-delay: 4s;
    opacity: 0.15;
    transform: translateX(-70%);
    animation-duration: 12s;
}

@keyframes waveFlow {
    0%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    25% {
        transform: translateX(-30%) translateY(-10px);
    }
    50% {
        transform: translateX(-70%) translateY(0);
    }
    75% {
        transform: translateX(-20%) translateY(-5px);
    }
}

.flow-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.flow-particles span {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--particle-color, rgba(255, 255, 255, 0.4));
    border-radius: 50%;
    animation: particleFloat 6s linear infinite;
}

.flow-particles span:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
    animation-duration: 8s;
}

.flow-particles span:nth-child(2) {
    top: 60%;
    left: 20%;
    animation-delay: 1s;
    animation-duration: 10s;
}

.flow-particles span:nth-child(3) {
    top: 30%;
    left: 80%;
    animation-delay: 2s;
    animation-duration: 7s;
}

.flow-particles span:nth-child(4) {
    top: 70%;
    left: 70%;
    animation-delay: 3s;
    animation-duration: 9s;
}

.flow-particles span:nth-child(5) {
    top: 40%;
    left: 50%;
    animation-delay: 4s;
    animation-duration: 6s;
}

.flow-particles span:nth-child(6) {
    top: 80%;
    left: 30%;
    animation-delay: 5s;
    animation-duration: 11s;
}

.flow-particles span:nth-child(7) {
    top: 15%;
    left: 40%;
    animation-delay: 0.5s;
    animation-duration: 9.5s;
}

.flow-particles span:nth-child(8) {
    top: 75%;
    left: 85%;
    animation-delay: 1.5s;
    animation-duration: 8.5s;
}

.flow-particles span:nth-child(9) {
    top: 45%;
    left: 15%;
    animation-delay: 2.5s;
    animation-duration: 7.5s;
}

.flow-particles span:nth-child(10) {
    top: 85%;
    left: 60%;
    animation-delay: 3.5s;
    animation-duration: 10.5s;
}

.flow-particles span:nth-child(11) {
    top: 25%;
    left: 90%;
    animation-delay: 4.5s;
    animation-duration: 6.5s;
}

.flow-particles span:nth-child(12) {
    top: 55%;
    left: 35%;
    animation-delay: 5.5s;
    animation-duration: 11.5s;
}

.flow-particles span:nth-child(13) {
    top: 35%;
    left: 75%;
    animation-delay: 0.8s;
    animation-duration: 8.8s;
}

.flow-particles span:nth-child(14) {
    top: 65%;
    left: 25%;
    animation-delay: 1.8s;
    animation-duration: 9.8s;
}

.flow-particles span:nth-child(15) {
    top: 90%;
    left: 45%;
    animation-delay: 2.8s;
    animation-duration: 7.8s;
}

.flow-particles span:nth-child(16) {
    top: 10%;
    left: 65%;
    animation-delay: 3.8s;
    animation-duration: 10.8s;
}

.flow-particles span:nth-child(17) {
    top: 18%;
    left: 25%;
    animation-delay: 0.3s;
    animation-duration: 9.3s;
}

.flow-particles span:nth-child(18) {
    top: 72%;
    left: 55%;
    animation-delay: 1.3s;
    animation-duration: 8.3s;
}

.flow-particles span:nth-child(19) {
    top: 38%;
    left: 95%;
    animation-delay: 2.3s;
    animation-duration: 7.3s;
}

.flow-particles span:nth-child(20) {
    top: 88%;
    left: 15%;
    animation-delay: 3.3s;
    animation-duration: 10.3s;
}

.flow-particles span:nth-child(21) {
    top: 28%;
    left: 45%;
    animation-delay: 4.3s;
    animation-duration: 6.3s;
}

.flow-particles span:nth-child(22) {
    top: 62%;
    left: 80%;
    animation-delay: 5.3s;
    animation-duration: 11.3s;
}

.flow-particles span:nth-child(23) {
    top: 42%;
    left: 5%;
    animation-delay: 0.7s;
    animation-duration: 9.7s;
}

.flow-particles span:nth-child(24) {
    top: 78%;
    left: 95%;
    animation-delay: 1.7s;
    animation-duration: 8.7s;
}

.flow-particles span:nth-child(25) {
    top: 12%;
    left: 35%;
    animation-delay: 2.7s;
    animation-duration: 7.7s;
}

.flow-particles span:nth-child(26) {
    top: 68%;
    left: 65%;
    animation-delay: 3.7s;
    animation-duration: 10.7s;
}

.flow-particles span:nth-child(27) {
    top: 32%;
    left: 85%;
    animation-delay: 4.7s;
    animation-duration: 6.7s;
}

.flow-particles span:nth-child(28) {
    top: 82%;
    left: 25%;
    animation-delay: 5.7s;
    animation-duration: 11.7s;
}

.flow-particles span:nth-child(29) {
    top: 22%;
    left: 55%;
    animation-delay: 0.2s;
    animation-duration: 9.2s;
}

.flow-particles span:nth-child(30) {
    top: 58%;
    left: 15%;
    animation-delay: 1.2s;
    animation-duration: 8.2s;
}

.flow-particles span:nth-child(31) {
    top: 48%;
    left: 75%;
    animation-delay: 2.2s;
    animation-duration: 7.2s;
}

.flow-particles span:nth-child(64) {
    top: 92%;
    left: 45%;
    animation-delay: 3.2s;
    animation-duration: 10.2s;
}

@keyframes particleFloat {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) translateX(50px);
        opacity: 0;
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .banner-content {
        padding: 0 20px;
    }
    
    .logo-main {
        font-size: 20px;
    }
    
    .logo-subtitle {
        font-size: 10px;
    }
    
    .nav-text {
        display: none;
    }
    
    .btn-text {
        display: none;
    }
    
    .nav-link {
        padding: 12px;
    }
    
    .logout-btn {
        padding: 12px;
    }
    
    .decoration-dots {
        display: none;
    }
    
    .flowing-background {
        display: none;
    }
}

@media (max-width: 480px) {
    .top-banner {
        height: 60px;
    }
    

    
    .logo-main {
        font-size: 18px;
    }
    
    .nav-links {
        gap: 4px;
    }
}
</style>

<style>
.logout-messagebox .el-message-box {
    border-radius: 16px;
    font-size: 1.1rem;
    padding: 24px 32px;
}
.logout-messagebox .el-message-box__title {
    font-weight: bold;
    font-size: 1.2rem;
    color: #7c3aed;
}
.logout-messagebox .el-message-box__btns .el-button--primary {
    background: linear-gradient(90deg, #7c3aed 0%, #86a8e7 100%);
    border: none;
    color: #fff;
    font-weight: bold;
    border-radius: 8px;
}
.logout-messagebox .el-message-box__btns .el-button--default {
    border-radius: 8px;
}
</style>