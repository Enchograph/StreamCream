<template>
    <div class="page-container">
        <div class="live-streaming-assistant" ref="assistant">
            <div class="container">
                <!-- 第一列：主题设置和提纲生成 -->
                <div class="column theme-column">
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
                <div class="column outline-column">
                    <h3><span>{{ $t('streamingPage.outlineManagement') }}</span></h3>
                    <div class="blocks-container" :style="{ height: outlineSectionHeight }">
                        <draggable v-model="outlineBlocks" item-key="id" handle=".drag-handle" ghost-class="ghost-block"
                            @end="onDragEnd">
                            <template #item="{ element, index }">
                                <div class="outline-block" :class="{ 'current-block': currentBlockIndex === index }">
                                    <div v-if="editingBlockIndex !== index" class="block-header">
                                        <span @click="editBlockTitle(index)"
                                            class="block-title">{{ element.title }}</span>
                                        <div class="block-actions">
                                            <button @click="removeBlock(index)" class="remove-btn">{{ $t('streamingPage.removeBlock') }}</button>
                                            <div class="drag-handle">
                                                <svg viewBox="0 0 24 24" width="24" height="24">
                                                    <path
                                                        d="M8,4 L16,4 L16,6 L8,6 L8,4 Z M8,11 L16,11 L16,13 L8,13 L8,11 Z M8,18 L16,18 L16,20 L8,20 L8,18 Z"
                                                        fill="currentColor"></path>
                                                </svg>
                                                <span>{{ $t('streamingPage.dragHandle') }}</span>
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
                        {{ $t('streamingPage.addNewSection') }}</button>
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
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'LiveStreamingAssistant',
    components: {
        draggable,
        BroadcastInterface
    },
    setup() {
        const { t } = useI18n()
        return { t }
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
            console.log(this.t('streamingPage.sentencePlayed', { blockIndex, sentenceIndex }));

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
                const response = await this.callOpenAI(this.t('streamingPage.generateOutlinePrompt', { topic: this.topic }));
                this.outline = response;
            } catch (error) {
                console.error(this.t('streamingPage.generateOutlineError'), error);
                ElMessage.error(this.t('streamingPage.generateOutlineFailed'));
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
                console.error(this.t('streamingPage.confirmOutlineError'), error);
                ElMessage.error(this.t('streamingPage.processOutlineFailed'));
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
                this.outlineBlocks[this.editingBlockIndex].title = this.editingBlockTitle || this.t('streamingPage.unnamedSection');

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
            console.log(this.t('streamingPage.regeneratingSectionContent'), targetBlock.title, this.t('streamingPage.index'), blockIndex);

            // 清空该章节的现有内容
            targetBlock.content = [];

            try {
                const prompt = this.t('streamingPage.generateContentPrompt', { topic: this.topic, sectionTitle: targetBlock.title });
                const content = await this.callOpenAI(prompt);

                // 分句处理
                targetBlock.content = this.splitIntoSentences(content);
                console.log(this.t('streamingPage.sectionContentComplete', { title: targetBlock.title, count: targetBlock.content.length }));
            } catch (error) {
                console.error(this.t('streamingPage.generateSectionContentError', { title: targetBlock.title }), error);
                ElMessage.error(this.t('streamingPage.generateContentFailed'));
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
            if (confirm(this.t('streamingPage.confirmDeleteSection'))) {
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
            const newBlockTitle = prompt(this.t('streamingPage.enterNewSectionTitle'));
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

            console.log(this.t('streamingPage.generatingContentFor'), targetBlock.title);

            try {
                const prompt = this.t('streamingPage.generateContentPrompt', { topic: this.topic, sectionTitle: targetBlock.title });
                const content = await this.callOpenAI(prompt);

                // 分句处理
                targetBlock.content = this.splitIntoSentences(content);

                console.log(this.t('streamingPage.contentGenerationComplete'), targetBlock.title);

                // 预生成下一章内容
                if (blockIndex < this.outlineBlocks.length - 1 && !this.outlineBlocks[blockIndex + 1].content.length) {
                    this.generateNextBlockContent(blockIndex + 1);
                }
            } catch (error) {
                console.error(this.t('streamingPage.generateContentError'), error);
                ElMessage.error(this.t('streamingPage.generateContentFailed'));
            } finally {
                this.isGeneratingContent = false;
            }
        },

        // 生成下一章节内容 - 由子组件调用
        async generateNextBlockContent(nextIndex) {
            if (nextIndex >= this.outlineBlocks.length || this.isGeneratingContent) return;

            const nextBlock = this.outlineBlocks[nextIndex];
            if (nextBlock.content && nextBlock.content.length > 0) return;

            console.log(this.t('streamingPage.generatingContentFor'), nextBlock.title);

            try {
                const prompt = this.t('streamingPage.generateContentPrompt', { topic: this.topic, sectionTitle: nextBlock.title });
                const content = await this.callOpenAI(prompt);
                nextBlock.content = this.splitIntoSentences(content);

                console.log(this.t('streamingPage.contentGenerationComplete'), nextBlock.title);
            } catch (error) {
                console.error(this.t('streamingPage.preGenerateNextSectionError'), error);
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
                                content: this.t('streamingPage.aiSystemPrompt')
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
                    throw new Error(this.t('streamingPage.apiCallFailed', { status: response.status, statusText: response.statusText }));
                }

                const data = await response.json();
                if (!data.choices || !data.choices[0]) {
                    throw new Error(this.t('streamingPage.invalidApiResponse'));
                }
                return data.choices[0].message.content.trim();
            } catch (error) {
                console.error(this.t('streamingPage.apiCallError'), error);
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
                    console.error(this.t('streamingPage.deleteAudioFilesFailed'), response.statusText);
                }
            } catch (error) {
                console.error(this.t('streamingPage.deleteAudioFilesError'), error);
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
.page-container {
    min-height: 100vh;
    width: 100%;
    background-color: white;
    margin: 0;
    padding: 0;
}

.live-streaming-assistant {
    font-family: 'Arial', sans-serif;
    color: #333;
    width: 100%;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    font-size: 16px;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
}

h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: none;
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
    padding: 10px;
    align-items: flex-start;
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
    height: 85vh;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* 主题设置列的浮动效果 */
.theme-column {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
    border: 2px solid rgba(102, 126, 234, 0.1);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15);
    transform: translateY(-4px);
    position: relative;
    z-index: 2;
}

.theme-column:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
}

/* 提纲管理列的浮动效果 */
.outline-column {
    background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
    border: 1px solid rgba(243, 156, 18, 0.08);
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(243, 156, 18, 0.08);
    transform: translateY(-2px);
    position: relative;
    z-index: 1;
}

.outline-column:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(243, 156, 18, 0.12);
}

/* 其他列的对比效果 */
.column:not(.theme-column):not(.outline-column) {
    background: rgba(249, 249, 249, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transform: translateY(0);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.column:not(.theme-column):not(.outline-column):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
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
    /* 基础样式 */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    text-transform: none;
    letter-spacing: 0.5px;
    min-width: 120px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
}

/* 生成提纲按钮特殊样式 */
.topic-row button {
    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
    box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
}

.topic-row button:hover {
    background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
    box-shadow: 0 8px 25px rgba(243, 156, 18, 0.4);
}

.topic-row button:disabled {
    background: linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%);
    box-shadow: 0 2px 8px rgba(189, 195, 199, 0.3);
    opacity: 0.6;
}

button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

button:hover::before {
    left: 100%;
}

button:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

button:disabled {
    background: linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px rgba(189, 195, 199, 0.3);
    opacity: 0.6;
}

button:disabled:hover {
    transform: none;
    box-shadow: 0 2px 8px rgba(189, 195, 199, 0.3);
    opacity: 0.6;
}

.confirmOutline {
    width: 100%;
    padding: 12px 24px;
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
}

.confirmOutline:hover {
    background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
    box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
}

.confirmOutline:disabled {
    background: linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%);
    box-shadow: 0 2px 8px rgba(189, 195, 199, 0.3);
    opacity: 0.6;
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
    padding: 8px 12px;
    font-size: 14px;
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    margin-right: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
    transition: all 0.3s ease;
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.remove-btn:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    box-shadow: 0 3px 12px rgba(231, 76, 60, 0.4);
    transform: translateY(-1px);
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
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
}

.add-block-btn:hover {
    background: linear-gradient(135deg, #138496 0%, #117a8b 100%);
    box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
}

.blocks-container {
    max-height: calc(100% - 60px);
    /* 减去标题和按钮的高度 */
    overflow-y: auto;
    padding-right: 5px;
}

/* 隐藏所有滚动条 */
.blocks-container::-webkit-scrollbar,
.column::-webkit-scrollbar,
*::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
}

.blocks-container::-webkit-scrollbar-thumb,
.column::-webkit-scrollbar-thumb,
*::-webkit-scrollbar-thumb {
    background: transparent;
}

/* Firefox 滚动条隐藏 */
.blocks-container,
.column,
* {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
</style>
