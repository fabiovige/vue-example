import './assets/custom.scss'
import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Apenas o JS do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { toast } from './plugins/toast'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(toast)

app.mount('#app')
