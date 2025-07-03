import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import api from './api'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')

//错误处理
app.config.errorHandler = (err, vm, info) => {
    console.error('全局错误:', err)

    // 如果是 API 错误，显示友好提示
    if (err.response) {
        const status = err.response.status
        const message = err.response.data?.message || '请求失败'

        if (status === 401) {
            alert('登录已过期，请重新登录')
            router.push('/loginPage')
        } else if (status >= 500) {
            alert('服务器错误，请稍后再试')
        } else {
            alert(message)
        }
    }
}