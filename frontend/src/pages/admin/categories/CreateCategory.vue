<script setup>
import { createCategory } from "@/api/admin/category.api";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

// import router from '@/router';
const router = useRouter();
const title = ref();
const fileInput = ref(null);

// const handleCreate = () => {
//   router.push()
// }

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
    const response = await createCategory(formData);
    if (response) {
      router.push({ name: "categories" });
    }
  }
};
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

      <div class="flex gap-2">
        <button @click="submit" class="btn btn-primary">Submit</button>
        <button @click="reset" class="btn btn-secondary">Reset</button>
        <button @click="file" class="btn btn-secondary">file</button>
      </div>
    </div>
  </div>
</template>
