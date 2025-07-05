<template>
    <div class="page-container">
        <div class="live-streaming-assistant" ref="assistant">
            <div class="container">
                <!-- 第一列：主题设置和提纲生成 -->
                <div class="column">
                    <h3><span>{{ $t('streamingPage.topicAndOutline') }}</span></h3>
                    <div class="input-section">
                        <div class="topic-row">
                            <input id=" topic" v-model="topic" :placeholder="$t('streamingPage.inputLiveTopic')" />
                            <button @click="generateOutline" :disabled="!topic || isGeneratingOutline">
                                {{ isGeneratingOutline ? $t('streamingPage.generating') : $t('streamingPage.generateOutline') }}
                            </button>
                        </div>
                    </div>
                    <div class="outline-section" style="display: flex; flex-direction: column; height: 100%;">
                        <textarea id="outline" v-model="outline" rows="10" :placeholder="$t('streamingPage.inputOrEditOutline')"
                            style="font-family: sans-serif; flex-grow: 1;"></textarea>
                        <button class="confirmOutline" @click="confirmOutline"
                            :disabled="!outline || isConfirmingOutline">
                            {{ isConfirmingOutline ? $t('streamingPage.processing') : $t('streamingPage.confirmTopicAndOutline') }}
                        </button>
                    </div>
                </div>

                <!-- 第二列：提纲块管理（使用拖拽功能） -->
                <div class="column">
                    <h3><span>提纲管理</span></h3>
                    <div class="blocks-container" :style="{ height: outlineSectionHeight }">
                        <draggable v-model="outlineBlocks" item-key="id" handle=".drag-handle" ghost-class="ghost-block"
                            @end="onDragEnd">
                            <template #item="{ element, index }">
                                <div class="outline-block" :class="{ 'current-block': currentBlockIndex === index }">
                                    <div v-if="editingBlockIndex !== index" class="block-header">
                                        <span @click="editBlockTitle(index)"
                                            class="block-title">{{ element.title }}</span>
                                        <div class="block-actions">
                                            <button @click="removeBlock(index)" class="remove-btn">×</button>
                                            <div class="drag-handle">
                                                <svg viewBox="0 0 24 24" width="24" height="24">
                                                    <path
                                                        d="M8,4 L16,4 L16,6 L8,6 L8,4 Z M8,11 L16,11 L16,13 L8,13 L8,11 Z M8,18 L16,18 L16,20 L8,20 L8,18 Z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="block-edit">
                                        <input v-model="editingBlockTitle" @keyup.enter="saveBlockTitle"
                                            @blur="saveBlockTitle" ref="editTitleInput" class="edit-title-input" />
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                    <br></br>
                    <button v-if="outlineBlocks.length > 0" @click="addNewBlock" class="add-block-btn">+
                        {{ $t('streamingPage.addNewSection') }}
                    </button>
                </div>

                <!-- 第三列：直播界面 -->
                <broadcast-interface :outline-blocks="outlineBlocks" :current-block-index="currentBlockIndex"
                    :topic="topic" @update:current-block-index="updateCurrentBlockIndex"
                    @generate-content="generateBlockContent" @generate-next-content="generateNextBlockContent"
                    @broadcast-status-change="handleBroadcastStatusChange" @sentence-played="handleSentencePlayed" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import draggable from 'vuedraggable';
import BroadcastInterface from './BroadcastInterface.vue';
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'LiveStreamingAssistant',
    components: {
        draggable,
        BroadcastInterface
    },
    data() {
        // 从localStorage读取AI设置
        let aiSettings = {};
        try {
            aiSettings = JSON.parse(localStorage.getItem('aiSettings')) || {};
        } catch (e) {
            aiSettings = {};
        }
        return {
            // API配置
            apiEndpoint: aiSettings.provider || 'https://api.soruxgpt.com/v1/chat/completions',
            apiKey: aiSettings.apiKey || '',
            modelName: aiSettings.modelName || '',
            temperature: aiSettings.temperature !== undefined ? aiSettings.temperature : 0.7,

            // 第一列数据
            topic: '',
            outline: '',
            isGeneratingOutline: false,
            isConfirmingOutline: false,
            outlineConfirmed: false,

            // 第二列数据
            outlineBlocks: [],
            editingBlockIndex: -1,
            editingBlockTitle: '',

            // 共享数据
            currentBlockIndex: -1,
            isGeneratingContent: false,
            isBroadcasting: false,
            outlineSectionHeight: '100%',
        }
    },
    methods: {
        // 处理子组件事件
        updateCurrentBlockIndex(index) {
            this.currentBlockIndex = index;
        },

        handleBroadcastStatusChange(status) {
            this.isBroadcasting = status;
        },

        handleSentencePlayed({ blockIndex, sentenceIndex }) {
            // 可以记录播放进度或执行其他操作
            console.log(`句子播放完成 - 章节: ${blockIndex}, 句子: ${sentenceIndex}`);

            // 当前章节开始播放第一句时，预生成下一章内容
            if (blockIndex < this.outlineBlocks.length - 1 &&
                sentenceIndex === 0 &&
                !this.outlineBlocks[blockIndex + 1].content.length) {
                this.generateNextBlockContent(blockIndex + 1);
            }
        },

        async generateOutline() {
            if (!this.topic) return;

            this.isGeneratingOutline = true;

            try {
                const response = await this.callOpenAI(`为主题"${this.topic}"生成一个直播提纲，包含5-8个章节，每个章节用一个短标题概括。格式为：\n1. 章节一\n2. 章节二\n以此类推。`);
                this.outline = response;
            } catch (error) {
                console.error('生成提纲出错:', error);
                ElMessage.error('生成提纲失败，请重试');
            } finally {
                this.isGeneratingOutline = false;
            }
        },

        async confirmOutline() {
            if (!this.outline) return;

            this.isConfirmingOutline = true;

            try {
                // 将提纲拆分为块
                const lines = this.outline.split('\n').filter(line => line.trim());
                this.outlineBlocks = [];
                this.currentBlockIndex = -1;

                for (const line of lines) {
                    // 尝试匹配类似 "1. 章节标题" 的格式
                    const match = line.match(/^\d+\.\s*(.+)$/);
                    if (match) {
                        this.outlineBlocks.push({
                            id: Date.now() + Math.random().toString(36).substr(2, 9), // 添加唯一ID用于拖拽
                            title: match[1].trim(),
                            content: []
                        });
                    } else if (line.trim()) {
                        // 如果不匹配格式但有内容，直接添加
                        this.outlineBlocks.push({
                            id: Date.now() + Math.random().toString(36).substr(2, 9),
                            title: line.trim(),
                            content: []
                        });
                    }
                }

                this.outlineConfirmed = true;
            } catch (error) {
                console.error('确认提纲出错:', error);
                ElMessage.error('处理提纲失败，请重试');
            } finally {
                this.isConfirmingOutline = false;
            }
        },

        editBlockTitle(index) {
            this.editingBlockIndex = index;
            this.editingBlockTitle = this.outlineBlocks[index].title;

            this.$nextTick(() => {
                if (this.$refs.editTitleInput) {
                    this.$refs.editTitleInput.focus();
                }
            });
        },

        saveBlockTitle() {
            if (this.editingBlockIndex >= 0) {
                // 保存标题修改
                const oldTitle = this.outlineBlocks[this.editingBlockIndex].title;
                this.outlineBlocks[this.editingBlockIndex].title = this.editingBlockTitle || '未命名章节';

                // 保存当前正在编辑的索引
                const modifiedBlockIndex = this.editingBlockIndex;

                // 如果标题有变化才重新生成内容
                if (oldTitle !== this.editingBlockTitle) {
                    this.generateContentForSpecificBlock(modifiedBlockIndex);
                }

                this.cancelEditBlockTitle();
            }
        },

        // 生成特定章节的内容
        async generateContentForSpecificBlock(blockIndex) {
            if (blockIndex < 0 || blockIndex >= this.outlineBlocks.length) return;

            const targetBlock = this.outlineBlocks[blockIndex];
            console.log('重新生成章节内容:', targetBlock.title, '(索引:', blockIndex, ')');

            // 清空该章节的现有内容
            targetBlock.content = [];

            try {
                const prompt = `为直播主题"${this.topic}"的"${targetBlock.title}"章节生成详细讲解内容。内容要通俗易懂，语气轻松自然，适合直播朗读。每个句子都要简短，便于字幕显示。`;
                const content = await this.callOpenAI(prompt);

                // 分句处理
                targetBlock.content = this.splitIntoSentences(content);
                console.log(`章节 "${targetBlock.title}" 内容生成完成，共 ${targetBlock.content.length} 句`);
            } catch (error) {
                console.error(`生成章节 "${targetBlock.title}" 内容出错:`, error);
                ElMessage.error('生成章节内容失败，请重试');
            }
        },

        cancelEditBlockTitle() {
            this.editingBlockIndex = -1;
            this.editingBlockTitle = '';
        },

        onDragEnd() {
            // 拖拽结束后更新当前块的索引（如果需要）
            if (this.currentBlockIndex !== -1) {
                const currentBlockId = this.outlineBlocks[this.currentBlockIndex]?.id;
                if (currentBlockId) {
                    const newIndex = this.outlineBlocks.findIndex(block => block.id === currentBlockId);
                    if (newIndex !== -1) {
                        this.currentBlockIndex = newIndex;
                    }
                }
            }

            // 检查新的下一章是否有内容，没有则生成
            if (this.currentBlockIndex < this.outlineBlocks.length - 1 &&
                !this.outlineBlocks[this.currentBlockIndex + 1].content.length) {
                this.generateNextBlockContent(this.currentBlockIndex + 1);
            }

            // 预生成下下一章内容
            if (this.currentBlockIndex < this.outlineBlocks.length - 2 &&
                !this.outlineBlocks[this.currentBlockIndex + 2].content.length) {
                this.generateNextBlockContent(this.currentBlockIndex + 2);
            }
        },

        removeBlock(index) {
            if (confirm('确定要删除这个章节吗？')) {
                // 保存被删除块的ID，以便更新currentBlockIndex
                this.outlineBlocks.splice(index, 1);

                // 更新当前块索引
                if (this.currentBlockIndex !== -1) {
                    if (index === this.currentBlockIndex) {
                        // 如果删除的是当前块，移到前一个块
                        this.currentBlockIndex = Math.max(-1, this.currentBlockIndex - 1);
                    } else if (index < this.currentBlockIndex) {
                        // 如果删除的块在当前块之前，当前块索引需要减1
                        this.currentBlockIndex--;
                    }
                }
            }
        },

        addNewBlock() {
            const newBlockTitle = prompt('请输入新章节标题：');
            if (newBlockTitle && newBlockTitle.trim()) {
                this.outlineBlocks.push({
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                    title: newBlockTitle.trim(),
                    content: []
                });
            }
        },

        // 根据索引生成章节内容 - 由子组件调用
        async generateBlockContent(blockIndex) {
            if (this.isGeneratingContent || blockIndex < 0 || blockIndex >= this.outlineBlocks.length) return;

            this.isGeneratingContent = true;
            const targetBlock = this.outlineBlocks[blockIndex];

            console.log('现在生成', targetBlock.title, '的内容');

            try {
                const prompt = `为直播主题"${this.topic}"的"${targetBlock.title}"章节生成详细讲解内容。内容要通俗易懂，语气轻松自然，适合直播朗读。每个句子都要简短，便于字幕显示。`;
                const content = await this.callOpenAI(prompt);

                // 分句处理
                targetBlock.content = this.splitIntoSentences(content);

                console.log(targetBlock.title, '的内容生成完成');

                // 预生成下一章内容
                if (blockIndex < this.outlineBlocks.length - 1 && !this.outlineBlocks[blockIndex + 1].content.length) {
                    this.generateNextBlockContent(blockIndex + 1);
                }
            } catch (error) {
                console.error('生成章节内容出错:', error);
                ElMessage.error('生成章节内容失败，请重试');
            } finally {
                this.isGeneratingContent = false;
            }
        },

        // 生成下一章节内容 - 由子组件调用
        async generateNextBlockContent(nextIndex) {
            if (nextIndex >= this.outlineBlocks.length || this.isGeneratingContent) return;

            const nextBlock = this.outlineBlocks[nextIndex];
            if (nextBlock.content && nextBlock.content.length > 0) return;

            console.log('现在生成', nextBlock.title, '的内容');

            try {
                const prompt = `为直播主题"${this.topic}"的"${nextBlock.title}"章节生成详细讲解内容。内容要通俗易懂，语气轻松自然，适合直播朗读。每个句子都要简短，便于字幕显示。`;
                const content = await this.callOpenAI(prompt);
                nextBlock.content = this.splitIntoSentences(content);

                console.log(nextBlock.title, '的内容生成完成');
            } catch (error) {
                console.error('预生成下一章内容出错:', error);
            }
        },

        splitIntoSentences(text) {
            // 分句逻辑
            const sentences = text.split(/([。！？!?])/);
            const result = [];

            for (let i = 0; i < sentences.length - 1; i += 2) {
                if (i + 1 < sentences.length) {
                    result.push(sentences[i] + sentences[i + 1]);
                }
            }

            if (sentences.length % 2 === 1) {
                result.push(sentences[sentences.length - 1]);
            }

            return result.filter(s => s.trim());
        },

        async callOpenAI(prompt) {
            try {
                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    },
                    body: JSON.stringify({
                        model: this.modelName,
                        messages: [
                            {
                                role: 'system',
                                content: '你是一个专业的直播内容助手，擅长生成结构清晰、通俗易懂的内容。'
                            },
                            {
                                role: 'user',
                                content: prompt
                            }
                        ],
                        temperature: this.temperature
                    })
                });

                if (!response.ok) {
                    throw new Error(`API调用失败: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                if (!data.choices || !data.choices[0]) {
                    throw new Error('无效的API响应格式');
                }
                return data.choices[0].message.content.trim();
            } catch (error) {
                console.error('API调用出错:', error);
                throw error; // 重新抛出错误以便上层处理
            }
        },

        setColumnHeight() {
            // 获取视窗高度
            const viewportHeight = window.innerHeight;
            // 获取组件顶部到视窗顶部的距离
            const assistantTop = this.$refs.assistant.getBoundingClientRect().top;
            // 计算列的高度（视窗高度减去组件顶部的距离再减去一些padding）
            const columnHeight = viewportHeight - assistantTop - 40; // 40px 作为底部缓冲
            // 设置 CSS 变量
            document.documentElement.style.setProperty('--column-height', `${columnHeight}px`);
        },

        async cleanupAudioFiles() {
            try {
                const response = await fetch('http://localhost:5001/delete-all-audio', {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    console.error('删除音频文件失败:', response.statusText);
                }
            } catch (error) {
                console.error('删除音频文件出错:', error);
            }
        },

        calculateOutlineHeight() {
            const outlineSection = document.querySelector('.outline-section');
            const blocksContainer = document.querySelector('.blocks-container');
            if (outlineSection && blocksContainer) {
                const outlineHeight = outlineSection.offsetHeight;
                const blocksHeight = blocksContainer.scrollHeight;

                if (blocksHeight < outlineHeight) {
                    blocksContainer.style.paddingBottom = `${outlineHeight - blocksHeight}px`;
                } else {
                    blocksContainer.style.paddingBottom = '0';
                }
                this.outlineSectionHeight = `${outlineHeight}px`;
            }
        },
    },
    mounted() {
        this.setColumnHeight();
        window.addEventListener('resize', this.setColumnHeight);
        this.calculateOutlineHeight();
        window.addEventListener('resize', this.calculateOutlineHeight);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.setColumnHeight);
        window.removeEventListener('resize', this.calculateOutlineHeight);
        this.cleanupAudioFiles();
    },


})
</script>

<style scoped>
.live-streaming-assistant {
    font-family: 'Arial', sans-serif;
    color: #333;
    width: 100%;
    margin: 0;
    padding: 25px;
    box-sizing: border-box;
    font-size: 16px;
}

h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 2.5rem;
    /* 约 40px，可根据需求调整 */
    font-weight: bold;
    color: #333;
    margin: 10px 50px;
    /* 标题与上下内容的间距 */
    position: relative;
    white-space: nowrap;
    flex-wrap: nowrap;
}


/* 文字包裹元素，确保伪元素正确显示 */
h3 span {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    /* 关键修复：确保 span 支持伪元素且不换行 */
    margin-bottom: 20px;
}

/* 文字左侧横线 */
h3 span::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 3rem;
    /* 横线长度 */
    height: 2px;
    /* 横线粗细 */
    background-color: #c4a898;
    margin-right: 1.5rem;
    /* 横线与文字的间距 */
    flex-shrink: 0;
}

/* 文字右侧横线 */
h3 span::after {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 3rem;
    /* 横线长度 */
    height: 2px;
    /* 横线粗细 */
    background-color: #c4a898;
    margin-left: 1.5rem;
    /* 横线与文字的间距 */
    flex-shrink: 0;
}

.container {
    display: flex;
    width: 100%;
    gap: 20px;
    box-sizing: border-box;
    padding: 15px;
}

@media (min-width: calc(100vw / 3)) {
    .container {
        flex-wrap: nowrap;
    }

    .column {
        flex: 1 1 calc(100% / 3);
        min-width: 0;
    }
}

@media (max-width: calc(100vw / 3)) {
    .container {
        flex-direction: column;
    }

    .column {
        width: 100%;
        flex: none;
    }
}

.column {
    flex: 1;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin: 0 15px;
    min-width: 350px;
    height: var(--column-height);
}

/* 响应式调整 */
@media (max-width: 1200px) {
    .container {
        flex-direction: column;
    }

    .column {
        width: 100%;
        flex: none;
        /* 取消 flex: 1 */
    }
}

/* 标题响应式调整 */
@media (max-width: 768px) {
    h3 {
        font-size: 1.8rem;
        margin: 10px 20px;
    }
    
    h3 span::before,
    h3 span::after {
        width: 2rem;
        margin-right: 1rem;
        margin-left: 1rem;
    }
}

@media (max-width: 480px) {
    h3 {
        font-size: 1.5rem;
        margin: 10px 10px;
    }
    
    h3 span::before,
    h3 span::after {
        width: 1.5rem;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
    }
}

/* 第一列样式 */
.input-section,
.outline-section {
    margin-bottom: 20px;
}

.topic-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.topic-row label {
    margin-bottom: 0;
    white-space: nowrap;
}

.topic-row input {
    flex: 1;
    margin-bottom: 0;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

input,
textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 12px;
    font-size: 16px;
}

textarea {
    resize: vertical;
    min-height: 180px;
    font-size: 16px;
    line-height: 1.5;
}

button {
    padding: 12px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
}

.confirmOutline {
    width: 100%;
    padding: 12px 20px;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

/* 第二列样式 - 拖拽相关 */
.blocks-container {
    display: flex;
    flex-direction: column;
}

.outline-block {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 10px;
    min-height: 60px;
    transition: all 0.2s;
}

.current-block {
    border-color: #4CAF50;
    background-color: #f0fff0;
}

.ghost-block {
    opacity: 0.5;
    background: #c8ebfb;
}

.block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.block-title {
    cursor: pointer;
    font-weight: bold;
    flex: 1;
    font-size: 18px;
}

.block-actions {
    display: flex;
    align-items: center;
}

.remove-btn {
    padding: 2px 8px;
    font-size: 12px;
    background-color: #f44336;
    margin-right: 8px;
}

.remove-btn:hover {
    background-color: #d32f2f;
}

.drag-handle {
    cursor: grab;
    color: #888;
    display: flex;
    align-items: center;
}

.drag-handle:active {
    cursor: grabbing;
}

.block-edit {
    width: 100%;
}

.edit-title-input {
    width: 100%;
    margin: 0;
    padding: 12px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 6px;
}

.add-block-btn {
    margin-top: 10px;
    background-color: #2196F3;
}

.add-block-btn:hover {
    background-color: #0b7dda;
}

.blocks-container {
    max-height: calc(100% - 60px);
    /* 减去标题和按钮的高度 */
    overflow-y: auto;
    padding-right: 5px;
}

.blocks-container::-webkit-scrollbar {
    width: 6px;
}

.blocks-container::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
}
</style>
