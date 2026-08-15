<script setup>
import { getCategories, updateCategory } from "@/api/admin/category.api";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// import router from '@/router';
const router = useRouter();
const route = useRoute();
const title = ref();
const category = ref();
const categoryId = ref();
const fileInput = ref(null);
const photo = ref();
const back = () => {
  router.push({ name: "categories" });
};

const reset = () => {
  title.value = "";
};

const submit = async () => {
  if (title.value && title.value.length) {
    const meta = {
      title: title.value,
    };
    const formData = new FormData();
    formData.append("meta", JSON.stringify(meta));

    const files = fileInput.value?.files;

    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append(`image`, file);
      });
    }
    const response = await updateCategory(categoryId.value, formData);

    if (response) {
      router.push({ name: "categories" });
    }
  }
};

onMounted(async () => {
  categoryId.value = route.params.id;

  const response = await getCategories(categoryId.value);

  if (response) {
    title.value = response.data.meta.title;
    photo.value = response.data.photo;
  }
});
</script>
<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">Basic Form Elements</h3>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input
          v-model.trim="title"
          type="text"
          class="form-control"
          placeholder="Enter title category..."
        />
      </div>

      <div class="form-group">
        <label class="form-label">Category image</label>
        <input type="file" class="form-control" ref="fileInput" />
      </div>
      <div class="mt-3 mb-4">
        <div>Текущее фото</div>
        <img v-if="photo" :src="photo" class="w-50" :alt="title" />
        <div v-else>Фото отсутствует</div>
      </div>

      <div class="flex gap-2">
        <button @click="back" class="btn btn-secondary">Back</button>
        <button @click="submit" class="btn btn-primary">Submit</button>
        <button @click="reset" class="btn btn-secondary">Reset</button>
      </div>
    </div>
  </div>
</template>
