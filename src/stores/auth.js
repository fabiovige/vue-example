import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '@/services/http';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref(JSON.parse(localStorage.getItem('user')));

  function setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  function setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  async function checkAuth() {
    try {
      const tokenAuth = 'Bearer ' + this.token;
      console.log('tokenAuth ',tokenAuth);
      const response = await http.get('/verify-token', { 
        headers: { 
          Authorization: tokenAuth 
        } 
      });
      return response.data.isTokenValid;
    } catch (error) {
      //console.log('error ',error);
      return error?.response?.data.message;
    }
  }

  return { token, user, setToken, setUser, checkAuth }
})
