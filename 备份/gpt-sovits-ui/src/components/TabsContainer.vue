<template>
    <div class="tabs">
        <div class="tab-nav scroll-hide" role="tablist">
            <button v-for="(tab, index) in tabs" :key="index" role="tab" :aria-selected="index === activeTab"
                :aria-controls="`component-tab-${index}`" :id="`component-tab-${index}-button`"
                :class="{ selected: index === activeTab }" @click="$emit('change-tab', index)">
                {{ tab }}
            </button>
        </div>

        <div v-for="(tab, index) in tabs" :key="`tab-content-${index}`" :id="`component-tab-${index}`" class="tabitem"
            role="tabpanel" :style="{ display: index === activeTab ? 'block' : 'none' }">
            <slot :name="`tab${index}`"></slot>
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
</script>

<style scoped>
.tabs {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
}

.tab-nav {
    display: flex;
    background-color: #f5f5f5;
    overflow-x: auto;
}

.tab-nav button {
    padding: 10px 20px;
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
}

.tab-nav button.selected {
    border-bottom-color: #3498db;
    background-color: #e6f0fa;
    font-weight: bold;
}

.tabitem {
    padding: 15px;
}

.scroll-hide::-webkit-scrollbar {
    display: none;
}
</style>
