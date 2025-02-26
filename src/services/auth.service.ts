import http from './http';
import { useAuthStore } from '@/stores/auth';

interface LoginCredentials {
    email: string;
    password: string;
}

export const authService = {
    async login(credentials: LoginCredentials) {
        try {
            const response = await http.post('/login', credentials);
            const authStore = useAuthStore();
            if (response.data.token) {
                authStore.setToken(response.data.token);
                authStore.setUser(response.data.user);
            }
            return response;
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        try {
            const authStore = useAuthStore();
            const response = await http.post('/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });
            authStore.clearAuth();
            return response;
        } catch (error) {
            throw error;
        }
    },

    async checkAuth() {
        try {
            const authStore = useAuthStore();
            const response = await http.get('/verify-token', {
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });
            return response.data.isTokenValid;
        } catch (error) {
            const authStore = useAuthStore();
            authStore.clearAuth();
            return false;
        }
    }
}; 