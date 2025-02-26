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
const showPassword = ref(false);

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
  <div class="login-page d-flex align-items-center min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <!-- Logo e Título -->
          <div class="text-center mb-4">
            <div class="app-brand mb-4">
              <div class="app-brand-logo">
                <i class="bi bi-hexagon-fill text-primary"></i>
                <i class="bi bi-hexagon-half position-absolute top-50 start-50 translate-middle text-primary opacity-50"></i>
              </div>
              <h1 class="app-brand-text">Vue Auth</h1>
            </div>
            <p class="text-muted">Faça login para acessar sua conta</p>
          </div>

          <!-- Card de Login -->
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <form @submit.prevent="login">
                <!-- Email -->
                <div class="mb-3">
                  <label for="email" class="form-label">E-mail</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0">
                      <i class="bi bi-envelope text-muted"></i>
                    </span>
                    <input 
                      type="email" 
                      class="form-control border-start-0 ps-0" 
                      id="email"
                      v-model="user.email"
                      placeholder="seu@email.com"
                      required
                    >
                  </div>
                </div>

                <!-- Senha -->
                <div class="mb-4">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <label for="password" class="form-label mb-0">Senha</label>
                    <a href="#" class="text-decoration-none small">Esqueceu a senha?</a>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0">
                      <i class="bi bi-lock text-muted"></i>
                    </span>
                    <input 
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control border-start-0 border-end-0 ps-0" 
                      id="password"
                      v-model="user.password"
                      required
                    >
                    <button 
                      class="input-group-text bg-light border-start-0"
                      type="button"
                      @click="showPassword = !showPassword"
                    >
                      <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                    </button>
                  </div>
                </div>

                <!-- Botão de Login -->
                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isLoading ? 'Entrando...' : 'Entrar' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Footer do Card -->
          <div class="text-center mt-4">
            <p class="text-muted">
              Não tem uma conta? 
              <a href="#" class="text-decoration-none">Criar conta</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  background: linear-gradient(135deg, var(--bs-light) 0%, #ffffff 100%);
}

.app-brand {
  position: relative;
  display: inline-block;
}

.app-brand-logo {
  position: relative;
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
}

.app-brand-text {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--bs-primary);
  margin: 0;
}

.input-group-text {
  color: var(--bs-gray-600);
}

.form-control {
  padding: 0.6rem 1rem;
}

.form-control:focus {
  box-shadow: none;
  border-color: var(--bs-primary);
}

.input-group:focus-within {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
  border-radius: var(--bs-border-radius);
}

.input-group:focus-within .input-group-text,
.input-group:focus-within .form-control {
  border-color: var(--bs-primary);
}

.input-group .btn:hover {
  transform: none;
  box-shadow: none;
}

.card {
  border-radius: 1rem;
}

.form-label {
  font-weight: 500;
  font-size: 0.875rem;
}
</style>

