import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:9080', // loginBackend服务端口
                changeOrigin: true,
            }
        },
        fs: {
            allow: ['..'] // Allow accessing files one level up from project root
        }
    }
})

