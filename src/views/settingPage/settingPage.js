export default {
    name: 'settingPage',
    methods: {
        // 添加返回原页面的方法
        completeSetting() {
            // 获取传递过来的返回路径，如果没有则默认返回主页
            const redirectPath = this.$route.query.redirect || '/mainPage';
            this.$router.push(redirectPath);
        }
    }
}
