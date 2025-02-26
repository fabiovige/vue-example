import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async(to, from, next) => {
  const authStore = useAuthStore();
  if(to.meta.requiresAuth) {
    if(authStore.token === null) {
      next({ name: 'login' });
    } else {
      const isTokenValid = await authStore.checkAuth();
      if(isTokenValid) {
        next();
      } else {
        next({ name: 'login' });
      }
    }
  } else {
    next();
  }
});

export default router
