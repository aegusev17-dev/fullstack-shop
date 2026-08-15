<script setup>
import { deleteCategory, getCategories } from "@/api/admin/category.api";

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const categories = ref([]);

const handleCreate = () => {
  router.push({ name: "category-create" });
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

const updateCategory = (id) => {
  router.push({ name: "category-update", params: { id } });
};

const deleteCategoryItem = async (id) => {
  if (deleteCategory(id)) {
    getApiCategories();
  }
};

onMounted(async () => {
  getApiCategories();
});
</script>
<template>
  <div class="card mb-6">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">Категории товаров</h3>
    </div>
    <div class="mb-2 mt-4">
      <button
        class="btn btn-outline-success ml-3 cursor-pointer"
        @click="handleCreate"
      >
        Создать категорию
      </button>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Изображение</th>
              <th>Название</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody v-if="categories.length">
            <tr v-for="(item, index) in categories" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <img
                    v-if="item.photo"
                    :src="item.photo"
                    class="w-10 h-10"
                    :alt="item.meta.title"
                  />

                  <img
                    v-else
                    src="https://ui-avatars.com/api/?name=John+Doe&amp;background=3b82f6&amp;color=fff"
                    class="w-8 h-8 rounded-full"
                    :alt="item.meta.title"
                  />
                </div>
              </td>
              <td>{{ item.meta.title }}</td>

              <td>
                <div class="flex gap-1">
                  <button
                    @click="updateCategory(item.id)"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteCategoryItem(item.id)"
                    class="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4">Данные пока отсутствуют</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
