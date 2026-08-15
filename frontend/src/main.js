import './assets/styles.css'
// import "tailwindcss";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

if (import.meta.env.DEV) {
  // Простая проверка через setTimeout
  setTimeout(async () => {
    console.group('🔍 ПРОВЕРКА МОДУЛЕЙ');
    
    // Проверка конкретных файлов
    const filesToCheck = [
      { name: 'client.http', path: './api/client.http.js' },
      { name: 'admin.user.api', path: './api/admin/user.api.js' },
      { name: 'shop.user.api', path: './api/shop/user.api.js' },
      { name: 'store.user', path: './stores/store.user.js' }
    ];
    
    for (const file of filesToCheck) {
      try {
        const module = await import(/* @vite-ignore */ file.path);
        console.log(`✅ ${file.name} - OK`);
      } catch (e) {
        console.log(`❌ ${file.name} - ${e.message}`);
      }
    }
    
    console.groupEnd();
  }, 1000);
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
