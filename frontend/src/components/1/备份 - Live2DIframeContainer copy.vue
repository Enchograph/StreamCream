<template>
    <div class="iframe-container" :style="containerStyle">
        <iframe :src="src" frameborder="0"></iframe>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLive2DStore } from '../stores/live2d';

const props = defineProps({
    src: {
        type: String,
        required: true
    }
});

const live2dStore = useLive2DStore();

const containerStyle = computed(() => {
    const [width, height] = live2dStore.resolution.split('x').map(Number);
    const ratio = width / height;
    return {
        'aspect-ratio': `${width}/${height}`,
        'max-width': '100%',
        'max-height': '100%'
    };
});
</script>

<style scoped>
.iframe-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>