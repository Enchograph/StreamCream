
## 直播功能实现文档

### 1. 前端直播配置组件 (streamConfig.vue)

- **平台选择**：提供抖音、B站、YouTube、Twitch四个平台选项
- **推流信息输入**：
  - 推流地址输入框
  - 推流码输入框
- **功能实现**：
  - 自动保存推流信息到localStorage
  - 与后端API同步推流偏好设置
  - 测试连接功能：
    - 打开Live2D预览页面
    - 获取屏幕共享流
    - 通过WebSocket连接后端推流服务

### 2. Live2D模型展示与交互 (Live2DModel.vue)

- **核心功能**：
  - Live2D模型加载与渲染
  - 模型拖拽、缩放交互
  - 嘴型同步与表情控制
- **音频同步**：
  - 音频文件上传与播放
  - 实时音频分析
  - 嘴型参数计算与同步

### 3. 后端推流服务 (app.py)

- **WebSocket服务**：
  - 监听端口8888
  - 处理客户端连接
- **推流流程**：
  1. 接收客户端推流参数(rtmp_url, stream_key)
  2. 启动ffmpeg进程
  3. 接收音视频数据并推流
- **技术栈**：
  - Python + websockets库
  - ffmpeg进行视频转码和推流

### 4. 整体工作流程

1. 用户在前端配置推流信息
2. 点击测试连接时：
   - 打开Live2D预览窗口
   - 获取屏幕共享流
   - 通过WebSocket连接后端
3. 后端接收推流参数并启动ffmpeg
4. 前端持续发送音视频数据到后端
5. 后端通过ffmpeg推流到指定平台

### 5. 关键技术点

- WebSocket实时通信
- 屏幕共享MediaRecorder API
- ffmpeg转码推流
- Live2D模型音频同步

### 6. 依赖项

- 前端：Vue3, PIXI.js, WebSocket API
- 后端：Python 3.x, websockets==11.0, ffmpeg
        