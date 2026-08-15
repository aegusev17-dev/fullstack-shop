<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/store.user";

onMounted(async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const user = useUserStore();
    // const role = localStorage.getItem("role") ?? "client";
    // user.setToken(token, role);
    await user.checkAuth();
  }
});
</script>

<template>
  <div class="bg-gray-500 min-h-screen">
    <RouterView />
  </div>
</template>
