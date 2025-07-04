import axios from 'axios'
import { useAuthStore } from '../stores/auth'

// 创建 Axios 实例
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器 - 添加认证令牌
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器 - 处理错误
api.interceptors.response.use(response => {
    return response.data
}, error => {
    // 处理认证错误
    if (error.response?.status === 401) {
        // 清除本地存储并重定向到登录页
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/loginPage'
    }
    return Promise.reject(error.response?.data || error.message)
})

export default {
    // 用户认证
    login(credentials) {
        return api.post('/api/login', credentials)
    },
    register(userData) {
        return api.post('/api/register', userData)
    },
    verifyEmail(data) {
        return api.post('/api/verify-email', data)
    },
    resendVerification(data) {
        return api.post('/api/resend-verification', data)
    },
    // 找回密码相关API
    forgotPassword(data) {
        return api.post('/api/forgot-password', data)
    },
    verifyResetCode(data) {
        return api.post('/api/verify-reset-code', data)
    },
    resetPassword(data) {
        return api.post('/api/reset-password', data)
    },
    verifyToken() {
        return api.post('/api/verify-token')
    },
    getProtectedData() {
        return api.get('/api/protected')
    },

    uploadBackground(file) {
        const formData = new FormData()
        formData.append('file', file)
        return api.post('/api/upload-background', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    // 偏好相关 API
    getPreferences() {
        return api.get('/api/preferences')
    },
    savePreferences(data) {
        return api.post('/api/preferences', data)
    },
}