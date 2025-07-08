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
        themeTitle: 'システム環境設定',
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
        finish: '完了',
        topBannerLayout: 'ナビゲーションバーのレイアウト',
        bannerDisperse: '分散',
        bannerGather: '集中',
        bannerLayout: 'ナビゲーションバーのレイアウト',
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
        },
        tutorial: {
            welcome: '抖音ライブ配信ツールへようこそ！',
            description: 'このツールの使い方を素早くご案内します',
            detail: 'このツールは抖音ライブ配信のストリームキーを取得し、簡単に配信を始めることができます。',
            step1_1: 'まず、抖音アカウント情報を設定しましょう。',
            step1_2: 'QRコードログインまたは手動入力を選択できます。',
            step2_1: '次に、配信設定を行います。',
            step2_2: '配信タイトルを設定し、カテゴリを選択すれば配信開始の準備完了です。',
            step3_1: '最後に、配信情報を取得します。',
            step3_2: '配信を開始すると、配信URLと配信キーが表示されます。',
            next: '次へ',
            finish: 'チュートリアル完了',
            skip: 'チュートリアルをスキップ'
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
        modelChanged: '選択されたモデルが変更されました:',
        live2dModelSwitched: 'Live2Dモデルが切り替えられました:',
        refreshInProgress: '更新操作が進行中です。しばらくお待ちください...',
        live2dPreviewRefreshed: 'Live2Dプレビューが更新されました',
        refreshPreviewFailed: 'プレビューの更新に失敗しました:',
        openaiApiError: 'OpenAI API呼び出しエラー:',
        generateSpeechError: '原稿生成エラー:',
        live2dIframeNotFound: 'Live2Dプレビューiframeが見つかりません',
    },
    streamingPage: {
        // 講稿/アウトライン/AI解説関連
        topicAndOutline: 'テーマ設定とアウトライン生成',
        inputLiveTopic: '配信テーマを入力してください',
        generating: '生成中...',
        generateOutline: 'アウトライン生成',
        inputOrEditOutline: 'ここで自作アウトラインも入力できます',
        processing: '処理中...',
        confirmTopicAndOutline: 'テーマとアウトラインを確認',
        outlineManagement: 'アウトライン管理',
        addNewSection: '新しいセクションを追加',
        generateOutlineFailed: 'アウトライン生成に失敗しました。再試行してください',
        processOutlineFailed: 'アウトライン処理に失敗しました。再試行してください',
        unnamedSection: '無名のセクション',
        generateContentFailed: 'セクション内容の生成に失敗しました。再試行してください',
        confirmDeleteSection: 'このセクションを削除しますか？',
        enterNewSectionTitle: '新しいセクションタイトルを入力してください：',
        aiSystemPrompt: 'あなたはプロの配信コンテンツアシスタントで、分かりやすく構造化された内容を生成するのが得意です。',
        generateOutlinePrompt: 'テーマ「{topic}」のために5～8章の配信アウトラインを生成してください。各章は短いタイトルでまとめてください。フォーマット：\n1. セクション1\n2. セクション2\n...',
        generateContentPrompt: '配信テーマ「{topic}」の「{sectionTitle}」セクションの詳細な解説内容を生成してください。内容は分かりやすく、自然な口調で、配信で読み上げやすいようにしてください。各文は短く、字幕表示に適したものにしてください。',
        apiCallFailed: 'API呼び出し失敗: {status} {statusText}',
        invalidApiResponse: '無効なAPIレスポンス形式',
        generatingContentFor: '現在生成中：',
        contentGenerationComplete: 'の内容生成が完了しました',
        regeneratingSectionContent: 'セクション内容を再生成中：',
        index: '（インデックス：',
        sectionContentComplete: 'セクション「{title}」の内容生成が完了しました。合計{count}文',
        sentencePlayed: '文の再生完了 - セクション: {blockIndex}, 文: {sentenceIndex}',
        generateSectionContentError: 'セクション「{title}」の内容生成エラー：',
        preGenerateNextSectionError: '次のセクション内容の事前生成エラー：',
        deleteAudioFilesFailed: '音声ファイルの削除に失敗：',
        deleteAudioFilesError: '音声ファイル削除エラー：',
        generateOutlineError: 'アウトライン生成エラー：',
        confirmOutlineError: 'アウトライン確認エラー：',
        generateContentError: '内容生成エラー：',
        apiCallError: 'API呼び出しエラー：',
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
        // 推流相关 key（保留自动补全内容）
        startStream: '配信開始',
        stopStream: '配信停止',
        streamSettings: '配信設定',
        streamKey: '配信キー',
        copyStreamKey: '配信キーをコピー',
        copied: 'コピー済み',
        streamUrl: '配信URL',
        selectPlatform: 'プラットフォームを選択',
        currentPlatform: '現在のプラットフォーム',
        streamStatus: '配信ステータス',
        streaming: '配信中',
        notStreaming: '未配信',
        startPreview: 'プレビュー開始',
        stopPreview: 'プレビュー停止',
        preview: 'プレビュー',
        bitrate: 'ビットレート',
        resolution: '解像度',
        fps: 'FPS',
        apply: '適用',
        reset: 'リセット',
        advancedSettings: '詳細設定',
        selectStreamModel: '配信モデルを選択',
        selectAudioInput: '音声入力を選択',
        selectVideoInput: '映像入力を選択',
        streamTitle: '配信タイトル',
        streamDescription: '配信説明',
        saveSettings: '設定を保存',
        saveSuccess: '保存成功',
        saveFailed: '保存失敗',
        error: 'エラーが発生しました',
        reconnect: '再接続',
        connectionLost: '接続が切断されました',
        connecting: '接続中',
        streamReady: '配信準備完了',
        streamNotReady: '配信未準備',
        pleaseSelect: '選択してください',
        loading: '読み込み中...',
        noAvailableModel: '利用可能なモデルなし',
        noAvailableAudio: '利用可能な音声なし',
        noAvailableVideo: '利用可能な映像なし',
        streamStartSuccess: '配信開始に成功しました',
        streamStopSuccess: '配信停止しました',
        streamStartFailed: '配信開始に失敗しました',
        streamStopFailed: '配信停止に失敗しました',
        confirmStopStream: '本当に配信を停止しますか？',
        yes: 'はい',
        no: 'いいえ',
        platformBilibili: 'ビリビリ',
        platformDouyin: '抖音',
        platformKuaishou: '快手',
        platformOther: 'その他',
        streamHealth: '配信の健全性',
        good: '良好',
        bad: '異常',
        unknown: '不明',
        streamDelay: '配信遅延',
        ms: 'ミリ秒',
        networkStatus: 'ネットワーク状態',
        stable: '安定',
        unstable: '不安定',
        streamInfo: '配信情報',
        streamLog: '配信ログ',
        clearLog: 'ログをクリア',
        logCleared: 'ログをクリアしました',
        openStreamPanel: '配信パネルを開く',
        closeStreamPanel: '配信パネルを閉じる',
        streamPanel: '配信パネル',
        streamPreview: '配信プレビュー',
        streamControl: '配信コントロール',
        streamMonitor: '配信モニター',
        streamRecord: '配信録画',
        startRecord: '録画開始',
        stopRecord: '録画停止',
        recordSuccess: '録画成功',
        recordFailed: '録画失敗',
        noRecord: '録画なし',
        recordList: '録画リスト',
        download: 'ダウンロード',
        delete: '削除',
        confirmDeleteRecord: 'この録画を削除しますか？',
        deleteSuccess: '削除成功',
        deleteFailed: '削除失敗',
        streamTips: '配信ヒント',
        streamHelp: '配信ヘルプ',
        openHelp: 'ヘルプを開く',
        closeHelp: 'ヘルプを閉じる',
        helpContent: 'ヘルプが必要な場合は、ドキュメントを参照するかサポートに連絡してください。',
        streamError: '配信エラー',
        retry: '再試行',
        streamReconnect: '配信再接続',
        streamReconnectSuccess: '再接続成功',
        streamReconnectFailed: '再接続失敗',
        streamEnd: '配信終了',
        streamStart: '配信開始',
        streamPaused: '配信一時停止',
        streamResumed: '配信再開',
        pause: '一時停止',
        resume: '再開',
        streamPausedByUser: 'ユーザーによって一時停止',
        streamResumedByUser: 'ユーザーによって再開',
        streamPausedByNetwork: 'ネットワーク問題で一時停止',
        streamResumedByNetwork: 'ネットワーク復旧、配信再開',
        streamPausedByPlatform: 'プラットフォーム理由で一時停止',
        streamResumedByPlatform: 'プラットフォーム復旧、配信再開',
        streamPausedUnknown: '不明な理由で一時停止',
        streamResumedUnknown: '不明な理由で再開',
        streamStatusUnknown: '配信ステータス不明',
        streamStatusNormal: '配信正常',
        streamStatusError: '配信異常',
        streamStatusWarning: '配信警告',
        streamStatusInfo: '配信情報',
        streamStatusCritical: '配信重大',
        streamStatusOffline: '配信オフライン',
        streamStatusOnline: '配信オンライン',
        streamStatusConnecting: '配信接続中',
        streamStatusReconnecting: '配信再接続中',
        streamStatusDisconnected: '配信切断',
        streamStatusStopped: '配信停止',
        streamStatusStarted: '配信開始',
        streamStatusPaused: '配信一時停止',
        streamStatusResumed: '配信再開',
        streamStatusEnded: '配信終了',
        streamStatusPending: '配信待機中',
        streamStatusPreparing: '配信準備中',
        streamStatusReady: '配信準備完了',
        streamStatusNotReady: '配信未準備',
        streamStatusUnknownError: '不明な配信エラー',
        streamStatusNetworkError: 'ネットワーク配信エラー',
        streamStatusPlatformError: 'プラットフォーム配信エラー',
        streamStatusUserError: 'ユーザー操作エラー',
        streamStatusOtherError: 'その他のエラー',
        streamStatusSuccess: '配信成功',
        streamStatusFail: '配信失敗',
        streamStatusRetry: '配信再試行',
        streamStatusReconnect: '配信再接続',
        streamStatusReconnectSuccess: '再接続成功',
        streamStatusReconnectFail: '再接続失敗',
        streamStatusEnd: '配信終了',
        streamStatusStart: '配信開始',
        streamStatusPause: '配信一時停止',
        streamStatusResume: '配信再開',
        streamStatusStop: '配信停止',
        streamStatusRecord: '配信録画',
        streamStatusDownload: '配信ダウンロード',
        streamStatusDelete: '配信削除',
        streamStatusHelp: '配信ヘルプ',
        streamStatusTips: '配信ヒント',
        streamStatusLog: '配信ログ',
        streamStatusPanel: '配信パネル',
        streamStatusPreview: '配信プレビュー',
        streamStatusControl: '配信コントロール',
        streamStatusMonitor: '配信モニター',
        streamStatusRecordList: '録画リスト',
        streamStatusNoRecord: '録画なし',
        streamStatusRecordSuccess: '録画成功',
        streamStatusRecordFail: '録画失敗',
        streamStatusRecordDelete: '録画削除',
        streamStatusRecordDownload: '録画ダウンロード',
        streamStatusRecordHelp: '録画ヘルプ',
        streamStatusRecordTips: '録画ヒント',
        streamStatusRecordLog: '録画ログ',
        streamStatusRecordPanel: '録画パネル',
        streamStatusRecordPreview: '録画プレビュー',
        streamStatusRecordControl: '録画コントロール',
        streamStatusRecordMonitor: '録画モニター',
        streamStatusRecordListPanel: '録画リストパネル',
        streamStatusRecordListNoRecord: 'パネルに録画なし',
        streamStatusRecordListSuccess: 'パネル成功',
        streamStatusRecordListFail: 'パネル失敗',
        streamStatusRecordListDelete: 'パネル削除',
        streamStatusRecordListDownload: 'パネルダウンロード',
        streamStatusRecordListHelp: 'パネルヘルプ',
        streamStatusRecordListTips: 'パネルヒント',
        streamStatusRecordListLog: 'パネルログ',
        streamStatusRecordListPanelTitle: 'パネルタイトル',
        streamStatusRecordListPanelContent: 'パネル内容',
        streamStatusRecordListPanelHelp: 'パネルヘルプ',
        streamStatusRecordListPanelTips: 'パネルヒント',
        streamStatusRecordListPanelLog: 'パネルログ',
        streamStatusRecordListPanelPreview: 'パネルプレビュー',
        streamStatusRecordListPanelControl: 'パネルコントロール',
        streamStatusRecordListPanelMonitor: 'パネルモニター',
        streamStatusRecordListPanelNoRecord: 'ヘルプに録画なし',
        streamStatusRecordListPanelSuccess: 'ヘルプ成功',
        streamStatusRecordListPanelFail: 'ヘルプ失敗',
        streamStatusRecordListPanelDelete: 'ヘルプ削除',
        streamStatusRecordListPanelHelpDownload: 'ヘルプダウンロード',
    },
    topBanner: {
        subtitle: 'AI配信アシスタント',
        help: {
            text: 'ヘルプ',
            tooltip: '使用ヘルプ'
        },
        settings: {
            text: '設定',
            tooltip: 'システム設定'
        },
        logout: {
            text: 'ログアウト',
            tooltip: 'ログイン終了',
            confirmTitle: '確認',
            confirmMessage: 'ログアウトしてもよろしいですか？',
            confirmButton: '確認',
            cancelButton: 'キャンセル',
            successMessage: 'ログアウトしました！'
        }
    },

    // ModelSelector component
    modelSelector: {
        switchModel: 'モデル切り替え',
        referenceAudio: '参考音声',
        currentAudio: '(現在)',
        switchReferenceAudio: '参考音声切り替え',
        currentModelPair: '現在のモデルペア:',
        currentRefAudio: '現在の参考音声:',
        none: 'なし',
        generateSampleVoice: 'サンプル音声生成',
        generatingSample: 'サンプル音声生成中...',
        switchAudioSuccess: '参考音声の切り替えに成功しました！',
        selectModel: 'モデルを選択してください',
        switchModelSuccess: 'モデルの切り替えに成功しました！',
        generateSampleFailed: 'サンプル音声の生成に失敗しました',
        sampleText: 'こんにちは、これはサンプル音声です。おはようございます、こんにちは、こんばんは。'
    },

    // 共通ファイル操作
    fileOperations: {
        chooseFile: 'ファイル選択',
        noFileSelected: 'ファイルが選択されていません',
        selectFiles: 'ファイル選択',
        dragAndDrop: 'ファイルをここにドラッグ＆ドロップするか、クリックして選択',
        fileSelected: 'ファイルが選択されました',
        filesSelected: 'ファイルが選択されました'
    },

    // 共通入力プレースホルダー
    inputPlaceholders: {
        keywords: 'キーワードを入力してください、例：サイバーパンク2077、パッチ、アップデート',
        keywordsSeparator: 'カンマで区切ってください'
    },

    // streamConfig component
    streamConfig: {
        title: '配信プラットフォーム選択と配信キー',
        subtitle: '配信プラットフォームを選択し、配信キーを入力してください',
        selectPlatform: '配信プラットフォームを選択',
        streamUrl: '配信URL:',
        streamUrlPlaceholder: '配信URLを入力',
        streamKey: '配信キー:',
        streamKeyPlaceholder: '配信キーを入力',
        testConnection: '接続テスト',
        getStreamKeyTool: '配信キー取得ツール',
        stopLive: '配信停止',
        // プラットフォームツール名
        platformTools: {
            bilibili: 'B站配信キー取得ツール',
            douyin: '抖音配信キー取得ツール',
            xiaohongshu: '小紅書配信キー取得ツール',
            kuaishou: '快手配信キー取得ツール',
            youtube: 'YouTube配信キー取得ツール',
            twitch: 'Twitch配信キー取得ツール'
        },
        // デフォルト配信URL
        defaultUrls: {
            bilibili: 'rtmp://live-push.bilivideo.com/live-bvc/',
            douyin: 'rtmp://push-rtmp-13.douyincdn.com/third/',
            xiaohongshu: 'rtmp://live-push.xhscdn.com/live/',
            kuaishou: 'rtmp://aliyun-open-push.voip.yximgs.com/gifshow/'
        },
        // エラーメッセージ
        errors: {
            userCancelled: 'ユーザーがキャプチャをキャンセルしたか、ブラウザがサポートされていません',
            websocketFailed: 'WebSocket接続に失敗しました',
            routeNotFound: '対応するプラットフォームのルートが見つかりません'
        }
    },
    help: {
        title: 'StreamCreamご利用ガイド',
        subtitle: 'AI配信アシスタントの完全な使い方',
        quickStart: 'クイックスタート',
        mainPageFeatures: 'メインページの機能',
        streamKeyPage: '配信キー取得ページ',
        settingsPage: '設定ページ',
        streamingPage: '配信ページ',
        faq: 'よくある質問',
        techSupport: '技術サポート',
        back: '戻る',
        step1: {
            title: 'システムにログイン',
            content: 'StreamCreamのホームページを開き、右上の「ログイン」ボタンをクリックします。アカウントとパスワードを入力して「ログイン」をクリックしてシステムに入ります。アカウントがない場合は「登録」をクリックし、メールアドレスやパスワードなどを入力して登録を完了してください。'
        },
        step2: {
            title: '設定を構成',
            content: '「設定」ページに入り、「AI設定」エリアでモデルプロバイダー（OpenAI、Claudeなど）を選択し、APIキーを入力します。「配信設定」エリアで配信プラットフォーム（例：ビリビリ）を選択し、配信アドレスや配信キー、解像度やFPSなどを設定します。必要に応じてバナー色やデバッグモードもカスタマイズできます。'
        },
        step3: {
            title: '音声ライブラリとLive2Dモデルの選択',
            content: 'メインページの「音声ライブラリ選択」エリアで、トレーニング済みのGPT/SoVITSモデルや参考音声を選択またはアップロードします。「Live2Dモデル」エリアで、バーチャルキャラクターモデルを選択またはアップロードし、リアルタイムでプレビューできます。'
        },
        step4: {
            title: 'AI原稿生成とテスト',
            content: '「AI原稿生成」エリアで原稿テーマを入力し、スタイルを選択して「原稿生成」をクリックします。下部でAIが生成した原稿内容をプレビュー・テストできます。'
        },
        step5: {
            title: '配信を開始',
            content: 'メインページですべての設定を確認したら、「配信開始」ボタンをクリックします。配信ページではLive2Dキャラクター、AI音声、原稿管理などの機能が表示されます。リアルタイムでコメントを送信したり、視聴者と交流したり、いつでも配信を停止できます。'
        },
        voiceLibrary: {
            title: '音声ライブラリ選択',
            modelSelection: 'モデル選択：ドロップダウンからトレーニング済みのGPT・SoVITSモデルを選択',
            referenceAudio: '参考音声：音声合成用の参考音声ファイルを選択',
            uploadModel: 'モデルアップロード：.ckpt（GPT）や.pth（SoVITS）ファイルのアップロードに対応',
            generateExample: 'サンプル生成：「サンプル音声生成」をクリックして現在のモデル効果をテスト'
        },
        live2dModel: {
            title: 'Live2Dモデル',
            modelSelection: 'モデル選択：さまざまなLive2Dバーチャルキャラクターを選択',
            customModel: 'カスタムモデル：.model3.json形式のLive2Dモデルをアップロード',
            realTimePreview: 'リアルタイムプレビュー：右側のプレビューエリアでモデル効果を確認'
        },
        streamingConfig: {
            title: '配信設定',
            platformSelection: 'プラットフォーム選択：配信プラットフォーム（ビリビリ、抖音など）を選択',
            streamSettings: '配信設定：配信アドレスや配信キーを設定',
            resolutionSettings: '解像度設定：配信解像度やFPSを選択',
            backgroundSettings: '背景設定：配信背景を選択またはアップロード'
        },
        aiScriptGeneration: {
            title: 'AI原稿生成',
            topicInput: 'テーマ入力：原稿テーマを入力',
            styleSelection: 'スタイル選択：原稿スタイル（カジュアル、プロフェッショナル、可愛いなど）を選択',
            generateScript: '原稿生成：AI原稿を生成',
            testFunction: 'テスト機能：生成した原稿の効果をテスト'
        },
        streamKeyProcess: {
            title: '配信キー取得フロー',
            accountSetup: 'アカウント設定：「アカウント設定」ページでCookiesインポートやQRコードログインを完了してください。',
            autoGet: '自動取得：「配信設定」ページに切り替えると、システムが自動的にビリビリの配信キーと配信サーバーアドレスを取得・表示します。',
            securityTip: 'セキュリティヒント：配信キーは今回の配信のみ有効です。他人に漏らさないでください。',
            troubleshooting: 'トラブルシューティング：配信キー取得に失敗した場合は、アカウント状態を確認するか再度ログインしてください。'
        },
        debugSettings: {
            title: 'デバッグ設定',
            debugMode: 'デバッグモード：オン/オフ切り替え',
            resetSettings: '設定リセット：すべての設定をリセット',
            bannerColor: 'バナー色：トップバナーの色をカスタマイズ'
        },
        aiSettings: {
            title: 'AI設定',
            modelProvider: 'モデルプロバイダー：AIサービスプロバイダー（OpenAI、Claudeなど）を選択',
            apiKey: 'APIキー：APIアクセスキーを設定',
            modelName: 'モデル名：具体的なAIモデルを選択',
            customEndpoint: 'カスタムエンドポイント：カスタムAPIエンドポイントを設定'
        },
        liveSettings: {
            title: '配信設定',
            resolution: '解像度：配信解像度（1920x1080など）を設定',
            fps: 'FPS：配信フレームレートを設定（30fps/60fps）',
            background: '背景：配信背景を選択またはアップロード',
            streamInfo: '配信情報：配信アドレスや配信キーを設定'
        },
        streamingFeatures: {
            title: '配信画面の機能',
            live2dDisplay: 'Live2D表示：Live2Dバーチャルキャラクターをリアルタイムで表示',
            voiceSynthesis: '音声合成：テキストを音声に変換し、口パクと同期',
            scriptManagement: '原稿管理：AI生成原稿の管理と再生',
            realTimeInteraction: 'リアルタイム交流：リアルタイム音声入力と応答に対応',
            streamControl: '配信コントロール：配信の開始/停止を管理'
        },
        faq1: {
            question: 'Q: カスタム音声モデルをアップロードするには？',
            answer: 'A: メインページの「音声ライブラリ選択」エリアで「ファイル選択」ボタンをクリックし、.ckpt（GPTモデル）または.pth（SoVITSモデル）ファイルを選択し、「音声モデルを適用」をクリックしてください。'
        },
        faq2: {
            question: 'Q: 配信情報を設定するには？',
            answer: 'A: 設定ページの「配信設定」エリアで配信プラットフォームを選択し、配信アドレスや配信キーを入力してください。「配信キー取得」ボタンで自動取得も可能です。'
        },
        faq3: {
            question: 'Q: AI原稿を生成するには？',
            answer: 'A: メインページの「AI原稿生成テスト」エリアで原稿テーマを入力し、スタイルを選択して「原稿生成」ボタンをクリックしてください。'
        },
        faq4: {
            question: 'Q: Live2Dモデルを切り替えるには？',
            answer: 'A: メインページの「Live2Dモデル選択」エリアでドロップダウンからモデルを選択するか、カスタムの.model3.jsonファイルをアップロードしてください。'
        },
        faq5: {
            question: 'Q: AIモデルを設定するには？',
            answer: 'A: 設定ページの「AI設定」エリアでモデルプロバイダーを選択し、APIキーを入力し、具体的なモデル名を選択してください。'
        },
        supportInfo: {
            title: 'ご利用中に問題が発生した場合は、以下をご確認ください：',
            checkNetwork: 'ネットワーク接続が正常か確認',
            checkApiKey: 'APIキーの設定が正しいか確認',
            checkConsole: 'ブラウザのコンソールエラーを確認',
            restartServices: '関連バックエンドサービスを再起動'
        }
    },
    youtube: {
        title: 'YouTubeライブ配信プラットフォーム',
        subtitle: 'プロフェッショナルなYouTubeライブ配信キー取得・管理ツール',
        comingSoon: '近日公開',
        description: 'YouTubeライブ配信プラットフォーム機能は開発中です。お楽しみに',
        // YouTube配信キー取得ガイド
        streamKeyGuide: {
            title: 'YouTubeライブ配信キーの取得方法',
            description: '以下はYouTube配信キー（Stream Key）を取得する手順です：',
            steps: {
                step1: '{youtube}にログインし、右上のカメラアイコンをクリックして「ライブ配信を開始」を選択します。',
                step2: '初回使用の場合、アカウント認証（電話番号の連携など）が必要で、ライブ配信機能の有効化まで24時間待つ必要があります。',
                step3: 'ライブコントロールパネルで、左側メニューの「配信」をクリックします。',
                step4: '「エンコーダー設定」の下に、以下の2つの項目が表示されます：',
                step5: '「表示」ボタンをクリックして完全な配信キーを表示し、コピーします。配信ソフトウェアに貼り付けてライブ配信できます。'
            },
            streamInfo: {
                streamUrl: '配信URL（Stream URL）',
                streamUrlExamplePrefix: '例：',
                streamKey: '配信キー（Stream Key）',
                streamKeyExamplePrefix: 'ランダム生成された文字列、例：',
                streamUrlExample: 'rtmp://a.rtmp.youtube.com/live2',
                streamKeyExample: 'abcd-efgh-ijkl-mnop'
            },
            warning: {
                title: '注意',
                content: '配信キーを公開しないでください。他の人があなたのアカウントでライブ配信する可能性があります！'
            },
            tip: '配信キーと配信アドレスを取得した後、ライブ配信プラットフォームとして「YouTube」を選択し、配信キーと配信アドレスを貼り付けてください。'
        }
    },
    xiaohongshu: {
        title: "小紅書ライブ",
        subtitle: "ワンストップ小紅書ライブ配信管理",
        tabs: {
            account: { name: "アカウント設定", description: "アカウントログインと認証" },
            live: { name: "ライブ設定", description: "ライブ構成と管理" }
        },
        account: {
            manualInput: "アカウント情報の手動入力",
            userId: "ユーザーID",
            userIdPlaceholder: "小紅書ユーザーIDを入力してください",
            token: "トークン",
            tokenPlaceholder: "トークンを入力してください",
            saveSettings: "設定を保存",
            viewHelp: "ヘルプを見る"
        },
        live: {
            title: "ライブ設定",
            titleInput: "ライブタイトル",
            titlePlaceholder: "ライブタイトルを入力してください",
            updateTitle: "タイトルを更新",
            streamKey: "配信キー",
            getStreamKey: "配信キーを取得",
            sendBullet: "弾幕を送信",
            bulletInput: "弾幕内容",
            bulletPlaceholder: "弾幕内容を入力してください",
            startLive: "ライブ開始",
            operationLog: "操作ログ",
            noLogs: "ログはありません"
        },
        help: {
            title: "ヘルプドキュメント"
        }
    },
    twitch: {
        streamKeyGuide: {
            title: 'Twitch配信キーの取得方法',
            description: '以下の手順でTwitch配信キー（Stream Key）を取得できます：',
            steps: {
                step1: '{twitch}にログインし、アカウントにアクセスします。',
                step2: '右上のアイコンをクリックし、<strong>「クリエイターダッシュボード」</strong>を選択します。',
                step3: '左側メニューで<strong>「設定」</strong> &gt; <strong>「配信」</strong>をクリックします。',
                step4: '「配信キーと設定」セクションで、<strong>「プライマリ配信キー」</strong>を見つけ、「表示」をクリックして配信キーを確認します。',
                step5: '「コピー」をクリックし、配信ソフトに貼り付けて配信を開始します。'
            },
            warning: {
                title: '注意',
                content: '配信キーを他人に教えないでください。他人があなたのアカウントで配信する恐れがあります。漏洩した場合はページでリセットできます。'
            },
            tip: '配信キーと配信URLを取得したら、配信プラットフォームで「Twitch」を選択し、貼り付けてください。'
        }
    }
}