<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
// import StarRating from "./StarRating.vue";
import ProductCard from "./components/ProductCard.vue";
import { getProducts } from "@/api/shop/product.api";
import { useRoute, useRouter } from "vue-router";
import { getCategories } from "@/api/shop/category.api";
import { getCategoriesData } from "@/lib/getCategories";
import { useCartStore } from "@/stores/cart.app";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const activeTab = ref("desc");
const quantity = ref(1);
const product = ref();
const productId = ref();
const categories = ref();
// Пример данных продукта
// const product = {
//   id: 1,
//   title: "Ноутбук HP Pavilion 15",
//   description: "Мощный ноутбук для работы и игр",
//   fullDescription: "Полное описание...",
//   image: "/images/laptop.jpg",
//   images: ["/images/laptop.jpg", "/images/laptop-back.jpg"],
//   price: 50000,
//   oldPrice: 55000,
//   rating: 4.7,
//   reviewsCount: 120,
//   specs: {
//     Процессор: "Intel Core i7",
//     Память: "16 ГБ",
//     SSD: "512 ГБ",
//     Диагональ: '15.6"',
//   },
//   reviews: [
//     {
//       id: 1,
//       author: "Иван Петров",
//       rating: 5,
//       text: "Отличный ноутбук, всем рекомендую!",
//     },
//   ],
// };

const relatedProducts = [
  {
    id: 2,
    title: "Смартфон Samsung Galaxy S21",
    description: "Флагманский смартфон",
    image: "/images/phone.jpg",
    price: 40000,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Наушники Sony WH-CH720N",
    description: "Шумоподавление, беспроводные",
    image: "/images/headphones.jpg",
    price: 10000,
    rating: 4.8,
  },
];

const selectedImage = ref(null);

const selectImage = (img) => {
  selectedImage.value = img;
};

const increaseQty = () => {
  quantity.value++;
};

const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--;
};

// const addToCart = () => {
//   if (product.value) {
//     console.log(`Добавлено ${quantity.value} шт. "${product.value.meta?.title}" в корзину`);
//     cartStore.addToCart(product.value.id);
//   }
// };

const addToCart = async () => {
  if (product.value) {
    console.log(`Добавлено ${quantity.value} шт. "${product.value.meta?.title}" в корзину`);
    await cartStore.addToCart(product.value.id, quantity.value); // Передаем выбранное количество
  }
};

const buyNow = () => {
  console.log("Быстрая покупка:", product.title);
};

const goToProduct = (item) => {
  console.log("Переход к товару:", item.title);
};

onMounted(async () => {
  productId.value = route.params.id;
  const _product = await getProducts(productId.value);
  if (_product) {
    product.value = _product.data[0];
    try {
      const response = await getCategories();
      if (response) {
        const _categories = response.data.filter((val) => val?.meta);
        if (_categories.length) {
          categories.value = getCategoriesData(_categories);
        }
      }
    } catch {}
  }
  //   console.log(await getProducts(productId.value));
});
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Хлебные крошки -->
      <nav class="text-sm mb-6">
        <RouterLink to="/" class="text-indigo-600">Главная</RouterLink> /
        <RouterLink to="/catalog" class="text-indigo-600">Каталог</RouterLink> /
        <span class="text-gray-600">{{ product?.meta?.title }}</span>
      </nav>

      <!-- Основной контент -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Галерея изображений -->
        <div class="lg:w-1/2">
          <div class="bg-white p-4 rounded-lg shadow">
            <img
              :src="product?.images[0] || '/placeholder.jpg'"
              :alt="product?.meta?.title"
              class="w-full h-96 object-contain rounded"
            />
            <!-- Мини-галерея -->
            <div class="flex mt-4 space-x-2">
              <img
                v-for="(img, idx) in product?.images || [product?.images[0]]"
                :key="idx"
                :src="img || '/placeholder.jpg'"
                alt="Thumbnail"
                class="w-16 h-16 object-cover border rounded cursor-pointer"
                @click="selectImage(img)"
              />
            </div>
          </div>
        </div>

        <!-- Информация о товаре -->
        <div class="lg:w-1/2">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">
            {{ product?.meta?.title }}
          </h1>
          <p v-if="categories" class="text-gray-600 text-sm my-1 line-clamp-2">
            {{ categories[product.category_id]?.title }}
          </p>

          <!-- Рейтинг -->
          <!-- <div class="mb-4">
            <StarRating :rating="product.meta.rating" :reviews-count="product.meta.reviewsCount" />
          </div> -->

          <!-- Цена -->
          <div class="flex items-center space-x-4 mb-6">
            <span class="text-2xl font-bold text-indigo-600"
              >{{ product?.meta?.price }} ₽</span
            >
            <span
              v-if="product?.meta?.oldPrice"
              class="text-gray-500 line-through"
            >
              {{ product.meta.oldPrice }} ₽
            </span>
          </div>

          <!-- Описание -->
          <p class="text-gray-600 mb-6">{{ product?.meta?.description }}</p>

          <!-- Характеристики -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-800 mb-2">Характеристики:</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li v-for="(value, key) in product?.meta?.specs" :key="key">
                <strong>{{ key }}:</strong> {{ value }}
              </li>
            </ul>
          </div>

          <!-- Количество и кнопки -->
          <div class="flex items-center mb-6">
            <div class="flex items-center border rounded-lg">
              <button @click="decreaseQty" class="px-3 py-1 border-r">-</button>
              <input
                v-model.number="quantity"
                min="1"
                class="w-16 text-center border-0 focus:ring-0"
              />
              <button @click="increaseQty" class="px-3 py-1 border-l">+</button>
            </div>
            <button
              @click="addToCart"
              class="ml-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              В корзину
            </button>
            <button
              @click="buyNow"
              class="ml-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Купить
            </button>
          </div>
        </div>
      </div>

      <!-- Описание и отзывы -->
      <div class="mt-12 bg-white p-6 rounded-lg shadow">
        <div class="border-b border-gray-200 mb-6">
          <button
            :class="{
              'border-b-2 border-indigo-600 text-indigo-600':
                activeTab === 'desc',
            }"
            class="mr-6 pb-2 font-medium"
            @click="activeTab = 'desc'"
          >
            Описание
          </button>
          <button
            :class="{
              'border-b-2 border-indigo-600 text-indigo-600':
                activeTab === 'reviews',
            }"
            class="pb-2 font-medium"
            @click="activeTab = 'reviews'"
          >
            Отзывы ({{ product?.reviewsCount || 0 }})
          </button>
        </div>

        <div v-if="activeTab === 'desc'" class="prose max-w-none">
          <p>{{ product?.fullDescription || product?.description }}</p>
        </div>

        <div v-if="activeTab === 'reviews'">
          <div v-if="product?.reviews && product?.reviews.length > 0">
            <div
              v-for="review in product.reviews"
              :key="review.id"
              class="border-b border-gray-100 pb-4 mb-4"
            >
              <div class="flex items-center">
                <!-- <StarRating :rating="review.rating" /> -->
                <span class="ml-2 font-medium">{{ review.author }}</span>
              </div>
              <p class="mt-2 text-gray-600">{{ review.text }}</p>
            </div>
          </div>
          <p v-else class="text-gray-500">Отзывов пока нет.</p>
        </div>
      </div>

      <!-- Сопутствующие товары -->
      <section v-if="relatedProducts.length" class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Вам может понравиться</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <!-- <ProductCard
            v-for="item in relatedProducts"
            :key="item.id"
            :product="item"
            @add-to-cart="addToCart"
            @view-details="goToProduct"
          /> -->
        </div>
      </section>
    </div>
  </div>
</template>
