<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  categories: {
    type: Object,
    required: true,
  },
});

// Внутренний компонент звезды
defineEmits(["add-to-cart", "view-details"]);
</script>

<template>
  <div 
    :data-product-id="product.id" 
    class="bg-white rounded-lg shadow overflow-hidden flex flex-col max-w-[18rem]"
  >
    <!-- Изображение товара -->
    <img
      :src="product.images[0] || '/placeholder.jpg'"
      :alt="product.meta.title"
      class="w-full h-48 object-cover"
    />

    <!-- Информация о товаре -->
    <div class="p-4 grow flex flex-col">
      <h3 class="product-title text-lg font-semibold text-gray-800 truncate">
        {{ product.meta.title }}
      </h3>
      <!-- остальной код -->
    </div>

    <!-- Кнопки -->
    <div class="p-4 border-t border-gray-100 flex justify-between gap-2">
      <button
        @click="$emit('add-to-cart', product.id)"
        class="flex-1 px-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        В корзину
      </button>
      <button
        @click="$emit('view-details', product.id)"
        class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
      >
        Подробнее
      </button>
    </div>
  </div>
</template>