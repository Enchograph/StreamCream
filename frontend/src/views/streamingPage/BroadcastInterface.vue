<template>
    <div class="column">
        <h3><span>直播管理</span></h3>

        <!-- <LivePreview :resolution="revolutionPreference" :show-title="false" /> -->

        <Live2DIframeContainer src="/live2d" :resolution="'1920x1080'" />


        <div class="subtitle-section">
            <div class="subtitle-display">
                <div class="current-subtitle">{{ currentSubtitle }}</div>
                <div class="next-subtitle">下一句: {{ nextSubtitle }}</div>
            </div>
        </div>

        <div class="status-section">
            <div class="status-info">
                <p>现在正在讲解: <span class="highlight">{{ currentBlockTitle }}</span></p>
                <p>下一步即将讲解: <span class="highlight">{{ nextBlockTitle }}</span></p>
            </div>
            <div class="broadcast-controls">
                <button @click="skipToNextBlock" class="skip-to-next-chapter"
                    :disabled="!hasStartedBroadcasting || currentBlockIndex >= outlineBlocks.length - 1">
                    跳到下一章节
                </button>
                <button @click="skipToNextSentence" class="skip-to-next-sentence"
                    :disabled="!hasStartedBroadcasting || currentContentIndex >= outlineBlocks[currentBlockIndex]?.content?.length - 1">
                    跳到下一句
                </button>
            </div>
            <div class="broadcast-controls">
                <button @click="toggleBroadcast" :class="{ 'active': isBroadcasting }"
                    :disabled="outlineBlocks.length === 0">
                    {{ isBroadcasting ? '暂停直播' : '开始直播' }}
                </button>
                <button @click="endBroadcast" :disabled="!hasStartedBroadcasting" class="end-broadcast">
                    结束直播
                </button>
            </div>
        </div>
    </div>
</template>

<script>


import { defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import Live2DIframeContainer from '../../components/Live2DIframeContainer.vue';



export default defineComponent({
    components: {
        // LivePreview,
        // Live2DModel
        Live2DIframeContainer

    },
    name: 'BroadcastInterface',
    props: {
        // 提纲块数据
        outlineBlocks: {
            type: Array,
            required: true
        },
        // 当前正在播放的块索引
        currentBlockIndex: {
            type: Number,
            default: -1
        },
        // 直播主题
        topic: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isBroadcasting: false,
            hasStartedBroadcasting: false,
            currentContentIndex: 0,
            currentSubtitle: '',
            nextSubtitle: '',
            synthesizedSentences: {}, // 格式: {blockIndex-sentenceIndex: {status, audioUrl}}
            speechSynthesizer: null,
            speechPlayer: null,
            revolutionPreference: '1920x1080',
            wsBaseUrl: 'ws://localhost:8888',
            wsConnection: null,
            mediaStream: null,
            mediaRecorder: null
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
    created() {
        // 从本地存储获取分辨率设置
        const savedResolution = localStorage.getItem('revolutionPreference');
        if (savedResolution) {
            this.revolutionPreference = savedResolution;
        }

        // 初始化语音合成和播放模块
        this.speechSynthesizer = new SpeechSynthesizer();
        this.speechPlayer = new SpeechPlayer();
        this.speechPlayer.outlineBlocks = this.outlineBlocks;

        // 设置合成完成回调
        this.speechSynthesizer.onSynthesisComplete = (sentence) => {
            console.log('语音合成完成:', sentence);
            // 将合成好的句子添加到播放队列
            if (this.isBroadcasting) {
                this.speechPlayer.addToPlayQueue(sentence);
            }

            // 更新句子状态
            const key = `${sentence.blockIndex}-${sentence.sentenceIndex}`;
            this.synthesizedSentences[key] = {
                status: 'completed',
                audioUrl: sentence.audioUrl
            };
        };

        // 设置播放相关回调
        this.speechPlayer.onPlayStart = (sentence) => {
            console.log('开始播放句子:', sentence);
            // 更新当前播放的章节和句子索引
            this.$emit('update:currentBlockIndex', sentence.blockIndex);
            this.currentContentIndex = sentence.sentenceIndex;
        };

        this.speechPlayer.onPlayEnd = (sentence) => {
            console.log('句子播放结束:', sentence);

            // 检查是否是章节的最后一句
            const currentBlock = this.outlineBlocks[this.currentBlockIndex];
            if (!currentBlock || !currentBlock.content) return;

            const sentences = currentBlock.content;

            // 如果播放的是最后一句，触发章节结束
            if (sentence.sentenceIndex === sentences.length - 1) {
                this.speechPlayer.signalChapterEnd();
            } else if (this.isBroadcasting) {
                // 否则准备下一句
                this.prepareNextSentence();
            }

            // 通知父组件句子播放完成
            this.$emit('sentence-played', {
                blockIndex: sentence.blockIndex,
                sentenceIndex: sentence.sentenceIndex
            });
        };

        this.speechPlayer.onSubtitleChange = (text) => {
            this.currentSubtitle = text;

            // 更新下一句字幕
            this.updateNextSubtitle();
        };

        // 添加章节结束回调
        this.speechPlayer.onChapterEnd = () => {
            console.log('章节播放结束');
            this.moveToNextChapter();
        };
    },
    methods: {
        // 页面卸载处理
        handlePageUnload(event) {
            // 取消所有请求和清理资源
            this.cleanupResources();

            // 在某些浏览器中，可能需要返回一个字符串或设置returnValue来显示确认对话框
            const confirmationMessage = '确定要离开吗？正在进行的语音合成将被取消。';
            (event || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
        },

        // 清理所有资源的方法
        cleanupResources() {
            console.log('清理资源...');

            // 取消所有语音合成请求
            if (this.speechSynthesizer) {
                this.speechSynthesizer.cancelAllRequests();
            }

            // 停止所有音频播放
            if (this.speechPlayer) {
                this.speechPlayer.stop();
            }

            // 停止媒体录制
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
            }

            // 关闭媒体流
            if (this.mediaStream) {
                this.mediaStream.getTracks().forEach(track => track.stop());
            }

            // 关闭WebSocket连接
            if (this.wsConnection && this.wsConnection.readyState !== 3) {
                this.wsConnection.close();
            }

            // 停止直播状态
            this.isBroadcasting = false;

            // 通知父组件直播状态变更
            this.$emit('broadcast-status-change', false);
            
            // 清理localStorage中的直播相关数据
            this.clearLive2DStorage();
        },

        // 预处理当前章节的语音
        processSpeechForBlock(blockIndex) {
            if (!this.outlineBlocks[blockIndex] || !this.outlineBlocks[blockIndex].content) {
                return;
            }

            const block = this.outlineBlocks[blockIndex];
            const sentences = block.content;

            // 只处理当前章节的语音
            if (blockIndex === this.currentBlockIndex) {
                sentences.forEach((sentence, sentenceIndex) => {
                    const key = `${blockIndex}-${sentenceIndex}`;
                    if (!this.synthesizedSentences[key]) {
                        this.speechSynthesizer.addToQueue(sentence, blockIndex, sentenceIndex);
                        this.synthesizedSentences[key] = {
                            status: 'queued'
                        };
                    }
                });
            }
        },

        // 准备下一句语音
        prepareNextSentence() {
            if (!this.isBroadcasting) return;

            const currentBlock = this.outlineBlocks[this.currentBlockIndex];
            if (!currentBlock || !currentBlock.content) return;

            const sentences = currentBlock.content;
            const nextSentenceIndex = this.currentContentIndex + 1;

            // 确保不是章节最后一句
            if (nextSentenceIndex < sentences.length) {
                // 正常处理下一句
                const key = `${this.currentBlockIndex}-${nextSentenceIndex}`;
                if (!this.synthesizedSentences[key]) {
                    this.speechSynthesizer.addToQueue(
                        sentences[nextSentenceIndex],
                        this.currentBlockIndex,
                        nextSentenceIndex
                    );
                }

                // 更新下一句字幕
                this.nextSubtitle = sentences[nextSentenceIndex];
            }
        },

        // 更新下一句字幕显示
        updateNextSubtitle() {
            const currentBlock = this.outlineBlocks[this.currentBlockIndex];
            if (!currentBlock || !currentBlock.content) {
                this.nextSubtitle = '';
                return;
            }

            const sentences = currentBlock.content;
            const nextSentenceIndex = this.currentContentIndex + 1;

            if (nextSentenceIndex < sentences.length) {
                this.nextSubtitle = sentences[nextSentenceIndex];
            } else if (this.currentBlockIndex < this.outlineBlocks.length - 1) {
                this.nextSubtitle = '章节结束，即将进入下一章节';
            } else {
                this.nextSubtitle = '直播结束';
            }

            // 如果当前句子播放完毕但下一句还没开始，仍然显示当前句子
            if (this.currentSubtitle === '' && this.nextSubtitle !== '') {
                const currentSentenceIndex = this.currentContentIndex;
                if (currentSentenceIndex >= 0 && currentSentenceIndex < sentences.length) {
                    this.currentSubtitle = sentences[currentSentenceIndex];
                }
            }
        },

        // 章节结束处理方法
        handleChapterEnd() {
            if (!this.isBroadcasting) return;

            // 显示章节结束过渡提示
            // this.currentSubtitle = '章节结束，即将进入下一章节';
            this.nextSubtitle = '';

            // 延迟一段时间后切换到下一章节
            setTimeout(() => {
                if (this.isBroadcasting) {
                    this.moveToNextChapter();
                }
            }, 3000); // 等待3秒后切换
        },

        // 移动到下一章节的方法
        async moveToNextChapter() {
            const nextBlockIndex = this.currentBlockIndex + 1;

            if (nextBlockIndex < this.outlineBlocks.length) {
                // 通知父组件更新当前块索引
                this.$emit('update:currentBlockIndex', nextBlockIndex);
                this.currentContentIndex = 0;

                // 确保新章节内容已生成
                const nextBlock = this.outlineBlocks[nextBlockIndex];
                if (!nextBlock.content || nextBlock.content.length === 0) {
                    // 通知父组件生成内容
                    this.$emit('generate-content', nextBlockIndex);
                    return; // 等待内容生成后再继续
                }

                // 显示新章节信息
                if (nextBlock.content && nextBlock.content.length > 0) {
                    // this.currentSubtitle = `开始新章节: ${nextBlock.title}`;
                    this.nextSubtitle = nextBlock.content[0];

                    // 清空之前的播放队列
                    this.speechPlayer.stop();
                    await this.speechSynthesizer.clearQueue();

                    // 添加新章节第一句
                    this.speechSynthesizer.addToQueue(
                        nextBlock.content[0],
                        nextBlockIndex,
                        0
                    );
                }
            } else {
                // 所有章节播放完毕
                this.isBroadcasting = false;
                this.$emit('broadcast-status-change', false);
                // this.currentSubtitle = '直播已结束';
                this.nextSubtitle = '';
            }
        },

        // 预处理下一章节
        prepareNextBlock() {
            const nextBlockIndex = this.currentBlockIndex + 1;

            if (nextBlockIndex < this.outlineBlocks.length) {
                // 检查下一章节是否有内容
                const nextBlock = this.outlineBlocks[nextBlockIndex];
                if (!nextBlock.content || nextBlock.content.length === 0) {
                    // 通知父组件生成下一章节内容
                    this.$emit('generate-next-content', nextBlockIndex);
                } else {
                    // 已有内容，直接预处理语音
                    this.processSpeechForBlock(nextBlockIndex);
                }
            } else {
                // 所有章节已结束
                this.isBroadcasting = false;
                this.$emit('broadcast-status-change', false);
                // this.currentSubtitle = '直播已结束';
                this.nextSubtitle = '';
            }
        },

        toggleBroadcast() {
            if (this.isBroadcasting) {
                this.pauseBroadcast();
            } else {
                this.startBroadcast();
            }
        },

        async startBroadcast() {
            if (this.outlineBlocks.length === 0) {
                ElMessage.warning('请先生成并确认提纲');
                return;
            }

            // 清理之前的localStorage数据，确保没有残留
            this.clearLive2DStorage();

            // 在新标签页打开Live2D页面，保持当前页不变
            window.open('/live2d', '_blank', 'noopener,noreferrer');

            try {
                // 获取屏幕视频流
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true  // 采集屏幕音频
                });

                // 获取系统音频流（通过 getUserMedia）
                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: false,
                        autoGainControl: false
                    },
                    video: false
                });

                // 组合视频和音频流
                this.mediaStream = new MediaStream();

                // 添加视频轨道
                screenStream.getVideoTracks().forEach(track => {
                    this.mediaStream.addTrack(track);
                });

                // 添加音频轨道
                audioStream.getAudioTracks().forEach(track => {
                    this.mediaStream.addTrack(track);
                });

                // 建立WebSocket连接
                this.wsConnection = new WebSocket(this.wsBaseUrl);

                this.wsConnection.onopen = () => {
                    // 发送推流信息 - 添加推流地址和推流码
                    const rtmpUrl = localStorage.getItem('rtmp_url') || '';
                    const streamKey = localStorage.getItem('stream_key') || '';

                    this.wsConnection.send(JSON.stringify({
                        action: 'start_stream',
                        topic: this.topic,
                        rtmp_url: rtmpUrl,
                        stream_key: streamKey
                    }));

                    // 设置媒体录制器
                    this.mediaRecorder = new MediaRecorder(this.mediaStream, {
                        mimeType: 'video/webm; codecs=vp8,opus'
                    });

                    this.mediaRecorder.ondataavailable = (e) => {
                        if (this.wsConnection && this.wsConnection.readyState === 1) {
                            this.wsConnection.send(e.data);
                        }
                    };

                    this.mediaRecorder.start(100);

                    // 设置直播状态
                    this.isBroadcasting = true;
                    this.hasStartedBroadcasting = true;
                    this.speechPlayer.isBroadcasting = true;
                    this.$emit('broadcast-status-change', true);
                    console.log('开始直播');

                    window.addEventListener('beforeunload', this.handlePageUnload);
                };

                this.wsConnection.onerror = (e) => {
                    ElMessage.error('WebSocket连接失败: ' + e.message);
                    this.cleanupResources();
                };

            } catch (err) {
                ElMessage.error('获取屏幕共享失败: ' + err);
                this.cleanupResources();
                return;
            }

            // 如果没有开始或已经结束，从第一个块开始
            if (this.currentBlockIndex < 0 || this.currentBlockIndex >= this.outlineBlocks.length) {
                this.$emit('update:currentBlockIndex', 0);
                this.currentContentIndex = 0;

                // 通知父组件生成内容
                this.$emit('generate-content', 0);
                console.log('从第一章节开始');
                return; // 等待内容生成后再继续
            }

            // 开始处理当前块的语音
            this.processSpeechForBlock(this.currentBlockIndex);

            // 如果有下一块，预处理下一块
            if (this.currentBlockIndex < this.outlineBlocks.length - 1) {
                this.prepareNextBlock();
            }

            // 设置初始字幕
            const currentBlock = this.outlineBlocks[this.currentBlockIndex];
            if (currentBlock && currentBlock.content && currentBlock.content.length > 0) {
                this.currentSubtitle = `开始章节: ${currentBlock.title}`;
                this.nextSubtitle = currentBlock.content[0];

                // 延迟一小段时间后开始播放第一句，让用户看到章节标题
                setTimeout(() => {
                    if (this.isBroadcasting && currentBlock.content.length > 0) {
                        // 开始播放第一句
                        this.speechSynthesizer.addToQueue(
                            currentBlock.content[0],
                            this.currentBlockIndex,
                            0
                        );

                        const key = `${this.currentBlockIndex}-0`;
                        this.synthesizedSentences[key] = {
                            status: 'queued'
                        };

                        console.log('开始播放第一句');
                    }
                }, 2000);
            }
        },

        pauseBroadcast() {
            console.log('开始暂停直播...');
            
            // 立即停止所有语音合成
            if (this.speechSynthesizer) {
                this.speechSynthesizer.cancelAllRequests();
            }
            
            // 立即停止语音播放
            if (this.speechPlayer) {
                this.speechPlayer.stop(); // 使用stop而不是pause，确保完全停止
            }
            
            // 立即更新状态
            this.isBroadcasting = false;
            if (this.speechPlayer) {
                this.speechPlayer.isBroadcasting = false;
            }
            
            // 立即清理localStorage中的直播相关数据
            this.clearLive2DStorage();
            
            // 立即通知父组件直播状态变更
            this.$emit('broadcast-status-change', false);
            
            // 暂停媒体录制
            if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                this.mediaRecorder.pause();
            }

            // 通知后端暂停推流
            if (this.wsConnection && this.wsConnection.readyState === 1) {
                this.wsConnection.send(JSON.stringify({
                    action: 'pause_stream'
                }));
            }
            
            // 清空当前字幕显示
            this.currentSubtitle = '';
            this.nextSubtitle = '';
            
            console.log('直播已暂停');
        },

        // 清除特定章节的语音合成任务
        clearSynthesisTasksForBlock(blockIndex) {
            if (this.speechSynthesizer) {
                this.speechSynthesizer.removeTasksByBlockIndex(blockIndex);
            }
        },

        // 清除特定章节的合成状态记录
        clearSynthesizedSentencesForBlock(blockIndex) {
            // 删除所有以 "blockIndex-" 开头的键
            Object.keys(this.synthesizedSentences).forEach(key => {
                if (key.startsWith(`${blockIndex}-`)) {
                    delete this.synthesizedSentences[key];
                }
            });
        },

        async skipToNextBlock() {
            // 仅暂停当前播放而不清空资源
            if (this.speechPlayer.currentAudio) {
                this.speechPlayer.currentAudio.pause();
            }

            // 保留队列中的内容
            this.speechPlayer.isPlaying = false;

            // 切换到下一章节
            await this.moveToNextChapter();
        },

        // 跳到下一句
        skipToNextSentence() {
            if (!this.isBroadcasting) return;

            const currentBlock = this.outlineBlocks[this.currentBlockIndex];
            if (!currentBlock || !currentBlock.content) return;

            const sentences = currentBlock.content;
            const nextSentenceIndex = this.currentContentIndex + 1;

            // 确保不是章节最后一句
            if (nextSentenceIndex < sentences.length) {
                this.currentContentIndex = nextSentenceIndex;
                this.currentSubtitle = sentences[nextSentenceIndex];
                this.updateNextSubtitle();

                // 准备播放下一句
                const key = `${this.currentBlockIndex}-${nextSentenceIndex}`;
                if (this.synthesizedSentences[key]?.status === 'ready') {
                    this.speechPlayer.playAudio(this.synthesizedSentences[key].audioUrl);
                }
            }
        },

        // 结束直播
        async stopLive() {
            // 添加确认对话框
            const confirmEnd = await ElMessageBox.confirm(
                '确定要结束直播吗？',
                '结束直播确认',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(() => false);

            if (!confirmEnd) return;

            // 停止所有语音合成和播放
            this.speechSynthesizer.cancelAllRequests();
            this.speechPlayer.stop();

            // 停止媒体录制
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
            }

            // 关闭媒体流
            if (this.mediaStream) {
                this.mediaStream.getTracks().forEach(track => track.stop());
            }

            // 关闭WebSocket连接
            if (this.wsConnection && this.wsConnection.readyState !== 3) {
                this.wsConnection.send(JSON.stringify({
                    action: 'end_stream'
                }));
                this.wsConnection.close();
            }

            // 更新直播状态
            this.isBroadcasting = false;
            this.hasStartedBroadcasting = false;

            // 通知父组件直播状态变更
            this.$emit('broadcast-status-change', false);

            // 移除页面卸载事件监听
            window.removeEventListener('beforeunload', this.handlePageUnload);

            // 重置当前播放状态
            this.currentSubtitle = '';
            this.nextSubtitle = '';
            
            // 清理localStorage中的直播相关数据
            this.clearLive2DStorage();
            
            this.$router.push('/mainPage');

            // 调用streamConfig.vue中的stopLive函数
            window.parent.postMessage({ type: 'stopLive' }, '*');

            console.log('直播已结束');
        },

        async cleanupAudioFiles() {
            try {
                const response = await fetch('http://localhost:5001/delete-all-audio');
                if (!response.ok) {
                    console.error('删除音频文件失败:', response.statusText);
                }
            } catch (error) {
                console.error('删除音频文件出错:', error);
            }
        },

        // 清理Live2D相关的localStorage数据
        clearLive2DStorage() {
            console.log('立即清理Live2D相关的localStorage数据...');
            
            // 立即清理字幕数据
            localStorage.removeItem('live2d_current_subtitle');
            
            // 立即清理TTS结果数据
            localStorage.removeItem('live2d_tts_result');
            
            // 立即触发清空事件通知Live2D页面
            window.dispatchEvent(new CustomEvent('subtitleCleared'));
            
            // 强制触发storage事件，确保Live2D页面立即收到通知
            setTimeout(() => {
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'live2d_current_subtitle',
                    newValue: null,
                    oldValue: null,
                    storageArea: localStorage
                }));
            }, 10);
            
            console.log('Live2D localStorage数据已立即清理');
        },
    },
    mounted() {
        // 添加路由变化监听（如果使用 Vue Router）
        if (this.$router) {
            this.$router.beforeEach((to, from, next) => {
                this.cleanupResources();
                next();
            });
        }
    },
    beforeUnmount() {
        // 清理资源
        if (this.speechPlayer) {
            this.speechPlayer.stop();
        }
        this.cleanupResources();
        this.cleanupAudioFiles();
        // 清理localStorage数据
        this.clearLive2DStorage();
        // 移除事件监听
        window.removeEventListener('beforeunload', this.handlePageUnload);
    },


    watch: {
        outlineBlocks: {
            deep: true,
            handler(newValue) {
                if (this.speechPlayer) {
                    this.speechPlayer.outlineBlocks = newValue;
                }

                // 如果正在播放且有新内容，处理当前块的语音
                if (this.isBroadcasting && this.currentBlockIndex >= 0 &&
                    newValue[this.currentBlockIndex] &&
                    newValue[this.currentBlockIndex].content) {
                    this.processSpeechForBlock(this.currentBlockIndex);
                }
            }
        },
        currentBlockIndex(newValue, oldValue) {
            // 如果正在广播且章节变更，处理新章节的语音
            if (this.isBroadcasting && newValue !== oldValue && newValue >= 0) {
                this.processSpeechForBlock(newValue);
                // 预处理下一章节
                if (newValue < this.outlineBlocks.length - 1) {
                    this.prepareNextBlock();
                }
            }
        }
    },
},)

// 语音合成模块
class SpeechSynthesizer {
    constructor() {
        this.isGenerating = false;
        this.queue = [];
        this.currentSentence = null;
        this.onSynthesisComplete = null;
        this.activeRequests = []; // 存储活跃的请求控制器
    }

    // 将句子添加到合成队列
    addToQueue(sentence, blockIndex, sentenceIndex) {
        this.queue.push({
            text: sentence,
            blockIndex,
            sentenceIndex,
            status: 'queued' // queued, synthesizing, completed
        });

        // 如果没有正在合成的句子，开始合成
        if (!this.isGenerating) {
            this.synthesizeNext();
        }
    }

    // 获取队列中下一个待合成的句子并开始合成
    async synthesizeNext() {
        if (this.queue.length === 0 || this.isGenerating) {
            return;
        }

        this.isGenerating = true;
        this.currentSentence = this.queue[0];
        this.currentSentence.status = 'synthesizing';

        try {
            console.log('合成语音：', this.currentSentence.text);

            // 创建 AbortController 用于取消请求
            const abortController = new AbortController();
            this.activeRequests.push(abortController);

            const response = await fetch('http://localhost:5001/synthesize-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: this.currentSentence.text,
                    text_lang: 'zh',
                    ref_audio_path: '参考音频.wav',
                    prompt_lang: 'zh',
                    prompt_text: this.currentSentence.text
                }),
                signal: abortController.signal // 添加信号以支持取消
            });

            // 请求完成后从活跃请求列表中移除
            this.activeRequests = this.activeRequests.filter(controller => controller !== abortController);

            const data = await response.json();
            console.log('后端返回的TTS数据:', data);

            if (data.audio_url) {
                // 合成完成，更新状态
                this.currentSentence.status = 'completed';
                this.currentSentence.audioUrl = `http://localhost:5001${data.audio_url}`;

                // 通知监听器合成已完成
                if (this.onSynthesisComplete) {
                    this.onSynthesisComplete(this.currentSentence);
                }

                // TTS结果已通过字幕同步机制传递，无需额外存储
                console.log('TTS合成完成，音频URL:', data.audio_url);
            } else {
                console.error('TTS合成失败，没有返回audio_url:', data);
            }
        } catch (error) {
            // 如果是取消请求导致的错误，不需要记录错误
            if (error.name !== 'AbortError') {
                console.error('语音合成出错:', error);
                this.currentSentence.status = 'error';
                this.currentSentence.error = error.message;
            } else {
                console.log('语音合成请求已取消:', this.currentSentence.text);
            }
        } finally {
            this.isGenerating = false;
            // 从队列中移除已处理的句子
            this.queue.shift();
            // 处理下一个句子
            if (this.queue.length > 0) {
                this.synthesizeNext();
            }
        }
    }

    // 取消所有活跃的合成请求
    cancelAllRequests() {
        console.log(`取消所有语音合成请求，数量: ${this.activeRequests.length}`);
        this.activeRequests.forEach(controller => {
            controller.abort();
        });
        this.activeRequests = [];
        this.isGenerating = false;
        this.queue = [];
        this.currentSentence = null;
    }

    // 清空合成队列
    clearQueue() {
        this.queue = [];
        return Promise.resolve();
    }

    // 获取当前正在合成的句子
    getCurrentSynthesizingSentence() {
        return this.currentSentence;
    }

    // 获取合成队列状态
    getQueueStatus() {
        return {
            isGenerating: this.isGenerating,
            queueLength: this.queue.length,
            currentSentence: this.currentSentence
        };
    }

    removeTasksByBlockIndex(blockIndex) {
        // 过滤队列，移除指定章节的任务
        this.queue = this.queue.filter(task => task.blockIndex !== blockIndex);

        // 如果当前正在处理的任务是该章节的，且合成还未完成，取消它
        if (this.currentSentence && this.currentSentence.blockIndex === blockIndex && this.isGenerating) {
            // 实际上我们不能中断正在进行的网络请求，但可以在完成后忽略结果
            this.currentSentence.shouldIgnore = true;
        }

        console.log(`已从合成队列中移除章节 ${blockIndex} 的所有任务`);
    }
}

// 语音播放模块
class SpeechPlayer {
    constructor() {
        this.audioMap = new Map(); // 句子内容到音频文件名的映射
        this.currentAudio = null;
        this.currentSubtitle = '';
        this.isPlaying = false;
        this.currentAudio = null;
        this.playQueue = [];
        this.onPlayStart = null;
        this.onPlayEnd = null;
        this.onSubtitleChange = null;
        this.outlineBlocks = null;
        this.isBroadcasting = false;
    }

    // 添加已合成的音频到播放队列
    addToPlayQueue(synthesizedSentence) {
        this.playQueue.push(synthesizedSentence);

        // 如果当前没有播放，开始播放
        if (!this.isPlaying) {
            this.playNext();
        }
    }

    signalChapterEnd() {
        // 通知系统章节已结束
        if (this.onChapterEnd) {
            this.onChapterEnd();
        }
    }

    // 添加到队列
    addToQueue(sentence, audioUrl) {
        this.audioMap.set(sentence, audioUrl);
        this.playQueue.push({ sentence, audioUrl });
        if (!this.isPlaying) {
            this.playNext();
        }
    }

    playNext() {
        if (this.playQueue.length === 0 || this.isPlaying) {
            return;
        }

        const sentence = this.playQueue[0];
        // 更新字幕和章节状态
        this.updateSubtitle(sentence.text);
        this.currentBlockIndex = sentence.blockIndex;
        this.currentContentIndex = sentence.sentenceIndex;

        // 确保有音频URL
        if (!sentence || !sentence.audioUrl) {
            this.playQueue.shift();
            this.playNext();
            return;
        }

        // 停止当前正在播放的音频
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

        this.isPlaying = true;

        // 创建新的音频对象
        this.currentAudio = new Audio(sentence.audioUrl);

        // 设置事件监听器
        this.currentAudio.onplay = () => {
            // 通知监听器播放开始
            if (this.onPlayStart) {
                this.onPlayStart(sentence);
            }

            // 通知字幕变更
            if (this.onSubtitleChange) {
                this.onSubtitleChange(sentence.text);
            }
        };

        this.currentAudio.onended = () => {
            // 更新字幕为空
            this.updateSubtitle('');

            // 检查是否是章节最后一句
            let isLastSentence = false;
            if (this.outlineBlocks && this.currentBlockIndex !== undefined && this.outlineBlocks[this.currentBlockIndex]) {
                const currentBlock = this.outlineBlocks[this.currentBlockIndex];
                isLastSentence = currentBlock.content &&
                    sentence.sentenceIndex === currentBlock.content.length - 1;
            }

            // 通知监听器播放结束
            if (this.onPlayEnd) {
                this.onPlayEnd(sentence, isLastSentence);
            }

            // 如果是章节最后一句，触发章节结束
            if (isLastSentence) {
                this.signalChapterEnd();
            }

            // 从音频URL中提取文件名
            const audioUrl = sentence.audioUrl;
            const filename = audioUrl.substring(audioUrl.lastIndexOf('/') + 1);

            // 调用后端API删除音频文件
            fetch(`http://localhost:5001/delete-audio/${filename}`, {
                method: 'DELETE'
            }).then(response => {
                if (!response.ok) {
                    console.error('删除音频文件失败:', response.statusText);
                }
            }).catch(error => {
                console.error('删除音频文件出错:', error);
            });

            // 从队列移除已播放的句子
            this.playQueue.shift();

            // 设置为非播放状态
            this.isPlaying = false;

            // 只有在广播状态下才自动播放下一个
            if (this.isBroadcasting) {
                this.playNext();
            }
        };

        // 开始播放
        this.currentAudio.play().catch(error => {
            console.error('播放音频失败:', error);
            this.isPlaying = false;
            this.playQueue.shift();
            this.playNext();
        });
    }

    // 暂停播放
    pause() {
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.isPlaying = false;
        }
    }

    // 恢复播放
    resume() {
        if (this.currentAudio && !this.isPlaying) {
            this.currentAudio.play();
            this.isPlaying = true;
        }
    }

    // 更新字幕
    updateSubtitle(sentence) {
        this.currentSubtitle = sentence;
        if (this.onSubtitleChange) {
            this.onSubtitleChange(sentence);
        }
        
        // 同步字幕到localStorage，供Live2D页面使用
        if (sentence && sentence.trim()) {
            const subtitleData = {
                text: sentence,
                timestamp: Date.now(),
                type: 'subtitle'
            };
            localStorage.setItem('live2d_current_subtitle', JSON.stringify(subtitleData));
            console.log('字幕已同步到localStorage:', subtitleData);
            
            // 触发自定义事件通知Live2D页面
            window.dispatchEvent(new CustomEvent('subtitleUpdated', { detail: subtitleData }));
        } else {
            // 清空字幕
            localStorage.removeItem('live2d_current_subtitle');
            console.log('字幕已清空');
            
            // 触发清空事件
            window.dispatchEvent(new CustomEvent('subtitleCleared'));
        }
    }

    // 停止播放并清空队列
    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        this.isPlaying = false;
        this.playQueue = [];
        
        // 清理localStorage中的字幕数据
        localStorage.removeItem('live2d_current_subtitle');
        window.dispatchEvent(new CustomEvent('subtitleCleared'));
    }

    // 获取当前播放状态
    getPlaybackStatus() {
        return {
            isPlaying: this.isPlaying,
            queueLength: this.playQueue.length,
            currentSentence: this.playQueue.length > 0 ? this.playQueue[0] : null
        };
    }
}


</script>

<style scoped>
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

.iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    /* 16:9 比例 */
    height: 0;
    overflow: hidden;
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

@media (min-width: calc(100vw / 3)) {
    .column {
        flex: 1 1 calc(100% / 3);
        min-width: 0;
    }
}

@media (max-width: calc(100vw / 3)) {
    .column {
        width: 100%;
        flex: none;
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
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #ddd;
    min-height: 120px;
}

.current-subtitle {
    font-size: 22px;
    margin-bottom: 20px;
    line-height: 1.4;
}

.next-subtitle {
    font-size: 16px;
    color: #777;
    font-style: italic;
    line-height: 1.4;
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
    gap: 15px;
    padding: 7px 0;
}

.broadcast-controls button {
    flex: 1;
    padding: 12px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
}

.broadcast-controls button:not(.skip-to-next-chapter):not(.skip-to-next-sentence):hover {
    background-color: #45a049;
}

.broadcast-controls button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.broadcast-controls button[disabled]:hover {
    background-color: #cccccc;
}

.broadcast-controls button.active {
    background-color: #f44336;
}

.broadcast-controls button.skip-to-next-chapter,
.broadcast-controls button.skip-to-next-sentence {
    background-color: #2196F3;
}


.broadcast-controls button.skip-to-next-chapter:hover,
.broadcast-controls button.skip-to-next-sentence:hover {
    background-color: #1976D2;
}


.broadcast-controls button.skip-to-next-chapter:disabled,
.broadcast-controls button.skip-to-next-sentence:disabled {
    background-color: #cccccc;
}

.broadcast-controls button.end-broadcast {
    background-color: #f44336;
}

.broadcast-controls button.end-broadcast:disabled {
    background-color: #cccccc;
}

.broadcast-controls button.active:hover {
    background-color: #d32f2f;
}
</style>

// 在SpeechPlayer类中添加
this.currentAudio.addEventListener('play', () => {
window.live2DAudioElement = this.currentAudio;
});

this.currentAudio.addEventListener('ended', () => {
window.live2DAudioElement = null;
});
