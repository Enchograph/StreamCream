import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLive2DStore = defineStore('live2d', () => {
    const position = ref({ x: 0, y: 0 })
    const relativeScale = ref(0.8)
    const currentExpression = ref('F01')

    // 从localStorage恢复状态
    const loadState = () => {
        const savedX = localStorage.getItem('live2dX')
        const savedY = localStorage.getItem('live2dY')
        const savedRelativeScale = localStorage.getItem('live2dRelativeScale')

        if (savedX) position.value.x = Number(savedX)
        if (savedY) position.value.y = Number(savedY)
        if (savedRelativeScale) relativeScale.value = Number(savedRelativeScale)
    }

    // 保存状态到localStorage
    const saveState = () => {
        localStorage.setItem('live2dX', position.value.x)
        localStorage.setItem('live2dY', position.value.y)
        localStorage.setItem('live2dRelativeScale', relativeScale.value)
        localStorage.setItem('resolutionPreference', resolution.value)
    };

    const resolution = ref(localStorage.getItem('resolutionPreference') || '1920x1080');

    // 确保resolution在saveState之前定义
    const setResolution = (newResolution) => {
        resolution.value = newResolution;
        saveState();
    };

    return { position, relativeScale, currentExpression, loadState, saveState, resolution, setResolution }
})