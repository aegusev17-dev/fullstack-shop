<script setup>
import { getCategories } from "@/api/admin/category.api";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "@/api/admin/product.api";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCategoriesData } from "@/lib/getCategories";

// import router from '@/router';
const router = useRouter();
const route = useRoute();
const productModel = ref({
  title: "",
  categoryId: null,
  productId: null,
  images: [],
  price: 0,
  recommended: false,
});
const categories = ref([]);
const inputImages = ref();
const responseError = ref(false);

const reset = () => {
  productModel.value.title = "";
};
const back = () => {
  router.push({ name: "products" });
};

const submit = async () => {
  if (productModel.value.title && productModel.value.title.length) {
    const meta = {
      title: productModel.value.title,
      recommended: productModel.value.recommended,
      price: productModel.value.price,
    };
    const formData = new FormData();
    formData.append("meta", JSON.stringify(meta));
    formData.append("category_id", productModel.value.categoryId);

    const files = inputImages.value?.files;

    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await (async () => {
      if (productModel.value.productId) {
        //update\
        return await updateProduct(productModel.value.productId, formData);
      } else {
        // create
        return await createProduct(formData);
      }
    })();
    if (response) {
      router.push({ name: "products" });
    }
  }
};

onMounted(async () => {
  if (route.params?.id) {
    productModel.value.productId = route.params.id;
    const response = await getProducts(productModel.value.productId);

    if (response) {
      const data = response.data[0];
      productModel.value = {
        ...productModel.value,
        title: data.meta.title,
        categoryId: data.category_id,
        recommended: data.meta.recommended,
        price: data.meta?.price ?? 0,
      };
      if (data.images.length) {
        productModel.value.images = [...data.images];
      }
    } else {
      responseError.value = true;
    }
  }

  const responseCategories = await getCategories();
  if (responseCategories) {
    categories.value = getCategoriesData(responseCategories.data);
  }
});
</script>
<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">
        <span v-if="productModel.productId">Редактирование товара</span>
        <span v-else>Создание товара</span>
      </h3>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-label">Select category</label>
        <select class="form-control" v-model="productModel.categoryId">
          <option v-for="(item, _key) in categories" :key="_key" :value="_key">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Title</label>
        <input
          v-model.trim="productModel.title"
          type="text"
          class="form-control"
          placeholder="Enter title category..."
        />
      </div>

      <div class="form-group">
        <label class="form-label">Price</label>
        <input
          v-model.number="productModel.price"
          type="text"
          class="form-control"
          placeholder="Enter title category..."
        />
      </div>

      <div class="form-check my-3">
        <input
          type="checkbox"
          class="form-check-input"
          v-model="productModel.recommended"
        />
        <label class="form-check-label" for="check1">Рекомендуемый товар</label>
      </div>

      <div class="form-group">
        <label class="form-label">Product images</label>
        <input type="file" class="form-control" ref="inputImages" multiple />
      </div>

      <div class="mt-3 mb-4">
        <div>Текущие фото</div>
        <div v-if="productModel.images.length" class="flex gap-3 p-3">
          <img
            v-for="(image, _key) in productModel.images"
            :key="_key"
            :src="image"
            class="w-50 border border-gray-300 rounded"
            :alt="productModel.title"
          />
        </div>
        <div v-else>Фото отсутствует</div>
      </div>

      <div class="flex gap-2">
        <button @click="back" class="btn btn-info">Back</button>
        <button @click="submit" class="btn btn-primary">Submit</button>
        <button @click="reset" class="btn btn-secondary">Reset</button>
      </div>
    </div>
    <div v-if="responseError" class="p-5 bg-red-800 text-gray-200 m-3">
      Ошибка запроса на сервер
    </div>
  </div>
</template>
