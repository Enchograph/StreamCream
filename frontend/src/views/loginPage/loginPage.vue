<template>
    <TopBanner />
    <div class="page-container">
        <div class="page-bg-animated"></div>
        <div class="app-container">
            <div class="container" :class="{ active: isRegistering }">
                <div class="toggle-container">
                    <button class="toggle-btn" @click="toggleForm">{{ isRegistering ? '登录' : '注册' }}</button>
                </div>

             <!-- 登录表单 -->
                <div class="form-container login-container">
                    <h1>登录</h1>
                    <div class="input-group">
                        <!-- <label for="loginUsername">用户名</label> -->
                        <input
                            type="text"
                            id="loginUsername"
                            v-model="loginForm.username"
                            @keyup.enter="handleLogin"
                            :style="loginErrors.username ? errorInputStyle : {}"
                            required
                            placeholder="请输入用户名"
                        >
                    </div>
                    <div class="error-message" v-if="loginErrors.username">{{ loginErrors.username }}</div>

                    <div class="input-group" style="position: relative;">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            id="loginPassword"
                            v-model="loginForm.password"
                            @keyup.enter="handleLogin"
                            :style="loginErrors.password ? errorInputStyle : {}"
                            required
                            placeholder="请输入密码"
                        >
                        <button
                            type="button"
                            class="toggle-password-btn"
                            @click="showPassword = !showPassword"
                            :aria-label="showPassword ? '隐藏密码' : '显示密码'"
                            style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;"
                        >
                            <span v-if="showPassword">👁️</span>
                            <span v-else>🙈</span>
                        </button>
                    </div>
                    <div class="error-message" v-if="loginErrors.password">{{ loginErrors.password }}</div>

                    <button class="btn" @click="handleLogin">登录</button>

                    <div class="forgot-password">
                        <a href="#">忘记密码?</a>
                    </div>
                    <hr class="divider" />
                    <div class="other-login-tip">其他方式登录</div>
                    <div class="social-login">
                        <div class="social-icon facebook">
                            <i>f</i>
                        </div>
                        <div class="social-icon google">
                            <i>G</i>
                        </div>
                        <div class="social-icon twitter">
                            <i>t</i>
                        </div>
                    </div>
                    
                </div>

                <!-- 注册表单 -->
                <div class="form-container register-container">
                    <h1>注册</h1>
                    <div class="input-group">
                        <!-- <label for="registerUsername">用户名</label> -->
                        <input
                            type="text"
                            id="registerUsername"
                            v-model="registerForm.username"
                            @keyup.enter="handleRegister"
                            :style="registerErrors.username ? errorInputStyle : {}"
                            required
                            placeholder="请输入用户名"
                        >
                    </div>
                    <div class="error-message" v-if="registerErrors.username">{{ registerErrors.username }}</div>

                    <div class="input-group">
                        <input
                            type="email"
                            id="registerEmail"
                            v-model="registerForm.email"
                            @keyup.enter="handleRegister"
                            :style="registerErrors.email ? errorInputStyle : {}"
                            required
                            placeholder="请输入邮箱"
                        >
                    </div>
                    <div class="error-message" v-if="registerErrors.email">{{ registerErrors.email }}</div>

                    <div class="input-group" style="position: relative;">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            id="registerPassword"
                            v-model="registerForm.password"
                            @keyup.enter="handleRegister"
                            :style="registerErrors.password ? errorInputStyle : {}"
                            required
                            placeholder="请输入密码"
                        >
                        <button
                            type="button"
                            class="toggle-password-btn"
                            @click="showPassword = !showPassword"
                            :aria-label="showPassword ? '隐藏密码' : '显示密码'"
                            style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;"
                        >
                            <span v-if="showPassword">👁️</span>
                            <span v-else>🙈</span>
                        </button>
                    </div>
                    <div class="error-message" v-if="registerErrors.password">{{ registerErrors.password }}</div>

                    <div class="input-group">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            id="confirmPassword"
                            v-model="registerForm.confirmPassword"
                            @keyup.enter="handleRegister"
                            :style="registerErrors.confirmPassword ? errorInputStyle : {}"
                            required
                            placeholder="请确认密码"
                        >
                    </div>
                    <div class="error-message" v-if="registerErrors.confirmPassword">
                        {{ registerErrors.confirmPassword }}
                    </div>

                    <button class="btn" @click="handleRegister">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '/src/stores/auth.js'
import {useRoute} from 'vue-router'
import api from '/src/api/index.js'
import TopBanner from '/src/components/TopBanner.vue'

export default {
    name: 'loginPage',
    components: { TopBanner },
    setup() {

        const auth = useAuthStore();
        const router = useRouter();
        const route = useRoute();
        // 定义响应式状态
        const isRegistering = ref(false);
        const backgroundStyle = computed(() => {
            return isRegistering.value
                ? 'linear-gradient(135deg, #ff9a9e, #fad0c4)'
                : 'linear-gradient(135deg, #667eea, #764ba2)';
        });

        // 监听状态变化，更新背景样式
        watch(isRegistering, (newValue) => {
            document.body.style.background = backgroundStyle.value;
        });

        // 错误样式
        const errorInputStyle = {
            boxShadow: '0 2px 5px rgba(231, 76, 60, 0.3)',
            border: '1px solid #e74c3c'
        };

        // 登录表单数据
        const loginForm = reactive({
            username: '',
            password: ''
        });

        // 注册表单数据
        const registerForm = reactive({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        // 表单错误信息
        const loginErrors = reactive({
            username: '',
            password: ''
        });

        const registerErrors = reactive({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        // 切换表单方法
        const toggleForm = () => {
            isRegistering.value = !isRegistering.value;
            // 清除表单和错误提示
            clearForms();
        };

        // 登录处理
        const handleLogin = async () => {
            let isValid = true;

            // 验证用户名
            if (loginForm.username.trim() === '') {
                loginErrors.username = '请输入用户名';
                isValid = false;
            } else {
                loginErrors.username = '';
            }

            // 验证密码
            if (loginForm.password.trim() === '') {
                loginErrors.password = '请输入密码';
                isValid = false;
            } else {
                loginErrors.password = '';
            }

            if (isValid) {
                try {
                    // 发送登录请求
                    const response = await api.login({
                        username: loginForm.username,
                        password: loginForm.password
                    })
                    
                    if (response.success) {
                        // 保存 token
                        localStorage.setItem('token', response.token)
                        auth.login(response.token)
                        
                        // 获取用户信息
                        const userResponse = await api.getProtectedData()
                        if (userResponse.success) {
                            auth.setUser(userResponse.user)
                        }

                        // 获取用户偏好
                        try {
                            const prefRes = await api.getPreferences()
                            if (prefRes && typeof prefRes === 'object') {
                                // aiSettings
                                if ('aiSettings' in prefRes) {
                                    localStorage.setItem('aiSettings', JSON.stringify(prefRes.aiSettings));
                                }
                                // debugMode
                                if ('debugMode' in prefRes) {
                                    localStorage.setItem('debugMode', prefRes.debugMode)
                                }
                                // bannerColor
                                if ('bannerColor' in prefRes) {
                                    localStorage.setItem('bannerColor', prefRes.bannerColor)
                                }
                                // resolution
                                if ('resolution' in prefRes) {
                                    localStorage.setItem('resolution', prefRes.resolution)
                                }
                                // 可扩展更多设置项
                            }
                        } catch (e) {
                            // 忽略偏好获取失败
                        }
                        
                        alert('登录成功！');
                        // 修复重定向问题
                        const redirect = route.query.redirect || '/mainPage';
                        router.push(redirect);
                        clearForms();
                    } else {
                        alert(response.message || '登录失败')
                    }
                } catch (error) {
                    console.error('登录失败:', error)
                    alert('登录失败: ' + (error.message || '服务器错误'))
                }
            }
        };

        // 注册处理
        const handleRegister = async () => {
            let isValid = true;

            // 验证用户名
            if (registerForm.username.trim() === '') {
                registerErrors.username = '请输入用户名';
                isValid = false;
            } else if (registerForm.username.length < 3) {
                registerErrors.username = '用户名长度至少为3个字符';
                isValid = false;
            } else {
                registerErrors.username = '';
            }

            // 验证邮箱
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (registerForm.email.trim() === '') {
                registerErrors.email = '请输入邮箱';
                isValid = false;
            } else if (!emailRegex.test(registerForm.email)) {
                registerErrors.email = '请输入有效的邮箱地址';
                isValid = false;
            } else {
                registerErrors.email = '';
            }

            // 验证密码
            if (registerForm.password.trim() === '') {
                registerErrors.password = '请输入密码';
                isValid = false;
            } else if (registerForm.password.length < 6) {
                registerErrors.password = '密码长度至少为6个字符';
                isValid = false;
            } else {
                registerErrors.password = '';
            }

            // 验证确认密码
            if (registerForm.confirmPassword.trim() === '') {
                registerErrors.confirmPassword = '请确认密码';
                isValid = false;
            } else if (registerForm.confirmPassword !== registerForm.password) {
                registerErrors.confirmPassword = '两次输入的密码不一致';
                isValid = false;
            } else {
                registerErrors.confirmPassword = '';
            }

            if (isValid) {
                try {
                    // 发送注册请求
                    const response = await api.register({
                        username: registerForm.username,
                        email: registerForm.email,
                        password: registerForm.password
                    })
                    
                    if (response.success) {
                        alert('注册成功！');
                        isRegistering.value = false;
                        clearForms();
                        
                        // 自动登录
                        await handleLogin()
                    } else {
                        alert(response.message || '注册失败')
                    }
                } catch (error) {
                    console.error('注册失败:', error)
                    alert('注册失败: ' + (error.message || '服务器错误'))
                }
            }
        };

        // 清除表单和错误提示
        const clearForms = () => {
            // 清除登录表单
            loginForm.username = '';
            loginForm.password = '';
            loginErrors.username = '';
            loginErrors.password = '';

            // 清除注册表单
            registerForm.username = '';
            registerForm.email = '';
            registerForm.password = '';
            registerForm.confirmPassword = '';
            registerErrors.username = '';
            registerErrors.email = '';
            registerErrors.password = '';
            registerErrors.confirmPassword = '';
        };

        // 保留原有路由功能
        const goToNextPage = function () {
            this.$router.push('/mainPage');
        };

        // 组件挂载时设置初始背景
        document.body.style.background = backgroundStyle.value;

        return {
            isRegistering,
            backgroundStyle,
            errorInputStyle,
            loginForm,
            registerForm,
            loginErrors,
            registerErrors,
            toggleForm,
            handleLogin,
            handleRegister,
            clearForms,
            goToNextPage,
            showPassword: ref(false), // 添加 showPassword 状态
        };
    },
    methods: {
        // 保留原有方法作为备份，这部分可以和setup中的方法合并
        goToNextPage() {
            this.$router.push('/mainPage');
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

.page-container {
    position: relative;
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* 色彩流动背景动画 */
.page-bg-animated {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background: linear-gradient(120deg, #667eea, #ff9a9e, #fad0c4, #764ba2, #43e97b, #38f9d7, #667eea 90%);
    background-size: 300% 300%;
    animation: gradientFlow 18s cubic-bezier(0.4,0.2,0.2,1) infinite alternate;
    filter: blur(0px);
}

@keyframes gradientFlow {
    0% {background-position: 0% 50%;}
    25% {background-position: 50% 100%;}
    50% {background-position: 100% 50%;}
    75% {background-position: 50% 0%;}
    100% {background-position: 0% 50%;}
}

.app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-height: 0;
}

.container {
    position: relative;
    width: 400px;
    height: 500px;
    background: rgba(255, 255, 255, 0.35); /* 降低透明度 */
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    /* 高斯模糊效果 */
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.3);
    z-index: 1;
    justify-content: center;
    align-items: center;
}

.form-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    transition: transform 0.6s ease-in-out;
}

.login-container {
    transform: translateX(0);
    z-index: 1;
}

.register-container {
    transform: translateX(100%);
    z-index: 0;
}

.container.active .login-container {
    transform: translateX(-100%);
    z-index: 0;
}

.container.active .register-container {
    transform: translateX(0);
    z-index: 1;
}

h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
}

.input-group {
    position: relative;
    width: 100%;
    margin-bottom: 25px;
}

.input-group input {
    width: 100%;
    padding: 12px 15px;
    background: #f8f9fa;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.input-group input:focus {
    outline: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: #fff;
}

.input-group label {
    position: absolute;
    top: -10px;
    left: 15px;
    background: #fff;
    padding: 0 5px;
    font-size: 14px;
    color: #666;
    border-radius: 3px;
}

.btn {
    width: 100%;
    padding: 12px;
    background: #6c63ff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(108, 99, 255, 0.3);
    transition: all 0.3s ease;
}

.btn:hover {
    background: #5a52e0;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(108, 99, 255, 0.4);
}

.btn:active {
    transform: translateY(0);
}

.toggle-container {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
}

.toggle-btn {
    background: transparent;
    border: none;
    color: #6c63ff;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.toggle-btn:hover {
    color: #5a52e0;
    transform: scale(1.05);
}

.forgot-password {
    margin-top: 15px;
    text-align: center;
}

.forgot-password a {
    color: #6c63ff;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
}

.forgot-password a:hover {
    color: #5a52e0;
    text-decoration: underline;
}

.social-login {
    display: flex;
    justify-content: center;
    margin-top: 10px; /* 缩小与上方的间距 */
}

.social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    cursor: pointer;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
}

.social-icon:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

.facebook {
    background: #3b5998;
}

.google {
    background: #db4437;
}

.twitter {
    background: #1da1f2;
}

.social-icon i {
    color: white;
    font-size: 18px;
}

.error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: -15px;
    margin-bottom: 15px;
}

.next-step-button {
    margin-top: 20px;
    padding: 12px 30px;
    background: #6c63ff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(108, 99, 255, 0.3);
    transition: all 0.3s ease;
}

.next-step-button:hover {
    background: #5a52e0;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(108, 99, 255, 0.4);
}

.next-step-button:active {
    transform: translateY(0);
}

.divider {
    border: none;
    border-top: 1px solid #eee;
    margin: 16px 0 8px 0; /* 缩小上下间距 */
    width: 100%;
}

.other-login-tip {
    color: #aaa;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;   /* 缩小上间距 */
    margin-bottom: 6px; /* 缩小下间距 */
    letter-spacing: 1px;
}
</style>
