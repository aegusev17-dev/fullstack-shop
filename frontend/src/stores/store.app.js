import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const _sess_id = ref("-PX4lS8pN6gqJFxTJUFBoiHp7SLhVWrc");
  const _hasFlash = ref();
  const _flash = ref();

  const hasFlash = computed(() => Boolean(_flash.value));
  const setFlash = (data) => {
    _flash.value = data;
  };
  const getFlash = () => {
    const res = _flash.value ?? null;
    _flash.value = null;
    return res;
  };

  const sess_id = computed(() => _sess_id.value);

  return {
    sess_id,
    hasFlash,
    setFlash,
    getFlash,
  };
});
