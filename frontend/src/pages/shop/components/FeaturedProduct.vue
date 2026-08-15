<script setup>
import { getCategories } from "@/api/shop/category.api";
import { getProducts } from "@/api/shop/product.api";
import { getCategoriesData } from "@/lib/getCategories";

import { computed, onMounted, ref } from "vue";

const products = ref([]);
const categories = ref([]);

const productRecommended = computed(() => {
  if (products.value.length) {
    return products.value.filter((item) => item.meta.recommended);
  }
  return [];
});

const getApiProducts = async () => {
  try {
    const response = await getProducts();
    if (response) {
      products.value = response.data.filter((val) => val?.meta);
    }
  } catch {
    products.value = [];
  }
};

onMounted(async () => {
  getApiProducts();
  const responseCategories = await getCategories();
  categories.value = getCategoriesData(responseCategories.data);
});
</script>
<template>
  <section class="py-12 container mx-auto px-4">
    <h2 class="text-2xl font-bold mb-8 text-center">Рекомендуемые товары</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in productRecommended"
        :key="product.id"
        :product="product"
        class="text-center"
      >
        <div
          class="bg-white p-4 rounded-lg shadow hover:shadow-md flex flex-col justify-center items-center"
        >
          <img
            :src="product.images[0]"
            class="w-32 h-32"
            alt="${product.meta.title}"
          />
          <h3 class="font-semibold">{{ product.meta.title }}</h3>
          <p class="text-indigo-600 font-bold">
            {{ product.meta.price ?? 0.0 }} ₽
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
