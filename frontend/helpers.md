<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="title" placeholder="Заголовок" required />
      <textarea v-model="description" placeholder="Описание"></textarea>
      <input type="file" ref="fileInput" multiple @change="handleFileChange" />

      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const title = ref('');
const description = ref('');
const fileInput = ref(null); // ссылка на input


async function submitForm() {
  const formData = new FormData();

  // Обычные поля
  formData.append('title', title.value.file);
  formData.append('description', description.value);

  // Получаем файлы из input напрямую
  const files = fileInput.value?.files;

  if (files && files.length > 0) {
    Array.from(files).forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
  }

  try {
    const response = await axios.post('/api/submit-form', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Форма отправлена:', response.data);
  } catch (err) {
    console.error('Ошибка:', err);
  }
}
</script>


{
    path: "/categories",
    name: "categories",
    component: () => import("@/pages/admin/ProductCategory.vue"),
    children: [
      {
        path: ":id", 
        name: "category-detail",
        component: () => import("@/pages/admin/CategoryDetail.vue")
      }
    ]
  }

  <router-link :to="{ name: 'category-detail', params: { id: 2 } }">
  Перейти к категории 2
</router-link>

router.push({ 
  name: "category-detail", 
  params: { id: 2 } 
});

