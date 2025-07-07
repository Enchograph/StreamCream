export default {
  // 通用
  common: {
    loading: '加载中...',
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    search: '搜索',
    refresh: '刷新',
    export: '导出',
    import: '导入',
    copy: '复制',
    paste: '粘贴',
    close: '关闭',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    finish: '完成',
    start: '开始',
    stop: '停止',
    reset: '重置',
    clear: '清空',
    help: '帮助',
    about: '关于',
    settings: '设置',
    logout: '退出登录',
    login: '登录',
    register: '注册',
    username: '用户名',
    password: '密码',
    email: '邮箱',
    submit: '提交',
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息',
    yes: '是',
    no: '否',
    ok: '确定'
  },

  // 导航
  nav: {
    home: '首页',
    dashboard: '仪表板',
    streaming: '直播',
    settings: '设置',
    help: '帮助',
    about: '关于我们'
  },

  // 登录页面
  login: {
    title: '欢迎使用StreamCream',
    subtitle: '专业的直播推流码获取与管理平台',
    login: '登录',
    register: '注册',

    username: '用户名',
    password: '密码',
    email: '邮箱',

    verificationCode: '验证码',
    resendCode: '重新发送',
    loginSuccess: '登录成功！',
    registerSuccess: '注册成功！',
    loginFailed: '登录失败',
    registerFailed: '注册失败',
    emailSent: '验证码已发送，请查收邮箱！',
    verificationSuccess: '验证成功！',
    verificationFailed: '验证失败',
    passwordResetSuccess: '密码重置成功！',
    passwordResetFailed: '密码重置失败',
    invalidUsername: '请输入用户名',
    usernameTooShort: '用户名长度至少为3个字符',
    invalidEmail: '请输入有效的邮箱地址',
    invalidPassword: '密码长度至少为6个字符',
    passwordTooWeak: '密码强度太弱，请使用更复杂的密码',
    passwordMismatch: '两次输入的密码不一致',
    invalidCode: '请输入验证码',
    codeLengthError: '验证码应为6位数字',
    pleaseLogin: '请先登录!!!',
    otherLoginMethods: '其他方式登录',
    socialLogin: {
      facebook: 'Facebook登录',
      google: 'Google登录',
      twitter: 'Twitter登录'
    },
    inputUsername: '请输入用户名',
    inputPassword: '请输入密码',
    inputEmail: '请输入邮箱',
    confirmPassword: '请确认密码',
    inputVerificationCode: '请输入验证码',
    loggingIn: '登录中...',
    forgotPassword: '忘记密码?',
    verifyEmail: '验证邮箱',
    sending: '发送中...',
    sendVerificationCode: '发送验证码',
    verifying: '验证中...',
    verifyCode: '验证验证码',
    inputNewPassword: '请输入新密码',
    confirmNewPassword: '请确认新密码',
    resetting: '重置中...',
    resetPassword: '重置密码',
    passwordStrength: {
      veryWeak: '非常弱',
      weak: '弱',
      medium: '中等',
      strong: '强',
      veryStrong: '非常强'
    },
    serverError: '服务器错误',
    resendSuccess: '验证码已重新发送',
    sendFailed: '发送失败'
  },

  // 抖音直播页面
  douyin: {
    title: '抖音直播推流工具',
    subtitle: '专业的直播推流码获取与管理平台',
    tabs: {
      account: {
        name: '账号设置',
        description: '账号登录与认证'
      },
      live: {
        name: '直播设置',
        description: '直播配置与管理'
      },
      stream: {
        name: '推流信息',
        description: '推流码获取与导出'
      }
    },
    account: {
      title: '账号设置',
      subtitle: '配置您的抖音账号信息，支持多种登录方式',
      cookiesImport: {
        title: 'Cookies文件导入',
        description: '从本地文件导入Cookies信息',
        button: '选择文件'
      },
      autoGet: {
        title: '自动获取',
        description: '通过扫码自动获取账号信息',
        button: '开始获取',
        loading: '获取中...',
        loadingText: '正在获取账号信息...'
      },
      manualInput: {
        title: '手动输入',
        description: '如果您已有账号信息，可以直接输入',
        roomId: '房间ID',
        cookies: 'Cookies',
        sessionId: 'Session ID',
        saveButton: '保存设置'
      }
    },
    live: {
      title: '直播设置',
      subtitle: '配置直播标题、分类和互动功能',
      titleSetting: {
        title: '直播标题',
        description: '设置您的直播标题',
        placeholder: '输入直播标题',
        updateButton: '更新标题'
      },
      categorySetting: {
        title: '直播分类',
        description: '选择适合的直播分类',
        mainCategory: '主分类',
        subCategory: '子分类',
        selectCategory: '请选择分类',
        selectSubCategory: '请选择子分类',
        updateButton: '更新分类',
        refreshButton: '刷新分类'
      },
      comment: {
        title: '发送评论',
        description: '与观众互动',
        placeholder: '输入评论内容',
        sendButton: '发送评论'
      },
      startLive: {
        button: '开始直播'
      },
      logs: {
        title: '操作日志',
        clearButton: '清空',
        exportButton: '导出',
        noLogs: '暂无操作日志'
      }
    },
    stream: {
      title: '推流信息',
      subtitle: '获取和管理您的直播推流信息',
      server: '推流地址',
      code: '推流密钥',
      noServer: '暂无推流地址',
      noCode: '暂无推流密钥',
      copyButton: '复制',
      export: {
        title: '导出选项',
        description: '将推流信息保存到本地',
        desktopButton: '导出到桌面',
        fileButton: '导出到文件'
      },
      control: {
        title: '直播控制',
        description: '管理直播状态',
        stopButton: '停止直播',
        refreshButton: '刷新推流信息'
      }
    },
    tutorial: {
      welcome: '欢迎使用抖音直播推流工具！',
      welcomeDesc: '让我来帮你快速上手这个工具',
      step1: '第一步：账号设置',
      step1Desc: '首先需要设置你的抖音账号信息，支持多种登录方式',
      step2: '第二步：直播设置',
      step2Desc: '设置直播标题、分类和互动功能',
      step3: '第三步：开始直播',
      step3Desc: '获取推流信息并开始直播',
      startButton: '开始教程',
      nextButton: '下一步',
      finishButton: '完成教程',
      tutorialStarted: '教程已开始',
      tutorialClosed: '教程已关闭',
      tutorialCompleted: '新手引导已完成',
      tutorialReset: '教程状态已重置，下次访问将显示教程'
    },
    actions: {
      help: '帮助',
      quickActions: '快捷操作',
      tutorial: '教程',
      resetTutorial: '重置教程',
      copyStreamInfo: '复制推流信息',
      exportInfo: '导出配置',
      refreshData: '刷新数据'
    },
    messages: {
      toolInitialized: '抖音直播推流工具已初始化',
      settingsLoaded: '设置已加载',
      categoriesLoaded: '分类数据已加载',
      logsLoaded: '日志已加载',
      settingsLoadFailed: '加载设置失败',
      categoriesLoadFailed: '加载分类失败',
      logsLoadFailed: '加载日志失败',
      cookiesLoaded: 'Cookies文件已加载',
      cookiesLoadFailed: 'Cookies文件加载失败',
      accountGetSuccess: '账号信息获取成功',
      accountGetFailed: '账号信息获取失败',
      titleUpdated: '直播标题已更新',
      titleUpdateFailed: '直播标题更新失败',
      categoryUpdated: '直播分类已更新',
      categoryUpdateFailed: '直播分类更新失败',
      commentSent: '评论已发送',
      commentSendFailed: '评论发送失败',
      liveStarted: '直播已开始',
      liveStartFailed: '直播开始失败',
      liveStopped: '直播已停止',
      liveStopFailed: '直播停止失败',
      streamInfoRefreshed: '推流信息已刷新',
      streamInfoRefreshFailed: '刷新推流信息失败',
      serverCopied: '已复制推流地址到剪贴板',
      codeCopied: '已复制推流密钥到剪贴板',
      infoExported: '推流信息已导出',
      noStreamInfo: '没有可导出的推流信息！',
      logsCleared: '日志已清空',
      logsExported: '日志已导出',
      streamInfoDisabled: '请先开始直播才能查看推流信息',
      shortcutTip: '💡 提示：按 Ctrl+K 打开快捷操作面板'
    },
    qrCode: {
      title: '扫码登录',
      tip: '请使用抖音APP扫描二维码登录',
      steps: {
        step1: '打开抖音APP',
        step2: '点击右上角"+"号',
        step3: '选择"扫一扫"',
        step4: '扫描上方二维码'
      }
    },
    help: {
      title: '使用说明',
      content: `【抖音直播推流工具使用说明】

1. 账号设置：
- 支持Cookies文件导入、自动扫码获取、手动输入三种方式。
- 建议优先使用自动扫码，安全便捷。

2. 直播设置：
- 可设置直播标题、分类、子分类。
- 支持一键发送评论、开始直播。

3. 推流信息：
- 获取推流地址和推流密钥。
- 支持一键复制和导出功能。

4. 常见问题：
- 若分类/子分类无法选择，请先刷新分类。
- 若推流信息获取失败，请检查Cookies或账号状态。

5. 技术支持：
如遇到无法解决的问题，请联系开发团队或查阅项目文档。`
    }
  },

  // 状态栏
  status: {
    ready: '就绪',
    loading: '加载中',
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息'
  },

  // 版权信息
  copyright: {
    text: '© 2025 Made by <a href="https://whucsgitlab.whu.edu.cn/2025se-deepsleep" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.9); text-decoration: underline; transition: color 0.3s ease;">DeepSleep</a>. All rights reserved.'
  },

  mainPage: {
    voiceLibTitle: '声音库选择',
    voiceLibDesc: '选择已训练好的声音模型或上传声音模型文件',
    uploadVoiceModel: '上传声音模型文件:',
    supportedFormat: '支持格式：GPT模型(.ckpt) 和 SoVITS模型(.pth)',
    selectedFiles: '已选择的文件',
    applyVoiceModel: '应用声音模型',
    trainNewVoice: '训练新声音',
    trainNewVoiceDesc: '上传声音样本以训练新的声音模型',
    uploadVoiceSample: '上传声音样本文件 (MP3/WAV):',
    trainTip: '上传至少10分钟的清晰语音样本以获得最佳效果',
    voiceName: '声音名称:',
    voiceNamePlaceholder: '为你的声音模型命名',
    startTraining: '开始训练',
    advancedTrain: '高级语音模型训练设置',
    trainStatus: '训练状态:',
    notStarted: '未开始',
    live2dTitle: 'Live2D模型选择',
    live2dDesc: '选择Live2D模型',
    selectBaseModel: '选择基础模型:',
    uploadLive2dModel: '上传Live2D模型文件:',
    applyCustomModel: '应用自定义模型',
    advancedLive2dTrain: '高级Live2D模型训练设置',
    currentModel: '当前模型:',
    livePreviewTitle: '直播效果预览',
    status: '状态:',
    refreshing: '刷新中...',
    previewReady: '预览就绪',
    refreshPreview: '刷新预览',
    startLive: '开始直播',
    aiScriptTestTitle: 'AI讲稿生成测试',
    aiScriptTestDesc: '生成AI讲稿并在预览区域测试效果',
    scriptTopic: '讲稿主题:',
    inputScriptTopic: '输入讲稿主题',
    scriptStyle: '讲稿风格:',
    styleCasual: '轻松休闲',
    styleProfessional: '专业正式',
    styleCute: '可爱活泼',
    styleHumorous: '幽默诙谐',
    generating: '生成中...',
    generateScript: '生成讲稿',
    testScript: '测试讲稿',
    generatedScript: '生成的讲稿:',
    generatedScriptPlaceholder: '生成的AI讲稿将显示在这里...'
  },

  streamingPage: {
    topicAndOutline: '主题设置与提纲生成',
    inputLiveTopic: '请输入直播主题',
    generating: '生成中...',
    generateOutline: '生成提纲',
    inputOrEditOutline: '您也可以在此输入您设计的提纲',
    processing: '处理中...',
    confirmTopicAndOutline: '确认主题与提纲',
    addNewSection: '添加新章节'
  },

  setting: {
    title: '设置',
    debugTitle: '调试设置',
    resetAll: '重置所有偏好设置',
    debugMode: '调试模式',
    enabled: '已开启',
    disabled: '已关闭',
    bannerDefault: '默认',
    bannerRed: '红色',
    bannerBlue: '蓝色',
    bannerPurple: '紫色',
    bannerColor: 'TopBanner颜色',
    aiTitle: 'AI设置',
    provider: '模型提供商',
    providerCustom: '自定义',
    apiEndpoint: 'API端点URL',
    apiEndpointPlaceholder: 'https://api.soruxgpt.com/v1/chat/completions',
    apiKey: 'API 密钥',
    apiKeyPlaceholder: '输入API密钥',
    modelName: '模型名称',
    noModelFound: '没有找到匹配的模型',
    searchModel: '搜索模型',
    customModelName: '自定义模型名称',
    customModelNamePlaceholder: '输入自定义模型名称',
    liveTitle: '直播设置',
    resolution: '直播分辨率',
    resolution1080p: '1920×1080 (16:9)',
    fps: '直播帧率',
    bg: '直播背景',
    bgDefault: '默认',
    uploadBg: '上传背景',
    platform: '直播平台',
    platformBilibili: '哔哩哔哩',
    getStreamKey: '获取推流码',
    streamDomain: '推流地址',
    inputStreamDomain: '请输入推流地址',
    streamKey: '推流码',
    inputStreamKey: '请输入推流码',
    testConnection: '测试连接',
    saveSettings: '保存设置',
    ttsTitle: '语音转换设置',
    live2dTitle: 'Live 2D 设置',
    finish: '完成'
  },

  help: {
    title: 'StreamCream 使用指南',
    subtitle: 'AI直播助手的完整使用说明',
    quickStart: '快速开始',
    mainPageFeatures: '主页面功能',
    streamKeyPage: '推流码获取页面',
    settingsPage: '设置页面',
    streamingPage: '直播页面',
    faq: '常见问题',
    techSupport: '技术支持',
    back: '返回',
    
    // 快速开始步骤
    step1: {
      title: '登录系统',
      content: '打开StreamCream平台首页，点击右上角"登录"按钮。输入账号和密码后点击"登录"进入系统。如果没有账号，请先点击"注册"，填写邮箱、密码等信息完成注册。'
    },
    step2: {
      title: '配置设置',
      content: '进入"设置"页面，在"AI设置"区域选择模型提供商（如OpenAI、Claude等），填写API密钥。在"直播设置"区域选择直播平台（如B站），填写推流地址和推流码，设置分辨率、帧率等参数。可根据需要自定义Banner颜色、开启调试模式等。'
    },
    step3: {
      title: '声音库与Live2D模型选择',
      content: '在主页面"声音库选择"区域，选择或上传GPT/SoVITS模型和参考音频。在"Live2D模型"区域，选择或上传虚拟形象模型，实时预览效果。'
    },
    step4: {
      title: 'AI讲稿生成与测试',
      content: '在"AI讲稿生成"区域，输入讲稿主题，选择风格，点击"生成讲稿"。可在下方预览和测试AI生成的讲稿内容。'
    },
    step5: {
      title: '开始直播',
      content: '在主页面确认所有配置无误后，点击"开始直播"按钮。直播页面会显示Live2D形象、AI语音、讲稿管理等功能。可实时发送弹幕、与观众互动，随时停止直播。'
    },

    // 主页面功能
    voiceLibrary: {
      title: '声音库选择',
      modelSelection: '模型选择：从下拉菜单选择已训练好的GPT和SoVITS模型',
      referenceAudio: '参考音频：选择参考音频文件，用于语音合成',
      uploadModel: '上传模型：支持上传自定义的.ckpt和.pth模型文件',
      generateExample: '生成示例：点击"生成示例语音"测试当前模型效果'
    },
    live2dModel: {
      title: 'Live2D模型',
      modelSelection: '模型选择：选择不同的Live2D虚拟形象',
      customModel: '自定义模型：上传.model3.json格式的Live2D模型',
      realTimePreview: '实时预览：在右侧预览区域查看模型效果'
    },
    streamingConfig: {
      title: '直播配置',
      platformSelection: '平台选择：选择直播平台（B站、抖音等）',
      streamSettings: '推流设置：配置推流地址和推流码',
      resolutionSettings: '分辨率设置：选择直播分辨率和帧率',
      backgroundSettings: '背景设置：选择或上传直播背景'
    },
    aiScriptGeneration: {
      title: 'AI讲稿生成',
      topicInput: '主题输入：输入讲稿主题',
      styleSelection: '风格选择：选择讲稿风格（轻松、专业、可爱等）',
      generateScript: '生成讲稿：点击生成AI讲稿',
      testFunction: '测试功能：测试生成的讲稿效果'
    },

    // 推流码获取
    streamKeyProcess: {
      title: '推流码获取流程',
      accountSetup: '账号设置：进入"账号设置"页面，完成Cookies导入或扫码登录。',
      autoGet: '自动获取：切换到"直播设置"页面，系统会自动获取并显示你的B站推流码和推流服务器地址。',
      securityTip: '安全提示：推流码仅用于本次直播，请勿泄露给他人。',
      troubleshooting: '故障排查：如推流码获取失败，请检查账号状态或重新登录。'
    },

    // 设置页面
    debugSettings: {
      title: '调试设置',
      debugMode: '调试模式：开启/关闭调试模式',
      resetSettings: '重置设置：重置所有偏好设置',
      bannerColor: 'Banner颜色：自定义顶部横幅颜色'
    },
    aiSettings: {
      title: 'AI设置',
      modelProvider: '模型提供商：选择AI服务提供商（OpenAI、Claude等）',
      apiKey: 'API密钥：配置API访问密钥',
      modelName: '模型名称：选择具体的AI模型',
      customEndpoint: '自定义端点：配置自定义API端点'
    },
    liveSettings: {
      title: '直播设置',
      resolution: '分辨率：设置直播分辨率（1920x1080等）',
      fps: '帧率：设置直播帧率（30fps/60fps）',
      background: '背景：选择或上传直播背景',
      streamInfo: '推流信息：配置推流地址和推流码'
    },

    // 直播页面
    streamingFeatures: {
      title: '直播界面功能',
      live2dDisplay: 'Live2D显示：实时显示Live2D虚拟形象',
      voiceSynthesis: '语音合成：将文本转换为语音并同步嘴型',
      scriptManagement: '讲稿管理：管理和播放AI生成的讲稿',
      realTimeInteraction: '实时互动：支持实时语音输入和响应',
      streamControl: '推流控制：开始/停止直播推流'
    },

    // 常见问题
    faq1: {
      question: 'Q: 如何上传自定义声音模型？',
      answer: 'A: 在主页面"声音库选择"区域，点击"选择文件"按钮，选择.ckpt（GPT模型）或.pth（SoVITS模型）文件，然后点击"应用声音模型"。'
    },
    faq2: {
      question: 'Q: 如何配置推流信息？',
      answer: 'A: 在设置页面的"直播设置"区域，选择直播平台，然后输入推流地址和推流码。也可以点击"获取推流码"按钮获取。'
    },
    faq3: {
      question: 'Q: 如何生成AI讲稿？',
      answer: 'A: 在主页面"AI讲稿生成测试"区域，输入讲稿主题，选择风格，然后点击"生成讲稿"按钮。'
    },
    faq4: {
      question: 'Q: 如何切换Live2D模型？',
      answer: 'A: 在主页面"Live2D模型选择"区域，从下拉菜单选择不同的模型，或上传自定义的.model3.json文件。'
    },
    faq5: {
      question: 'Q: 如何配置AI模型？',
      answer: 'A: 在设置页面的"AI设置"区域，选择模型提供商，输入API密钥，选择具体的模型名称。'
    },

    // 技术支持
    supportInfo: {
      title: '如果您在使用过程中遇到问题，请：',
      checkNetwork: '检查网络连接是否正常',
      checkApiKey: '确认API密钥配置是否正确',
      checkConsole: '查看浏览器控制台的错误信息',
      restartServices: '重启相关后端服务'
    }
  },

  bilibili: {
    title: 'B站推流码获取工具',
    subtitle: '专业的B站直播推流码获取和管理工具',
    tabs: {
      account: {
        name: '账号设置',
        description: '账号登录与认证'
      },
      live: {
        name: '直播设置',
        description: '直播配置与管理'
      }
    },
    account: {
      title: '账号设置',
      cookiesFile: 'Cookies文件',
      useCookiesFile: '使用Cookies文件',
      autoGet: '自动获取',
      autoGetAccount: '自动获取账号信息',
      getting: '获取中...',
      gettingText: '获取中，请稍候...',
      manualInput: '手动输入',
      roomId: 'Room ID:',
      roomIdPlaceholder: '请输入房间ID',
      cookies: 'Cookies:',
      cookiesPlaceholder: '请输入Cookies字符串',
      csrfToken: 'CSRF Token:',
      csrfTokenPlaceholder: '请输入CSRF Token',
      saveSettings: '保存设置',
      viewHelp: '查看使用说明'
    },
    live: {
      title: '直播标题',
      titleInput: '请输入直播标题:',
      titlePlaceholder: '输入直播标题',
      updateTitle: '更新标题',
      defaultTitle: '我的B站直播',
      area: '直播分区',
      selectArea: '请选择分区',
      selectSubArea: '请选择子分区',
      updateArea: '更新分区',
      refreshArea: '刷新分区',
      sendBullet: '发送弹幕',
      bulletInput: '输入弹幕内容:',
      bulletPlaceholder: '输入弹幕内容',
      startLive: '开始直播',
      operationLog: '操作日志',
      noLogs: '暂无操作日志',
      config: '直播配置',
      rtmpUrl: '推流地址:',
      rtmpUrlPlaceholder: 'rtmp://live-push.bilivideo.com/live-bvc/...',
      streamKey: '推流密钥:',
      streamKeyPlaceholder: '请输入推流密钥',
      saveConfig: '保存配置',
      areas: {
        entertainment: '娱乐',
        game: '游戏',
        mobileGame: '手游',
        drawing: '绘画',
        radio: '电台',
        virtual: '虚拟主播',
        life: '生活',
        knowledge: '知识',
        tech: '科技',
        sports: '运动',
        fashion: '时尚',
        news: '资讯',
        food: '美食',
        animals: '动物圈',
        cars: '汽车',
        music: '音乐',
        dance: '舞蹈',
        kichiku: '鬼畜',
        fashion2: '时尚',
        entertainment2: '娱乐',
        movie: '电影',
        tv: '电视剧',
        documentary: '纪录片',
        anime: '番剧',
        chineseAnime: '国创',
        comic: '漫画',
        novel: '小说',
        original: '原创',
        wildTech: '野生技术协会',
        funScience: '趣味科普人文',
        speech: '演讲公开课',
        starSea: '星海',
        mechanical: '机械',
        cars2: '汽车',
        design: '设计创意',
        wildTech2: '野生技术协会',
        funScience2: '趣味科普人文',
        speech2: '演讲公开课',
        starSea2: '星海',
        mechanical2: '机械',
        cars3: '汽车',
        design2: '设计创意'
      }
    },
    status: {
      ready: '就绪',
      loading: '加载中',
      success: '成功',
      error: '错误'
    },
    qrCode: {
      title: '扫码登录',
      tip: '请使用B站APP扫描二维码登录'
    },
    help: {
      title: '使用说明',
      content: `【B站推流码获取工具使用说明】

1. 账号设置：
- 支持Cookies文件导入、自动扫码获取、手动输入三种方式。
- 建议优先使用自动扫码，安全便捷。

2. 直播设置：
- 可设置直播标题、分区、子分区。
- 支持一键发送弹幕、开始直播。

3. 推流信息：
- 获取推流地址和推流密钥。
- 支持一键复制和导出功能。

4. 常见问题：
- 若分区/子分区无法选择，请先刷新分区。
- 若推流信息获取失败，请检查Cookies或账号状态。

5. 技术支持：
如遇到无法解决的问题，请联系开发团队或查阅项目文档。`
    }
  },

} 