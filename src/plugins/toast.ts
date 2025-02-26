import { App, createApp } from 'vue';
import ToastNotification from '@/components/ToastNotification.vue';

export const toast = {
  install(app: App) {
    // Criar container para os toasts
    const toastContainer = document.createElement('div');
    document.body.appendChild(toastContainer);

    // Montar componente
    const toastApp = createApp(ToastNotification);
    const toastInstance = toastApp.mount(toastContainer);

    // Simplificando para usar apenas a mensagem do backend
    app.config.globalProperties.$toast = {
      success(message: string) {
        (toastInstance as any).addToast('success', message);
      },
      error(message: string) {
        (toastInstance as any).addToast('error', message);
      },
      warning(message: string) {
        (toastInstance as any).addToast('warning', message);
      },
      info(message: string) {
        (toastInstance as any).addToast('info', message);
      }
    };
  }
}; 