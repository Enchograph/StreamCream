import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLive2DStore = defineStore('live2d', () => {
    const position = ref({ x: 0, y: 0 })
    const relativeScale = ref(0.8)
    const currentExpression = ref('F01')
    
    // 添加模型选择相关状态
    const availableModels = ref([
        { id: 'haru', name: 'Haru', path: 'live2d/Haru/Haru.model3.json', description: '可爱的女孩模型' },
        { id: 'hiyori', name: 'Hiyori', path: 'live2d/Hiyori/Hiyori.model3.json', description: '活泼的女孩模型' },
        { id: 'mao', name: 'Mao', path: 'live2d/Mao/Mao.model3.json', description: '优雅的女孩模型' },
        { id: 'mark', name: 'Mark', path: 'live2d/Mark/Mark.model3.json', description: '帅气的男孩模型' },
        { id: 'natori', name: 'Natori', path: 'live2d/Natori/Natori.model3.json', description: '温柔的男生模型' },
        { id: 'rice', name: 'Rice', path: 'live2d/Rice/Rice.model3.json', description: '可爱的女孩模型' },
        { id: 'wanko', name: 'Wanko', path: 'live2d/Wanko/Wanko.model3.json', description: '可爱的小狗模型' },
        { id: 'kei', name: 'Kei', path: 'live2d/runtime/kei_basic_free.model3.json', description: '基础免费模型' }
    ])
    
    const currentModel = ref(localStorage.getItem('live2dCurrentModel') || 'haru')

    // 从localStorage恢复状态
    const loadState = () => {
        const savedX = localStorage.getItem('live2dX')
        const savedY = localStorage.getItem('live2dY')
        const savedRelativeScale = localStorage.getItem('live2dRelativeScale')
        const savedModel = localStorage.getItem('live2dCurrentModel')

        // 只有在localStorage中有值时才覆盖默认值
        if (savedX !== null) position.value.x = Number(savedX)
        if (savedY !== null) position.value.y = Number(savedY)
        if (savedRelativeScale !== null) relativeScale.value = Number(savedRelativeScale)
        if (savedModel !== null) currentModel.value = savedModel
    }

    // 保存状态到localStorage
    const saveState = () => {
        localStorage.setItem('live2dX', position.value.x)
        localStorage.setItem('live2dY', position.value.y)
        localStorage.setItem('live2dRelativeScale', relativeScale.value)
        localStorage.setItem('live2dCurrentModel', currentModel.value)
        localStorage.setItem('resolutionPreference', resolution.value)
    };

    const resolution = ref(localStorage.getItem('resolutionPreference') || '1920x1080');

    // 确保resolution在saveState之前定义
    const setResolution = (newResolution) => {
        resolution.value = newResolution;
        saveState();
    };

    // 切换模型
    const setCurrentModel = (modelId) => {
        currentModel.value = modelId;
        saveState();
    };

    // 获取当前模型路径
    const getCurrentModelPath = () => {
        const model = availableModels.value.find(m => m.id === currentModel.value);
        return model ? model.path : 'live2d/Haru/Haru.model3.json';
    };

    return { 
        position, 
        relativeScale, 
        currentExpression, 
        availableModels,
        currentModel,
        loadState, 
        saveState, 
        resolution, 
        setResolution,
        setCurrentModel,
        getCurrentModelPath
    }
})