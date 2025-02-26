import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '@/services/http';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearAuth() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    async checkAuth() {
      try {
        const response = await http.get('/verify-token', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        return response.data.isTokenValid;
      } catch (error) {
        this.clearAuth();
        return false;
      }
    }
  }
})
