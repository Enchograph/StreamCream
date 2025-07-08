# Live2D实现文档

## 架构概述

Live2D功能通过三个主要组件实现：

1. BroadcastInterface.vue - 主直播界面，集成Live2D容器
2. Live2DIframeContainer.vue - Live2D模型iframe容器
3. Live2DModel.vue - Live2D模型核心实现

## 关键实现细节

### 1. 模型集成
- 使用PIXI.js和pixi-live2d-display-lipsyncpatch库渲染Live2D模型
- 模型通过Canvas元素展示，支持动态分辨率调整
- 使用Pinia状态管理存储模型状态

### 2. 音频同步功能
- 实现音频分析器检测嘴型变化
- 支持麦克风输入和音频文件输入
- 元音检测算法根据频率特征匹配嘴型

### 3. 交互功能
- 表情切换(由AI控制)
- 随机动作按钮
- 嘴型变换按钮
- 模型位置重置

### 4. 响应式设计
- 根据分辨率动态调整模型大小
- 通过iframe容器实现缩放和定位

## 数据流

1. 用户操作触发模型动作
2. 音频输入被分析并转换为嘴型参数
3. 模型状态更新并渲染到Canvas
4. 通过Pinia状态管理同步到iframe容器
