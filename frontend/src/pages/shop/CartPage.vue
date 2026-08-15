<!-- <script setup>
import { useCartStore } from '@/stores/cart.app';


const cartStore = useCartStore();
const productPlus = (product_id) => {
  cartStore.addToCart(product_id)
}
const productMinus = (product_id) => {
  cartStore.decInCart(product_id)
}


</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">Ваша корзина</h2>
      <div v-if="Object.keys(cartStore.cart.items).length === 0" class="text-center py-12">
        <p>Корзина пуста</p>
      </div>
      <div v-else>
        <div
          v-for="item  in cartStore.cart.items"
          :key="item.id"
          class="flex items-center justify-between border-b py-4"
        >
          <div>
            <h3>{{ item?.product?.meta?.title }}</h3>
            <p>{{ item.amount }} x {{ item.product?.price}} ₽</p>
          </div>
          <div class="flex gap-3">
              <button  @click="productMinus(item.product_id)"  class="text-lg cursor-pointer">-</button>
              <span class="font-bold">{{ item.amount }}</span>
              <button @click="productPlus(item.product_id)" class="text-lg cursor-pointer">+</button>

          </div>
          <div>
            <span class="font-bold">{{ item.total }} ₽</span>
          </div>
        </div>
        <div class="mt-8 text-right">
          <p class="text-xl font-bold">Итого: {{ cartStore.cart.total }} ₽</p>
          <router-link
            to="/checkout"
            class="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Оформить заказ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template> -->

<script setup>
import { onMounted, watch, computed } from 'vue';
import { useCartStore } from '@/stores/cart.app';
import { useUserStore } from '@/stores/store.user';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const userStore = useUserStore();
const router = useRouter();

// ✅ Правильный подсчет общего количества товаров
const totalItems = computed(() => {
  const items = cartStore.cart?.items || {};
  return Object.values(items).reduce((sum, item) => sum + (item.amount || 0), 0);
});

// Для отладки
watch(
  () => cartStore.cart,
  (newCart) => {
    console.log('🛒 Корзина изменилась:', newCart);
    console.log('📦 Товары в корзине:', newCart?.items);
    console.log('📊 Общее количество:', totalItems.value);
  },
  { deep: true, immediate: true }
);

// Проверка авторизации
onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.replace({
      path: '/shop/login',
      query: { redirect: router.currentRoute.value.fullPath }
    });
  }
});

watch(
  () => userStore.isAuthenticated,
  (isAuth) => {
    if (!isAuth) {
      router.replace({
        path: '/shop/login',
        query: { redirect: router.currentRoute.value.fullPath }
      });
    }
  }
);

const productPlus = async (product_id) => {
  if (!userStore.isAuthenticated) {
    router.replace('/shop/login');
    return;
  }
  console.log('➕ Увеличение количества товара:', product_id);
  await cartStore.addToCart(product_id);
};

const productMinus = async (product_id) => {
  if (!userStore.isAuthenticated) {
    router.replace('/shop/login');
    return;
  }
  console.log('➖ Уменьшение количества товара:', product_id);
  await cartStore.decInCart(product_id);
};

// Загружаем корзину
onMounted(async () => {
  if (userStore.isAuthenticated) {
    console.log('📥 Загрузка корзины при монтировании');
    await cartStore.getCart();
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">Ваша корзина</h2>
      
      <!-- Отладочная информация -->
      <div class="bg-blue-100 p-2 mb-4 rounded text-sm">
        <p>Категории товаров: {{ Object.keys(cartStore.cart?.items || {}).length }}</p>
        <p>Общее количество единиц: {{ totalItems }}</p>
        <p>Общая сумма: {{ cartStore.cart?.total }} ₽</p>
        <p>Ключи товаров: {{ Object.keys(cartStore.cart?.items || {}) }}</p>
      </div>
      
      <div v-if="cartStore.loading" class="text-center py-12">
        <p>Загрузка корзины...</p>
      </div>
      
      <div v-else-if="!cartStore.cart?.items || Object.keys(cartStore.cart.items).length === 0" 
           class="text-center py-12">
        <p class="text-gray-500 mb-4">Корзина пуста</p>
        <router-link
          to="/catalog"
          class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Перейти в каталог
        </router-link>
      </div>
      
      <div v-else>
        <div
          v-for="item in cartStore.cart.items"
          :key="item.product_id"
          class="flex items-center justify-between border-b py-4"
        >
          <div class="flex-1">
            <h3 class="font-medium">{{ item?.product?.meta?.title || `Товар ${item.product_id}` }}</h3>
            <p class="text-gray-600">{{ item.amount }} x {{ item.product?.price || 1000 }} ₽</p>
          </div>
          
          <div class="flex items-center gap-3 mx-4">
            <button 
              @click="productMinus(item.product_id)" 
              class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              :disabled="cartStore.loading"
            >
              -
            </button>
            <span class="font-bold min-w-[2rem] text-center">{{ item.amount }}</span>
            <button 
              @click="productPlus(item.product_id)" 
              class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              :disabled="cartStore.loading"
            >
              +
            </button>
          </div>
          
          <div class="text-right min-w-[100px]">
            <span class="font-bold">{{ item.amount * (item.product?.price || 1000) }} ₽</span>
          </div>
        </div>
        
        <div class="mt-8 text-right border-t pt-4">
          <p class="text-xl font-bold">Итого: {{ cartStore.cart.total || 0 }} ₽</p>
          <router-link
            to="/checkout"
            class="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Оформить заказ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>