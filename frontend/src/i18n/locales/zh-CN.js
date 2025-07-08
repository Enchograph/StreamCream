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

  // 抖音直播平台
  douyin: {
      title: '抖音直播推流工具',
      subtitle: '专业的抖音直播推流码获取和管理工具',
      // 导航操作
      actions: {
          help: '帮助',
          quickActions: '快捷操作',
          tutorial: '教程',
          resetTutorial: '重置教程'
      },
      // 标签页
      tabs: {
          account: {
              name: '账号设置',
              description: '配置账号信息'
          },
          live: {
              name: '直播设置',
              description: '配置直播参数'
          },
          stream: {
              name: '推流信息',
              description: '获取推流码'
          }
      },
      // 账号设置
      account: {
          title: '账号设置',
          subtitle: '配置您的抖音账号信息，支持多种登录方式',
          // Cookies文件导入
          cookiesImport: {
              title: 'Cookies文件导入',
              description: '从本地文件导入Cookies信息',
              selectFile: '选择文件'
          },
          // 自动获取
          autoGet: {
              title: '自动获取',
              description: '通过扫码自动获取账号信息',
              getting: '获取中...',
              startGet: '开始获取',
              gettingInfo: '正在获取账号信息...'
          },
          // 手动输入
          manualInput: {
              title: '手动输入',
              description: '如果您已有账号信息，可以直接输入',
              roomId: '房间ID',
              roomIdPlaceholder: '请输入房间ID',
              cookies: 'Cookies',
              cookiesPlaceholder: '请输入Cookies字符串',
              sessionId: 'Session ID',
              sessionIdPlaceholder: '请输入Session ID',
              saveSettings: '保存设置'
          }
      },
      // 直播设置
      live: {
          title: '直播设置',
          subtitle: '配置直播标题、分类和互动功能',
          // 直播标题
          titleSetting: {
              title: '直播标题',
              description: '设置您的直播标题',
              placeholder: '输入直播标题',
              updateTitle: '更新标题'
          },
          // 直播分类
          category: {
              title: '直播分类',
              description: '选择适合的直播分类',
              mainCategory: '主分类',
              selectCategory: '请选择分类',
              subCategory: '子分类',
              selectSubCategory: '请选择子分类',
              updateCategory: '更新分类',
              refreshCategories: '刷新分类'
          },
          // 评论发送
          comment: {
              title: '发送评论',
              description: '与观众互动',
              placeholder: '输入评论内容',
              sendComment: '发送评论'
          },
          // 开始直播
          startLive: {
              text: '开始直播'
          }
      },
      // 操作日志
      logs: {
          title: '操作日志',
          clear: '清空',
          export: '导出',
          empty: '暂无操作日志'
      },
      // 推流信息
      stream: {
          title: '推流信息',
          subtitle: '获取和管理您的直播推流信息',
          // 推流地址
          server: {
              title: '推流地址',
              copy: '复制',
              empty: '暂无推流地址'
          },
          // 推流密钥
          code: {
              title: '推流密钥',
              copy: '复制',
              empty: '暂无推流密钥'
          },
          // 导出选项
          export: {
              title: '导出选项',
              description: '将推流信息保存到本地',
              exportToDesktop: '导出到桌面',
              exportToFile: '导出到文件'
          },
          // 直播控制
          control: {
              title: '直播控制',
              description: '管理直播状态',
              stopLive: '停止直播',
              refreshStream: '刷新推流信息'
          }
      },
      // 状态栏
      status: {
          tutorial: '教程',
          reset: '重置'
      },
      // 二维码对话框
      qrDialog: {
          title: '扫码登录',
          tip: '请使用抖音APP扫描二维码登录',
          step1: '打开抖音APP',
          step2: '点击右上角"+"号',
          step3: '选择"扫一扫"',
          step4: '扫描上方二维码'
      },
      // 帮助对话框
      helpDialog: {
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
      },
      // 新手引导
      tutorial: {
          welcome: '欢迎使用抖音直播推流工具！',
          description: '让我来帮你快速上手这个工具',
          detail: '这个工具可以帮助你获取抖音直播的推流码，轻松开始直播。',
          step1_1: '首先，我们需要设置你的抖音账号信息。',
          step1_2: '你可以选择自动扫码登录，或者手动输入账号信息。',
          step2_1: '接下来，配置直播设置。',
          step2_2: '设置直播标题、选择分类，然后就可以开始直播了。',
          step3_1: '最后，获取推流信息。',
          step3_2: '开始直播后，你就可以看到推流地址和推流密钥了。',
          next: '下一步',
          finish: '完成教程',
          skip: '跳过教程'
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

  // 顶部横幅
  topBanner: {
      subtitle: 'AI直播助手',
      help: {
          text: '帮助',
          tooltip: '使用帮助'
      },
      settings: {
          text: '设置',
          tooltip: '系统设置'
      },
      logout: {
          text: '登出',
          tooltip: '退出登录',
          confirmTitle: '提示',
          confirmMessage: '确定要登出吗？',
          confirmButton: '确定',
          cancelButton: '取消',
          successMessage: '已成功登出！'
      }
  },

  // 直播页面
  streamingPage: {
      // 讲稿/大纲/AI解说相关
      liveEnded: '暂无直播',
      topicAndOutline: '主题设置与提纲生成',
      inputLiveTopic: '请输入直播主题',
      generating: '生成中...',
      generateOutline: '生成提纲',
      inputOrEditOutline: '您也可以在此输入您设计的提纲',
      processing: '处理中...',
      confirmTopicAndOutline: '确认主题与提纲',
      outlineManagement: '提纲管理',
      addNewSection: '添加新章节',
      generateOutlineFailed: '生成提纲失败，请重试',
      processOutlineFailed: '处理提纲失败，请重试',
      unnamedSection: '未命名章节',
      generateContentFailed: '生成章节内容失败，请重试',
      confirmDeleteSection: '确定要删除这个章节吗？',
      enterNewSectionTitle: '请输入新章节标题：',
      aiSystemPrompt: '你是一个专业的直播内容助手，擅长生成结构清晰、通俗易懂的内容。',
      generateOutlinePrompt: '为主题"{topic}"生成一个直播提纲，包含5-8个章节，每个章节用一个简短标题概括。格式：\n1. 章节一\n2. 章节二\n以此类推。',
      generateContentPrompt: '为直播主题"{topic}"的"{sectionTitle}"章节生成详细讲解内容。内容要通俗易懂，语气轻松自然，适合直播朗读。每个句子都要简短，便于字幕显示。',
      apiCallFailed: 'API调用失败: {status} {statusText}',
      invalidApiResponse: '无效的API响应格式',
      generatingContentFor: '正在生成内容：',
      contentGenerationComplete: '内容生成完成',
      regeneratingSectionContent: '正在重新生成章节内容：',
      index: '（索引：',
      sectionContentComplete: '章节"{title}"内容生成完成，共{count}句',
      sentencePlayed: '句子播放完成 - 章节: {blockIndex}, 句子: {sentenceIndex}',
      generateSectionContentError: '生成章节"{title}"内容出错：',
      preGenerateNextSectionError: '预生成下一个章节内容出错：',
      deleteAudioFilesFailed: '删除音频文件失败：',
      deleteAudioFilesError: '删除音频文件出错：',
      generateOutlineError: '生成提纲出错：',
      confirmOutlineError: '确认提纲出错：',
      generateContentError: '生成内容出错：',
      apiCallError: 'API调用出错：',
      addBlock: '添加新章',
      blockTitlePlaceholder: '输入章节标题',
      blockContentPlaceholder: '输入章节内容',
      removeBlock: '删除',
      dragHandle: '拖动排序',
      editBlock: '编辑',
      saveBlock: '保存',
      cancelEdit: '取消',
      broadcasting: '直播中',
      notStarted: '未开始',
      startBroadcast: '开始直播',
      pauseBroadcast: '暂停',
      endBroadcast: '直播结束',
      nextBlock: '下一章',
      nextSentence: '下一句',
      currentBlock: '当前章节',
      nextBlockTitle: '下一章节',
      currentSubtitle: '当前字幕',
      nextSubtitle: '下一字幕',
      blockEditPlaceholder: '编辑章节标题',
      blockEditSave: '保存',
      blockEditCancel: '取消',
      confirmRemoveBlock: '确定要删除此章节吗？',
      removeBlockSuccess: '章节已删除',
      removeBlockFailed: '删除章节失败',
      outlineConfirmSuccess: '提纲已确认',
      outlineConfirmFailed: '提纲确认失败',
      outlineGenerateFailed: '提纲生成失败',
      outlineEmpty: '提纲为空',
      outlineBlockEmpty: '章节标题为空',
      outlineBlockContentEmpty: '章节内容为空',
      outlineBlockEditSuccess: '章节标题已更新',
      outlineBlockEditFailed: '章节标题更新失败',
      outlineAddBlockSuccess: '新章节已添加',
      outlineAddBlockFailed: '添加章节失败',
      outlineDragSuccess: '章节顺序已更改',
      outlineDragFailed: '章节顺序更改失败',
      outlineSaveSuccess: '提纲已保存',
      outlineSaveFailed: '提纲保存失败',
      outlineLoadFailed: '提纲加载失败',
      outlineBlockLoadFailed: '章节加载失败',
      outlineBlockSaveFailed: '章节保存失败',
      outlineBlockRemoveFailed: '章节删除失败',
      outlineBlockAddFailed: '章节添加失败',
      outlineBlockEditCancel: '已取消编辑',
      outlineBlockEditSave: '已保存',
      outlineBlockEditFailed: '保存失败',
      liveManagement: '直播管理',
      nowExplaining: '当前解说：',
      nextToExplain: '下一个解说：',
      finished: '直播结束',
      // 推流相关 key（保留自动补全内容）
      startStream: '开始推流',
      stopStream: '停止推流',
      streamSettings: '推流设置',
      streamKey: '推流码',
      copyStreamKey: '复制推流码',
      copied: '已复制',
      streamUrl: '推流地址',
      selectPlatform: '选择平台',
      currentPlatform: '当前平台',
      streamStatus: '推流状态',
      streaming: '推流中',
      notStreaming: '未推流',
      startPreview: '开始预览',
      stopPreview: '停止预览',
      preview: '预览',
      bitrate: '码率',
      resolution: '分辨率',
      fps: '帧率',
      apply: '应用',
      reset: '重置',
      advancedSettings: '高级设置',
      selectStreamModel: '选择推流模型',
      selectAudioInput: '选择音频输入',
      selectVideoInput: '选择视频输入',
      streamTitle: '推流标题',
      streamDescription: '推流描述',
      saveSettings: '保存设置',
      saveSuccess: '保存成功',
      saveFailed: '保存失败',
      error: '发生错误',
      reconnect: '重新连接',
      connectionLost: '连接已断开',
      connecting: '正在连接',
      streamReady: '推流就绪',
      streamNotReady: '推流未就绪',
      pleaseSelect: '请选择',
      loading: '加载中...',
      noAvailableModel: '无可用模型',
      noAvailableAudio: '无可用音频',
      noAvailableVideo: '无可用视频',
      streamStartSuccess: '推流启动成功',
      streamStopSuccess: '推流已停止',
      streamStartFailed: '推流启动失败',
      streamStopFailed: '停止推流失败',
      confirmStopStream: '确定要停止推流吗？',
      yes: '是',
      no: '否',
      platformBilibili: '哔哩哔哩',
      platformDouyin: '抖音',
      platformKuaishou: '快手',
      platformOther: '其他',
      streamHealth: '推流健康度',
      good: '良好',
      bad: '异常',
      unknown: '未知',
      streamDelay: '推流延迟',
      ms: '毫秒',
      networkStatus: '网络状态',
      stable: '稳定',
      unstable: '不稳定',
      streamInfo: '推流信息',
      streamLog: '推流日志',
      clearLog: '清空日志',
      logCleared: '日志已清空',
      openStreamPanel: '打开推流面板',
      closeStreamPanel: '关闭推流面板',
      streamPanel: '推流面板',
      streamPreview: '推流预览',
      streamControl: '推流控制',
      streamMonitor: '推流监控',
      streamRecord: '推流录制',
      startRecord: '开始录制',
      stopRecord: '停止录制',
      recordSuccess: '录制成功',
      recordFailed: '录制失败',
      noRecord: '无录制',
      recordList: '录制列表',
      download: '下载',
      delete: '删除',
      confirmDeleteRecord: '确定要删除该录制吗？',
      deleteSuccess: '删除成功',
      deleteFailed: '删除失败',
      streamTips: '推流提示',
      streamHelp: '推流帮助',
      openHelp: '打开帮助',
      closeHelp: '关闭帮助',
      helpContent: '如需帮助，请参考文档或联系客服。',
      streamError: '推流错误',
      retry: '重试',
      streamReconnect: '推流重连',
      streamReconnectSuccess: '重连成功',
      streamReconnectFailed: '重连失败',
      streamEnd: '推流结束',
      streamStart: '推流开始',
      streamPaused: '推流已暂停',
      streamResumed: '推流已恢复',
      pause: '暂停',
      resume: '恢复',
      streamPausedByUser: '已由用户暂停',
      streamResumedByUser: '已由用户恢复',
      streamPausedByNetwork: '因网络问题暂停',
      streamResumedByNetwork: '网络恢复，推流已恢复',
      streamPausedByPlatform: '平台原因暂停',
      streamResumedByPlatform: '平台恢复，推流已恢复',
      streamPausedUnknown: '未知原因暂停',
      streamResumedUnknown: '未知原因恢复',
      streamStatusUnknown: '推流状态未知',
      streamStatusNormal: '推流正常',
      streamStatusError: '推流异常',
      streamStatusWarning: '推流警告',
      streamStatusInfo: '推流信息',
      streamStatusCritical: '推流严重',
      streamStatusOffline: '推流离线',
      streamStatusOnline: '推流在线',
      streamStatusConnecting: '推流连接中',
      streamStatusReconnecting: '推流重连中',
      streamStatusDisconnected: '推流已断开',
      streamStatusStopped: '推流已停止',
      streamStatusStarted: '推流已开始',
      streamStatusPaused: '推流已暂停',
      streamStatusResumed: '推流已恢复',
      streamStatusEnded: '推流已结束',
      streamStatusPending: '推流待开始',
      streamStatusPreparing: '推流准备中',
      streamStatusReady: '推流就绪',
      streamStatusNotReady: '推流未就绪',
      streamStatusUnknownError: '未知推流错误',
      streamStatusNetworkError: '网络推流错误',
      streamStatusPlatformError: '平台推流错误',
      streamStatusUserError: '用户操作错误',
      streamStatusOtherError: '其他错误',
      streamStatusSuccess: '推流成功',
      streamStatusFail: '推流失败',
      streamStatusRetry: '推流重试',
      streamStatusReconnect: '推流重连',
      streamStatusReconnectSuccess: '重连成功',
      streamStatusReconnectFail: '重连失败',
      streamStatusEnd: '推流结束',
      streamStatusStart: '推流开始',
      streamStatusPause: '推流暂停',
      streamStatusResume: '推流恢复',
      streamStatusStop: '推流停止',
      streamStatusRecord: '推流录制',
      streamStatusDownload: '推流下载',
      streamStatusDelete: '推流删除',
      streamStatusHelp: '推流帮助',
      streamStatusTips: '推流提示',
      streamStatusLog: '推流日志',
      streamStatusPanel: '推流面板',
      streamStatusPreview: '推流预览',
      streamStatusControl: '推流控制',
      streamStatusMonitor: '推流监控',
      streamStatusRecordList: '录制列表',
      streamStatusNoRecord: '无录制',
      streamStatusRecordSuccess: '录制成功',
      streamStatusRecordFail: '录制失败',
      streamStatusRecordDelete: '录制删除',
      streamStatusRecordDownload: '录制下载',
      streamStatusRecordHelp: '录制帮助',
      streamStatusRecordTips: '录制提示',
      streamStatusRecordLog: '录制日志',
      streamStatusRecordPanel: '录制面板',
      streamStatusRecordPreview: '录制预览',
      streamStatusRecordControl: '录制控制',
      streamStatusRecordMonitor: '录制监控',
      streamStatusRecordListPanel: '录制列表面板',
      streamStatusRecordListNoRecord: '无录制',
      streamStatusRecordListSuccess: '录制列表成功',
      streamStatusRecordListFail: '录制列表失败',
      streamStatusRecordListDelete: '录制列表删除',
      streamStatusRecordListDownload: '录制列表下载',
      streamStatusRecordListHelp: '录制列表帮助',
      streamStatusRecordListTips: '录制列表提示',
      streamStatusRecordListLog: '录制列表日志',
      streamStatusRecordListPanelTitle: '录制列表面板标题',
      streamStatusRecordListPanelContent: '录制列表面板内容',
      streamStatusRecordListPanelHelp: '录制列表面板帮助',
      streamStatusRecordListPanelTips: '录制列表面板提示',
      streamStatusRecordListPanelLog: '录制列表面板日志',
      streamStatusRecordListPanelPreview: '录制列表面板预览',
      streamStatusRecordListPanelControl: '录制列表面板控制',
      streamStatusRecordListPanelMonitor: '录制列表面板监控',
      streamStatusRecordListPanelNoRecord: '录制列表面板无录制',
      streamStatusRecordListPanelSuccess: '录制列表面板成功',
      streamStatusRecordListPanelFail: '录制列表面板失败',
      streamStatusRecordListPanelDelete: '录制列表面板删除',
      streamStatusRecordListPanelDownload: '录制列表面板下载',
      streamStatusRecordListPanelHelpTitle: '录制列表面板帮助标题',
      streamStatusRecordListPanelHelpContent: '录制列表面板帮助内容',
      streamStatusRecordListPanelHelpTips: '录制列表面板帮助提示',
      streamStatusRecordListPanelHelpLog: '录制列表面板帮助日志',
      streamStatusRecordListPanelHelpPreview: '录制列表面板帮助预览',
      streamStatusRecordListPanelHelpControl: '录制列表面板帮助控制',
      streamStatusRecordListPanelHelpMonitor: '录制列表面板帮助监控',
      streamStatusRecordListPanelHelpNoRecord: '录制列表面板帮助无录制',
      streamStatusRecordListPanelHelpSuccess: '录制列表面板帮助成功',
      streamStatusRecordListPanelHelpFail: '录制列表面板帮助失败',
      streamStatusRecordListPanelHelpDelete: '录制列表面板帮助删除',
      streamStatusRecordListPanelHelpDownload: '录制列表面板帮助下载',
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
      generatedScriptPlaceholder: '生成的AI讲稿将显示在这里...',
      customModelFeatureDev: '自定义模型功能开发中...',
      gptModel: 'GPT模型',
      sovitsModel: 'SoVITS模型',
      uploadedVoiceModels: '上传的声音模型文件:',
      selectModelFileWarning: '请先选择模型文件',
      voiceModelUploadFeatureDev: '声音模型上传功能开发中...',
      preparingApplyVoiceModel: '准备应用的声音模型:',
      applyVoiceModelFailed: '应用声音模型失败',
      unknownModel: '未知模型',
      configureApiKeyWarning: '请先配置API Key',
      apiRequestFailed: 'API请求失败: ',
      generateSpeechFailed: '生成讲稿失败，请重试',
      generateSpeechFirstWarning: '请先生成讲稿',
      speechTestFeatureDev: '讲稿测试功能将在后续实现',
      modelChanged: '选中的模型已更改为:',
      live2dModelSwitched: 'Live2D模型已切换为:',
      refreshInProgress: '刷新操作正在进行中，请稍候...',
      live2dPreviewRefreshed: 'Live2D预览已刷新',
      refreshPreviewFailed: '刷新预览失败:',
      openaiApiError: '调用OpenAI API出错:',
      generateSpeechError: '生成讲稿出错:',
      live2dIframeNotFound: '未找到Live2D预览iframe',
  },

  setting: {
      title: '设置',
      languageTitle: '语言设置',
      themeTitle: '系统偏好设置',
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
      finish: '完成',
      bannerLayout: '导航栏布局',
      topBannerLayout: '导航栏布局',
      bannerDisperse: '分散',
      bannerGather: '聚合',
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

  live2dDemo: {
      title: 'pixi-Live2D-display 演示',
      live2dComponent: 'Live2D 模型组件',
      mouthButton: '嘴型变换',
      randomMotionButton: '随机动作',
      expressionLabel: '表情',
      canvas: '画布',
      selectExpression: '选择表情',
      // Technical/Live2D terms
      F01: '表情1',
      F02: '表情2',
      F03: '表情3',
      F04: '表情4',
      F05: '表情5',
      F06: '表情6',
      F07: '表情7',
      F08: '表情8',
      // Demo help
      help: '点击按钮体验 Live2D 模型的嘴型变换和随机动作。'
  },

  // 其他直播平台
  twitch: {
      title: 'Twitch直播平台页面',
      subtitle: '专业的Twitch直播推流码获取和管理工具',
      comingSoon: '即将推出',
      description: 'Twitch直播平台功能正在开发中，敬请期待',
      streamKeyGuide: {
          title: '如何获取 Twitch 直播推流码',
          description: '按照以下步骤获取你的 Twitch 推流码（Stream Key）：',
          steps: {
              step1: '登录 {twitch}，进入你的账号。',
              step2: '点击右上角头像，选择<strong>"创作者控制台"</strong>（Creator Dashboard）。',
              step3: '在左侧菜单依次点击 <strong>"设置"</strong> &gt; <strong>"流"</strong>（Settings &gt; Stream）。',
              step4: '在"流密钥和首选项"部分，找到<strong>"主流密钥"</strong>（Primary Stream Key），点击"显示"按钮查看完整推流码。',
              step5: '点击"复制"按钮，将推流码粘贴到相应位置即可开始直播。'
          },
          warning: {
              title: '注意',
              content: '不要泄露你的推流码，否则他人可能会用你的账号直播！如有泄露可在页面重置推流码。'
          },
          tip: '获取推流码和推流地址后，选择直播平台为 "Twitch"，然后粘贴推流码和推流地址即可。'
      }
  },

  youtube: {
      title: 'YouTube直播平台页面',
      subtitle: '专业的YouTube直播推流码获取和管理工具',
      comingSoon: '即将推出',
      description: 'YouTube直播平台功能正在开发中，敬请期待',
      // YouTube推流码获取指南
      streamKeyGuide: {
          title: '如何获取 YouTube 直播推流码',
          description: '以下是获取 YouTube 推流码（Stream Key）的步骤：',
          steps: {
              step1: '登录 {youtube}，点击右上角的摄像机图标，选择 "开始直播"。',
              step2: '如果是首次使用，可能需要验证账号（例如绑定手机号），并等待 24 小时激活直播功能。',
              step3: '在直播控制面板中，点击左侧菜单的"直播编码器"（或英文界面为 "Stream"）。',
              step4: '在"编码设置"下方，你可以看到以下两项：',
              step5: '点击"显示"按钮查看完整推流码，并复制它。你可以将它粘贴到推流软件（如 OBS）中进行直播。'
          },
          streamInfo: {
              streamUrl: '推流网址（Stream URL）',
              streamUrlExamplePrefix: '例如',
              streamKey: '推流码（Stream Key）',
              streamKeyExamplePrefix: '是一串随机生成的字符串，如',
              streamUrlExample: 'rtmp://a.rtmp.youtube.com/live2',
              streamKeyExample: 'abcd-efgh-ijkl-mnop'
          },
          warning: {
              title: '注意',
              content: '不要公开你的推流码，否则他人可能会用你的账号直播！'
          },
          tip: '获取推流码和推流地址后，选择直播平台为 "YouTube"，然后粘贴推流码和推流地址即可。'
      }
  },

  kuaishou: {
      title: '快手直播推流工具',
      subtitle: '专业的快手直播推流码获取和管理工具',
      // 导航操作
      actions: {
          help: '帮助',
          quickActions: '快捷操作',
          tutorial: '教程',
          resetTutorial: '重置教程'
      },
      // 标签页
      tabs: {
          account: {
              name: '账号设置',
              description: '配置账号信息'
          },
          live: {
              name: '直播设置',
              description: '配置直播参数'
          },
          stream: {
              name: '推流信息',
              description: '获取推流码'
          }
      },
      // 账号设置
      account: {
          title: '账号设置',
          subtitle: '配置您的快手账号信息，支持多种登录方式',
          // Cookies文件导入
          cookiesImport: {
              title: 'Cookies文件导入',
              description: '从本地文件导入Cookies信息',
              selectFile: '选择文件'
          },
          // 自动获取
          autoGet: {
              title: '自动获取',
              description: '通过扫码自动获取账号信息',
              getting: '获取中...',
              startGet: '开始获取',
              gettingInfo: '正在获取账号信息...'
          },
          // 手动输入
          manualInput: {
              title: '手动输入',
              description: '如果您已有账号信息，可以直接输入',
              roomId: '房间ID',
              roomIdPlaceholder: '请输入房间ID',
              cookies: 'Cookies',
              cookiesPlaceholder: '请输入Cookies字符串',
              sessionId: 'Session ID',
              sessionIdPlaceholder: '请输入Session ID',
              saveSettings: '保存设置'
          }
      },
      // 直播设置
      live: {
          title: '直播设置',
          subtitle: '配置直播标题、分类和互动功能',
          // 直播标题
          titleSetting: {
              title: '直播标题',
              description: '设置您的直播标题',
              placeholder: '输入直播标题',
              updateTitle: '更新标题'
          },
          // 直播分类
          category: {
              title: '直播分类',
              description: '选择适合的直播分类',
              mainCategory: '主分类',
              selectCategory: '请选择分类',
              subCategory: '子分类',
              selectSubCategory: '请选择子分类',
              updateCategory: '更新分类',
              refreshCategories: '刷新分类'
          },
          // 评论发送
          comment: {
              title: '发送评论',
              description: '与观众互动',
              placeholder: '输入评论内容',
              sendComment: '发送评论'
          },
          // 开始直播
          startLive: {
              text: '开始直播'
          }
      },
      // 操作日志
      logs: {
          title: '操作日志',
          clear: '清空',
          export: '导出',
          empty: '暂无操作日志'
      },
      // 推流信息
      stream: {
          title: '推流信息',
          subtitle: '获取和管理您的直播推流信息',
          // 推流地址
          server: {
              title: '推流地址',
              copy: '复制',
              empty: '暂无推流地址'
          },
          // 推流密钥
          code: {
              title: '推流密钥',
              copy: '复制',
              empty: '暂无推流密钥'
          },
          // 导出选项
          export: {
              title: '导出选项',
              description: '将推流信息保存到本地',
              exportToDesktop: '导出到桌面',
              exportToFile: '导出到文件'
          },
          // 直播控制
          control: {
              title: '直播控制',
              description: '管理直播状态',
              stopLive: '停止直播',
              refreshStream: '刷新推流信息'
          }
      },
      // 状态栏
      status: {
          tutorial: '教程',
          reset: '重置'
      },
      // 二维码对话框
      qrDialog: {
          title: '扫码登录',
          tip: '请使用快手APP扫描二维码登录',
          step1: '打开快手APP',
          step2: '点击右上角"+"号',
          step3: '选择"扫一扫"',
          step4: '扫描上方二维码'
      },
      // 帮助对话框
      helpDialog: {
          title: '使用说明',
          content: `【快手直播推流工具使用说明】

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
      },
      // 新手引导
      tutorial: {
          welcome: '欢迎使用快手直播推流工具！',
          description: '让我来帮你快速上手这个工具'
      }
  },

  // 平台名称
  platforms: {
      bilibili: '哔哩哔哩',
      douyin: '抖音',
      kuaishou: '快手',
      huya: '虎牙',
      douyu: '斗鱼',
      yy: 'YY直播',
      twitch: 'Twitch',
      youtube: 'YouTube',
      xiaohongshu: '小红书'
  },

  // AI模型提供商
  aiProviders: {
      siliconFlow: '硅基流动',
      volcengine: '火山方舟',
      tencentCloud: '腾讯云',
      other: '其他'
  },

  // AI模型名称
  aiModels: {
      deepseekV3: 'DeepSeek V3',
      grok3: 'Grok-3',
      deepseekR1: 'DeepSeek R1',
      deepseekR10528: 'DeepSeek R1 0528',
      deepseekReasonerAll: 'DeepSeek Reasoner All',
      grok3DeepSearch: 'Grok-3 DeepSearch',
      grok3Reasoning: 'Grok-3 Reasoning',
      mjChat: 'MJ Chat',
      netDeepseekR1: 'Net DeepSeek R1',
      o1: 'O1',
      o1Mini: 'O1 Mini',
      o3: 'O3',
      o3All: 'O3 All',
      textEmbeddingAda002: 'Text Embedding Ada 002'
  },

  // 系统消息
  messages: {
      settingsSaved: '设置完成',
      settingsReset: '所有偏好设置已重置',
      settingsResetFailed: '重置失败',
      backgroundUploadFailed: '上传背景失败',
      liveSettingsSaved: '直播设置已保存！',
      liveSettingsSaveFailed: '直播设置保存失败',
      aiSettingsSaved: 'AI设置已保存！',
      aiSettingsSaveFailed: 'AI设置保存失败',
      cookiesLoaded: '成功加载Cookies文件',
      cookiesLoadFailed: '加载Cookies文件失败',
      qrCodeFailed: '获取二维码失败',
      accountGetSuccess: '账号信息获取成功',
      accountGetFailed: '获取账号信息失败',
      fillAllFields: '请填写所有账号信息字段',
      accountSaveSuccess: '账号信息保存成功',
      accountSaveFailed: '保存账号信息失败',
      areasLoadFailed: '加载分区数据失败',
      gettingAreas: '正在获取直播分区...',
      areasGetSuccess: '直播分区获取成功',
      areasGetFailed: '获取直播分区失败',
      fillLiveTitle: '请填写直播标题',
      updatingTitle: '正在更新直播标题...',
      titleUpdated: '直播标题已更新',
      titleUpdateFailed: '更新直播标题失败',
      selectArea: '请选择直播分区',
      updatingArea: '正在更新直播分区...',
      areaUpdated: '直播分区已更新',
      areaUpdateFailed: '更新直播分区失败',
      inputBullet: '请输入弹幕内容',
      bulletSent: '弹幕发送成功',
      bulletSendFailed: '发送弹幕失败',
      setLiveTitle: '请设置直播标题',
      selectLiveArea: '请选择直播分区',
      liveInProgress: '正在进行直播！',
      startingLive: '正在开始直播...',
      liveStarted: '直播已开启！请使用推流码进行直播',
      startLiveFailed: '开始直播失败',
      noLiveInProgress: '没有正在进行的直播！',
      stoppingLive: '正在停止直播...',
      liveStopped: '直播已停止！',
      stopLiveFailed: '停止直播失败',
      serverCopied: '已复制服务器地址到剪贴板',
      streamKeyCopied: '已复制推流码到剪贴板',
      noStreamInfo: '没有可导出的推流信息！',
      streamInfoExported: '推流信息已导出到',
      settingsLoadFailed: '加载设置失败',
      logsLoadFailed: '加载日志失败'
  },

  // Live2DViewer 组件
  live2dViewer: {
      controlPanel: '控制面板',
      expressions: '表情',
      motions: '动作',
      motionLabel: '动作',
      loadingModel: '加载模型中...',
      modelLoadSuccess: '模型加载成功！',
      modelLoadFailed: '加载模型失败，请检查模型文件是否正确',
      expressionPlayFailed: '播放表情失败',
      motionPlayFailed: '播放动作失败'
  },

  // ModelSelector 组件
  modelSelector: {
      switchModel: '切换模型',
      referenceAudio: '参考音频',
      currentAudio: '（当前）',
      switchReferenceAudio: '切换参考音频',
      currentModelPair: '当前模型pair：',
      currentRefAudio: '当前参考音频：',
      none: '无',
      generateSampleVoice: '生成示例语音',
      generatingSample: '正在生成示例语音...',
      switchAudioSuccess: '参考音频切换成功！',
      selectModel: '请选择模型',
      switchModelSuccess: '模型切换成功！',
      generateSampleFailed: '生成示例语音失败',
      sampleText: '你好，这是一条示例语音,早上好，中午好，下午好。'
  },

  // streamConfig 组件
  streamConfig: {
      title: '直播平台选择与推流码',
      subtitle: '选择直播平台并输入推流码',
      selectPlatform: '选择直播平台',
      streamUrl: '推流地址:',
      streamUrlPlaceholder: '输入推流地址',
      streamKey: '推流码:',
      streamKeyPlaceholder: '输入推流码',
      testConnection: '测试连接',
      getStreamKeyTool: '获取推流码工具',
      stopLive: '停止直播',
      // 平台工具名称
      platformTools: {
          bilibili: 'B站推流码获取工具',
          douyin: '抖音推流码获取工具',
          xiaohongshu: '小红书推流码获取工具',
          kuaishou: '快手推流码获取工具',
          youtube: 'YouTube推流码获取工具',
          twitch: 'Twitch推流码获取工具'
      },
      // 默认推流地址
      defaultUrls: {
          bilibili: 'rtmp://live-push.bilivideo.com/live-bvc/',
          douyin: 'rtmp://push-rtmp-13.douyincdn.com/third/',
          xiaohongshu: 'rtmp://live-push.xhscdn.com/live/',
          kuaishou: 'rtmp://aliyun-open-push.voip.yximgs.com/gifshow/'
      },
      // 错误消息
      errors: {
          userCancelled: '用户取消了采集或浏览器不支持',
          websocketFailed: 'WebSocket 连接失败',
          routeNotFound: '未找到对应平台的路由'
      }
  },

  // LanguageSwitcher 组件
  languageSwitcher: {
      chinese: '中文',
      english: 'English',
      currentLang: '中',
      currentLangEn: 'En',
      selectLanguage: '选择语言'
  },

  // 通用文件操作
  fileOperations: {
      chooseFile: '选择文件',
      noFileSelected: '未选择文件',
      selectFiles: '选择文件',
      dragAndDrop: '拖拽文件到此处或点击选择',
      fileSelected: '已选择文件',
      filesSelected: '已选择文件'
  },

  // 通用输入提示
  inputPlaceholders: {
      keywords: '输入关键词，如：赛博朋克2077,补丁,更新',
      keywordsSeparator: '用逗号分隔'
  },

  trainPage: {
      title: 'GPT-SoVITS 训练工具',
      subtitle: '专业的语音合成模型训练和管理平台',
      baseConfig: '基础配置',
      expName: '实验/模型名',
      expNamePlaceholder: '请输入实验名称',
      gpuInfo: '显卡信息',
      gpuInfoPlaceholder: '0 CPU',
      versionSelect: '版本选择',
      v1: 'v1',
      v2: 'v2',
      sovitsGPath: '预训练的SoVITS-G模型路径',
      sovitsDPath: '预训练的SoVITS-D模型路径',
      gptPath: '预训练的GPT模型路径',
      pathInput: '路径填入',
      tab1A: '1A-训练集格式化工具',
      tab1B: '1B-微调训练',
      tab1C: '1C-推理测试',
      tipLog: '输出log到实验目录下，目录下应有23456开头的文件和文件夹',
      textLabelFile: '*文本标注文件',
      audioDir: '*训练集音频文件目录',
      textContent: '文本内容处理',
      textGpuIds: 'GPU卡号,以，分割，每个卡号对应一个进程',
      textGpuIdsPlaceholder: '0-0',
      bertPath: '预训练的中文BERT模型路径',
      startTextExtract: '开启文本获取',
      textProcessInfo: '文本进程输出信息',
      sslExtract: '1Ab-SSL自监督特征提取',
      sslGpuIds: 'GPU卡号，以，分割，每个卡号对应一个进程',
      sslGpuIdsPlaceholder: '0-0',
      sslModelPath: '预训练的SSL模型路径',
      startSslExtract: '开启SSL提取',
      sslProcessInfo: 'SSL进程输出信息',
      tokenExtract: '1Ac-语义token提取',
      tokenGpuIds: 'GPU卡号，以，分割，每个卡号对应一个进程',
      tokenGpuIdsPlaceholder: '0-0',
      tokenModelPath: '预训练的SoVITS-G模型路径',
      startTokenExtract: '开启token提取',
      tokenProcessInfo: 'token进程输出信息',
      chooseFile: '选择文件',
      pathInputBtn: '路径填入',
  },

  xiaohongshu: {
      title: "小红书直播",
      subtitle: "一站式小红书直播推流管理",
      tabs: {
          account: { name: "账号设置", description: "账号登录与认证" },
          live: { name: "直播设置", description: "直播配置与管理" }
      },
      account: {
          manualInput: "手动输入账号信息",
          userId: "用户ID",
          userIdPlaceholder: "请输入小红书用户ID",
          token: "Token",
          tokenPlaceholder: "请输入Token",
          saveSettings: "保存设置",
          viewHelp: "查看帮助"
      },
      live: {
          title: "直播设置",
          titleInput: "直播标题",
          titlePlaceholder: "请输入直播标题",
          updateTitle: "更新标题",
          streamKey: "推流码",
          getStreamKey: "获取推流码",
          sendBullet: "发送弹幕",
          bulletInput: "弹幕内容",
          bulletPlaceholder: "请输入弹幕内容",
          startLive: "开始直播",
          operationLog: "操作日志",
          noLogs: "暂无日志"
      },
      help: {
          title: "帮助文档"
      }
  }
}