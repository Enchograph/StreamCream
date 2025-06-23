<template>
    <div class="live-streaming-assistant">
        <div class="container">
            <!-- 第一列：主题设置和提纲生成 -->
            <div class="column">
                <div class="input-section">
                    <label for="topic">请输入直播主题：</label>
                    <input id="topic" v-model="topic" placeholder="例如：Vue 3基础入门" />
                    <button @click="generateOutline" :disabled="!topic || isGeneratingOutline">
                        {{ isGeneratingOutline ? '生成中...' : '生成提纲' }}
                    </button>
                </div>
                <div class="outline-section" v-if="outline">
                    <label for="outline">提纲（可编辑）：</label>
                    <textarea id="outline" v-model="outline" rows="10"></textarea>
                    <button @click="confirmOutline" :disabled="!outline || isConfirmingOutline">
                        {{ isConfirmingOutline ? '处理中...' : '确认提纲' }}
                    </button>
                </div>
            </div>

            <!-- 第二列：提纲块管理 -->
            <div class="column" v-if="outlineConfirmed">
                <h3>提纲管理</h3>
                <div class="blocks-container">
                    <div v-for="(block, index) in outlineBlocks" :key="index" class="outline-block"
                        :class="{ 'current-block': currentBlockIndex === index }">
                        <div class="block-header">
                            <span @click="editBlockTitle(index)" class="block-title">{{ block.title }}</span>
                            <div class="block-actions">
                                <button @click="moveBlockUp(index)" :disabled="index === 0">↑</button>
                                <button @click="moveBlockDown(index)"
                                    :disabled="index === outlineBlocks.length - 1">↓</button>
                                <button @click="removeBlock(index)" class="remove-btn">×</button>
                            </div>
                        </div>
                        <div v-if="editingBlockIndex === index" class="block-edit">
                            <input v-model="editingBlockTitle" @keyup.enter="saveBlockTitle" />
                            <button @click="saveBlockTitle">保存</button>
                            <button @click="cancelEditBlockTitle">取消</button>
                        </div>
                    </div>
                    <button @click="addNewBlock" class="add-block-btn">+ 添加新章节</button>
                </div>
            </div>

            <!-- 第三列：直播界面 -->
            <div class="column" v-if="outlineConfirmed">
                <div class="broadcast-section">
                    <h3>直播界面</h3>
                    <div class="fake-video-area">
                        <div class="video-placeholder">直播画面区域</div>
                    </div>
                </div>

                <div class="subtitle-section">
                    <h3>当前字幕</h3>
                    <div class="subtitle-display">
                        <div class="current-subtitle">{{ currentSubtitle }}</div>
                        <div class="next-subtitle">下一句: {{ nextSubtitle }}</div>
                    </div>
                </div>

                <div class="status-section">
                    <h3>直播状态</h3>
                    <div class="status-info">
                        <p>现在正在讲解: <span class="highlight">{{ currentBlockTitle }}</span></p>
                        <p>下一步即将讲解: <span class="highlight">{{ nextBlockTitle }}</span></p>
                    </div>
                    <div class="broadcast-controls">
                        <button @click="toggleBroadcast" :class="{ 'active': isBroadcasting }">
                            {{ isBroadcasting ? '暂停直播' : '开始直播' }}
                        </button>
                        <button @click="skipToNextBlock"
                            :disabled="!isBroadcasting || currentBlockIndex >= outlineBlocks.length - 1">
                            跳到下一章节
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LiveStreamingAssistant',
    data() {
        return {
            // API配置 - 实际使用时应该从环境变量或配置文件中获取
            apiEndpoint: 'https://api.soruxgpt.com/v1/chat/completions',
            apiKey: 'sk-kYnhbx6spZLlENGda9VsbRPfsxZ7VjMJjxSW7XwknzgO4Kb1',

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

            // 第三列数据
            isBroadcasting: false,
            currentBlockIndex: -1,
            currentContentIndex: 0,
            currentBlockContent: [],
            currentSubtitle: '',
            nextSubtitle: '',
            subtitleInterval: null,
            isGeneratingContent: false
        }
    },
    computed: {
        currentBlockTitle() {
            if (this.currentBlockIndex >= 0 && this.currentBlockIndex < this.outlineBlocks.length) {
                return this.outlineBlocks[this.currentBlockIndex].title;
            }
            return '未开始';
        },
        nextBlockTitle() {
            const nextIndex = this.currentBlockIndex + 1;
            if (nextIndex < this.outlineBlocks.length) {
                return this.outlineBlocks[nextIndex].title;
            }
            return '直播结束';
        }
    },
    methods: {
        async generateOutline() {
            if (!this.topic) return;

            this.isGeneratingOutline = true;

            try {
                const response = await this.callOpenAI(`为主题"${this.topic}"生成一个直播提纲，包含5-8个章节，每个章节用一个短标题概括。格式为：\n1. 章节一\n2. 章节二\n以此类推。`);
                this.outline = response;
            } catch (error) {
                console.error('生成提纲出错:', error);
                alert('生成提纲失败，请重试');
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

                for (const line of lines) {
                    // 尝试匹配类似 "1. 章节标题" 的格式
                    const match = line.match(/^\d+\.\s*(.+)$/);
                    if (match) {
                        this.outlineBlocks.push({
                            title: match[1].trim(),
                            content: []
                        });
                    } else if (line.trim()) {
                        // 如果不匹配格式但有内容，直接添加
                        this.outlineBlocks.push({
                            title: line.trim(),
                            content: []
                        });
                    }
                }

                this.outlineConfirmed = true;
                this.currentBlockIndex = -1;
            } catch (error) {
                console.error('确认提纲出错:', error);
                alert('处理提纲失败，请重试');
            } finally {
                this.isConfirmingOutline = false;
            }
        },

        editBlockTitle(index) {
            this.editingBlockIndex = index;
            this.editingBlockTitle = this.outlineBlocks[index].title;
        },

        saveBlockTitle() {
            if (this.editingBlockIndex >= 0) {
                this.outlineBlocks[this.editingBlockIndex].title = this.editingBlockTitle;
                this.cancelEditBlockTitle();
            }
        },

        cancelEditBlockTitle() {
            this.editingBlockIndex = -1;
            this.editingBlockTitle = '';
        },

        moveBlockUp(index) {
            if (index > 0) {
                const temp = this.outlineBlocks[index];
                this.$set(this.outlineBlocks, index, this.outlineBlocks[index - 1]);
                this.$set(this.outlineBlocks, index - 1, temp);

                // 更新当前块索引（如果需要）
                if (this.currentBlockIndex === index) {
                    this.currentBlockIndex--;
                } else if (this.currentBlockIndex === index - 1) {
                    this.currentBlockIndex++;
                }
            }
        },

        moveBlockDown(index) {
            if (index < this.outlineBlocks.length - 1) {
                const temp = this.outlineBlocks[index];
                this.$set(this.outlineBlocks, index, this.outlineBlocks[index + 1]);
                this.$set(this.outlineBlocks, index + 1, temp);

                // 更新当前块索引（如果需要）
                if (this.currentBlockIndex === index) {
                    this.currentBlockIndex++;
                } else if (this.currentBlockIndex === index + 1) {
                    this.currentBlockIndex--;
                }
            }
        },

        removeBlock(index) {
            if (confirm('确定要删除这个章节吗？')) {
                this.outlineBlocks.splice(index, 1);

                // 更新当前块索引（如果需要）
                if (this.currentBlockIndex >= index) {
                    this.currentBlockIndex = Math.max(-1, this.currentBlockIndex - 1);
                }
            }
        },

        addNewBlock() {
            const newBlockTitle = prompt('请输入新章节标题：');
            if (newBlockTitle && newBlockTitle.trim()) {
                this.outlineBlocks.push({
                    title: newBlockTitle.trim(),
                    content: []
                });
            }
        },

        toggleBroadcast() {
            if (this.isBroadcasting) {
                // 暂停直播
                this.pauseBroadcast();
            } else {
                // 开始直播
                this.startBroadcast();
            }
        },

        async startBroadcast() {
            if (this.outlineBlocks.length === 0) {
                alert('请先生成并确认提纲');
                return;
            }

            this.isBroadcasting = true;

            // 如果没有开始或已经结束，从第一个块开始
            if (this.currentBlockIndex < 0 || this.currentBlockIndex >= this.outlineBlocks.length) {
                this.currentBlockIndex = 0;
                this.currentContentIndex = 0;
                await this.generateBlockContent();
            }

            // 开始播放字幕
            this.playSubtitles();
        },

        pauseBroadcast() {
            this.isBroadcasting = false;
            clearInterval(this.subtitleInterval);
        },

        async generateBlockContent() {
            if (this.isGeneratingContent) return;

            this.isGeneratingContent = true;
            const currentBlock = this.outlineBlocks[this.currentBlockIndex];

            try {
                const prompt = `为直播主题"${this.topic}"的"${currentBlock.title}"章节生成详细讲解内容。内容要通俗易懂，语气轻松自然，适合直播朗读。每个句子都要简短，便于字幕显示。`;
                const content = await this.callOpenAI(prompt);

                // 将内容分割成句子
                const sentences = content.split(/(?<=[.!?。！？])\s+/).filter(s => s.trim());
                currentBlock.content = sentences;

                // 设置初始字幕
                if (sentences.length > 0) {
                    this.currentSubtitle = sentences[0];
                    this.nextSubtitle = sentences.length > 1 ? sentences[1] : '章节结束';
                    this.currentContentIndex = 0;
                }
            } catch (error) {
                console.error('生成章节内容出错:', error);
                alert('生成章节内容失败，请重试');
                this.pauseBroadcast();
            } finally {
                this.isGeneratingContent = false;
            }
        },

        playSubtitles() {
            // 清除可能存在的旧定时器
            if (this.subtitleInterval) {
                clearInterval(this.subtitleInterval);
            }

            this.subtitleInterval = setInterval(() => {
                if (!this.isBroadcasting) return;

                const currentBlock = this.outlineBlocks[this.currentBlockIndex];
                const sentences = currentBlock.content;

                // 显示下一句
                this.currentContentIndex++;

                // 如果还有下一句
                if (this.currentContentIndex < sentences.length) {
                    this.currentSubtitle = sentences[this.currentContentIndex];
                    this.nextSubtitle = this.currentContentIndex + 1 < sentences.length
                        ? sentences[this.currentContentIndex + 1]
                        : '章节结束';
                } else {
                    // 当前章节结束，进入下一章节
                    this.skipToNextBlock();
                }
            }, 5000); // 每5秒更新一次字幕
        },

        async skipToNextBlock() {
            // 停止当前字幕播放
            clearInterval(this.subtitleInterval);

            // 如果有下一章节
            if (this.currentBlockIndex < this.outlineBlocks.length - 1) {
                this.currentBlockIndex++;
                this.currentContentIndex = -1; // 从-1开始，因为playSubtitles会立即+1

                // 生成新章节的内容
                await this.generateBlockContent();

                // 如果仍在直播，继续播放字幕
                if (this.isBroadcasting) {
                    this.playSubtitles();
                }
            } else {
                // 已经是最后一章节
                this.currentSubtitle = '直播已结束';
                this.nextSubtitle = '';
                this.isBroadcasting = false;
            }
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
                        model: 'gpt-3.5-turbo',
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
                        temperature: 0.7
                    })
                });

                if (!response.ok) {
                    throw new Error(`API调用失败: ${response.status}`);
                }

                const data = await response.json();
                return data.choices[0].message.content.trim();
            } catch (error) {
                console.error('API调用出错:', error);
                throw error;
            }
        }
    },
    beforeUnmount() {
        // 清理定时器
        if (this.subtitleInterval) {
            clearInterval(this.subtitleInterval);
        }
    }
}
</script>

<style scoped>
.live-streaming-assistant {
    font-family: 'Arial', sans-serif;
    color: #333;
}

.container {
    display: flex;
    width: 100%;
    min-height: 600px;
    gap: 20px;
}

.column {
    flex: 1;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: auto;
}

/* 第一列样式 */
.input-section,
.outline-section {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
}

textarea {
    resize: vertical;
    min-height: 150px;
}

button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

/* 第二列样式 */
.blocks-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.outline-block {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
}

.current-block {
    border-color: #4CAF50;
    background-color: #f0fff0;
}

.block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.block-title {
    cursor: pointer;
    font-weight: bold;
}

.block-actions {
    display: flex;
    gap: 5px;
}

.block-actions button {
    padding: 2px 8px;
    font-size: 12px;
}

.remove-btn {
    background-color: #f44336;
}

.remove-btn:hover {
    background-color: #d32f2f;
}

.block-edit {
    margin-top: 10px;
    display: flex;
    gap: 5px;
}

.block-edit input {
    flex: 1;
    margin-bottom: 0;
}

.add-block-btn {
    margin-top: 10px;
    background-color: #2196F3;
}

.add-block-btn:hover {
    background-color: #0b7dda;
}

/* 第三列样式 */
.broadcast-section,
.subtitle-section,
.status-section {
    margin-bottom: 20px;
}

.fake-video-area {
    background-color: #333;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-bottom: 15px;
}

.video-placeholder {
    color: white;
    font-size: 18px;
}

.subtitle-display {
    background-color: white;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
    min-height: 100px;
}

.current-subtitle {
    font-size: 18px;
    margin-bottom: 15px;
}

.next-subtitle {
    font-size: 14px;
    color: #777;
    font-style: italic;
}

.status-info {
    background-color: white;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-bottom: 15px;
}

.highlight {
    color: #4CAF50;
    font-weight: bold;
}

.broadcast-controls {
    display: flex;
    gap: 10px;
}

.broadcast-controls button {
    flex: 1;
}

.broadcast-controls button.active {
    background-color: #f44336;
}

.broadcast-controls button.active:hover {
    background-color: #d32f2f;
}

/* 响应式调整 */
@media (max-width: 1200px) {
    .container {
        flex-direction: column;
    }

    .column {
        width: 100%;
    }
}
</style>