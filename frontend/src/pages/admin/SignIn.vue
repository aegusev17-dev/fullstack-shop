<script setup>
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/store.user";
import { ref } from "vue";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const userForm = ref({
  login: "admin-g",
  login: "admin@test.com"
  // password: "1234"
});

const loading = ref(false);
const error = ref("");

const submitForm = async () => {
  if (!userForm.value.login || !userForm.value.password) {
    error.value = "Заполните все поля";
    return;
  }
  
  loading.value = true;
  error.value = "";
  
  try {
    console.log('🔐 Попытка входа админа:', userForm.value.login);
    const res = await userStore.login(userForm.value, true);
    
    if (res) {
      console.log('✅ Вход админа успешен');
      const redirect = route.query.redirect || '/admin';
      router.push(redirect);
    } else {
      error.value = "Неверный логин или пароль";
    }
  } catch (e) {
    console.error('❌ Ошибка входа:', e);
    error.value = e.message || "Ошибка входа";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="h-screen bg-linear-to-br from-blue-500 to-purple-600 bg-opacity-50">
    <div class="min-h-full flex flex-col items-center justify-between">
      <div class="w-full max-w-md mt-20">
        <!-- Logo -->
        <div class="text-center mb-8">
          <a href="/" class="inline-flex items-center gap-2 text-white">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span class="text-2xl font-bold">Admin Panel Shop Name</span>
          </a>
        </div>

        <!-- Login Card -->
        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p class="text-gray-500 mt-1">Sign in to continue to your dashboard</p>
          </div>

          <!-- Сообщение об ошибке -->
          <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {{ error }}
          </div>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="form-group">
              <label class="form-label">User Login</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input
                  type="text"
                  class="form-control pl-10"
                  placeholder="user login"
                  v-model="userForm.login"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">User Password</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  class="form-control pl-10"
                  placeholder="Enter your password"
                  v-model="userForm.password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              class="btn btn-primary w-full btn-lg mb-4" 
              :disabled="loading"
            >
              {{ loading ? 'Вход...' : 'Sign In' }}
            </button>
          </form>
        </div>
      </div>
      <!-- Footer -->
      <p class="text-center text-white/70 text-sm mt-8 mb-10">
        © 2026 AdminLTE. All rights reserved.
      </p>
    </div>
  </div>
</template>