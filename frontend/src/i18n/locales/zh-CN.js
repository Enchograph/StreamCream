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

} 