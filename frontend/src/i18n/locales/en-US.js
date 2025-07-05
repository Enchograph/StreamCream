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
    forgotPassword: 'Forgot Password',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    confirmPassword: 'Confirm Password',
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
    }
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
    uploadVoiceModel: 'Upload Voice Model File:',
    supportedFormat: 'Supported formats: GPT model (.ckpt) and SoVITS model (.pth)',
    selectedFiles: 'Selected Files',
    applyVoiceModel: 'Apply Voice Model',
    trainNewVoice: 'Train New Voice',
    trainNewVoiceDesc: 'Upload voice samples to train a new voice model',
    uploadVoiceSample: 'Upload Voice Sample File (MP3/WAV):',
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
    uploadLive2dModel: 'Upload Live2D Model File:',
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
  }
} 