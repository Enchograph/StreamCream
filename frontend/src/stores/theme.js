import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'light'
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;
      localStorage.setItem('theme', theme);
      document.documentElement.className = theme;
    },
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    }
  }
}); 