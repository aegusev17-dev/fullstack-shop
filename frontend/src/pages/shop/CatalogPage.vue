<!-- <script setup>
import { getCategories } from "@/api/shop/category.api";
import { onMounted, ref, watch } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { getCategoryProducts } from "@/api/shop/product.api";
import { useRouter } from "vue-router";
import { getCategoriesData } from "@/lib/getCategories";
import { useCartStore } from "@/stores/cart.app";
import { useAppStore } from "@/stores/store.app";


const router = useRouter();
const cartStore = useCartStore()
const app = useAppStore();
const categories = ref([]);
const categoryMap = ref([]);
const products = ref([]);
const message = ref();
const isMessage = ref(false);


const handleAddToCart = async (product) => {
  await cartStore.addToCart(product.id);
  console.log("Добавлен в корзину:", product);
};

const goToProductDetails = (id) => {
  router.push({ name: "product", params: { id: id } });
};

const selectCategory = async (id) => {
  const res = await getCategoryProducts(id);
  if (res) {
    products.value = res.data;
  }
};

const getApiCategories = async () => {
  try {
    const response = await getCategories();

    if (response) {
      categories.value = response.data.filter((val) => val?.meta);
    }
  } catch {
    categories.value = [];
  }
};


watch(
  () => app.hasFlash,
  (newValue) => {
    if (newValue) {
      isMessage.value = true;
      message.value = app.getFlash();
      setTimeout(() => isMessage.value = false, 2000);
    }
  },
  {
    immediate: true
  }
);

onMounted(async () => {
  await getApiCategories();
  if (categories.value.length) {
    categoryMap.value = getCategoriesData(categories.value);
  }
});


</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      
      <aside class="w-full md:w-1/4 float-left pr-4">
        <h3 class="text-lg font-bold mb-4">Категории</h3>
        <ul class="space-y-2">
          <li v-for="item in categories" :key="item.id" class="flex gap-3">
            <img v-if="item.photo" :src="item.photo" class="w-6 h-6" :alt="item.meta.title" />
            <a href="" class="block py-1 hover:text-indigo-600" @click.stop.prevent="selectCategory(item.id)">{{
              item.meta.title }}</a>
          </li>
        </ul>
      </aside>
      <main class="w-full md:w-3/4 float-right">
        <div v-if="isMessage" class="alert alert-info my-5">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div><strong>Info!</strong> {{ message }}.</div>
      </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <product-card v-for="product in products" :key="product.id" :product="product" :categories="categoryMap"
            @view-details="goToProductDetails" @add-to-cart="handleAddToCart" />
        </div>
      </main>
    </div>
  </div>
</template> -->

<script setup>
import { getCategories } from "@/api/shop/category.api";
import { onMounted, ref, watch } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { getCategoryProducts } from "@/api/shop/product.api";
import { useRouter } from "vue-router";
import { getCategoriesData } from "@/lib/getCategories";
import { useCartStore } from "@/stores/cart.app";
import { useAppStore } from "@/stores/store.app";

const router = useRouter();
const cartStore = useCartStore();
const app = useAppStore();
const categories = ref([]);
const categoryMap = ref([]);
const products = ref([]);
const message = ref();
const isMessage = ref(false);

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ - теперь принимает ID, а не объект
const handleAddToCart = async (productId) => {
  console.log("🟢 CatalogPage: получен ID товара:", productId);
  console.log("🟢 CatalogPage: тип ID:", typeof productId);
  
  
  // Проверка на undefined/null
  if (productId === undefined || productId === null) {
    console.error("❌ CatalogPage: ID товара не определен!");
    return;
  }
  
  // Преобразуем в число, если это строка
  const numericId = Number(productId);
  if (isNaN(numericId)) {
    console.error("❌ CatalogPage: ID не является числом:", productId);
    return;
  }
  
  console.log("🟢 CatalogPage: вызываем store с ID:", numericId);
  
  try {
    // ✅ Передаем ТОЛЬКО ID, без объекта
    await cartStore.addToCart(numericId, 1);
    console.log("✅ CatalogPage: товар успешно добавлен в корзину, ID:", numericId);
  } catch (error) {
    console.error("❌ CatalogPage: ошибка при добавлении в корзину:", error);
  }
};

// ✅ Альтернативный вариант - если нужно логировать весь товар
const handleAddToCartWithProduct = async (product) => {
  console.log("🟢 CatalogPage: получен объект товара:", product);
  
  if (!product || !product.id) {
    console.error("❌ CatalogPage: объект товара не содержит ID!", product);
    return;
  }
  
  await cartStore.addToCart(product.id, 1);
  console.log("✅ CatalogPage: товар добавлен в корзину:", product.meta?.title);
};

const goToProductDetails = (id) => {
  console.log("🟢 CatalogPage: переход к товару с ID:", id);
  router.push({ name: "product", params: { id: id } });
};

const selectCategory = async (id) => {
  console.log("🟢 CatalogPage: выбрана категория ID:", id);
  try {
    const res = await getCategoryProducts(id);
    if (res) {
      products.value = res.data;
      console.log("✅ CatalogPage: загружено товаров:", products.value.length);
    }
  } catch (error) {
    console.error("❌ CatalogPage: ошибка загрузки товаров категории:", error);
  }
};

const getApiCategories = async () => {
  try {
    const response = await getCategories();
    if (response) {
      categories.value = response.data.filter((val) => val?.meta);
      console.log("✅ CatalogPage: загружено категорий:", categories.value.length);
    }
  } catch (error) {
    console.error("❌ CatalogPage: ошибка загрузки категорий:", error);
    categories.value = [];
  }
};

watch(
  () => app.hasFlash,
  (newValue) => {
    if (newValue) {
      isMessage.value = true;
      message.value = app.getFlash();
      setTimeout(() => isMessage.value = false, 2000);
    }
  },
  {
    immediate: true
  }
);

onMounted(async () => {
  console.log("🟢 CatalogPage: компонент загружен");
  await getApiCategories();
  if (categories.value.length) {
    categoryMap.value = getCategoriesData(categories.value);
    console.log("✅ CatalogPage: categoryMap создан");
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      
      <aside class="w-full md:w-1/4 float-left pr-4">
        <h3 class="text-lg font-bold mb-4">Категории</h3>
        <ul class="space-y-2">
          <li v-for="item in categories" :key="item.id" class="flex gap-3">
            <img 
              v-if="item.photo" 
              :src="item.photo" 
              class="w-6 h-6" 
              :alt="item.meta.title" 
            />
            <a 
              href="#" 
              class="block py-1 hover:text-indigo-600" 
              @click.stop.prevent="selectCategory(item.id)"
            >
              {{ item.meta.title }}
            </a>
          </li>
        </ul>
      </aside>
      
      <main class="w-full md:w-3/4 float-right">
        <!-- Сообщение об успехе -->
        <div v-if="isMessage" class="alert alert-info my-5 flex items-center gap-2 p-4 bg-blue-100 text-blue-700 rounded-lg">
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div><strong>Info!</strong> {{ message }}.</div>
        </div>
        
        <!-- Сетка товаров -->
        <div 
          v-if="products.length > 0" 
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
        >
          <product-card 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
            :categories="categoryMap"
            @view-details="goToProductDetails" 
            @add-to-cart="handleAddToCart"
          />
        </div>
        
        <!-- Сообщение, если нет товаров -->
        <div v-else class="text-center py-12 text-gray-500">
          <p>В этой категории пока нет товаров</p>
        </div>
      </main>
    </div>
  </div>
</template>
