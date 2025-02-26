import http from './http';
import { useAuthStore } from '@/stores/auth';

interface LoginCredentials {
    email: string;
    password: string;
}

export const authService = {
    async login(credentials: LoginCredentials) {
        try {
            return await http.post('/login', credentials);
        } catch (error) {
            throw error;
        }
    },
    async logout() {
        try {
            const authStore = useAuthStore();
            return await http.post('/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });
        } catch (error) {
            throw error;
        }
    }
}; 