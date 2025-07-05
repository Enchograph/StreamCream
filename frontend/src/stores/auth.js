import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const isLoggedIn = ref(!!token.value)
  
  // 登录方法
  const login = (newToken) => {
    token.value = newToken
    isLoggedIn.value = true
    localStorage.setItem('token', newToken)
  }
  
  // 设置用户信息
  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }
  
  // 登出方法
  const logout = () => {
    token.value = ''
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('aiSettings')
    localStorage.removeItem('debugMode')
    localStorage.removeItem('bannerColor')
    localStorage.removeItem('resolution')
    // 如有其它自定义项也可一并清除
  }
  
  // 验证 token 有效性
  const verifyToken = async () => {
    if (!token.value) return false
    
    try {
      const response = await api.verifyToken()
      console.log('Token验证响应:', response) // 添加调试信息
      if (response && response.success) {
        // 更新用户信息
        if (response.user) {
          setUser(response.user)
        }
        isLoggedIn.value = true
        return true
      } else {
        console.log('Token验证失败，清除认证状态')
        logout()
        return false
      }
    } catch (error) {
      console.error('Token验证失败:', error)
      logout()
      return false
    }
  }
  
  // 计算属性：检查是否已认证
  const isAuthenticated = computed(() => {
    return !!token.value && isLoggedIn.value
  })

  return { 
    token, 
    user, 
    isLoggedIn, 
    isAuthenticated,
    login, 
    logout, 
    setUser,
    verifyToken 
  }
})