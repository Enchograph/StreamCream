<template>
    <!-- <div class="live-preview">
        <h3 v-if="showTitle"><span>{{ title }}</span></h3>
        <div class="preview-area" :style="aspectRatioStyle">
            <div class="video-placeholder">{{ placeholderText }}</div>
        </div>
    </div> -->
</template>

<script>
export default {
    name: 'LivePreview',
    props: {
        title: {
            type: String,
            default: '直播界面'
        },
        placeholderText: {
            type: String,
            default: '直播画面区域'
        },
        resolution: {
            type: String,
            default: '1920x1080'
        },
        showTitle: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        aspectRatioStyle() {
            const [width, height] = this.resolution.split('x').map(Number);
            const ratio = width / height;
            return {
                'aspect-ratio': `${width}/${height}`,
                'max-width': '100%',
                'max-height': '100%'
            };
        }
    }
}
</script>

<style scoped>
.live-preview {
    width: 100%;
}

.preview-area {
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
}

.video-placeholder {
    color: #999;
    font-size: 16px;
}
</style>