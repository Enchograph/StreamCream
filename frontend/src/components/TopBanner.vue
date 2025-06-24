<template>
    <header class="top-banner">
        <div class="logo">StreamCream</div>
        <nav class="nav-links">
            <!-- <a href="#" class="nav-link">帮助</a> -->
            <a href="#" class="nav-link">文档</a>
            <a href="#" class="nav-link" @click.prevent="goToSettings">设置</a>
        </nav>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToSettings() {
    // 获取当前路径，用于返回
    const currentPath = router.currentRoute.value.fullPath;
    router.push({
        path: '/settingPage',
        query: { redirect: currentPath }
    });
}
</script>


<style scoped>
.top-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
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
}

.nav-links {
    display: flex;
    gap: 20px;
}

.nav-link {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav-link:hover {
    opacity: 0.8;
}
</style>