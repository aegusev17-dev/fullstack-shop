<!-- <script setup>
import { useAppStore } from "@/stores/store.app";
import { useUserStore } from "@/stores/store.user";
import { computed, inject, ref, watch } from "vue";

const app = useAppStore();
const user = ref({
  login: "q3@q.q",
  password: "1234",
});
const isError = ref(false);
const error = ref();

const userLoginRegister = inject("userLoginRegister");

const userLogin = async () => {
  const userStore = useUserStore();
  const res = await userStore.login(user.value);
  if (res) {
    userLoginRegister.changeInUpModal(false, false);
  }
};

watch(
  () => app.hasFlash,
  (newValue) => {
    if (newValue) {
      isError.value = true;
      error.value = app.getFlash();
    }
  },
);
</script> -->
<!-- <template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    style="background-color: rgba(91, 91, 91, 0.5)"
    @click.stop="userLoginRegister.loginClose()"
  >
    <div
      class="bg-linear-to-br from-purple-300 to-purple-600 rounded-lg shadow-lg min-w-lg max-w-lg p-6 relative"
      @click.stop
    >
      <div>
        <div class="min-h-full flex items-center justify-center p-4">
          <div class="w-full max-w-md">
            <!-- Logo
            <div class="text-center mb-8">
              <span class="inline-flex items-center gap-2 text-white">
                <svg
                  class="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
                <span class="text-2xl font-bold">Shop Name</span>
              </span>
            </div>

            <!-- Login Card
            <div class="bg-white rounded-2xl shadow-2xl p-8">
              <div class="text-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">
                  Welcome to shop name
                </h1>
              </div>

              <div class="form-group">
                <label class="form-label">Email Address</label>
                <div class="relative">
                  <span
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="email"
                    class="form-control pl-10"
                    placeholder="user@example.com"
                    v-model="user.login"
                    @input="isError = false"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="relative">
                  <span
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="password"
                    class="form-control pl-10"
                    placeholder="Enter your password"
                    v-model="user.password"
                    @input="isError = false"
                  />
                </div>
              </div>

              <button
                class="btn btn-primary w-full btn-lg mb-4"
                @click="userLogin"
              >
                Sign In
              </button>

              <div v-if="isError">
                <div class="alert alert-danger">
                  <svg
                    class="w-5 h-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>{{ error }}</div>
                </div>
              </div>

              <p class="text-center text-gray-600">
                Don't have an account?
                <a
                  href=""
                  class="text-blue-600 hover:underline font-medium"
                  @click.prevent.stop="
                    userLoginRegister.changeInUpModal(true, false)
                  "
                  >Sign up</a
                >
              </p>
            </div>

            <!-- Footer
            <p class="text-center text-white/70 text-sm mt-8">
              © 2026 AdminLTE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<script setup>
import { ref, watch } from "vue";
import { useAppStore } from "@/stores/store.app";
import { useUserStore } from "@/stores/store.user";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const app = useAppStore();
const userStore = useUserStore();

const form = ref({
  login: "q3@q.q",
  password: "1234",
});

const isError = ref(false);
const error = ref("");
const loading = ref(false);

const userLogin = async () => {
  loading.value = true;
  isError.value = false;
  
  const res = await userStore.login(form.value, false);
  
  if (res) {
    // Получаем redirect из query параметров или используем главную страницу
    const redirect = route.query.redirect || '/';
    router.push(redirect);
  } else {
    isError.value = true;
    error.value = "Ошибка входа. Проверьте логин и пароль.";
  }
  
  loading.value = false;
};

watch(
  () => app.hasFlash,
  (newValue) => {
    if (newValue) {
      isError.value = true;
      error.value = app.getFlash();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-purple-300 to-purple-600 overflow-y-auto">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <span class="inline-flex items-center gap-2 text-purple-600">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <span class="text-2xl font-bold">Shop Name</span>
        </span>
      </div>

      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">
        Вход в магазин
      </h1>

      <form @submit.prevent="userLogin" class="space-y-4">
        <div class="form-group">
          <label class="form-label">Email</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </span>
            <input
              type="email"
              class="form-control pl-10"
              placeholder="user@example.com"
              v-model="form.login"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Пароль</label>
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
              placeholder="Введите пароль"
              v-model="form.password"
              required
            />
          </div>
        </div>

        <div v-if="isError" class="alert alert-danger">
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>{{ error }}</div>
        </div>

        <button
          type="submit"
          class="btn btn-primary w-full btn-lg"
          :disabled="loading"
        >
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Нет аккаунта?
        <router-link
          to="/shop/register"
          class="text-blue-600 hover:underline font-medium"
        >
          Зарегистрироваться
        </router-link>
      </p>
    </div>
  </div>
</template>
