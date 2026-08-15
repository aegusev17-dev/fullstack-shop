<script setup>
import { onMounted, provide, ref, watch } from "vue";
// import SignIn from "./../components/SignIn.vue";
// import SignUp from "../components/SignUp.vue";
import { useUserStore } from "@/stores/store.user";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart.app";

const router = useRouter();

const userStore = useUserStore();
const cartStore = useCartStore();
const modalLogin = ref(false);
const modalRegister = ref(false);

const loginClose = () => (modalLogin.value = false);
const registerClose = () => (modalRegister.value = false);
const changeInUpModal = (isRegister, isLogin) => {
  modalLogin.value = isLogin;
  modalRegister.value = isRegister;
};

provide("userLoginRegister", {
  loginClose,
  registerClose,
  changeInUpModal,
});
provide("loginClose", loginClose);
provide("registerClose", registerClose);

watch(
  () => userStore.isAuthenticated,
  async (val) => {
    if (val) {
      await cartStore.getCart();
    }
  },
  {
    immediate: true,
  }
);

onMounted(async () => {
  if (userStore.isAuthenticated) {
    await cartStore.getCart();
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-xl font-bold text-indigo-600">ShopName</h1>
        <nav>
          <ul class="flex space-x-6">
            <li>
              <router-link
                to="/"
                class="font-medium text-gray-700 hover:text-indigo-600"
                >Главная</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'catalog' }"
                class="font-medium text-gray-700 hover:text-indigo-600"
                >Каталог</router-link
              >
            </li>
            <!-- Исправлено: убран дублирующийся v-if и исправлен синтаксис -->
            <li v-if="userStore.isAuthenticated">
              <a
                href="#"
                class="font-medium text-gray-700 hover:text-indigo-600"
                @click.prevent="router.push({ name: 'cart' })"
                >Корзина</a
              >
            </li>
            <!-- Исправлено: убраны дублирующиеся атрибуты @click -->
            <li>
              <a
                href="#"
                class="font-medium text-gray-700 hover:text-indigo-600"
                @click.prevent
                >Профиль</a
              >
            </li>
            <li v-if="!userStore.isAuthenticated">
              <router-link
                :to="{ name: 'shop-login' }"
                class="font-medium text-gray-700 hover:text-indigo-600"
                >Вход</router-link
              >
            </li>
            <li v-if="userStore.isAuthenticated">
              <a
                href="#"
                class="font-medium text-gray-700 hover:text-indigo-600"
                @click.prevent="userStore.logout()"
                >Выход ({{ userStore.userData?.email }})</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="p-4">
      <RouterView />
    </div>
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 mt-12">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2026 ShopName. Все права защищены.</p>
      </div>
    </footer>
  </div>
  
  <!-- Модальные окна -->
  <!-- <SignIn v-if="modalLogin" />
  <SignUp v-if="modalRegister" /> -->
</template>
