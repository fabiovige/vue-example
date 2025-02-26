<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div 
      v-for="toast in toasts" 
      :key="toast.id"
      class="toast show"
      :class="getToastClass(toast.type)"
      role="alert"
    >
      <div class="toast-header border-0 bg-transparent">
        <i class="bi me-2" :class="getToastIcon(toast.type)"></i>
        <strong class="me-auto">{{ toast.message }}</strong>
        <button 
          type="button" 
          class="btn-close ms-2" 
          @click="removeToast(toast.id)"
          aria-label="Fechar"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Toast {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const toasts = ref<Toast[]>([]);
let toastCount = 0;

const getToastClass = (type: string) => ({
  'bg-success-subtle text-success': type === 'success',
  'bg-danger-subtle text-danger': type === 'error',
  'bg-warning-subtle text-warning': type === 'warning',
  'bg-info-subtle text-info': type === 'info'
});

const getToastIcon = (type: string) => ({
  'bi-check-circle-fill': type === 'success',
  'bi-x-circle-fill': type === 'error',
  'bi-exclamation-triangle-fill': type === 'warning',
  'bi-info-circle-fill': type === 'info'
});

const addToast = (type: Toast['type'], message: string) => {
  const id = ++toastCount;
  toasts.value.unshift({ id, type, message });
  setTimeout(() => removeToast(id), 5000);
};

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter(toast => toast.id !== id);
};

defineExpose({
  addToast
});
</script>

<style scoped>
.toast-container {
  z-index: 1060;
}

.toast {
  min-width: 300px;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: none;
  margin-bottom: 0.75rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.toast:last-child {
  margin-bottom: 0;
}

.toast-header {
  padding: 0.75rem 1rem;
}

.btn-close {
  padding: 0.5rem;
}

.btn-close:focus {
  box-shadow: none;
}
</style> 