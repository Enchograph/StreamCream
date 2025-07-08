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
        about: 'About us'
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

        verificationCode: 'Verification code',
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
            facebook: 'Facebook login',
            google: 'Google login',
            twitter: 'Twitter login'
        },
        inputUsername: 'Enter username',
        inputPassword: 'Enter password',
        inputEmail: 'Enter email',
        confirmPassword: 'Confirm password',
        inputVerificationCode: 'Enter verification code',
        loggingIn: 'Logging in...',
        forgotPassword: 'Forgot password?',
        verifyEmail: 'Verify email',
        sending: 'Sending...',
        sendVerificationCode: 'Send verification code',
        verifying: 'Verifying...',
        verifyCode: 'Verify code',
        inputNewPassword: 'Enter new password',
        confirmNewPassword: 'Confirm new password',
        resetting: 'Resetting...',
        resetPassword: 'Reset password',
        passwordStrength: {
            veryWeak: 'Very weak',
            weak: 'Weak',
            medium: 'Medium',
            strong: 'Strong',
            veryStrong: 'Very strong'
        },
        serverError: 'Server error',
        resendSuccess: 'Verification code resent',
        sendFailed: 'Send failed'
    },

    // Douyin Live Streaming Platform
    douyin: {
        title: 'Douyin Live Streaming Tool',
        subtitle: 'Professional Douyin live streaming key acquisition and management tool',
        // Navigation actions
        actions: {
            help: 'Help',
            quickActions: 'Quick actions',
            tutorial: 'Tutorial',
            resetTutorial: 'Reset tutorial'
        },
        // Tabs
        tabs: {
            account: {
                name: 'Account Settings',
                description: 'Configure account information'
            },
            live: {
                name: 'Live Settings',
                description: 'Configure live parameters'
            },
            stream: {
                name: 'Stream Info',
                description: 'Get stream keys'
            }
        },
        // Account settings
        account: {
            title: 'Account Settings',
            subtitle: 'Configure your Douyin account information, supports multiple login methods',
            // Cookies file import
            cookiesImport: {
                title: 'Cookies File Import',
                description: 'Import Cookies information from local file',
                selectFile: 'Select file'
            },
            // Auto get
            autoGet: {
                title: 'Auto get',
                description: 'Automatically get account information through QR code scanning',
                getting: 'Getting...',
                startGet: 'Start get',
                gettingInfo: 'Getting account information...'
            },
            // Manual input
            manualInput: {
                title: 'Manual Input',
                description: 'If you already have account information, you can input directly',
                roomId: 'Room ID',
                roomIdPlaceholder: 'Please enter room ID',
                cookies: 'Cookies',
                cookiesPlaceholder: 'Please enter Cookies string',
                sessionId: 'Session ID',
                sessionIdPlaceholder: 'Please enter Session ID',
                saveSettings: 'Save Settings'
            }
        },
        // Live settings
        live: {
            title: 'Live Settings',
            subtitle: 'Configure live title, category and interaction features',
            // Live title
            titleSetting: {
                title: 'Live Title',
                description: 'Set your live title',
                placeholder: 'Enter live title',
                updateTitle: 'Update Title'
            },
            // Live category
            category: {
                title: 'Live Category',
                description: 'Choose appropriate live category',
                mainCategory: 'Main Category',
                selectCategory: 'Please select category',
                subCategory: 'Sub Category',
                selectSubCategory: 'Please select sub category',
                updateCategory: 'Update Category',
                refreshCategories: 'Refresh Categories'
            },
            // Comment sending
            comment: {
                title: 'Send Comment',
                description: 'Interact with audience',
                placeholder: 'Enter comment content',
                sendComment: 'Send Comment'
            },
            // Start live
            startLive: {
                text: 'Start Live'
            }
        },
        // Operation logs
        logs: {
            title: 'Operation Logs',
            clear: 'Clear',
            export: 'Export',
            empty: 'No operation logs'
        },
        // Stream information
        stream: {
            title: 'Stream Information',
            subtitle: 'Get and manage your live streaming information',
            // Stream server
            server: {
                title: 'Stream Server',
                copy: 'Copy',
                empty: 'No stream server'
            },
            // Stream code
            code: {
                title: 'Stream Code',
                copy: 'Copy',
                empty: 'No stream code'
            },
            // Export options
            export: {
                title: 'Export Options',
                description: 'Save stream information to local',
                exportToDesktop: 'Export to Desktop',
                exportToFile: 'Export to File'
            },
            // Live control
            control: {
                title: 'Live Control',
                description: 'Manage live status',
                stopLive: 'Stop Live',
                refreshStream: 'Refresh Stream Info'
            }
        },
        // Status bar
        status: {
            tutorial: 'Tutorial',
            reset: 'Reset'
        },
        // QR code dialog
        qrDialog: {
            title: 'QR Code Login',
            tip: 'Please use Douyin APP to scan QR code for login',
            step1: 'Open Douyin APP',
            step2: 'Click the "+" button in the top right',
            step3: 'Select "Scan QR Code"',
            step4: 'Scan the QR code above'
        },
        // Help dialog
        helpDialog: {
            title: 'Usage Instructions',
            content: `【Douyin Live Streaming Tool Usage Instructions】

1. Account Settings:
- Supports three methods: Cookies file import, automatic QR code scanning, and manual input.
- Recommend using automatic QR code scanning first, safe and convenient.

2. Live Settings:
- Can set live title, category, and sub-category.
- Supports one-click comment sending and live streaming.

3. Stream Information:
- Get stream server address and stream key.
- Supports one-click copy and export functions.

4. Common Issues:
- If category/sub-category cannot be selected, please refresh categories first.
- If stream information acquisition fails, please check Cookies or account status.

5. Technical Support:
If you encounter unsolvable problems, please contact the development team or refer to project documentation.`
        },
        // Tutorial
        tutorial: {
            welcome: 'Welcome to Douyin Live Streaming Tool!',
            description: 'Let me help you get started quickly with this tool',
            detail: 'This tool helps you obtain Douyin live stream keys and start streaming easily. You can import account info, set up your live, and get stream URLs in just a few steps.',
            step1_1: 'First, we need to set up your Douyin account information.',
            step1_2: 'You can choose QR code login or manually enter your account info.',
            step2_1: 'Next, configure your live settings.',
            step2_2: 'Set your live title, select a category, and you are ready to go live.',
            step3_1: 'Finally, get your stream information.',
            step3_2: 'After starting the live, you will see the stream URL and stream key.',
            next: 'Next',
            finish: 'Finish Tutorial',
            skip: 'Skip Tutorial'
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

    // Top Banner
    topBanner: {
        subtitle: 'AI Live Streaming Assistant',
        help: {
            text: 'Help',
            tooltip: 'Usage Help'
        },
        settings: {
            text: 'Settings',
            tooltip: 'System Settings'
        },
        logout: {
            text: 'Logout',
            tooltip: 'Exit Login',
            confirmTitle: 'Notice',
            confirmMessage: 'Are you sure you want to logout?',
            confirmButton: 'Confirm',
            cancelButton: 'Cancel',
            successMessage: 'Successfully logged out!'
        }
    },

    // Streaming Page
    streamingPage: {
        // Script/Outline/AI explanation related
        liveEnded: 'No Live',
        topicAndOutline: 'Topic Setting and Outline Generation',
        inputLiveTopic: 'Please enter live streaming topic',
        generating: 'Generating...',
        generateOutline: 'Generate Outline',
        inputOrEditOutline: 'You can also input your designed outline here',
        processing: 'Processing...',
        confirmTopicAndOutline: 'Confirm Topic and Outline',
        outlineManagement: 'Outline Management',
        addNewSection: 'Add New Section',
        generateOutlineFailed: 'Failed to generate outline, please try again',
        processOutlineFailed: 'Failed to process outline, please try again',
        unnamedSection: 'Unnamed Section',
        generateContentFailed: 'Failed to generate section content, please try again',
        confirmDeleteSection: 'Are you sure you want to delete this section?',
        enterNewSectionTitle: 'Please enter new section title:',
        aiSystemPrompt: 'You are a professional live streaming content assistant, skilled at generating clear and easy-to-understand content.',
        generateOutlinePrompt: 'Generate a live streaming outline for topic "{topic}" with 5-8 sections, each section summarized with a short title. Format: \n1. Section One\n2. Section Two\nAnd so on.',
        generateContentPrompt: 'Generate detailed explanation content for the "{sectionTitle}" section of live streaming topic "{topic}". Content should be easy to understand, natural in tone, suitable for live streaming reading. Each sentence should be short for subtitle display.',
        apiCallFailed: 'API call failed: {status} {statusText}',
        invalidApiResponse: 'Invalid API response format',
        generatingContentFor: 'Now generating content for',
        contentGenerationComplete: 'content generation complete',
        regeneratingSectionContent: 'Regenerating section content:',
        index: '(Index:',
        sectionContentComplete: 'Section "{title}" content generation complete, total {count} sentences',
        sentencePlayed: 'Sentence played - Section: {blockIndex}, Sentence: {sentenceIndex}',
        generateSectionContentError: 'Error generating section "{title}" content:',
        preGenerateNextSectionError: 'Error pre-generating next section content:',
        deleteAudioFilesFailed: 'Failed to delete audio files:',
        deleteAudioFilesError: 'Error deleting audio files:',
        generateOutlineError: 'Error generating outline:',
        confirmOutlineError: 'Error confirming outline:',
        generateContentError: 'Error generating content:',
        apiCallError: 'API call error:',
        addBlock: 'Add New Block',
        blockTitlePlaceholder: 'Enter block title',
        blockContentPlaceholder: 'Enter block content',
        removeBlock: 'Remove',
        dragHandle: 'Drag to reorder',
        editBlock: 'Edit',
        saveBlock: 'Save',
        cancelEdit: 'Cancel',
        broadcasting: 'Broadcasting',
        notStarted: 'Not Started',
        startBroadcast: 'Start Broadcast',
        pauseBroadcast: 'Pause',
        endBroadcast: 'End Broadcast',
        nextBlock: 'Next Block',
        nextSentence: 'Next Sentence',
        currentBlock: 'Current Block',
        nextBlockTitle: 'Next Block',
        currentSubtitle: 'Current Subtitle',
        nextSubtitle: 'Next Subtitle',
        blockEditPlaceholder: 'Edit block title',
        blockEditSave: 'Save',
        blockEditCancel: 'Cancel',
        confirmRemoveBlock: 'Are you sure you want to remove this block?',
        removeBlockSuccess: 'Block removed',
        removeBlockFailed: 'Failed to remove block',
        outlineConfirmSuccess: 'Outline confirmed',
        outlineConfirmFailed: 'Failed to confirm outline',
        outlineGenerateFailed: 'Failed to generate outline',
        outlineEmpty: 'Outline is empty',
        outlineBlockEmpty: 'Block title is empty',
        outlineBlockContentEmpty: 'Block content is empty',
        outlineBlockEditSuccess: 'Block title updated',
        outlineBlockEditFailed: 'Failed to update block title',
        outlineAddBlockSuccess: 'New block added',
        outlineAddBlockFailed: 'Failed to add block',
        outlineDragSuccess: 'Block order changed',
        outlineDragFailed: 'Failed to change block order',
        outlineSaveSuccess: 'Outline saved',
        outlineSaveFailed: 'Failed to save outline',
        outlineLoadFailed: 'Failed to load outline',
        outlineBlockLoadFailed: 'Failed to load block',
        outlineBlockSaveFailed: 'Failed to save block',
        outlineBlockRemoveFailed: 'Failed to remove block',
        outlineBlockAddFailed: 'Failed to add block',
        outlineBlockEditCancel: 'Edit cancelled',
        outlineBlockEditSave: 'Saved',
        outlineBlockEditFailed: 'Save failed',
        liveManagement: 'Live Management',
        nowExplaining: 'Now Explaining:',
        nextToExplain: 'Next to Explain:',
        finished: 'Broadcast Finished',
        // 推流相关 key（保留自动补全内容）
        startStream: 'Start Streaming',
        stopStream: 'Stop Streaming',
        streamSettings: 'Stream Settings',
        streamKey: 'Stream Key',
        copyStreamKey: 'Copy Stream Key',
        copied: 'Copied',
        streamUrl: 'Stream URL',
        selectPlatform: 'Select Platform',
        currentPlatform: 'Current Platform',
        streamStatus: 'Stream Status',
        streaming: 'Streaming',
        notStreaming: 'Not Streaming',
        startPreview: 'Start Preview',
        stopPreview: 'Stop Preview',
        preview: 'Preview',
        bitrate: 'Bitrate',
        resolution: 'Resolution',
        fps: 'FPS',
        apply: 'Apply',
        reset: 'Reset',
        advancedSettings: 'Advanced Settings',
        selectStreamModel: 'Select Stream Model',
        selectAudioInput: 'Select Audio Input',
        selectVideoInput: 'Select Video Input',
        streamTitle: 'Stream Title',
        streamDescription: 'Stream Description',
        saveSettings: 'Save Settings',
        saveSuccess: 'Saved Successfully',
        saveFailed: 'Save Failed',
        error: 'Error Occurred',
        reconnect: 'Reconnect',
        connectionLost: 'Connection Lost',
        connecting: 'Connecting',
        streamReady: 'Stream Ready',
        streamNotReady: 'Stream Not Ready',
        pleaseSelect: 'Please Select',
        loading: 'Loading...',
        noAvailableModel: 'No Available Model',
        noAvailableAudio: 'No Available Audio',
        noAvailableVideo: 'No Available Video',
        streamStartSuccess: 'Streaming Started Successfully',
        streamStopSuccess: 'Streaming Stopped',
        streamStartFailed: 'Failed to Start Streaming',
        streamStopFailed: 'Failed to Stop Streaming',
        confirmStopStream: 'Are you sure you want to stop streaming?',
        yes: 'Yes',
        no: 'No',
        platformBilibili: 'Bilibili',
        platformDouyin: 'Douyin',
        platformKuaishou: 'Kuaishou',
        platformOther: 'Other',
        streamHealth: 'Stream Health',
        good: 'Good',
        bad: 'Bad',
        unknown: 'Unknown',
        streamDelay: 'Stream Delay',
        ms: 'ms',
        networkStatus: 'Network Status',
        stable: 'Stable',
        unstable: 'Unstable',
        streamInfo: 'Stream Info',
        streamLog: 'Stream Log',
        clearLog: 'Clear Log',
        logCleared: 'Log Cleared',
        openStreamPanel: 'Open Stream Panel',
        closeStreamPanel: 'Close Stream Panel',
        streamPanel: 'Stream Panel',
        streamPreview: 'Stream Preview',
        streamControl: 'Stream Control',
        streamMonitor: 'Stream Monitor',
        streamRecord: 'Stream Recording',
        startRecord: 'Start Recording',
        stopRecord: 'Stop Recording',
        recordSuccess: 'Recording Successful',
        recordFailed: 'Recording Failed',
        noRecord: 'No Recording',
        recordList: 'Recording List',
        download: 'Download',
        delete: 'Delete',
        confirmDeleteRecord: 'Are you sure you want to delete this recording?',
        deleteSuccess: 'Deleted Successfully',
        deleteFailed: 'Delete Failed',
        streamTips: 'Streaming Tips',
        streamHelp: 'Streaming Help',
        openHelp: 'Open Help',
        closeHelp: 'Close Help',
        helpContent: 'For help, please refer to the documentation or contact support.',
        streamError: 'Streaming Error',
        retry: 'Retry',
        streamReconnect: 'Stream Reconnect',
        streamReconnectSuccess: 'Reconnected Successfully',
        streamReconnectFailed: 'Reconnect Failed',
        streamEnd: 'Stream Ended',
        streamStart: 'Stream Started',
        streamPaused: 'Stream Paused',
        streamResumed: 'Stream Resumed',
        pause: 'Pause',
        resume: 'Resume',
        streamPausedByUser: 'Paused by User',
        streamResumedByUser: 'Resumed by User',
        streamPausedByNetwork: 'Paused due to Network Issue',
        streamResumedByNetwork: 'Resumed after Network Recovery',
        streamPausedByPlatform: 'Paused by Platform',
        streamResumedByPlatform: 'Resumed by Platform',
        streamPausedUnknown: 'Paused for Unknown Reason',
        streamResumedUnknown: 'Resumed for Unknown Reason',
        streamStatusUnknown: 'Unknown Stream Status',
        streamStatusNormal: 'Normal Streaming',
        streamStatusError: 'Streaming Error',
        streamStatusWarning: 'Streaming Warning',
        streamStatusInfo: 'Streaming Info',
        streamStatusCritical: 'Critical Streaming',
        streamStatusOffline: 'Stream Offline',
        streamStatusOnline: 'Stream Online',
        streamStatusConnecting: 'Connecting to Stream',
        streamStatusReconnecting: 'Reconnecting to Stream',
        streamStatusDisconnected: 'Stream Disconnected',
        streamStatusStopped: 'Stream Stopped',
        streamStatusStarted: 'Stream Started',
        streamStatusPaused: 'Stream Paused',
        streamStatusResumed: 'Stream Resumed',
        streamStatusEnded: 'Stream Ended',
        streamStatusPending: 'Stream Pending',
        streamStatusPreparing: 'Preparing Stream',
        streamStatusReady: 'Stream Ready',
        streamStatusNotReady: 'Stream Not Ready',
        streamStatusUnknownError: 'Unknown Streaming Error',
        streamStatusNetworkError: 'Network Streaming Error',
        streamStatusPlatformError: 'Platform Streaming Error',
        streamStatusUserError: 'User Operation Error',
        streamStatusOtherError: 'Other Error',
        streamStatusSuccess: 'Streaming Success',
        streamStatusFail: 'Streaming Failed',
        streamStatusRetry: 'Streaming Retry',
        streamStatusReconnect: 'Streaming Reconnect',
        streamStatusReconnectSuccess: 'Reconnected Successfully',
        streamStatusReconnectFail: 'Reconnect Failed',
        streamStatusEnd: 'Streaming Ended',
        streamStatusStart: 'Streaming Started',
        streamStatusPause: 'Streaming Paused',
        streamStatusResume: 'Streaming Resumed',
        streamStatusStop: 'Streaming Stopped',
        streamStatusRecord: 'Streaming Recording',
        streamStatusDownload: 'Streaming Download',
        streamStatusDelete: 'Streaming Delete',
        streamStatusHelp: 'Streaming Help',
        streamStatusTips: 'Streaming Tips',
        streamStatusLog: 'Streaming Log',
        streamStatusPanel: 'Streaming Panel',
        streamStatusPreview: 'Streaming Preview',
        streamStatusControl: 'Streaming Control',
        streamStatusMonitor: 'Streaming Monitor',
        streamStatusRecordList: 'Recording List',
        streamStatusNoRecord: 'No Recording',
        streamStatusRecordSuccess: 'Recording Successful',
        streamStatusRecordFail: 'Recording Failed',
        streamStatusRecordDelete: 'Recording Deleted',
        streamStatusRecordDownload: 'Recording Downloaded',
        streamStatusRecordHelp: 'Recording Help',
        streamStatusRecordTips: 'Recording Tips',
        streamStatusRecordLog: 'Recording Log',
        streamStatusRecordPanel: 'Recording Panel',
        streamStatusRecordPreview: 'Recording Preview',
        streamStatusRecordControl: 'Recording Control',
        streamStatusRecordMonitor: 'Recording Monitor',
        streamStatusRecordListPanel: 'Recording List Panel',
        streamStatusRecordListNoRecord: 'No Recording',
        streamStatusRecordListSuccess: 'Recording List Success',
        streamStatusRecordListFail: 'Recording List Failed',
        streamStatusRecordListDelete: 'Recording List Deleted',
        streamStatusRecordListDownload: 'Recording List Downloaded',
        streamStatusRecordListHelp: 'Recording List Help',
        streamStatusRecordListTips: 'Recording List Tips',
        streamStatusRecordListLog: 'Recording List Log',
        streamStatusRecordListPanelTitle: 'Recording List Panel Title',
        streamStatusRecordListPanelContent: 'Recording List Panel Content',
        streamStatusRecordListPanelHelp: 'Recording List Panel Help',
        streamStatusRecordListPanelTips: 'Recording List Panel Tips',
        streamStatusRecordListPanelLog: 'Recording List Panel Log',
        streamStatusRecordListPanelPreview: 'Recording List Panel Preview',
        streamStatusRecordListPanelControl: 'Recording List Panel Control',
        streamStatusRecordListPanelMonitor: 'Recording List Panel Monitor',
        streamStatusRecordListPanelNoRecord: 'No Recording in Panel',
        streamStatusRecordListPanelSuccess: 'Panel Success',
        streamStatusRecordListPanelFail: 'Panel Failed',
        streamStatusRecordListPanelDelete: 'Panel Deleted',
        streamStatusRecordListPanelDownload: 'Panel Downloaded',
        streamStatusRecordListPanelHelpTitle: 'Panel Help Title',
        streamStatusRecordListPanelHelpContent: 'Panel Help Content',
        streamStatusRecordListPanelHelpTips: 'Panel Help Tips',
        streamStatusRecordListPanelHelpLog: 'Panel Help Log',
        streamStatusRecordListPanelHelpPreview: 'Panel Help Preview',
        streamStatusRecordListPanelHelpControl: 'Panel Help Control',
        streamStatusRecordListPanelHelpMonitor: 'Panel Help Monitor',
        streamStatusRecordListPanelHelpNoRecord: 'No Recording in Help',
        streamStatusRecordListPanelHelpSuccess: 'Help Success',
        streamStatusRecordListPanelHelpFail: 'Help Failed',
        streamStatusRecordListPanelHelpDelete: 'Help Deleted',
        streamStatusRecordListPanelHelpDownload: 'Help Downloaded',
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
        generatedScriptPlaceholder: 'The generated AI script will be displayed here...',
        customModelFeatureDev: 'Custom model feature under development...',
        gptModel: 'GPT Model',
        sovitsModel: 'SoVITS Model',
        uploadedVoiceModels: 'Uploaded voice model files:',
        selectModelFileWarning: 'Please select a model file first',
        voiceModelUploadFeatureDev: 'Voice model upload feature under development...',
        preparingApplyVoiceModel: 'Preparing to apply voice model:',
        applyVoiceModelFailed: 'Failed to apply voice model',
        unknownModel: 'Unknown model',
        configureApiKeyWarning: 'Please configure API Key first',
        apiRequestFailed: 'API request failed: ',
        generateSpeechFailed: 'Failed to generate speech, please try again',
        generateSpeechFirstWarning: 'Please generate the speech first',
        speechTestFeatureDev: 'Speech test feature will be implemented later',
        modelChanged: 'Selected model changed to:',
        live2dModelSwitched: 'Live2D model switched to:',
        refreshInProgress: 'Refresh operation in progress, please wait...',
        live2dPreviewRefreshed: 'Live2D preview refreshed',
        refreshPreviewFailed: 'Failed to refresh preview:',
        openaiApiError: 'OpenAI API call error:',
        generateSpeechError: 'Failed to generate speech:',
        live2dIframeNotFound: 'Live2D preview iframe not found',
    },

    setting: {
        title: 'Settings',
        languageTitle: 'Language Settings',
        themeTitle: 'System Preferences',
        debugTitle: 'Debug Settings',
        resetAll: 'Reset All Preferences',
        debugMode: 'Debug Mode',
        enabled: 'Enabled',
        disabled: 'Disabled',
        bannerDefault: 'Default',
        bannerRed: 'Red',
        bannerBlue: 'Blue',
        bannerPurple: 'Purple',
        bannerGreen: 'Green',
        bannerWhite: 'White',
        bannerBrown: 'Brown',
        bannerYellow: 'Yellow',
        bannerPink: 'Pink',
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
        finish: 'Finish',
        topBannerLayout: 'Navigation Bar Layout',
        bannerLayout: 'Navigation Bar Layout',
        bannerDisperse: 'Disperse',
        bannerGather: 'Gather',
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
    },

    live2dDemo: {
        title: 'pixi-Live2D-display Demo',
        live2dComponent: 'Live2D Model Component',
        mouthButton: 'Mouth Change',
        randomMotionButton: 'Random Motion',
        expressionLabel: 'Expression',
        canvas: 'Canvas',
        selectExpression: 'Select Expression',
        // Technical/Live2D terms
        F01: 'Expression 1',
        F02: 'Expression 2',
        F03: 'Expression 3',
        F04: 'Expression 4',
        F05: 'Expression 5',
        F06: 'Expression 6',
        F07: 'Expression 7',
        F08: 'Expression 8',
        // Demo help
        help: 'Click the buttons to experience mouth change and random motion of the Live2D model.'
    },

    // Other streaming platforms
    twitch: {
        title: 'Twitch Live Streaming Platform',
        subtitle: 'Professional Twitch live streaming key acquisition and management tool',
        comingSoon: 'Coming Soon',
        description: 'Twitch live streaming platform features are under development, stay tuned',
        streamKeyGuide: {
            title: 'How to Get Your Twitch Stream Key',
            description: 'Follow these steps to get your Twitch stream key (Stream Key):',
            steps: {
                step1: 'Log in to {twitch} and access your account.',
                step2: 'Click your avatar in the top right and select <strong>"Creator Dashboard"</strong>.',
                step3: 'In the left menu, click <strong>"Settings"</strong> &gt; <strong>"Stream"</strong>.',
                step4: 'Under "Stream Key & Preferences", find <strong>"Primary Stream Key"</strong> and click "Show" to view your stream key.',
                step5: 'Click "Copy" and paste the stream key into your streaming software to start streaming.'
            },
            warning: {
                title: 'Warning',
                content: 'Do not share your stream key. Others may use your account to stream! If leaked, you can reset it on the page.'
            },
            tip: 'After getting your stream key and stream URL, select "Twitch" as your platform and paste them in.'
        }
    },

    youtube: {
        title: 'YouTube Live Streaming Platform',
        subtitle: 'Professional YouTube live streaming key acquisition and management tool',
        comingSoon: 'Coming Soon',
        description: 'YouTube live streaming platform features are under development, stay tuned',
        // YouTube Stream Key Guide
        streamKeyGuide: {
            title: 'How to Get YouTube Live Stream Key',
            description: 'Here are the steps to get your YouTube stream key (Stream Key):',
            steps: {
                step1: 'Log in to {youtube}, click the camera icon in the top right corner, and select "Go live".',
                step2: 'If this is your first time, you may need to verify your account (e.g., bind a phone number) and wait 24 hours for live streaming to be activated.',
                step3: 'In the live control panel, click "Stream" in the left menu.',
                step4: 'Under "Encoder settings", you can see the following two items:',
                step5: 'Click "Show" to view the complete stream key and copy it. You can paste it in designed spot for live streaming.'
            },
            streamInfo: {
                streamUrl: 'Stream URL',
                streamUrlExamplePrefix: 'e.g.',
                streamKey: 'Stream Key',
                streamKeyExamplePrefix: 'a randomly generated string, e.g.',
                streamUrlExample: 'rtmp://a.rtmp.youtube.com/live2',
                streamKeyExample: 'abcd-efgh-ijkl-mnop'
            },
            warning: {
                title: 'Warning',
                content: 'Do not share your stream key publicly, as others may use your account for live streaming!'
            },
            tip: 'After getting the stream key and stream address, select "YouTube" as the live streaming platform, then paste the stream key and stream address.'
        }
    },

    kuaishou: {
        title: 'Kuaishou Live Streaming Tool',
        subtitle: 'Professional Kuaishou live streaming code acquisition and management tool',
        // Navigation actions
        actions: {
            help: 'Help',
            quickActions: 'Quick actions',
            tutorial: 'Tutorial',
            resetTutorial: 'Reset tutorial'
        },
        // Tabs
        tabs: {
            account: {
                name: 'Account Settings',
                description: 'Configure account information'
            },
            live: {
                name: 'Live Settings',
                description: 'Configure live streaming parameters'
            },
            stream: {
                name: 'Stream Info',
                description: 'Get streaming codes'
            }
        },
        // Account settings
        account: {
            title: 'Account Settings',
            subtitle: 'Configure your Kuaishou account information with multiple login methods',
            // Cookies file import
            cookiesImport: {
                title: 'Cookies File Import',
                description: 'Import Cookies information from local file',
                selectFile: 'Select file'
            },
            // Auto get
            autoGet: {
                title: 'Auto get',
                description: 'Automatically get account information via QR code scanning',
                getting: 'Getting...',
                startGet: 'Start get',
                gettingInfo: 'Getting account information...'
            },
            // Manual input
            manualInput: {
                title: 'Manual Input',
                description: 'If you already have account information, you can input directly',
                roomId: 'Room ID',
                roomIdPlaceholder: 'Please enter room ID',
                cookies: 'Cookies',
                cookiesPlaceholder: 'Please enter Cookies string',
                sessionId: 'Session ID',
                sessionIdPlaceholder: 'Please enter Session ID',
                saveSettings: 'Save Settings'
            }
        },
        // Live settings
        live: {
            title: 'Live Settings',
            subtitle: 'Configure live title, category and interaction features',
            // Live title
            titleSetting: {
                title: 'Live Title',
                description: 'Set your live streaming title',
                placeholder: 'Enter live title',
                updateTitle: 'Update Title'
            },
            // Live category
            category: {
                title: 'Live Category',
                description: 'Select appropriate live streaming category',
                mainCategory: 'Main Category',
                selectCategory: 'Please select category',
                subCategory: 'Sub Category',
                selectSubCategory: 'Please select sub category',
                updateCategory: 'Update Category',
                refreshCategories: 'Refresh Categories'
            },
            // Comment sending
            comment: {
                title: 'Send Comment',
                description: 'Interact with audience',
                placeholder: 'Enter comment content',
                sendComment: 'Send Comment'
            },
            // Start live
            startLive: {
                text: 'Start Live'
            }
        },
        // Operation logs
        logs: {
            title: 'Operation Logs',
            clear: 'Clear',
            export: 'Export',
            empty: 'No operation logs yet'
        },
        // Stream information
        stream: {
            title: 'Stream Information',
            subtitle: 'Get and manage your live streaming information',
            // Stream address
            server: {
                title: 'Stream Address',
                copy: 'Copy',
                empty: 'No stream address yet'
            },
            // Stream key
            code: {
                title: 'Stream Key',
                copy: 'Copy',
                empty: 'No stream key yet'
            },
            // Export options
            export: {
                title: 'Export Options',
                description: 'Save stream information to local',
                exportToDesktop: 'Export to Desktop',
                exportToFile: 'Export to File'
            },
            // Live control
            control: {
                title: 'Live Control',
                description: 'Manage live streaming status',
                stopLive: 'Stop Live',
                refreshStream: 'Refresh Stream Info'
            }
        },
        // Status bar
        status: {
            tutorial: 'Tutorial',
            reset: 'Reset'
        },
        // QR code dialog
        qrDialog: {
            title: 'QR Code Login',
            tip: 'Please use Kuaishou APP to scan QR code for login',
            step1: 'Open Kuaishou APP',
            step2: 'Click the "+" in the top right corner',
            step3: 'Select "Scan"',
            step4: 'Scan the QR code above'
        },
        // Help dialog
        helpDialog: {
            title: 'Usage Instructions',
            content: `【Kuaishou Live Streaming Tool Usage Instructions】

1. Account Settings:
- Supports three methods: Cookies file import, auto QR code scanning, and manual input.
- Recommend using auto QR code scanning first, safe and convenient.

2. Live Settings:
- Can set live title, category, and sub-category.
- Supports one-click comment sending and live streaming start.

3. Stream Information:
- Get stream address and stream key.
- Supports one-click copy and export functions.

4. Common Issues:
- If category/sub-category cannot be selected, please refresh categories first.
- If stream information acquisition fails, please check Cookies or account status.

5. Technical Support:
If you encounter unsolvable problems, please contact the development team or refer to project documentation.`
        },
        // New user guide
        tutorial: {
            welcome: 'Welcome to Kuaishou Live Streaming Tool!',
            description: 'Let me help you get started quickly with this tool'
        }
    },

    // Platform names
    platforms: {
        bilibili: 'Bilibili',
        douyin: 'Douyin',
        kuaishou: 'Kuaishou',
        huya: 'Huya',
        douyu: 'Douyu',
        yy: 'YY Live',
        twitch: 'Twitch',
        youtube: 'YouTube',
        xiaohongshu: 'Xiaohongshu'
    },

    // AI model providers
    aiProviders: {
        siliconFlow: 'Silicon Flow',
        volcengine: 'Volcengine',
        tencentCloud: 'Tencent Cloud',
        other: 'Other'
    },

    // AI model names
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

    // System messages
    messages: {
        settingsSaved: 'Settings completed',
        settingsReset: 'All preferences have been reset',
        settingsResetFailed: 'Reset failed',
        backgroundUploadFailed: 'Background upload failed',
        liveSettingsSaved: 'Live settings saved!',
        liveSettingsSaveFailed: 'Live settings save failed',
        aiSettingsSaved: 'AI settings saved!',
        aiSettingsSaveFailed: 'AI settings save failed',
        cookiesLoaded: 'Cookies file loaded successfully',
        cookiesLoadFailed: 'Failed to load cookies file',
        qrCodeFailed: 'Failed to get QR code',
        accountGetSuccess: 'Account information obtained successfully',
        accountGetFailed: 'Failed to get account information',
        fillAllFields: 'Please fill in all account information fields',
        accountSaveSuccess: 'Account information saved successfully',
        accountSaveFailed: 'Failed to save account information',
        areasLoadFailed: 'Failed to load area data',
        gettingAreas: 'Getting live areas...',
        areasGetSuccess: 'Live areas obtained successfully',
        areasGetFailed: 'Failed to get live areas',
        fillLiveTitle: 'Please enter live title',
        updatingTitle: 'Updating live title...',
        titleUpdated: 'Live title updated',
        titleUpdateFailed: 'Failed to update live title',
        selectArea: 'Please select live area',
        updatingArea: 'Updating live area...',
        areaUpdated: 'Live area updated',
        areaUpdateFailed: 'Failed to update live area',
        inputBullet: 'Please enter bullet content',
        bulletSent: 'Bullet sent successfully',
        bulletSendFailed: 'Failed to send bullet',
        setLiveTitle: 'Please set live title',
        selectLiveArea: 'Please select live area',
        liveInProgress: 'Live streaming in progress!',
        startingLive: 'Starting live...',
        liveStarted: 'Live started! Please use stream key for streaming',
        startLiveFailed: 'Failed to start live',
        noLiveInProgress: 'No live streaming in progress!',
        stoppingLive: 'Stopping live...',
        liveStopped: 'Live stopped!',
        stopLiveFailed: 'Failed to stop live',
        serverCopied: 'Server address copied to clipboard',
        streamKeyCopied: 'Stream key copied to clipboard',
        noStreamInfo: 'No stream information to export!',
        streamInfoExported: 'Stream information exported to',
        settingsLoadFailed: 'Failed to load settings',
        logsLoadFailed: 'Failed to load logs'
    },

    // Live2DViewer component
    live2dViewer: {
        controlPanel: 'Control Panel',
        expressions: 'Expressions',
        motions: 'Motions',
        motionLabel: 'Motion',
        loadingModel: 'Loading model...',
        modelLoadSuccess: 'Model loaded successfully!',
        modelLoadFailed: 'Failed to load model, please check if the model file is correct',
        expressionPlayFailed: 'Failed to play expression',
        motionPlayFailed: 'Failed to play motion'
    },

    // ModelSelector component
    modelSelector: {
        switchModel: 'Switch Model',
        referenceAudio: 'Reference Audio',
        currentAudio: '(Current)',
        switchReferenceAudio: 'Switch Reference Audio',
        currentModelPair: 'Current Model Pair:',
        currentRefAudio: 'Current Reference Audio:',
        none: 'None',
        generateSampleVoice: 'Generate Sample Voice',
        generatingSample: 'Generating sample voice...',
        switchAudioSuccess: 'Reference audio switched successfully!',
        selectModel: 'Please select a model',
        switchModelSuccess: 'Model switched successfully!',
        generateSampleFailed: 'Failed to generate sample voice',
        sampleText: 'Hello, this is a sample voice, good morning, good noon, good afternoon.'
    },

    // streamConfig component
    streamConfig: {
        title: 'Live Platform Selection & Stream Key',
        subtitle: 'Select live platform and enter stream key',
        selectPlatform: 'Select Platform',
        streamUrl: 'Stream URL:',
        streamUrlPlaceholder: 'Enter stream URL',
        streamKey: 'Stream Key:',
        streamKeyPlaceholder: 'Enter stream key',
        testConnection: 'Test Connection',
        getStreamKeyTool: 'Get Stream Key Tool',
        stopLive: 'Stop Live',
        // Platform tool names
        platformTools: {
            bilibili: 'Bilibili Stream Key Tool',
            douyin: 'Douyin Stream Key Tool',
            xiaohongshu: 'Xiaohongshu Stream Key Tool',
            kuaishou: 'Kuaishou Stream Key Tool',
            youtube: 'YouTube Stream Key Tool',
            twitch: 'Twitch Stream Key Tool'
        },
        // Default stream URLs
        defaultUrls: {
            bilibili: 'rtmp://live-push.bilivideo.com/live-bvc/',
            douyin: 'rtmp://push-rtmp-13.douyincdn.com/third/',
            xiaohongshu: 'rtmp://live-push.xhscdn.com/live/',
            kuaishou: 'rtmp://aliyun-open-push.voip.yximgs.com/gifshow/'
        },
        // Error messages
        errors: {
            userCancelled: 'User cancelled capture or browser not supported',
            websocketFailed: 'WebSocket connection failed',
            routeNotFound: 'Route not found for corresponding platform'
        }
    },

    // LanguageSwitcher component
    languageSwitcher: {
        chinese: 'Chinese',
        english: 'English',
        currentLang: '中',
        currentLangEn: 'En',
        selectLanguage: 'Select Language'
    },

    // Common file operations
    fileOperations: {
        chooseFile: 'Choose File',
        noFileSelected: 'No file selected',
        selectFiles: 'Select Files',
        dragAndDrop: 'Drag and drop files here or click to select',
        fileSelected: 'File selected',
        filesSelected: 'Files selected'
    },

    // Common input placeholders
    inputPlaceholders: {
        keywords: 'Enter keywords, e.g.: Cyberpunk 2077, patch, update',
        keywordsSeparator: 'Separate with commas'
    },

    xiaohongshu: {
        title: 'Xiaohongshu Live Stream Key Guide',
        section1: {
            title: '1. Preparation',
            step0: {
                title: 'Account Requirements',
                desc: 'To obtain a Xiaohongshu live stream key, you must meet the following conditions:',
                items: [
                    'Completed Xiaohongshu real-name authentication',
                    'At least 1000 followers or received an official live invitation',
                    'No account violations'
                ]
            },
            warning: '⚠️ Important: The Xiaohongshu stream key is for one-time use. You need to get a new one for each live session.'
        },
        section2: {
            title: '2. Steps to Get the Stream Key',
            steps: [
                {
                    title: 'Step 1: Enable Live Streaming',
                    desc: 'Open Xiaohongshu app → Tap "Me" → Go to "Creator Center" → Select "More Services" → Tap "Live" → Complete the permission application'
                },
                {
                    title: 'Step 2: Download Live Assistant',
                    desc: 'Visit the official Xiaohongshu website to download the "Xiaohongshu Live Assistant" PC software, install and log in to your account.'
                },
                {
                    title: 'Step 3: Get the Stream Key',
                    desc: '1. Open Xiaohongshu Live Assistant\n2. Click "Create Live" → Select "Professional Live"\n3. Find the "Third-party Streaming" option\n4. The system will generate the RTMP address and stream key',
                    code: 'RTMP address: rtmp://push.xiaohongshu.com/live/<br>Sample stream key: xhs_1234567890abcdef<br>Full stream URL: rtmp://push.xiaohongshu.com/live/xhs_1234567890abcdef'
                }
            ]
        }
    }
}