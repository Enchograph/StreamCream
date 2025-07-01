import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLive2DStore = defineStore('live2d', () => {
    const position = ref({ x: 0, y: 0 })
    const scale = ref(0.12)
    const currentExpression = ref('F01')

    // 从localStorage恢复状态
    const loadState = () => {
        const savedX = localStorage.getItem('live2dX')
        const savedY = localStorage.getItem('live2dY')
        const savedScale = localStorage.getItem('live2dScale')

        if (savedX) position.value.x = Number(savedX)
        if (savedY) position.value.y = Number(savedY)
        if (savedScale) scale.value = Number(savedScale)
    }

    // 保存状态到localStorage
    const saveState = () => {
        localStorage.setItem('live2dX', position.value.x)
        localStorage.setItem('live2dY', position.value.y)
        localStorage.setItem('live2dScale', scale.value)
        localStorage.setItem('revolutionPreference', resolution.value)
    };

    const resolution = ref(localStorage.getItem('revolutionPreference') || '1920x1080');

    const setResolution = (newResolution) => {
        resolution.value = newResolution;
        saveState();
    };

    return { position, scale, currentExpression, loadState, saveState, resolution, setResolution }
})