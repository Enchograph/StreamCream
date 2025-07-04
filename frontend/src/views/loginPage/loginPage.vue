<template>
    <TopBanner />
    <div class="page-container">
        <div class="page-bg-animated"></div>
        <div class="welcome-message">
            <h2>欢迎使用StreamCream</h2>
        </div>
        <div class="app-container">
            <!-- 表单内容 -->
            <div class="container" :class="{ active: isRegistering, 'forgot-active': isForgotPassword }">
                <div class="toggle-container">
                    <button class="toggle-btn" @click="toggleForm" :disabled="isLoading" v-if="!isForgotPassword">
                        {{ isRegistering ? '登录' : '注册' }}
                    </button>
                    <button class="toggle-btn" @click="backToLogin" :disabled="isLoading" v-if="isForgotPassword">
                        返回登录
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

                    <div class="input-group" style="position: relative;">
                        <el-input
                            v-model="loginForm.password"
                            type="password"
                            placeholder="请输入密码"
                            @keyup.enter="!isLoading && handleLogin()"
                            :disabled="isLoading"
                            show-password
                            :class="{ 'error-style': loginErrors.password }"
                        />
                    </div>
                    <div class="error-message" v-if="loginErrors.password">{{ loginErrors.password }}</div>

                    <button class="btn" @click="handleLogin" :disabled="isLoading">
                        <span v-if="isLoading" class="loading-spinner"></span>
                        {{ isLoading ? '登录中...' : '登录' }}
                    </button>

                    <div class="forgot-password">
                        <a href="#" @click.prevent="showForgotPasswordPanel">忘记密码?</a>
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
                        <el-input
                            v-model="registerForm.password"
                            type="password"
                            placeholder="请输入密码"
                            @input="e => checkPasswordStrength(registerForm.password, passwordStrength)"
                            @keyup.enter="handleRegister"
                            show-password
                            :class="{ 'error-style': registerErrors.password }"
                        />
                        <!-- 密码强度指示器 -->
                        <div v-if="registerForm.password" class="password-strength">
                            <div class="strength-bars">
                                <div 
                                    v-for="n in 4" 
                                    :key="n"
                                    class="strength-bar"
                                    :class="[
                                        { active: passwordStrength.score >= n },
                                        passwordStrength.score >= n ? passwordStrength.className : ''
                                    ]"
                                ></div>
                            </div>
                            <span class="strength-text" :class="passwordStrength.className">
                                {{ passwordStrength.message }}
                            </span>
                        </div>
                    </div>
                    <div class="error-message" v-if="registerErrors.password">{{ registerErrors.password }}</div>

                    <div class="input-group">
                        <el-input
                            v-model="registerForm.confirmPassword"
                            type="password"
                            placeholder="请确认密码"
                            @keyup.enter="handleRegister"
                            show-password
                            :class="{ 'error-style': registerErrors.confirmPassword }"
                        />
                    </div>
                    <div class="error-message" v-if="registerErrors.confirmPassword">
                        {{ registerErrors.confirmPassword }}
                    </div>

                    <!-- 邮箱验证码输入框 -->
                    <div class="input-group verification-group" v-if="showVerificationCode">
                        <input
                            type="text"
                            id="verificationCode"
                            v-model="registerForm.verificationCode"
                            @keyup.enter="handleVerifyEmail"
                            :style="registerErrors.verificationCode ? errorInputStyle : {}"
                            required
                            placeholder="请输入邮箱验证码"
                            maxlength="6"
                        >
                        <button 
                            type="button" 
                            class="resend-btn" 
                            @click="handleResendVerification"
                            :disabled="resendCooldown > 0"
                        >
                            {{ resendCooldown > 0 ? `${resendCooldown}s` : '重新发送' }}
                        </button>
                    </div>
                    <div class="error-message" v-if="registerErrors.verificationCode">
                        {{ registerErrors.verificationCode }}
                    </div>

                    <button class="btn" @click="handleRegister" v-if="!showVerificationCode">注册</button>
                    <button class="btn" @click="handleVerifyEmail" v-if="showVerificationCode">验证邮箱</button>
                </div>

                <!-- 找回密码表单 -->
                <div class="form-container forgot-password-container">
                    <h1>找回密码</h1>
                    
                    <!-- 第一步：输入用户名和邮箱 -->
                    <div v-if="forgotPasswordStep === 1">
                        <div class="input-group">
                            <input
                                type="text"
                                id="forgotUsername"
                                v-model="forgotPasswordForm.username"
                                :style="forgotPasswordErrors.username ? errorInputStyle : {}"
                                required
                                placeholder="请输入用户名"
                                :disabled="isLoading"
                            >
                        </div>
                        <div class="error-message" v-if="forgotPasswordErrors.username">{{ forgotPasswordErrors.username }}</div>

                        <div class="input-group">
                            <input
                                type="email"
                                id="forgotEmail"
                                v-model="forgotPasswordForm.email"
                                :style="forgotPasswordErrors.email ? errorInputStyle : {}"
                                required
                                placeholder="请输入邮箱"
                                :disabled="isLoading"
                            >
                        </div>
                        <div class="error-message" v-if="forgotPasswordErrors.email">{{ forgotPasswordErrors.email }}</div>

                        <button class="btn" @click="handleForgotPassword" :disabled="isLoading">
                            <span v-if="isLoading" class="loading-spinner"></span>
                            {{ isLoading ? '发送中...' : '发送验证码' }}
                        </button>
                    </div>

                    <!-- 第二步：输入验证码 -->
                    <div v-if="forgotPasswordStep === 2">
                        <div class="input-group">
                            <input
                                type="text"
                                id="resetCode"
                                v-model="forgotPasswordForm.code"
                                :style="forgotPasswordErrors.code ? errorInputStyle : {}"
                                required
                                placeholder="请输入验证码"
                                maxlength="6"
                                :disabled="isLoading"
                            >
                        </div>
                        <div class="error-message" v-if="forgotPasswordErrors.code">{{ forgotPasswordErrors.code }}</div>

                        <button class="btn" @click="handleVerifyResetCode" :disabled="isLoading">
                            <span v-if="isLoading" class="loading-spinner"></span>
                            {{ isLoading ? '验证中...' : '验证验证码' }}
                        </button>
                    </div>

                    <!-- 第三步：输入新密码 -->
                    <div v-if="forgotPasswordStep === 3">
                        <div class="input-group" style="position: relative;">
                            <el-input
                                v-model="forgotPasswordForm.newPassword"
                                type="password"
                                placeholder="请输入新密码"
                                @input="e => checkPasswordStrength(forgotPasswordForm.newPassword, forgotPasswordStrength)"
                                show-password
                                :class="{ 'error-style': forgotPasswordErrors.newPassword }"
                                :disabled="isLoading"
                            />
                            <!-- 密码强度指示器 -->
                            <div v-if="forgotPasswordForm.newPassword" class="password-strength">
                                <div class="strength-bars">
                                    <div 
                                        v-for="n in 4" 
                                        :key="n"
                                        class="strength-bar"
                                        :class="[
                                            { active: forgotPasswordStrength.score >= n },
                                            forgotPasswordStrength.score >= n ? forgotPasswordStrength.className : ''
                                        ]"
                                    ></div>
                                </div>
                                <span class="strength-text" :class="forgotPasswordStrength.className">
                                    {{ forgotPasswordStrength.message }}
                                </span>
                            </div>
                        </div>
                        <div class="error-message" v-if="forgotPasswordErrors.newPassword">{{ forgotPasswordErrors.newPassword }}</div>

                        <div class="input-group">
                            <el-input
                                v-model="forgotPasswordForm.confirmNewPassword"
                                type="password"
                                placeholder="请确认新密码"
                                show-password
                                :class="{ 'error-style': forgotPasswordErrors.confirmNewPassword }"
                                :disabled="isLoading"
                            />
                        </div>
                        <div class="error-message" v-if="forgotPasswordErrors.confirmNewPassword">{{ forgotPasswordErrors.confirmNewPassword }}</div>

                        <button class="btn" @click="handleResetPassword" :disabled="isLoading">
                            <span v-if="isLoading" class="loading-spinner"></span>
                            {{ isLoading ? '重置中...' : '重置密码' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            © 2025 Made by DeepSleep. All rights reserved.
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '/src/stores/auth.js'
import {useRoute} from 'vue-router'
import api from '/src/api/index.js'
import TopBanner from '/src/components/TopBanner.vue'
import { ElMessage, ElInput } from 'element-plus'

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
    confirmPassword: '',
    verificationCode: ''
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
    confirmPassword: '',
    verificationCode: ''
});

// 密码强度相关
const passwordStrength = reactive({
    score: 0,
    message: '',
    className: ''
});
const forgotPasswordStrength = reactive({
    score: 0,
    message: '',
    className: ''
});

// 密码可见性相关
const showPassword = ref(false); // 注册/登录用
const showForgotPassword = ref(false); // 找回密码用

// 密码强度检测函数，支持传参
const checkPasswordStrength = (value, targetObj = passwordStrength) => {
    value = value || '';
    let score = 0;
    let message = '非常弱';
    let className = 'very-weak';

    if (value.length >= 6) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score === 1) {
        message = '弱';
        className = 'weak';
    } else if (score === 2) {
        message = '中等';
        className = 'medium';
    } else if (score === 3) {
        message = '强';
        className = 'strong';
    } else if (score === 4) {
        message = '非常强';
        className = 'very-strong';
    }

    targetObj.score = score;
    targetObj.message = message;
    targetObj.className = className;
};

// 切换表单方法
const toggleForm = () => {
    isRegistering.value = !isRegistering.value;
    // 清除表单和错误提示
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
                    message: response.message || '验证码已发送，请查收邮箱！',
                    duration: 3500,
                    type: 'success'
                });
                
                // 保存邮箱并显示验证码输入框
                currentEmail.value = response.email;
                showVerificationCode.value = true;
                
                // 开始重新发送验证码的倒计时
                resendCooldown.value = 60;
                const timer = setInterval(() => {
                    resendCooldown.value--;
                    if (resendCooldown.value <= 0) {
                        clearInterval(timer);
                    }
                }, 1000);
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

// 邮箱验证处理
const handleVerifyEmail = async () => {
    if (isLoading.value) return;
    
    // 验证验证码
    if (registerForm.verificationCode.trim() === '') {
        registerErrors.verificationCode = '请输入验证码';
        return;
    } else if (registerForm.verificationCode.length !== 6) {
        registerErrors.verificationCode = '验证码应为6位数字';
        return;
    } else {
        registerErrors.verificationCode = '';
    }
    
    isLoading.value = true;
    try {
        const response = await api.verifyEmail({
            email: currentEmail.value,
            code: registerForm.verificationCode
        });
        
        if (response.success) {
            ElMessage.success({
                message: '注册成功！',
                duration: 2500,
                type: 'success'
            });
            
            // 保存token并登录
            localStorage.setItem('token', response.token);
            auth.login(response.token);
            
            // 获取用户信息
            const userResponse = await api.getProtectedData();
            if (userResponse.success) {
                auth.setUser(userResponse.user);
            }
            
            // 跳转到主页面
            router.push('/mainPage');
            clearForms();
            showVerificationCode.value = false;
        } else {
            ElMessage.error({
                message: response.message || '验证失败',
                duration: 3500,
                type: 'error'
            });
        }
    } catch (error) {
        console.error('邮箱验证失败:', error);
        ElMessage({
            message: '验证失败: ' + (error.message || '服务器错误'),
            type: 'error',
            duration: 3000
        });
    } finally {
        isLoading.value = false;
    }
};

// 重新发送验证码
const handleResendVerification = async () => {
    if (resendCooldown.value > 0) return;
    
    try {
        const response = await api.resendVerification({
            email: currentEmail.value
        });
        
        if (response.success) {
            ElMessage.success({
                message: '验证码已重新发送',
                duration: 2500,
                type: 'success'
            });
            
            // 开始倒计时
            resendCooldown.value = 60;
            const timer = setInterval(() => {
                resendCooldown.value--;
                if (resendCooldown.value <= 0) {
                    clearInterval(timer);
                }
            }, 1000);
        } else {
            ElMessage.error({
                message: response.message || '发送失败',
                duration: 3500,
                type: 'error'
            });
        }
    } catch (error) {
        console.error('重新发送验证码失败:', error);
        ElMessage({
            message: '发送失败: ' + (error.message || '服务器错误'),
            type: 'error',
            duration: 3000
        });
    }
};

// 当前邮箱（用于邮箱验证）
const currentEmail = ref(null);

// 邮箱验证相关状态
const showVerificationCode = ref(false);
const resendCooldown = ref(0);

// 找回密码相关状态
const isForgotPassword = ref(false);
const forgotPasswordStep = ref(1);
const forgotPasswordForm = reactive({
    username: '',
    email: '',
    code: '',
    newPassword: '',
    confirmNewPassword: ''
});
const forgotPasswordErrors = reactive({
    username: '',
    email: '',
    code: '',
    newPassword: '',
    confirmNewPassword: ''
});

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
    registerForm.verificationCode = '';
    registerErrors.username = '';
    registerErrors.email = '';
    registerErrors.password = '';
    registerErrors.confirmPassword = '';
    registerErrors.verificationCode = '';
};

// 保留原有路由功能
const goToNextPage = () => {
    router.push('/mainPage');
};

// 显示找回密码表单
const showForgotPasswordPanel = () => {
    isForgotPassword.value = true;
    forgotPasswordStep.value = 1;
    clearForgotPasswordForm();
};

// 返回登录表单
const backToLogin = () => {
    isForgotPassword.value = false;
    forgotPasswordStep.value = 1;
    clearForgotPasswordForm();
};

// 清除找回密码表单
const clearForgotPasswordForm = () => {
    forgotPasswordForm.username = '';
    forgotPasswordForm.email = '';
    forgotPasswordForm.code = '';
    forgotPasswordForm.newPassword = '';
    forgotPasswordForm.confirmNewPassword = '';
    forgotPasswordErrors.username = '';
    forgotPasswordErrors.email = '';
    forgotPasswordErrors.code = '';
    forgotPasswordErrors.newPassword = '';
    forgotPasswordErrors.confirmNewPassword = '';
};

// 处理找回密码第一步：发送验证码
const handleForgotPassword = async () => {
    if (isLoading.value) return;
    
    // 验证输入
    let isValid = true;
    
    if (forgotPasswordForm.username.trim() === '') {
        forgotPasswordErrors.username = '请输入用户名';
        isValid = false;
    } else {
        forgotPasswordErrors.username = '';
    }
    
    if (forgotPasswordForm.email.trim() === '') {
        forgotPasswordErrors.email = '请输入邮箱';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordForm.email)) {
        forgotPasswordErrors.email = '请输入有效的邮箱地址';
        isValid = false;
    } else {
        forgotPasswordErrors.email = '';
    }
    
    if (isValid) {
        isLoading.value = true;
        try {
            const response = await api.forgotPassword({
                username: forgotPasswordForm.username,
                email: forgotPasswordForm.email
            });
            
            if (response.success) {
                ElMessage.success({
                    message: response.message || '验证码已发送，请查收邮箱！',
                    duration: 3500,
                    type: 'success'
                });
                forgotPasswordStep.value = 2;
            } else {
                ElMessage.error({
                    message: response.message || '发送失败',
                    duration: 3500,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('发送找回密码验证码失败:', error);
            ElMessage({
                message: '发送失败: ' + (error.message || '服务器错误'),
                type: 'error',
                duration: 3000
            });
        } finally {
            isLoading.value = false;
        }
    }
};

// 处理找回密码第二步：验证验证码
const handleVerifyResetCode = async () => {
    if (isLoading.value) return;
    
    if (forgotPasswordForm.code.trim() === '') {
        forgotPasswordErrors.code = '请输入验证码';
        return;
    } else if (forgotPasswordForm.code.length !== 6) {
        forgotPasswordErrors.code = '验证码应为6位数字';
        return;
    } else {
        forgotPasswordErrors.code = '';
    }
    
    isLoading.value = true;
    try {
        const response = await api.verifyResetCode({
            username: forgotPasswordForm.username,
            email: forgotPasswordForm.email,
            code: forgotPasswordForm.code
        });
        
        if (response.success) {
            ElMessage.success({
                message: response.message || '验证码验证成功！',
                duration: 2500,
                type: 'success'
            });
            forgotPasswordStep.value = 3;
        } else {
            ElMessage.error({
                message: response.message || '验证失败',
                duration: 3500,
                type: 'error'
            });
        }
    } catch (error) {
        console.error('验证找回密码验证码失败:', error);
        ElMessage({
            message: '验证失败: ' + (error.message || '服务器错误'),
            type: 'error',
            duration: 3000
        });
    } finally {
        isLoading.value = false;
    }
};

// 处理找回密码第三步：重置密码
const handleResetPassword = async () => {
    if (isLoading.value) return;
    
    // 验证新密码
    let isValid = true;
    
    if (forgotPasswordForm.newPassword.trim() === '') {
        forgotPasswordErrors.newPassword = '请输入新密码';
        isValid = false;
    } else if (forgotPasswordForm.newPassword.length < 6) {
        forgotPasswordErrors.newPassword = '密码长度至少6位';
        isValid = false;
    } else if (forgotPasswordStrength.score < 2) {
        forgotPasswordErrors.newPassword = '密码强度太弱，请使用更复杂的密码';
        isValid = false;
    } else {
        forgotPasswordErrors.newPassword = '';
    }
    
    if (forgotPasswordForm.confirmNewPassword.trim() === '') {
        forgotPasswordErrors.confirmNewPassword = '请确认新密码';
        isValid = false;
    } else if (forgotPasswordForm.confirmNewPassword !== forgotPasswordForm.newPassword) {
        forgotPasswordErrors.confirmNewPassword = '两次输入的密码不一致';
        isValid = false;
    } else {
        forgotPasswordErrors.confirmNewPassword = '';
    }
    
    if (isValid) {
        isLoading.value = true;
        try {
            const response = await api.resetPassword({
                username: forgotPasswordForm.username,
                email: forgotPasswordForm.email,
                code: forgotPasswordForm.code,
                new_password: forgotPasswordForm.newPassword
            });
            
            if (response.success) {
                ElMessage.success({
                    message: response.message || '密码重置成功！',
                    duration: 2500,
                    type: 'success'
                });
                
                // 重置表单并返回登录
                clearForgotPasswordForm();
                isForgotPassword.value = false;
                forgotPasswordStep.value = 1;
            } else {
                ElMessage.error({
                    message: response.message || '重置失败',
                    duration: 3500,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('重置密码失败:', error);
            ElMessage({
                message: '重置失败: ' + (error.message || '服务器错误'),
                type: 'error',
                duration: 3000
            });
        } finally {
            isLoading.value = false;
        }
    }
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
    handleVerifyEmail,
    handleResendVerification,
    clearForms,
    goToNextPage,
    showPassword,
    isLoading,
    showVerificationCode,
    resendCooldown,
    // 找回密码相关
    isForgotPassword,
    forgotPasswordStep,
    forgotPasswordForm,
    forgotPasswordErrors,
    showForgotPasswordPanel,
    backToLogin,
    handleForgotPassword,
    handleVerifyResetCode,
    handleResetPassword
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
    justify-content: flex-start;  /* 改为从顶部开始布局 */
    align-items: center;
    padding: 40px 0 20px;  /* 调整上下内边距 */
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
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    width: 100%;
    min-height: auto;  /* 移除固定高度限制 */
    padding-top: 40px;
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

.welcome-message {
    position: relative;
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-size: 1.8rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 2;
    pointer-events: none;
    margin-bottom: 20px;
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

/* 找回密码表单样式 */
.forgot-password-container {
    transform: translateX(200%);
    z-index: 0;
}

.container.forgot-active .login-container {
    transform: translateX(-200%);
    z-index: 0;
}

.container.forgot-active .register-container {
    transform: translateX(-200%);
    z-index: 0;
}

.container.forgot-active .forgot-password-container {
    transform: translateX(0);
    z-index: 1;
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

/* 密码强度指示器样式 */
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

/* 验证码输入框样式 */
.verification-group {
    position: relative;
    display: flex;
    gap: 10px;
}

.verification-group input {
    flex: 1;
}

.resend-btn {
    padding: 12px 16px;
    background: #6c63ff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease;
    min-width: 100px;
}

.resend-btn:hover:not(:disabled) {
    background: #5a52e0;
    transform: translateY(-1px);
}

.resend-btn:disabled {
    background: #a5a5a5;
    cursor: not-allowed;
    transform: none;
}

.resend-btn:active:not(:disabled) {
    transform: scale(0.98);
}

/* 添加版权信息样式 */
.copyright {
    position: relative;
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    padding: 20px 0;
    margin-top: auto;  /* 将版权信息推到容器底部 */
    z-index: 2;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 添加 Element Plus 输入框样式覆盖 */
:deep(.el-input) {
    width: 100%;
}

:deep(.el-input__wrapper) {
    background: #f8f9fa;
    border: none;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
    padding: 0;
}

:deep(.el-input__inner) {
    height: 44px;
    font-size: 16px;
    color: #333;
    padding: 12px 15px;
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
    background: #fff;
}

:deep(.el-input__wrapper.is-disabled) {
    background: #f5f5f5;
}

/* 当有错误时的样式 */
:deep(.el-input__wrapper.error-style) {
    box-shadow: 0 2px 5px rgba(231, 76, 60, 0.3) !important;
    border: 1px solid #e74c3c;
}

/* 调整密码显示按钮位置 */
:deep(.el-input__suffix) {
    right: 10px;
}

:deep(.el-input__suffix-inner) {
    margin-right: 8px;
}
</style>