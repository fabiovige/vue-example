<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/services/auth.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

async function logout() {
    try {
        await authService.logout()
        router.push({ name: 'login' })
    } catch (error) {
        console.error('Erro ao fazer logout:', error)
    }
}
</script>

<template>
  <div class="container mt-4">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded shadow-sm">
      <div class="container-fluid">
        <RouterLink class="navbar-brand fw-bold text-white" to="/">Vue Auth</RouterLink>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="/about">Sobre</RouterLink>
            </li>
            <li class="nav-item" v-if="authStore.token">
              <RouterLink class="nav-link text-white" to="/dashboard">Dashboard</RouterLink>
            </li>
          </ul>
          
          <div class="d-flex align-items-center">
            <template v-if="!authStore.token">
              <RouterLink class="btn btn-light" to="/login">
                Login
              </RouterLink>
            </template>
            <template v-else>
              <span class="text-white me-3">
                Olá, {{ authStore.user?.name }}
              </span>
              <button @click="logout" class="btn btn-light text-danger">
                Sair
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}

.router-link-active {
  font-weight: bold !important;
  text-decoration: underline !important;
}

.navbar-nav .nav-link:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: all 0.2s;
}

.btn {
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
