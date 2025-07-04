<template>
    <div class="tabs-container">
        <div class="tab-nav" role="tablist">
            <button 
                v-for="(tab, index) in tabs" 
                :key="index" 
                role="tab" 
                :aria-selected="index === activeTab"
                :aria-controls="`component-tab-${index}`" 
                :id="`component-tab-${index}-button`"
                :class="{ selected: index === activeTab }" 
                @click="$emit('change-tab', index)"
                class="tab-button"
            >
                <span class="tab-icon">{{ getTabIcon(index) }}</span>
                <span class="tab-text">{{ tab }}</span>
                <div class="tab-indicator" v-if="index === activeTab"></div>
            </button>
        </div>

        <div class="tab-content">
            <div 
                v-for="(tab, index) in tabs" 
                :key="`tab-content-${index}`" 
                :id="`component-tab-${index}`" 
                class="tab-panel"
                role="tabpanel" 
                :style="{ display: index === activeTab ? 'block' : 'none' }"
            >
                <slot :name="`tab${index}`"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    tabs: {
        type: Array,
        required: true
    },
    activeTab: {
        type: Number,
        default: 0
    }
});

defineEmits(['change-tab']);

const getTabIcon = (index) => {
    const icons = ['🔧', '🎤', '🎭'];
    return icons[index] || '📋';
};
</script>

<style scoped>
.tabs-container {
    display: flex;
    flex-direction: column;
    background: var(--surface-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}

.tab-nav {
    display: flex;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 1px solid var(--border-color);
    overflow-x: auto;
    position: relative;
}

.tab-nav::-webkit-scrollbar {
    height: 4px;
}

.tab-nav::-webkit-scrollbar-track {
    background: transparent;
}

.tab-nav::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;
}

.tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.3s ease;
    position: relative;
    white-space: nowrap;
    min-width: 120px;
    justify-content: center;
}

.tab-button:hover {
    color: var(--primary-color);
    background: rgba(99, 102, 241, 0.05);
}

.tab-button.selected {
    color: var(--primary-color);
    background: var(--surface-color);
    font-weight: 600;
    box-shadow: 0 -2px 0 var(--primary-color) inset;
}

.tab-icon {
    font-size: 1.1rem;
    opacity: 0.8;
}

.tab-text {
    font-size: 0.9rem;
}

.tab-indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    border-radius: 2px 2px 0 0;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        width: 0;
        opacity: 0;
    }
    to {
        width: 40px;
        opacity: 1;
    }
}

.tab-content {
    flex: 1;
    background: var(--surface-color);
}

.tab-panel {
    padding: 2rem;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .tab-button {
        padding: 0.75rem 1rem;
        min-width: 100px;
        font-size: 0.85rem;
    }
    
    .tab-icon {
        font-size: 1rem;
    }
    
    .tab-text {
        font-size: 0.8rem;
    }
    
    .tab-panel {
        padding: 1.5rem 1rem;
    }
}

@media (max-width: 480px) {
    .tab-button {
        padding: 0.5rem 0.75rem;
        min-width: 80px;
    }
    
    .tab-text {
        display: none;
    }
    
    .tab-icon {
        font-size: 1.2rem;
    }
}
</style>
