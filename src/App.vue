<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/services/auth.service'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const showDropdown = ref(false)
const isMenuCollapsed = ref(false)
const showNotifications = ref(false)

const toggleButtonClasses = computed(() => ({
  'btn-toggle': true,
  'rotated': !isMenuCollapsed.value
}))

function toggleMenu() {
  isMenuCollapsed.value = !isMenuCollapsed.value
}

async function logout() {
    try {
        await authService.logout()
        router.push({ name: 'login' })
    } catch (error) {
        console.error('Erro ao fazer logout:', error)
    }
}

const getUserInitials = computed(() => {
  const name = authStore.user?.name || ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<template>
  <div class="d-flex flex-column min-vh-100" v-if="route.name === 'login'">
    <RouterView />
  </div>

  <div class="wrapper d-flex min-vh-100" v-else>
    <!-- Sidebar -->
    <nav id="sidebar" class="shadow-sm d-flex flex-column" :class="{ 'collapsed': isMenuCollapsed }">
      <div class="sidebar-header p-3 border-bottom d-flex justify-content-between align-items-center">
        <RouterLink 
          class="logo-link d-flex align-items-center text-decoration-none" 
          to="/" 
          v-if="!isMenuCollapsed"
        >
          <div class="logo-container me-2">
            <i class="bi bi-hexagon-fill text-white"></i>
            <i class="bi bi-hexagon-half position-absolute top-50 start-50 translate-middle text-white opacity-50"></i>
          </div>
          <span class="logo-text">Vue Auth</span>
        </RouterLink>
        <button 
          class="btn-toggle-menu ms-auto"
          @click="toggleMenu"
          :title="isMenuCollapsed ? 'Expandir menu' : 'Recolher menu'"
        >
          <i class="bi" :class="isMenuCollapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'"></i>
        </button>
      </div>

      <div class="sidebar-content flex-grow-1">
        <ul class="list-unstyled p-3">
          <li class="nav-item mb-1">
            <RouterLink class="nav-link text-white d-flex align-items-center" to="/">
              <i class="bi bi-house-door fs-5 me-2"></i>
              <span v-if="!isMenuCollapsed">Home</span>
            </RouterLink>
          </li>
          <li class="nav-item mb-1">
            <RouterLink class="nav-link text-white d-flex align-items-center" to="/about">
              <i class="bi bi-info-circle fs-5 me-2"></i>
              <span v-if="!isMenuCollapsed">Sobre</span>
            </RouterLink>
          </li>
          <li class="nav-item mb-1" v-if="authStore.token">
            <RouterLink class="nav-link text-white d-flex align-items-center" to="/dashboard">
              <i class="bi bi-speedometer2 fs-5 me-2"></i>
              <span v-if="!isMenuCollapsed">Dashboard</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="sidebar-bottom border-top">
        <RouterLink 
          to="/profile" 
          class="nav-link d-flex align-items-center"
          :class="{ 'justify-content-center': isMenuCollapsed }"
        >
          <i class="bi bi-gear-fill fs-5 me-2"></i>
          <span v-if="!isMenuCollapsed">Configurações</span>
        </RouterLink>
      </div>
    </nav>

    <div class="content flex-grow-1 d-flex flex-column">
      <header class="bg-white shadow-sm sticky-top">
        <div class="container-fluid">
          <div class="d-flex justify-content-between align-items-center py-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <RouterLink to="/" class="text-decoration-none">
                    <i class="bi bi-house-door"></i>
                  </RouterLink>
                </li>
                <li class="breadcrumb-item active fw-semibold" aria-current="page">
                  {{ route.name }}
                </li>
              </ol>
            </nav>

            <div class="d-flex align-items-center gap-3">
              <!-- Sino de Notificações -->
              <div class="dropdown">
                <button 
                  class="btn btn-light border-0 shadow-none position-relative p-2 rounded-circle"
                  type="button"
                  @click="showNotifications = !showNotifications"
                >
                  <i class="bi bi-bell fs-5"></i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                    <span class="visually-hidden">notificações não lidas</span>
                  </span>
                </button>
                <div class="dropdown-menu dropdown-menu-end shadow-sm border p-0" :class="{ show: showNotifications }">
                  <div class="p-3 border-bottom">
                    <h6 class="notifications-title mb-0">Notificações</h6>
                  </div>
                  <div class="notification-text">Nova mensagem recebida</div>
                  <div class="notification-time">há 3 minutos</div>
                  <div class="p-2 border-top text-center">
                    <small><a href="#" class="text-decoration-none">Ver todas</a></small>
                  </div>
                </div>
              </div>

              <!-- Menu de Usuário -->
              <div class="dropdown">
                <button 
                  class="btn btn-light border-0 shadow-none d-flex align-items-center gap-2 px-3"
                  type="button"
                  @click="showDropdown = !showDropdown"
                >
                  <div class="avatar-circle">
                    <span class="initials">{{ getUserInitials }}</span>
                  </div>
                  <div class="d-none d-sm-block">
                    <div class="user-name">{{ authStore.user?.name }}</div>
                    <div class="user-email">{{ authStore.user?.email }}</div>
                  </div>
                  <i class="bi bi-chevron-down ms-1"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end shadow-sm border" :class="{ show: showDropdown }">
                  <div class="px-3 py-2 border-bottom">
                    <div class="fw-semibold">{{ authStore.user?.name }}</div>
                    <small class="text-muted">{{ authStore.user?.email }}</small>
                  </div>
                  <RouterLink class="dropdown-item d-flex align-items-center py-2" to="/profile">
                    <i class="bi bi-person me-2 text-muted"></i> Meu Perfil
                  </RouterLink>
                  <RouterLink class="dropdown-item d-flex align-items-center py-2" to="/settings">
                    <i class="bi bi-gear me-2 text-muted"></i> Configurações
                  </RouterLink>
                  <div class="dropdown-divider"></div>
                  <button @click="logout" class="dropdown-item d-flex align-items-center py-2 text-danger">
                    <i class="bi bi-box-arrow-right me-2"></i> Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-grow-1 py-4">
        <div class="container-fluid">
          <RouterView />
        </div>
      </main>

      <footer class="footer py-3 border-top">
        <div class="container-fluid">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="text-muted">
              <i class="bi bi-c-circle me-1"></i> 2024 Vue Auth
            </div>
            <div class="footer-links">
              <a href="#" class="footer-link me-3">
                <i class="bi bi-shield-check me-1"></i> Termos
              </a>
              <a href="#" class="footer-link me-3">
                <i class="bi bi-lock me-1"></i> Privacidade
              </a>
              <a href="#" class="footer-link">
                <i class="bi bi-envelope me-1"></i> Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
body {
  background-color: var(--bs-light);
}

.wrapper {
  width: 100%;
  overflow-x: hidden;
}

#sidebar {
  width: 250px;
  min-height: 100vh;
  transition: all 0.3s ease;
  background-color: var(--bs-primary);
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-content {
  overflow-y: auto;
  height: 100%;
}

.sidebar-bottom {
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: auto;
  position: relative;
}

.content {
  width: calc(100% - 250px);
  transition: all 0.3s ease;
  background-color: var(--bs-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

#sidebar.collapsed {
  width: 60px;
}

#sidebar.collapsed + .content {
  width: calc(100% - 60px);
}

.router-link-active {
  background: transparent !important;
  opacity: 1 !important;
  font-weight: 600;
  color: white !important;
}

.nav-link {
  padding: 0.6rem 1rem;
  border-radius: 4px;
  transition: opacity 0.2s;
  opacity: 0.75;
  color: rgba(255, 255, 255, 0.9) !important;
}

.nav-link:hover {
  opacity: 1;
  color: white !important;
  transform: none;
}

.dropdown-menu {
  border: 1px solid var(--bs-gray-200);
  box-shadow: var(--bs-box-shadow-lg);
  margin-top: 0.5rem;
  min-width: 280px;
  position: absolute;
  z-index: 1050;
}

.avatar {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  font-weight: 500;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card {
  border: 1px solid var(--bs-gray-200);
  border-radius: var(--bs-border-radius);
}

.btn-toggle-menu {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-toggle-menu:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.btn-toggle-menu i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

#sidebar.collapsed .btn-toggle-menu i {
  transform: none;
}

.sidebar-header {
  min-height: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.footer {
  margin-top: auto;
  background-color: var(--bs-white);
  border-top: 1px solid var(--bs-gray-200);
}

.footer-links {
  white-space: nowrap;
}

.footer-link {
  text-decoration: none;
  color: var(--bs-gray-600);
}

.footer a:hover {
  transform: none !important;
  color: var(--bs-primary);
}

.footer .bi {
  font-size: 1rem;
}

@media (max-width: 768px) {
  #sidebar {
    position: fixed;
    z-index: 1000;
    width: 60px;
  }

  #sidebar:not(.collapsed) {
    width: 250px;
  }

  .content {
    width: calc(100% - 60px);
    margin-left: 60px;
  }

  .sidebar-bottom {
    position: relative;
    width: 100%;
  }

  .dropdown .dropdown-menu {
    right: 0.5rem;
    max-width: calc(100vw - 80px);
  }
}

.avatar-circle {
  width: 36px;
  height: 36px;
  background-color: var(--bs-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.initials {
  color: white;
  font-weight: 500;
  font-size: 14px;
}

.notification-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fs-7 {
  font-size: 0.875rem;
}

.dropdown {
  position: static;
}

.dropdown .dropdown-menu {
  position: absolute;
  right: 1rem;
  top: 100%;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1040;
  background-color: var(--bs-white);
  width: 100%;
}

.logo-link {
  opacity: 1 !important;
  transform: none !important;
}

.logo-container {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  letter-spacing: 0.25px;
}

#sidebar.collapsed .btn-toggle-menu {
  margin-left: 0;
}

.breadcrumb {
  font-size: 0.8125rem;
}

.breadcrumb-item.active {
  font-weight: 500;
}

.dropdown-item {
  font-size: 0.8125rem;
  padding: 0.5rem 1rem;
}

.dropdown-header {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
}

.btn {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.25px;
}

.footer {
  font-size: 0.8125rem;
}

.footer-link {
  font-weight: 500;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2;
}

.user-email {
  font-size: 0.75rem;
  font-weight: 400;
}

.notifications-title {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.25px;
}

.notification-text {
  font-size: 0.8125rem;
  line-height: 1.4;
}

.notification-time {
  font-size: 0.75rem;
  color: var(--bs-gray-600);
}

.badge {
  font-size: 0.75rem;
  font-weight: 500;
}

#sidebar.collapsed .nav-link {
  padding: 0.8rem;
  display: flex;
  justify-content: center;
}

#sidebar.collapsed .router-link-active {
  background: transparent !important;
  padding-left: 0.8rem;
}

#sidebar.collapsed .router-link-active i {
  transform: none;
}

/* Ajuste do footer e sidebar-bottom */
.footer, .sidebar-bottom .nav-link {
  height: 56px; /* Altura padrão */
  padding-top: 0;
  padding-bottom: 0;
}

.sidebar-bottom {
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: auto;
  position: relative;
}

.sidebar-bottom .nav-link {
  display: flex;
  align-items: center;
}

/* Ajuste para o menu colapsado */
#sidebar.collapsed .sidebar-bottom .nav-link {
  justify-content: center;
  padding: 0;
}

/* Altura padrão para header e sidebar-header */
.sidebar-header,
header {
  height: 60px; /* Altura padrão */
  display: flex;
  align-items: center;
}

/* Ajuste do container dentro do header */
header .container-fluid {
  flex: 1;
}

header .py-3 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* Ajuste do logo */
.logo-link {
  height: 100%;
  display: flex;
  align-items: center;
}

/* Ajuste do breadcrumb para centralizar verticalmente */
.breadcrumb {
  margin-bottom: 0;
}
</style>
