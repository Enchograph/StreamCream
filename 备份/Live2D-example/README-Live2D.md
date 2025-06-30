# pixi-Live2D-display 示例项目

这是一个使用 [pixi.js](https://pixijs.com/) 和 [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) 实现的 Live2D 模型展示示例。用户可以控制模型的表情、嘴型和触发随机动作。

## 功能特点

-  使用 Vue 3 + `<script setup>` 构建组件结构
-  集成 PIXI 应用并展示 Live2D 模型（默认加载 Haru）
-  支持控制嘴型参数（`ParamMouthOpenY`）
-  支持触发模型动作（如 `TapBody`）
- 支持切换多种预设表情

## 项目结构说明

- **`App.vue`**：主组件，包含 PIXI 应用初始化、Live2D 模型加载、用户交互逻辑等
- **`/public/live2d/Haru`**：默认模型文件路径（应包含 `Haru.model3.json` 等资源）

## 使用方法

1. **克隆并安装依赖**（如果项目是 Vite 构建）：

   ```bash
   git clone https://github.com/your-username/Live2D-example.git
   cd Live2D-example
   npm install

## **模型说明**

- 默认模型为 Haru，文件路径为 /public/live2d/Haru/Haru.model3.json
- 可自定义替换为任意符合 Cubism 4 的 .model3.json 文件