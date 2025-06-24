import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  }
  
  // 验证 token 有效性
  const verifyToken = async () => {
    if (!token.value) return false
    
    try {
      // 在实际应用中，这里应该调用验证 token 的 API
      // 例如：await api.verifyToken(token.value)
      return true
    } catch (error) {
      logout()
      return false
    }
  }
  
  return { 
    token, 
    user, 
    isLoggedIn, 
    login, 
    logout, 
    setUser,
    verifyToken 
  }
})