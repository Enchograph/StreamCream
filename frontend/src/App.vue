<template>
    <div class="app-container">
        <Header v-if="!$route.path.includes('/live2d')" />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from './components/TopBanner.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
    // 初始化时验证token
    if (authStore.token) {
        await authStore.verifyToken()
    }
})
</script>

<style src="./assets/styles/global.css"></style>