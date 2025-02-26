<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { authService } from '@/services/auth.service';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

async function logout() {
    try {
        await authService.logout();
        router.push({ name: 'login' });
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}
</script>

<template>
    
        <div class="row">
            <div class="col-12">
                    Bem-vindo, {{ authStore.user?.name }}
                
            </div>
        </div>
    
</template>
