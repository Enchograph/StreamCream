import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/mainPage/mainPage.vue'
import loginPage from '../views/loginPage/loginPage.vue'
import settingPage from '../views/settingPage/settingPage.vue'
import streamingPage from '../views/streamingPage/streamingPage.vue'
import Live2DViewer from '../views/Live2DModel.vue'
import { useAuthStore } from '../stores/auth'
import { ElMessage } from 'element-plus'

const protectedPaths = ['/mainPage', '/settingPage', '/streamingPage', '/live2d']

const routes = [
    {
        path: '/',
        redirect: '/loginPage'
    },
    {
        path: '/loginPage',
        name: 'loginPage',
        component: loginPage
    },
    {
        path: '/mainPage',
        name: 'mainPage',
        component: mainPage
    },
    {
        path: '/settingPage',
        name: 'settingPage',
        component: settingPage
    },
    {
        path: '/streamingPage',
        name: 'streamingPage',
        component: streamingPage
    },
    {
        path: '/live2d',
        name: 'Live2DViewer',
        component: Live2DViewer
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        ElMessage.warning('请先登录!!!')
        next('/loginPage')
    } else {
        next()
    }
})

export default router
