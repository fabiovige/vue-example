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
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title text-center mb-4">Login</h1>
                        <p class="text-danger text-center">{{ message }}</p>
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <input 
                                    type="email" 
                                    class="form-control" 
                                    placeholder="Email" 
                                    v-model="user.email" 
                                    :disabled="isLoading"
                                />
                            </div>
                            <div class="mb-3">
                                <input 
                                    type="password" 
                                    class="form-control" 
                                    placeholder="Senha" 
                                    v-model="user.password" 
                                    :disabled="isLoading"
                                />
                            </div>
                            <button 
                                type="submit" 
                                class="btn btn-primary w-100" 
                                :disabled="isLoading"
                            >
                                <span 
                                    class="spinner-border spinner-border-sm me-2" 
                                    role="status" 
                                    v-if="isLoading"
                                ></span>
                                {{ isLoading ? 'Carregando...' : 'Entrar' }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

