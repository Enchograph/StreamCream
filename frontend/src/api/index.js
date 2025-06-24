import axios from 'axios'

// 创建 Axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
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
  getProtectedData() {
    return api.get('/api/protected')
  },
  
  // 其他 API 方法...
}