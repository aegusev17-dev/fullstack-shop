import { useAppStore } from "@/stores/store.app";
import { useUserStore } from "@/stores/store.user";
import axios from "axios";

const urlAPI = "/api";
// const urlAPI = "";

const http = axios.create({
  // baseURL: '',
  baseURL: urlAPI,
  timeout: 3000,
});

// Флаг для предотвращения циклических вызовов
let isRefreshing = false;

http.interceptors.request.use((request) => {
  const userStore = useUserStore();
  const app = useAppStore();

  if (!("Content-Type" in request.headers)) {
    request.headers["Content-Type"] = "application/json";
  }

  if (app.sess_id) {
    request.headers["sess-id"] = app.sess_id;
  }

  if (userStore.token) {
    request.headers["Authorization"] = `Bearer ${userStore.token}`;
  }
  
  return request;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Если это уже повторный запрос или не 401 - просто отклоняем
    if (originalRequest?._retry || error.response?.status !== 401) {
      return Promise.reject(error);
    }
    
    // Предотвращаем множественные вызовы logout
    if (isRefreshing) {
      return Promise.reject(error);
    }
    
    isRefreshing = true;
    
    try {
      // Отмечаем запрос как повторный
      originalRequest._retry = true;
      
      // Очищаем токены
      const { useUserStore } = await import('@/stores/store.user');
      const userStore = useUserStore();
      
      // Сбрасываем состояние без вызова API
      userStore.$patch({
        isAuthenticated: false,
        role: null,
        userData: null,
        _token: null
      });
      
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      
      // Перенаправляем на страницу входа, но только если это не запрос на logout
      if (!originalRequest.url.includes('/logout')) {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login')) {
          if (currentPath.includes('/admin')) {
            window.location.href = '/admin/login';
          } else {
            window.location.href = '/shop/login';
          }
        }
      }
    } catch (e) {
      console.error('Error during auth cleanup:', e);
    } finally {
      isRefreshing = false;
    }
    
    return Promise.reject(error);
  }
);

export { http };
