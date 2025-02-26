<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { authService } from '@/services/auth.service';

const router = useRouter();
const authStore = useAuthStore();

const user = reactive({
    email: 'fabiovige@gmail.com',
    password: 'password',
});

const message = ref('');
const isLoading = ref(false);

async function login() {
    try {
        isLoading.value = true;
        const response = await authService.login(user);
        if(response.data.token) {
            authStore.setToken(response.data.token);
            authStore.setUser(response.data.user);
            router.push({ name: 'dashboard' });
        } else {
            message.value = response.data.message;
        }
    } catch (error) {
        message.value = error?.response?.data.message;
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div>
        <h1>Login</h1>
        <p>{{ message }}</p>
        <form @submit.prevent="login">
            <input type="text" placeholder="Email" v-model="user.email" :disabled="isLoading" />
            <input type="password" placeholder="Password" v-model="user.password" :disabled="isLoading" />
            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Carregando...' : 'Login' }}
            </button>
        </form>
    </div>
</template>

