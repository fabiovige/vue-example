<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { authService } from '@/services/auth.service';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

async function logout() {
    try {
        await authService.logout();
        authStore.clearAuth(); // Limpa os dados do usuário e token
        router.push({ name: 'login' });
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}
</script>

<template>
    <div>
        <h1>Dashboard</h1>
        <p>Bem-vindo, {{ authStore.user?.name }}</p>
        <button @click="logout">Logout</button>
    </div>
</template>
