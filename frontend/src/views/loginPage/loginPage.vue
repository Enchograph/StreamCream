<template>
    <TopBanner />
    <div class="page-container">
        <div class="page-bg-animated"></div>
        <div class="welcome-message">
            <h2>欢迎使用StreamCream</h2>
        </div>
        <div class="app-container">
            <!-- 表单内容 -->
            <div class="container" :class="{ active: isRegistering }">
                <div class="toggle-container">
                    <button class="toggle-btn" @click="toggleForm" :disabled="isLoading">
                        {{ isRegistering ? '登录' : '注册' }}
                    </button>
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
                            @keyup.enter="!isLoading && handleLogin()"
                            :style="loginErrors.username ? errorInputStyle : {}"
                            required
                            placeholder="请输入用户名"
                            :disabled="isLoading"
                        >
                    </div>
                    <div class="error-message" v-if="loginErrors.username">{{ loginErrors.username }}</div>

                    <div class="input-group">
                        <el-input
                            type="password"
                            id="loginPassword"
                            v-model="loginForm.password"
                            @keyup.enter="!isLoading && handleLogin()"
                            :style="loginErrors.password ? errorInputStyle : {}"
                            required
                            placeholder="请输入密码"
                            :disabled="isLoading"
                            show-password
                        />
                    </div>
                    <div class="error-message" v-if="loginErrors.password">{{ loginErrors.password }}</div>

                    <button class="btn" @click="handleLogin" :disabled="isLoading">
                        <span v-if="isLoading" class="loading-spinner"></span>
                        {{ isLoading ? '登录中...' : '登录' }}
                    </button>

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

                    <div class="input-group">
                        <el-input
                            type="password"
                            id="registerPassword"
                            v-model="registerForm.password"
                            @keyup.enter="!isLoading && handleRegister()"
                            :style="registerErrors.password ? errorInputStyle : {}"
                            required
                            placeholder="请输入密码"
                            :disabled="isLoading"
                            show-password
                        />
                    </div>
                    <div class="error-message" v-if="registerErrors.password">{{ registerErrors.password }}</div>

                    <div class="input-group">
                        <el-input
                            type="password"
                            id="confirmPassword"
                            v-model="registerForm.confirmPassword"
                            @keyup.enter="!isLoading && handleRegister()"
                            :style="registerErrors.confirmPassword ? errorInputStyle : {}"
                            required
                            placeholder="请确认密码"
                            :disabled="isLoading"
                            show-password
                        />
                    </div>
                    <div class="error-message" v-if="registerErrors.confirmPassword">
                        {{ registerErrors.confirmPassword }}
                    </div>

                    <button class="btn" @click="handleRegister">注册</button>
                </div>
            </div>
        </div>
        <footer class="footer">
            <p>© 2025 Made by DeepSleep. All rights reserved.</p>
        </footer>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '/src/stores/auth.js'
import {useRoute} from 'vue-router'
import api from '/src/api/index.js'
import TopBanner from '/src/components/TopBanner.vue'
import { ElMessage } from 'element-plus'
import { ElInput } from 'element-plus'

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

// 密码强度状态
const passwordStrength = reactive({
    score: 0,
    message: '',
    className: ''
});

// 切换表单方法
const toggleForm = () => {
    isRegistering.value = !isRegistering.value;
    clearForms();
};

const isLoading = ref(false);

// 登录处理
const handleLogin = async () => {
    if (isLoading.value) return;
    
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
        isLoading.value = true;
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
                
                ElMessage.success({
                    message: '登录成功！',
                    duration: 2500,
                    type: 'success'
                });
                // 修复重定向问题
                const redirect = route.query.redirect || '/mainPage';
                router.push(redirect);
                clearForms();
            } else {
                ElMessage.error({
                    message: response.message || '登录失败',
                    duration: 3500,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('登录失败:', error)
            ElMessage({
                message: '登录失败: ' + (error.message || '服务器错误'),
                type: 'error',
                duration: 3000
            });
        } finally {
            isLoading.value = false;
        }
    }
};

// 检查密码强度
const checkPasswordStrength = () => {
    const password = registerForm.password;
    
    // 如果密码为空，重置强度
    if (!password) {
        passwordStrength.score = 0;
        passwordStrength.message = '';
        passwordStrength.className = '';
        return;
    }

    // 定义检查规则
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    // 计算强度分数
    let score = 0;
    if (length >= 6) score++;
    if (length >= 8) score++;
    if (hasLower && hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    if (length >= 12) score++;

    // 根据分数设置强度等级
    let message = '';
    let className = '';
    
    if (length < 6) {
        score = 1;
        message = '密码太短';
        className = 'very-weak';
    } else if (score <= 2) {
        message = '弱';
        className = 'weak';
    } else if (score <= 3) {
        message = '中等';
        className = 'medium';
    } else if (score <= 4) {
        message = '强';
        className = 'strong';
    } else {
        message = '非常强';
        className = 'very-strong';
    }

    // 更新密码强度状态
    passwordStrength.score = Math.min(4, score);
    passwordStrength.message = message;
    passwordStrength.className = className;
};

// 注册处理
const handleRegister = async () => {
    if (isLoading.value) return;
    
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

    // 添加密码强度验证
    if (passwordStrength.score < 2) {
        registerErrors.password = '密码强度太弱，请使用更复杂的密码';
        isValid = false;
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
        isLoading.value = true;
        try {
            // 发送注册请求
            const response = await api.register({
                username: registerForm.username,
                email: registerForm.email,
                password: registerForm.password
            })
            
            if (response.success) {
                ElMessage.success({
                    message: '注册成功！',
                    duration: 2500,
                    type: 'success'
                });
                isRegistering.value = false;
                clearForms();
                
                // 自动登录
                await handleLogin()
            } else {
                ElMessage.error({
                    message: response.message || '注册失败',
                    duration: 3500,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('注册失败:', error)
            ElMessage({
                message: '注册失败: ' + (error.message || '服务器错误'),
                type: 'error',
                duration: 3000
            });
        } finally {
            isLoading.value = false;
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
const goToNextPage = () => {
    router.push('/mainPage');
};

// 组件挂载时设置初始背景
document.body.style.background = backgroundStyle.value;

// 暴露方法给模板使用
defineExpose({
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
    goToNextPage
});

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
    justify-content: space-between; /* 修改为space-between以确保footer在底部 */
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
    flex-direction: column;
    justify-content: flex-start; /* 顶部对齐 */
    align-items: center;
    flex: 1;
    min-height: 100vh; /* 占满整个视口高度 */
    padding-top: 60px;  /* 可根据需要调整顶部间距 */
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
    margin-bottom: 20px;
}

.welcome-message {
    position: absolute;
    top: -10px;
    left: 0;
    width: 100vw;
    text-align: center;
    color: #ffffff;
    font-size: 1.8rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 2;
    pointer-events: none;
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

.loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    margin-right: 8px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.btn:disabled {
    background: #a5a5a5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
}

.input-group input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

.toggle-password-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* 添加输入框聚焦效果 */
.input-group input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
    background: #fff;
}

/* 添加按钮点击效果 */
.btn:active:not(:disabled) {
    transform: scale(0.98);
}

/* 优化错误消息显示 */
.error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: -15px;
    margin-bottom: 15px;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.error-message:not(:empty) {
    opacity: 1;
    transform: translateY(0);
}

/* 添加表单切换动画 */
.container {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-container {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.password-strength {
    margin-top: 8px;
    font-size: 12px;
}

.strength-bars {
    display: flex;
    gap: 4px;
    margin-bottom: 4px;
}

.strength-bar {
    height: 4px;
    flex: 1;
    background-color: #e0e0e0;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.strength-bar.active {
    transform: scaleY(1.2);
}

.strength-bar.very-weak {
    background-color: #ff4d4d;
}

.strength-bar.weak {
    background-color: #ffa64d;
}

.strength-bar.medium {
    background-color: #ffff4d;
}

.strength-bar.strong {
    background-color: #4dff4d;
}

.strength-bar.very-strong {
    background-color: #00cc00;
}

.strength-text {
    font-size: 12px;
    transition: all 0.3s ease;
}

.strength-text.very-weak {
    color: #ff4d4d;
}

.strength-text.weak {
    color: #ffa64d;
}

.strength-text.medium {
    color: #999900;
}

.strength-text.strong {
    color: #00b300;
}

.strength-text.very-strong {
    color: #008000;
}

/* 密码输入框获得焦点时的提示 */
.input-group:focus-within .password-strength {
    opacity: 1;
    transform: translateY(0);
}

/* 添加密码框的过渡动画 */
.password-strength {
    opacity: 0.9;
    transform: translateY(-4px);
    transition: all 0.3s ease;
}

.footer {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.5px;
    z-index: 1;
    margin-top: auto;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.footer p {
    margin: 0;
    padding: 0;
}

/* 添加密码切换按钮的悬停效果 */
.toggle-password-btn {
    opacity: 0.6;
    transition: opacity 0.3s ease;
}

.toggle-password-btn:hover:not(:disabled) {
    opacity: 1;
}

.toggle-password-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

/* 覆盖 Element Plus 的默认样式以匹配我们的设计 */
.el-input {
    --el-input-border-radius: 8px;
}

.el-input :deep(.el-input__wrapper) {
    background-color: #f8f9fa;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 12px 15px;
    border: none;
}

.el-input :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.el-input :deep(.el-input__inner) {
    font-size: 16px;
    color: #333;
}

.el-input :deep(.el-input__inner::placeholder) {
    color: #999;
}

/* 禁用状态样式 */
.el-input.is-disabled :deep(.el-input__wrapper) {
    background-color: #f5f5f5;
    cursor: not-allowed;
}
</style>