import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/mainPage/mainPage.vue'
import loginPage from '../views/loginPage/loginPage.vue'
import settingPage from '../views/settingPage/settingPage.vue'
import streamingPage from '../views/streamingPage/streamingPage.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
