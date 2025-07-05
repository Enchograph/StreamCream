import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/mainPage/mainPage.vue'
import loginPage from '../views/loginPage/loginPage.vue'
import settingPage from '../views/settingPage/settingPage.vue'
import streamingPage from '../views/streamingPage/streamingPage.vue'
import Live2DViewer from '../views/Live2DModel.vue'
import { useAuthStore } from '../stores/auth'

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
    },
    {
        path: '/bilibili',
        name: 'BilibiliStream',
        component: () => import('../views/streamPlatforms/BilibiliStream.vue')
    },
    {
        path: '/douyin',
        name: 'DouyinStream',
        component: () => import('../views/streamPlatforms/DouyinStream.vue')
    },
    {
        path: '/xiaohongshu',
        name: 'XiaohongshuStream',
        component: () => import('../views/streamPlatforms/XiaohongshuStream.vue')
    },
    {
        path: '/kuaishou',
        name: 'KuaishouStream',
        component: () => import('../views/streamPlatforms/KuaishouStream.vue')
    },
    {
        path: '/youtube',
        name: 'YoutubeStream',
        component: () => import('../views/streamPlatforms/YoutubeStream.vue')
    },
    {
        path: '/twitch',
        name: 'TwitchStream',
        component: () => import('../views/streamPlatforms/TwitchStream.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to) => {
    const auth = useAuthStore()
    const isValid = await auth.verifyToken()
    auth.isLoggedIn = isValid
    // 如果访问的是需要登录的路径且未登录
    if (protectedPaths.includes(to.path) && !auth.isLoggedIn) {
        // 跳转到登录页，并携带原目标路径（用于登录后跳回）
        alert('请先登录!!!')
        return '/loginPage?redirect=' + encodeURIComponent(to.fullPath)
    }

    // 已登录时禁止访问登录页
    if (to.path === '/loginPage' && auth.isLoggedIn) {
        return '/mainPage'
    }
})

export default router
