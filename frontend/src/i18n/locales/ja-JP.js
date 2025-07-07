export default {
  // 共通
  common: {
    loading: '読み込み中...',
    save: '保存',
    cancel: 'キャンセル',
    confirm: '確認',
    delete: '削除',
    edit: '編集',
    add: '追加',
    search: '検索',
    refresh: '更新',
    export: 'エクスポート',
    import: 'インポート',
    copy: 'コピー',
    paste: '貼り付け',
    close: '閉じる',
    back: '戻る',
    next: '次へ',
    previous: '前へ',
    finish: '完了',
    start: '開始',
    stop: '停止',
    reset: 'リセット',
    clear: 'クリア',
    help: 'ヘルプ',
    about: '情報',
    settings: '設定',
    logout: 'ログアウト',
    login: 'ログイン',
    register: '登録',
    username: 'ユーザー名',
    password: 'パスワード',
    email: 'メール',
    submit: '送信',
    success: '成功',
    error: 'エラー',
    warning: '警告',
    info: '情報',
    yes: 'はい',
    no: 'いいえ',
    ok: 'OK'
  },
  nav: {
    home: 'ホーム',
    dashboard: 'ダッシュボード',
    streaming: '配信',
    settings: '設定',
    help: 'ヘルプ',
    about: '私たちについて'
  },
  login: {
    title: 'StreamCreamへようこそ',
    subtitle: 'プロフェッショナルな配信コード管理プラットフォーム',
    login: 'ログイン',
    register: '登録',
    username: 'ユーザー名',
    password: 'パスワード',
    email: 'メール',
    verificationCode: '認証コード',
    resendCode: '再送信',
    loginSuccess: 'ログイン成功！',
    registerSuccess: '登録成功！',
    loginFailed: 'ログイン失敗',
    registerFailed: '登録失敗',
    emailSent: '認証コードが送信されました。メールを確認してください！',
    verificationSuccess: '認証成功！',
    verificationFailed: '認証失敗',
    passwordResetSuccess: 'パスワードリセット成功！',
    passwordResetFailed: 'パスワードリセット失敗',
    invalidUsername: 'ユーザー名を入力してください',
    usernameTooShort: 'ユーザー名は3文字以上で入力してください',
    invalidEmail: '有効なメールアドレスを入力してください',
    invalidPassword: 'パスワードは6文字以上で入力してください',
    passwordTooWeak: 'パスワードが弱すぎます。より複雑なパスワードを使用してください',
    passwordMismatch: 'パスワードが一致しません',
    invalidCode: '認証コードを入力してください',
    codeLengthError: '認証コードは6桁で入力してください',
    pleaseLogin: 'まずログインしてください!!!',
    otherLoginMethods: '他のログイン方法',
    socialLogin: {
      facebook: 'Facebookでログイン',
      google: 'Googleでログイン',
      twitter: 'Twitterでログイン'
    },
    inputUsername: 'ユーザー名を入力',
    inputPassword: 'パスワードを入力',
    inputEmail: 'メールを入力',
    confirmPassword: 'パスワードを確認',
    inputVerificationCode: '認証コードを入力',
    loggingIn: 'ログイン中...',
    forgotPassword: 'パスワードをお忘れですか?',
    verifyEmail: 'メール認証',
    sending: '送信中...',
    sendVerificationCode: '認証コードを送信',
    verifying: '認証中...',
    verifyCode: 'コード認証',
    inputNewPassword: '新しいパスワードを入力',
    confirmNewPassword: '新しいパスワードを確認',
    resetting: 'リセット中...',
    resetPassword: 'パスワードをリセット',
    passwordStrength: {
      veryWeak: '非常に弱い',
      weak: '弱い',
      medium: '普通',
      strong: '強い',
      veryStrong: '非常に強い'
    },
    serverError: 'サーバーエラー',
    resendSuccess: '認証コードを再送信しました',
    sendFailed: '送信失敗'
  },
  setting: {
    title: '設定',
    languageTitle: '言語設定',
    debugTitle: 'デバッグ設定',
    resetAll: 'すべての設定をリセット',
    debugMode: 'デバッグモード',
    enabled: '有効',
    disabled: '無効',
    bannerDefault: 'デフォルト',
    bannerRed: '赤',
    bannerBlue: '青',
    bannerPurple: '紫',
    bannerColor: 'トップバナー色',
    aiTitle: 'AI設定',
    provider: 'モデルプロバイダー',
    providerCustom: 'カスタム',
    apiEndpoint: 'APIエンドポイントURL',
    apiEndpointPlaceholder: 'https://api.soruxgpt.com/v1/chat/completions',
    apiKey: 'APIキー',
    apiKeyPlaceholder: 'APIキーを入力',
    modelName: 'モデル名',
    noModelFound: '該当するモデルが見つかりません',
    searchModel: 'モデル検索',
    customModelName: 'カスタムモデル名',
    customModelNamePlaceholder: 'カスタムモデル名を入力',
    liveTitle: '配信設定',
    resolution: '配信解像度',
    resolution1080p: '1920×1080 (16:9)',
    fps: '配信FPS',
    bg: '配信背景',
    bgDefault: 'デフォルト',
    uploadBg: '背景をアップロード',
    platform: '配信プラットフォーム',
    platformBilibili: 'ビリビリ',
    getStreamKey: '配信キー取得',
    streamDomain: '配信アドレス',
    inputStreamDomain: '配信アドレスを入力',
    streamKey: '配信キー',
    inputStreamKey: '配信キーを入力',
    testConnection: '接続テスト',
    saveSettings: '設定を保存',
    ttsTitle: '音声合成設定',
    live2dTitle: 'Live2D設定',
    finish: '完了'
  },
  bilibili: {
    title: 'ビリビリ配信キー取得ツール',
    subtitle: 'プロフェッショナルなビリビリ配信キー取得・管理ツール',
    tabs: {
      account: {
        name: 'アカウント設定',
        description: 'アカウントログインと認証'
      },
      live: {
        name: '配信設定',
        description: '配信設定と管理'
      }
    },
    account: {
      title: 'アカウント設定',
      cookiesFile: 'Cookiesファイル',
      useCookiesFile: 'Cookiesファイルを使用',
      autoGet: '自動取得',
      autoGetAccount: 'アカウント情報自動取得',
      getting: '取得中...',
      gettingText: '取得中、しばらくお待ちください...',
      manualInput: '手動入力',
      roomId: 'ルームID:',
      roomIdPlaceholder: 'ルームIDを入力',
      cookies: 'Cookies:',
      cookiesPlaceholder: 'Cookies文字列を入力',
      csrfToken: 'CSRFトークン:',
      csrfTokenPlaceholder: 'CSRFトークンを入力',
      saveSettings: '設定を保存',
      viewHelp: '使い方を見る'
    },
    live: {
      title: '配信タイトル',
      titleInput: '配信タイトルを入力:',
      titlePlaceholder: '配信タイトルを入力',
      updateTitle: 'タイトルを更新',
      defaultTitle: '私のビリビリ配信',
      area: '配信エリア',
      selectArea: 'エリアを選択',
      selectSubArea: 'サブエリアを選択',
      updateArea: 'エリアを更新',
      refreshArea: 'エリアを更新',
      sendBullet: '弾幕送信',
      bulletInput: '弾幕内容を入力',
      bulletPlaceholder: '弾幕内容を入力',
      startLive: '配信開始',
      operationLog: '操作ログ',
      noLogs: 'ログがありません'
    },
    qrCode: {
      title: 'QRコードログイン',
      tip: 'ビリビリアプリでQRコードをスキャンしてログインしてください'
    }
  },
  douyin: {
    title: '抖音ライブ配信ツール',
    subtitle: 'プロフェッショナルな抖音配信キー取得・管理ツール',
    actions: {
      help: 'ヘルプ',
      quickActions: 'クイック操作',
      tutorial: 'チュートリアル',
      resetTutorial: 'チュートリアルをリセット'
    },
    tabs: {
      account: {
        name: 'アカウント設定',
        description: 'アカウント情報を設定'
      },
      live: {
        name: '配信設定',
        description: '配信パラメータを設定'
      },
      stream: {
        name: '配信情報',
        description: '配信キーを取得'
      }
    },
    account: {
      title: 'アカウント設定',
      subtitle: '抖音アカウント情報を設定、複数のログイン方法に対応',
      cookiesImport: {
        title: 'Cookiesファイルインポート',
        description: 'ローカルファイルからCookies情報をインポート',
        selectFile: 'ファイルを選択'
      },
      autoGet: {
        title: '自動取得',
        description: 'QRコードスキャンでアカウント情報を自動取得',
        getting: '取得中...',
        startGet: '取得開始',
        gettingInfo: 'アカウント情報取得中...'
      },
      manualInput: {
        title: '手動入力',
        description: '既にアカウント情報がある場合は直接入力可能',
        roomId: 'ルームID',
        roomIdPlaceholder: 'ルームIDを入力',
        cookies: 'Cookies',
        cookiesPlaceholder: 'Cookies文字列を入力',
        sessionId: 'Session ID',
        sessionIdPlaceholder: 'Session IDを入力',
        saveSettings: '設定を保存'
      }
    },
    live: {
      title: '配信設定',
      subtitle: '配信タイトル・カテゴリ・インタラクション機能を設定',
      titleSetting: {
        title: '配信タイトル',
        description: '配信タイトルを設定',
        placeholder: '配信タイトルを入力',
        updateTitle: 'タイトルを更新'
      },
      category: {
        title: '配信カテゴリ',
        description: '適切な配信カテゴリを選択',
        mainCategory: 'メインカテゴリ',
        selectCategory: 'カテゴリを選択',
        subCategory: 'サブカテゴリ',
        selectSubCategory: 'サブカテゴリを選択',
        updateCategory: 'カテゴリを更新',
        refreshCategories: 'カテゴリを更新'
      },
      comment: {
        title: 'コメント送信',
        description: '視聴者と交流',
        placeholder: 'コメント内容を入力',
        sendComment: 'コメント送信'
      },
      startLive: {
        text: '配信開始'
      }
    },
    logs: {
      title: '操作ログ',
      clear: 'クリア',
      export: 'エクスポート',
      empty: '操作ログなし'
    },
    stream: {
      title: '配信情報',
      subtitle: '配信情報の取得と管理',
      server: {
        title: '配信サーバー',
        copy: 'コピー',
        empty: '配信サーバーなし'
      },
      code: {
        title: '配信コード',
        copy: 'コピー',
        empty: '配信コードなし'
      },
      export: {
        title: 'エクスポートオプション',
        description: '配信情報をローカルに保存',
        exportToDesktop: 'デスクトップにエクスポート',
        exportToFile: 'ファイルにエクスポート'
      },
      control: {
        title: '配信コントロール',
        description: '配信状態を管理',
        stopLive: '配信停止',
        refreshStream: '配信情報を更新'
      }
    },
    status: {
      tutorial: 'チュートリアル',
      reset: 'リセット'
    },
    qrDialog: {
      title: 'QRコードログイン',
      tip: '抖音アプリでQRコードをスキャンしてログインしてください',
      step1: '抖音アプリを開く',
      step2: '右上の「+」ボタンをクリック',
      step3: '「QRコードをスキャン」を選択'
    }
  },
  kuaishou: {
    title: '快手ライブ配信ツール',
    subtitle: 'プロフェッショナルな快手配信キー取得・管理ツール',
    actions: {
      help: 'ヘルプ',
      quickActions: 'クイック操作',
      tutorial: 'チュートリアル',
      resetTutorial: 'チュートリアルをリセット'
    },
    tabs: {
      account: {
        name: 'アカウント設定',
        description: 'アカウント情報を設定'
      },
      live: {
        name: '配信設定',
        description: '配信パラメータを設定'
      },
      stream: {
        name: '配信情報',
        description: '配信キーを取得'
      }
    },
    account: {
      title: 'アカウント設定',
      subtitle: '快手アカウント情報を設定、複数のログイン方法に対応',
      cookiesImport: {
        title: 'Cookiesファイルインポート',
        description: 'ローカルファイルからCookies情報をインポート',
        selectFile: 'ファイルを選択'
      },
      autoGet: {
        title: '自動取得',
        description: 'QRコードスキャンでアカウント情報を自動取得',
        getting: '取得中...',
        startGet: '取得開始',
        gettingInfo: 'アカウント情報取得中...'
      },
      manualInput: {
        title: '手動入力',
        description: '既にアカウント情報がある場合は直接入力可能',
        roomId: 'ルームID',
        roomIdPlaceholder: 'ルームIDを入力',
        cookies: 'Cookies',
        cookiesPlaceholder: 'Cookies文字列を入力',
        sessionId: 'Session ID',
        sessionIdPlaceholder: 'Session IDを入力',
        saveSettings: '設定を保存'
      }
    },
    live: {
      title: '配信設定',
      subtitle: '配信タイトル・カテゴリ・インタラクション機能を設定',
      titleSetting: {
        title: '配信タイトル',
        description: '配信タイトルを設定',
        placeholder: '配信タイトルを入力',
        updateTitle: 'タイトルを更新'
      },
      category: {
        title: '配信カテゴリ',
        description: '適切な配信カテゴリを選択',
        mainCategory: 'メインカテゴリ',
        selectCategory: 'カテゴリを選択',
        subCategory: 'サブカテゴリ',
        selectSubCategory: 'サブカテゴリを選択',
        updateCategory: 'カテゴリを更新',
        refreshCategories: 'カテゴリを更新'
      },
      comment: {
        title: 'コメント送信',
        description: '視聴者と交流',
        placeholder: 'コメント内容を入力',
        sendComment: 'コメント送信'
      },
      startLive: {
        text: '配信開始'
      }
    },
    logs: {
      title: '操作ログ',
      clear: 'クリア',
      export: 'エクスポート',
      empty: '操作ログなし'
    },
    stream: {
      title: '配信情報',
      subtitle: '配信情報の取得と管理',
      server: {
        title: '配信サーバー',
        copy: 'コピー',
        empty: '配信サーバーなし'
      },
      code: {
        title: '配信コード',
        copy: 'コピー',
        empty: '配信コードなし'
      },
      export: {
        title: 'エクスポートオプション',
        description: '配信情報をローカルに保存',
        exportToDesktop: 'デスクトップにエクスポート',
        exportToFile: 'ファイルにエクスポート'
      },
      control: {
        title: '配信コントロール',
        description: '配信状態を管理',
        stopLive: '配信停止',
        refreshStream: '配信情報を更新'
      }
    },
    status: {
      tutorial: 'チュートリアル',
      reset: 'リセット'
    },
    qrDialog: {
      title: 'QRコードログイン',
      tip: '快手アプリでQRコードをスキャンしてログインしてください',
      step1: '快手アプリを開く',
      step2: '右上の「+」ボタンをクリック',
      step3: '「QRコードをスキャン」を選択',
      step4: '上記のQRコードをスキャン'
    },
    tutorial: {
      welcome: '快手ライブ配信ツールへようこそ！',
      description: 'このツールの使い方を素早くご案内します'
    }
  },
  mainPage: {
    voiceLibTitle: '音声ライブラリ選択',
    voiceLibDesc: 'トレーニング済み音声モデルを選択または音声モデルファイルをアップロード',
    uploadVoiceModel: '音声モデルファイルをアップロード:',
    supportedFormat: '対応形式：GPTモデル(.ckpt)・SoVITSモデル(.pth)',
    selectedFiles: '選択されたファイル',
    applyVoiceModel: '音声モデルを適用',
    trainNewVoice: '新しい音声をトレーニング',
    trainNewVoiceDesc: '音声サンプルをアップロードして新しい音声モデルをトレーニング',
    uploadVoiceSample: '音声サンプルファイルをアップロード (MP3/WAV):',
    trainTip: '最良の結果を得るには10分以上のクリアな音声サンプルをアップロードしてください',
    voiceName: '音声名:',
    voiceNamePlaceholder: '音声モデルに名前を付けてください',
    startTraining: 'トレーニング開始',
    advancedTrain: '高度な音声モデルトレーニング設定',
    trainStatus: 'トレーニング状況:',
    notStarted: '未開始',
    live2dTitle: 'Live2Dモデル選択',
    live2dDesc: 'Live2Dモデルを選択',
    selectBaseModel: 'ベースモデルを選択:',
    uploadLive2dModel: 'Live2Dモデルファイルをアップロード:',
    applyCustomModel: 'カスタムモデルを適用',
    advancedLive2dTrain: '高度なLive2Dモデルトレーニング設定',
    currentModel: '現在のモデル:',
    livePreviewTitle: '配信プレビュー',
    status: '状態:',
    refreshing: '更新中...',
    previewReady: 'プレビュー準備完了',
    refreshPreview: 'プレビューを更新',
    startLive: '配信開始',
    aiScriptTestTitle: 'AI原稿生成テスト',
    aiScriptTestDesc: 'AI原稿を生成しプレビューエリアでテスト',
    scriptTopic: '原稿テーマ:',
    inputScriptTopic: '原稿テーマを入力',
    scriptStyle: '原稿スタイル:',
    styleCasual: 'カジュアル',
    styleProfessional: 'プロフェッショナル',
    styleCute: '可愛い',
    styleHumorous: 'ユーモラス',
    generating: '生成中...',
    generateScript: '原稿生成',
    testScript: '原稿テスト',
    generatedScript: '生成された原稿:',
    generatedScriptPlaceholder: '生成されたAI原稿がここに表示されます...',
    customModelFeatureDev: 'カスタムモデル機能は開発中...',
    gptModel: 'GPTモデル',
    sovitsModel: 'SoVITSモデル',
    uploadedVoiceModels: 'アップロード済み音声モデルファイル:',
    selectModelFileWarning: 'まずモデルファイルを選択してください',
    voiceModelUploadFeatureDev: '音声モデルアップロード機能は開発中...',
    preparingApplyVoiceModel: '適用準備中の音声モデル:',
    applyVoiceModelFailed: '音声モデルの適用に失敗',
    unknownModel: '不明なモデル',
    configureApiKeyWarning: '先にAPIキーを設定してください',
    apiRequestFailed: 'APIリクエスト失敗: ',
    generateSpeechFailed: '原稿生成に失敗しました。再試行してください',
    generateSpeechFirstWarning: 'まず原稿を生成してください',
    speechTestFeatureDev: '原稿テスト機能は今後実装予定',
  },
  streamingPage: {
    topicAndOutline: 'テーマ設定とアウトライン生成',
    inputLiveTopic: '配信テーマを入力してください',
    generating: '生成中...',
    generateOutline: 'アウトライン生成',
    inputOrEditOutline: 'ここで自作アウトラインも入力できます',
    processing: '処理中...',
    confirmTopicAndOutline: 'テーマとアウトラインを確認',
    addNewSection: '新しいセクションを追加',
    outlineManagement: 'アウトライン管理',
    addBlock: '新しい章を追加',
    blockTitlePlaceholder: '章タイトルを入力',
    blockContentPlaceholder: '章内容を入力',
    removeBlock: '削除',
    dragHandle: 'ドラッグで並び替え',
    editBlock: '編集',
    saveBlock: '保存',
    cancelEdit: 'キャンセル',
    broadcasting: '配信中',
    notStarted: '未開始',
    startBroadcast: '配信開始',
    pauseBroadcast: '一時停止',
    endBroadcast: '配信終了',
    nextBlock: '次の章へ',
    nextSentence: '次の文へ',
    currentBlock: '現在の章',
    nextBlockTitle: '次の章',
    currentSubtitle: '現在の字幕',
    nextSubtitle: '次の字幕',
    blockEditPlaceholder: '章タイトルを編集',
    blockEditSave: '保存',
    blockEditCancel: 'キャンセル',
    confirmRemoveBlock: 'この章を削除しますか？',
    removeBlockSuccess: '章を削除しました',
    removeBlockFailed: '章の削除に失敗しました',
    outlineConfirmSuccess: 'アウトラインを確定しました',
    outlineConfirmFailed: 'アウトライン確定に失敗しました',
    outlineGenerateFailed: 'アウトライン生成に失敗しました',
    outlineEmpty: 'アウトラインが空です',
    outlineBlockEmpty: '章タイトルが空です',
    outlineBlockContentEmpty: '章内容が空です',
    outlineBlockEditSuccess: '章タイトルを更新しました',
    outlineBlockEditFailed: '章タイトルの更新に失敗しました',
    outlineAddBlockSuccess: '新しい章を追加しました',
    outlineAddBlockFailed: '章の追加に失敗しました',
    outlineDragSuccess: '章の順番を変更しました',
    outlineDragFailed: '章の順番変更に失敗しました',
    outlineSaveSuccess: 'アウトラインを保存しました',
    outlineSaveFailed: 'アウトライン保存に失敗しました',
    outlineLoadFailed: 'アウトライン読み込みに失敗しました',
    outlineBlockLoadFailed: '章読み込みに失敗しました',
    outlineBlockSaveFailed: '章保存に失敗しました',
    outlineBlockRemoveFailed: '章削除に失敗しました',
    outlineBlockAddFailed: '章追加に失敗しました',
    outlineBlockEditCancel: '編集をキャンセルしました',
    outlineBlockEditSave: '保存しました',
    outlineBlockEditFailed: '保存に失敗しました',
    liveManagement: 'ライブ配信管理',
    nowExplaining: '現在解説中:',
    nextToExplain: '次に解説:',
    finished: '配信終了',
    nextSubtitle: '次の字幕',
  },
  topBanner: {
    logoSubtitle: 'AI配信アシスタント',
    help: 'ヘルプ',
    helpTitle: '使用ヘルプ',
    settings: '設定',
    settingsTitle: 'システム設定',
    logout: 'ログアウト',
    logoutTitle: '確認',
    logoutConfirm: 'ログアウトしてもよろしいですか？',
    logoutConfirmText: '確認',
    logoutCancelText: 'キャンセル',
    logoutSuccess: 'ログアウトしました！'
  },
}