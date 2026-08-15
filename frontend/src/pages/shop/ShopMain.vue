<script setup>
import FeaturedProduct from "./components/FeaturedProduct.vue";
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-linear-to-r from-indigo-500 to-purple-600 text-white py-20"
    >
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4">Новые поступления уже здесь!</h2>
        <p class="mb-6 max-w-lg mx-auto">
          Откройте для себя лучшие предложения и эксклюзивные товары.
        </p>
        <button
          class="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Перейти в каталог
        </button>
      </div>
    </section>

    <!-- Featured Products -->
    <FeaturedProduct></FeaturedProduct>
  </div>
</template>
