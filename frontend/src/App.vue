<template>
    <div class="app-container">
        <Header v-if="!$route.path.includes('/live2d')" />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Header from './components/TopBanner.vue'
</script>

<style src="./assets/styles/global.css"></style>