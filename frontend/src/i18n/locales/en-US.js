export default {
  // Common
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    refresh: 'Refresh',
    export: 'Export',
    import: 'Import',
    copy: 'Copy',
    paste: 'Paste',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
    start: 'Start',
    stop: 'Stop',
    reset: 'Reset',
    clear: 'Clear',
    help: 'Help',
    about: 'About',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    submit: 'Submit',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
    yes: 'Yes',
    no: 'No',
    ok: 'OK'
  },

  // Navigation
  nav: {
    home: 'Home',
    dashboard: 'Dashboard',
    streaming: 'Streaming',
    settings: 'Settings',
    help: 'Help',
    about: 'About Us'
  },

  // Login page
  login: {
    title: 'Welcome to StreamCream',
    subtitle: 'Professional Live Streaming Code Management Platform',
    login: 'Login',
    register: 'Register',

    username: 'Username',
    password: 'Password',
    email: 'Email',

    verificationCode: 'Verification Code',
    resendCode: 'Resend',
    loginSuccess: 'Login successful!',
    registerSuccess: 'Registration successful!',
    loginFailed: 'Login failed',
    registerFailed: 'Registration failed',
    emailSent: 'Verification code sent, please check your email!',
    verificationSuccess: 'Verification successful!',
    verificationFailed: 'Verification failed',
    passwordResetSuccess: 'Password reset successful!',
    passwordResetFailed: 'Password reset failed',
    invalidUsername: 'Please enter username',
    usernameTooShort: 'Username must be at least 3 characters',
    invalidEmail: 'Please enter a valid email address',
    invalidPassword: 'Password must be at least 6 characters',
    passwordTooWeak: 'Password too weak, please use a more complex password',
    passwordMismatch: 'Passwords do not match',
    invalidCode: 'Please enter verification code',
    codeLengthError: 'Verification code should be 6 digits',
    pleaseLogin: 'Please login first!!!',
    otherLoginMethods: 'Other login methods',
    socialLogin: {
      facebook: 'Facebook Login',
      google: 'Google Login',
      twitter: 'Twitter Login'
    },
    inputUsername: 'Enter username',
    inputPassword: 'Enter password',
    inputEmail: 'Enter email',
    confirmPassword: 'Confirm password',
    inputVerificationCode: 'Enter verification code',
    loggingIn: 'Logging in...',
    forgotPassword: 'Forgot password?',
    verifyEmail: 'Verify Email',
    sending: 'Sending...',
    sendVerificationCode: 'Send verification code',
    verifying: 'Verifying...',
    verifyCode: 'Verify code',
    inputNewPassword: 'Enter new password',
    confirmNewPassword: 'Confirm new password',
    resetting: 'Resetting...',
    resetPassword: 'Reset password',
    passwordStrength: {
      veryWeak: 'Very Weak',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      veryStrong: 'Very Strong'
    },
    serverError: 'Server error',
    resendSuccess: 'Verification code resent',
    sendFailed: 'Send failed'
  },

  // Douyin streaming page
  douyin: {
    title: 'Douyin Live Streaming Tool',
    subtitle: 'Professional Live Streaming Code Management Platform',
    tabs: {
      account: {
        name: 'Account Settings',
        description: 'Account Login & Authentication'
      },
      live: {
        name: 'Live Settings',
        description: 'Live Configuration & Management'
      },
      stream: {
        name: 'Stream Info',
        description: 'Stream Code Acquisition & Export'
      }
    },
    account: {
      title: 'Account Settings',
      subtitle: 'Configure your Douyin account information, supports multiple login methods',
      cookiesImport: {
        title: 'Cookies File Import',
        description: 'Import Cookies information from local file',
        button: 'Select File'
      },
      autoGet: {
        title: 'Auto Get',
        description: 'Automatically get account information via QR code',
        button: 'Start Get',
        loading: 'Getting...',
        loadingText: 'Getting account information...'
      },
      manualInput: {
        title: 'Manual Input',
        description: 'If you already have account information, you can input directly',
        roomId: 'Room ID',
        cookies: 'Cookies',
        sessionId: 'Session ID',
        saveButton: 'Save Settings'
      }
    },
    live: {
      title: 'Live Settings',
      subtitle: 'Configure live title, category and interaction features',
      titleSetting: {
        title: 'Live Title',
        description: 'Set your live title',
        placeholder: 'Enter live title',
        updateButton: 'Update Title'
      },
      categorySetting: {
        title: 'Live Category',
        description: 'Select appropriate live category',
        mainCategory: 'Main Category',
        subCategory: 'Sub Category',
        selectCategory: 'Please select category',
        selectSubCategory: 'Please select sub category',
        updateButton: 'Update Category',
        refreshButton: 'Refresh Categories'
      },
      comment: {
        title: 'Send Comment',
        description: 'Interact with audience',
        placeholder: 'Enter comment content',
        sendButton: 'Send Comment'
      },
      startLive: {
        button: 'Start Live'
      },
      logs: {
        title: 'Operation Logs',
        clearButton: 'Clear',
        exportButton: 'Export',
        noLogs: 'No operation logs'
      }
    },
    stream: {
      title: 'Stream Information',
      subtitle: 'Get and manage your live streaming information',
      server: 'Stream Server',
      code: 'Stream Key',
      noServer: 'No stream server available',
      noCode: 'No stream key available',
      copyButton: 'Copy',
      export: {
        title: 'Export Options',
        description: 'Save stream information to local',
        desktopButton: 'Export to Desktop',
        fileButton: 'Export to File'
      },
      control: {
        title: 'Live Control',
        description: 'Manage live status',
        stopButton: 'Stop Live',
        refreshButton: 'Refresh Stream Info'
      }
    },
    tutorial: {
      welcome: 'Welcome to Douyin Live Streaming Tool!',
      welcomeDesc: 'Let me help you get started quickly',
      step1: 'Step 1: Account Settings',
      step1Desc: 'First, set up your Douyin account information, supports multiple login methods',
      step2: 'Step 2: Live Settings',
      step2Desc: 'Set live title, category and interaction features',
      step3: 'Step 3: Start Live',
      step3Desc: 'Get stream information and start live',
      startButton: 'Start Tutorial',
      nextButton: 'Next',
      finishButton: 'Finish Tutorial',
      tutorialStarted: 'Tutorial started',
      tutorialClosed: 'Tutorial closed',
      tutorialCompleted: 'Tutorial completed',
      tutorialReset: 'Tutorial status reset, will show tutorial on next visit'
    },
    actions: {
      help: 'Help',
      quickActions: 'Quick Actions',
      tutorial: 'Tutorial',
      resetTutorial: 'Reset Tutorial',
      copyStreamInfo: 'Copy Stream Info',
      exportInfo: 'Export Config',
      refreshData: 'Refresh Data'
    },
    messages: {
      toolInitialized: 'Douyin live streaming tool initialized',
      settingsLoaded: 'Settings loaded',
      categoriesLoaded: 'Category data loaded',
      logsLoaded: 'Logs loaded',
      settingsLoadFailed: 'Failed to load settings',
      categoriesLoadFailed: 'Failed to load categories',
      logsLoadFailed: 'Failed to load logs',
      cookiesLoaded: 'Cookies file loaded',
      cookiesLoadFailed: 'Failed to load cookies file',
      accountGetSuccess: 'Account information obtained successfully',
      accountGetFailed: 'Failed to get account information',
      titleUpdated: 'Live title updated',
      titleUpdateFailed: 'Failed to update live title',
      categoryUpdated: 'Live category updated',
      categoryUpdateFailed: 'Failed to update live category',
      commentSent: 'Comment sent',
      commentSendFailed: 'Failed to send comment',
      liveStarted: 'Live started',
      liveStartFailed: 'Failed to start live',
      liveStopped: 'Live stopped',
      liveStopFailed: 'Failed to stop live',
      streamInfoRefreshed: 'Stream information refreshed',
      streamInfoRefreshFailed: 'Failed to refresh stream information',
      serverCopied: 'Stream server copied to clipboard',
      codeCopied: 'Stream key copied to clipboard',
      infoExported: 'Stream information exported',
      noStreamInfo: 'No stream information to export!',
      logsCleared: 'Logs cleared',
      logsExported: 'Logs exported',
      streamInfoDisabled: 'Please start live first to view stream information',
      shortcutTip: '💡 Tip: Press Ctrl+K to open quick actions panel'
    },
    qrCode: {
      title: 'QR Code Login',
      tip: 'Please use Douyin APP to scan QR code for login',
      steps: {
        step1: 'Open Douyin APP',
        step2: 'Click the "+" in the top right corner',
        step3: 'Select "Scan"',
        step4: 'Scan the QR code above'
      }
    },
    help: {
      title: 'User Guide',
      content: `【Douyin Live Streaming Tool User Guide】

1. Account Settings:
- Supports three methods: Cookies file import, auto QR code scan, manual input.
- Recommend using auto QR code scan first, safe and convenient.

2. Live Settings:
- Can set live title, category, sub-category.
- Supports one-click comment sending and live starting.

3. Stream Information:
- Get stream server and stream key.
- Supports one-click copy and export functions.

4. Common Issues:
- If category/sub-category cannot be selected, please refresh categories first.
- If stream information fails to get, please check Cookies or account status.

5. Technical Support:
If you encounter unsolvable problems, please contact the development team or refer to project documentation.`
    }
  },

  // Status bar
  status: {
    ready: 'Ready',
    loading: 'Loading',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info'
  },

  // Copyright
  copyright: {
    text: '© 2025 Made by <a href="https://whucsgitlab.whu.edu.cn/2025se-deepsleep" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.9); text-decoration: underline; transition: color 0.3s ease;">DeepSleep</a>. All rights reserved.'
  },

  mainPage: {
    voiceLibTitle: 'Voice Library Selection',
    voiceLibDesc: 'Select a trained voice model or upload a model file',
    uploadVoiceModel: 'Upload voice model file:',
    supportedFormat: 'Supported formats: GPT model (.ckpt) and SoVITS model (.pth)',
    selectedFiles: 'Selected Files',
    applyVoiceModel: 'Apply Voice Model',
    trainNewVoice: 'Train New Voice',
    trainNewVoiceDesc: 'Upload voice samples to train a new voice model',
    uploadVoiceSample: 'Upload voice sample file (MP3/WAV):',
    trainTip: 'Upload at least 10 minutes of clear voice samples for best results',
    voiceName: 'Voice Name:',
    voiceNamePlaceholder: 'Name your voice model',
    startTraining: 'Start Training',
    advancedTrain: 'Advanced Voice Model Training Settings',
    trainStatus: 'Training Status:',
    notStarted: 'Not Started',
    live2dTitle: 'Live2D Model Selection',
    live2dDesc: 'Select a Live2D model',
    selectBaseModel: 'Select Base Model:',
    uploadLive2dModel: 'Upload Live2D model file:',
    applyCustomModel: 'Apply Custom Model',
    advancedLive2dTrain: 'Advanced Live2D Model Training Settings',
    currentModel: 'Current Model:',
    livePreviewTitle: 'Live Preview',
    status: 'Status:',
    refreshing: 'Refreshing...',
    previewReady: 'Preview Ready',
    refreshPreview: 'Refresh Preview',
    startLive: 'Start Live',
    aiScriptTestTitle: 'AI Script Generation Test',
    aiScriptTestDesc: 'Generate AI scripts and test in the preview area',
    scriptTopic: 'Script Topic:',
    inputScriptTopic: 'Enter script topic',
    scriptStyle: 'Script Style:',
    styleCasual: 'Casual',
    styleProfessional: 'Professional',
    styleCute: 'Cute',
    styleHumorous: 'Humorous',
    generating: 'Generating...',
    generateScript: 'Generate Script',
    testScript: 'Test Script',
    generatedScript: 'Generated Script:',
    generatedScriptPlaceholder: 'The generated AI script will be displayed here...'
  },

  streamingPage: {
    topicAndOutline: 'Topic & Outline Generation',
    inputLiveTopic: 'Enter live topic',
    generating: 'Generating...',
    generateOutline: 'Generate Outline',
    inputOrEditOutline: 'You can also enter or edit your outline here',
    processing: 'Processing...',
    confirmTopicAndOutline: 'Confirm Topic & Outline',
    addNewSection: 'Add New Section'
  },

  setting: {
    title: 'Settings',
    debugTitle: 'Debug Settings',
    resetAll: 'Reset All Preferences',
    debugMode: 'Debug Mode',
    enabled: 'Enabled',
    disabled: 'Disabled',
    bannerDefault: 'Default',
    bannerRed: 'Red',
    bannerBlue: 'Blue',
    bannerPurple: 'Purple',
    bannerColor: 'TopBanner Color',
    aiTitle: 'AI Settings',
    provider: 'Model Provider',
    providerCustom: 'Custom',
    apiEndpoint: 'API Endpoint URL',
    apiEndpointPlaceholder: 'https://api.soruxgpt.com/v1/chat/completions',
    apiKey: 'API Key',
    apiKeyPlaceholder: 'Enter API Key',
    modelName: 'Model Name',
    noModelFound: 'No matching model found',
    searchModel: 'Search Model',
    customModelName: 'Custom Model Name',
    customModelNamePlaceholder: 'Enter custom model name',
    liveTitle: 'Live Settings',
    resolution: 'Live Resolution',
    resolution1080p: '1920×1080 (16:9)',
    fps: 'Live FPS',
    bg: 'Live Background',
    bgDefault: 'Default',
    uploadBg: 'Upload background',
    platform: 'Live Platform',
    platformBilibili: 'Bilibili',
    getStreamKey: 'Get Stream Key',
    streamDomain: 'Stream Domain',
    inputStreamDomain: 'Enter stream domain',
    streamKey: 'Stream Key',
    inputStreamKey: 'Enter stream key',
    testConnection: 'Test Connection',
    saveSettings: 'Save Settings',
    ttsTitle: 'TTS Settings',
    live2dTitle: 'Live 2D Settings',
    finish: 'Finish'
  },

  help: {
    title: 'StreamCream User Guide',
    subtitle: 'Complete guide for AI live streaming assistant',
    quickStart: 'Quick Start',
    mainPageFeatures: 'Main Page Features',
    streamKeyPage: 'Stream Key Page',
    settingsPage: 'Settings Page',
    streamingPage: 'Streaming Page',
    faq: 'FAQ',
    techSupport: 'Technical Support',
    back: 'Back',
    
    // Quick start steps
    step1: {
      title: 'Login System',
      content: 'Open the StreamCream platform homepage, click the "Login" button in the top right corner. Enter your username and password, then click "Login" to enter the system. If you don\'t have an account, please click "Register" first, fill in email, password and other information to complete registration.'
    },
    step2: {
      title: 'Configure Settings',
      content: 'Go to the "Settings" page, select model provider (such as OpenAI, Claude, etc.) in the "AI Settings" area, and fill in the API key. In the "Live Settings" area, select live platform (such as Bilibili), fill in stream address and stream key, set resolution, frame rate and other parameters. You can customize banner color, enable debug mode, etc. as needed.'
    },
    step3: {
      title: 'Voice Library and Live2D Model Selection',
      content: 'In the "Voice Library Selection" area on the main page, select or upload GPT/SoVITS models and reference audio. In the "Live2D Model" area, select or upload virtual avatar models and preview effects in real time.'
    },
    step4: {
      title: 'AI Script Generation and Testing',
      content: 'In the "AI Script Generation" area, enter the script topic, select style, and click "Generate Script". You can preview and test the AI-generated script content below.'
    },
    step5: {
      title: 'Start Live Streaming',
      content: 'On the main page, after confirming all configurations are correct, click the "Start Live" button. The live page will display Live2D avatar, AI voice, script management and other functions. You can send danmaku in real time, interact with viewers, and stop live streaming at any time.'
    },

    // Main page features
    voiceLibrary: {
      title: 'Voice Library Selection',
      modelSelection: 'Model Selection: Select trained GPT and SoVITS models from the dropdown menu',
      referenceAudio: 'Reference Audio: Select reference audio files for voice synthesis',
      uploadModel: 'Upload Model: Support uploading custom .ckpt and .pth model files',
      generateExample: 'Generate Example: Click "Generate Example Voice" to test current model effects'
    },
    live2dModel: {
      title: 'Live2D Model',
      modelSelection: 'Model Selection: Select different Live2D virtual avatars',
      customModel: 'Custom Model: Upload .model3.json format Live2D models',
      realTimePreview: 'Real-time Preview: View model effects in the preview area on the right'
    },
    streamingConfig: {
      title: 'Live Configuration',
      platformSelection: 'Platform Selection: Select live platform (Bilibili, Douyin, etc.)',
      streamSettings: 'Stream Settings: Configure stream address and stream key',
      resolutionSettings: 'Resolution Settings: Select live resolution and frame rate',
      backgroundSettings: 'Background Settings: Select or upload live background'
    },
    aiScriptGeneration: {
      title: 'AI Script Generation',
      topicInput: 'Topic Input: Enter script topic',
      styleSelection: 'Style Selection: Select script style (casual, professional, cute, etc.)',
      generateScript: 'Generate Script: Click to generate AI script',
      testFunction: 'Test Function: Test generated script effects'
    },

    // Stream key acquisition
    streamKeyProcess: {
      title: 'Stream Key Acquisition Process',
      accountSetup: 'Account Setup: Go to the "Account Settings" page, complete Cookies import or QR code login.',
      autoGet: 'Auto Get: Switch to the "Live Settings" page, the system will automatically get and display your Bilibili stream key and stream server address.',
      securityTip: 'Security Tip: Stream key is only used for this live stream, please do not leak it to others.',
      troubleshooting: 'Troubleshooting: If stream key acquisition fails, please check account status or login again.'
    },

    // Settings page
    debugSettings: {
      title: 'Debug Settings',
      debugMode: 'Debug Mode: Enable/disable debug mode',
      resetSettings: 'Reset Settings: Reset all preference settings',
      bannerColor: 'Banner Color: Customize top banner color'
    },
    aiSettings: {
      title: 'AI Settings',
      modelProvider: 'Model Provider: Select AI service provider (OpenAI, Claude, etc.)',
      apiKey: 'API Key: Configure API access key',
      modelName: 'Model Name: Select specific AI model',
      customEndpoint: 'Custom Endpoint: Configure custom API endpoint'
    },
    liveSettings: {
      title: 'Live Settings',
      resolution: 'Resolution: Set live resolution (1920x1080, etc.)',
      fps: 'FPS: Set live frame rate (30fps/60fps)',
      background: 'Background: Select or upload live background',
      streamInfo: 'Stream Info: Configure stream address and stream key'
    },

    // Live streaming page
    streamingFeatures: {
      title: 'Live Interface Features',
      live2dDisplay: 'Live2D Display: Real-time display of Live2D virtual avatar',
      voiceSynthesis: 'Voice Synthesis: Convert text to voice and sync lip movements',
      scriptManagement: 'Script Management: Manage and play AI-generated scripts',
      realTimeInteraction: 'Real-time Interaction: Support real-time voice input and response',
      streamControl: 'Stream Control: Start/stop live streaming'
    },

    // FAQ
    faq1: {
      question: 'Q: How to upload custom voice model?',
      answer: 'A: In the "Voice Library Selection" area on the main page, click the "Select File" button, select .ckpt (GPT model) or .pth (SoVITS model) file, then click "Apply Voice Model".'
    },
    faq2: {
      question: 'Q: How to configure stream information?',
      answer: 'A: In the "Live Settings" area of the settings page, select the live platform, then enter the stream address and stream key. You can also click the "Get Stream Key" button to get it.'
    },
    faq3: {
      question: 'Q: How to generate AI script?',
      answer: 'A: In the "AI Script Generation Test" area on the main page, enter the script topic, select style, then click the "Generate Script" button.'
    },
    faq4: {
      question: 'Q: How to switch Live2D model?',
      answer: 'A: In the "Live2D Model Selection" area on the main page, select different models from the dropdown menu, or upload custom .model3.json files.'
    },
    faq5: {
      question: 'Q: How to configure AI model?',
      answer: 'A: In the "AI Settings" area of the settings page, select model provider, enter API key, select specific model name.'
    },

    // Technical support
    supportInfo: {
      title: 'If you encounter problems during use, please:',
      checkNetwork: 'Check if network connection is normal',
      checkApiKey: 'Confirm if API key configuration is correct',
      checkConsole: 'Check error messages in browser console',
      restartServices: 'Restart related backend services'
    }
  },

  bilibili: {
    title: 'Bilibili Stream Key Tool',
    subtitle: 'Professional Bilibili live streaming key acquisition and management tool',
    tabs: {
      account: {
        name: 'Account Settings',
        description: 'Account login and authentication'
      },
      live: {
        name: 'Live Settings',
        description: 'Live configuration and management'
      }
    },
    account: {
      title: 'Account Settings',
      cookiesFile: 'Cookies File',
      useCookiesFile: 'Use Cookies File',
      autoGet: 'Auto Get',
      autoGetAccount: 'Auto Get Account Info',
      getting: 'Getting...',
      gettingText: 'Getting, please wait...',
      manualInput: 'Manual Input',
      roomId: 'Room ID:',
      roomIdPlaceholder: 'Enter room ID',
      cookies: 'Cookies:',
      cookiesPlaceholder: 'Enter cookies string',
      csrfToken: 'CSRF Token:',
      csrfTokenPlaceholder: 'Enter CSRF token',
      saveSettings: 'Save Settings',
      viewHelp: 'View Help'
    },
    live: {
      title: 'Live Title',
      titleInput: 'Enter live title:',
      titlePlaceholder: 'Enter live title',
      updateTitle: 'Update Title',
      defaultTitle: 'My Bilibili Live',
      area: 'Live Area',
      selectArea: 'Please select area',
      selectSubArea: 'Please select sub-area',
      updateArea: 'Update Area',
      refreshArea: 'Refresh Areas',
      sendBullet: 'Send Bullet',
      bulletInput: 'Enter bullet content:',
      bulletPlaceholder: 'Enter bullet content',
      startLive: 'Start Live',
      operationLog: 'Operation Log',
      noLogs: 'No operation logs',
      config: 'Live Configuration',
      rtmpUrl: 'RTMP URL:',
      rtmpUrlPlaceholder: 'rtmp://live-push.bilivideo.com/live-bvc/...',
      streamKey: 'Stream Key:',
      streamKeyPlaceholder: 'Enter stream key',
      saveConfig: 'Save Configuration',
      areas: {
        entertainment: 'Entertainment',
        game: 'Gaming',
        mobileGame: 'Mobile Gaming',
        drawing: 'Drawing',
        radio: 'Radio',
        virtual: 'Virtual Streamer',
        life: 'Lifestyle',
        knowledge: 'Knowledge',
        tech: 'Technology',
        sports: 'Sports',
        fashion: 'Fashion',
        news: 'News',
        food: 'Food',
        animals: 'Animals',
        cars: 'Cars',
        music: 'Music',
        dance: 'Dance',
        kichiku: 'Kichiku',
        fashion2: 'Fashion',
        entertainment2: 'Entertainment',
        movie: 'Movie',
        tv: 'TV Series',
        documentary: 'Documentary',
        anime: 'Anime',
        chineseAnime: 'Chinese Animation',
        comic: 'Comic',
        novel: 'Novel',
        original: 'Original',
        wildTech: 'Wild Tech Association',
        funScience: 'Fun Science & Humanities',
        speech: 'Speech & Public Course',
        starSea: 'Star Sea',
        mechanical: 'Mechanical',
        cars2: 'Cars',
        design: 'Design & Creativity',
        wildTech2: 'Wild Tech Association',
        funScience2: 'Fun Science & Humanities',
        speech2: 'Speech & Public Course',
        starSea2: 'Star Sea',
        mechanical2: 'Mechanical',
        cars3: 'Cars',
        design2: 'Design & Creativity'
      }
    },
    status: {
      ready: 'Ready',
      loading: 'Loading',
      success: 'Success',
      error: 'Error'
    },
    qrCode: {
      title: 'QR Code Login',
      tip: 'Please use Bilibili APP to scan QR code for login'
    },
    help: {
      title: 'User Guide',
      content: `【Bilibili Stream Key Tool User Guide】

1. Account Settings:
- Supports three methods: Cookies file import, auto QR code scan, manual input.
- Recommend using auto QR code scan first, safe and convenient.

2. Live Settings:
- Can set live title, partition, sub-partition.
- Supports one-click danmaku sending and live starting.

3. Stream Information:
- Get stream server and stream key.
- Supports one-click copy and export functions.

4. Common Issues:
- If partition/sub-partition cannot be selected, please refresh partitions first.
- If stream information fails to get, please check Cookies or account status.

5. Technical Support:
If you encounter unsolvable problems, please contact the development team or refer to project documentation.`
    }
  }
} 