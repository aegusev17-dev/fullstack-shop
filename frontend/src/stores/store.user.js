import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { adminCheckAuth, adminLogin } from "@/api/admin/user.api";
import { userCheckAuth, userLogin, userLogout } from "@/api/shop/user.api";
import { useAppStore } from "./store.app";

export const useUserStore = defineStore("user", () => {
  const isAuthenticated = ref(false);
  const role = ref(null);
  const userData = ref();
  const _token = ref();

  const token = computed(() => _token.value);

  const setToken = (value, roleData = null) => {
    _token.value = value;
    isAuthenticated.value = true;
    role.value = roleData;

    localStorage.setItem("token", value);
    if (roleData) {
      localStorage.setItem("role", roleData);
    }
  };

  const login = async (user, isAdmin = false) => {
    try {
      let responseToken;
      
      if (isAdmin) {
        console.log('🔵 Admin login attempt:', user.login);
        responseToken = await adminLogin(user);
        if (responseToken) {
          setToken(responseToken, "admin");
        }
      } else {
        console.log('🟢 User login attempt:', user.login);
        responseToken = await userLogin(user);
        if (responseToken) {
          setToken(responseToken, "user");
        }
      }
      
      if (responseToken) {
        userData.value = { ...user, email: user.login };
        console.log('✅ Login successful, role:', role.value);
        return true;
      }
    } catch (e) {
      console.error('❌ Login error:', e);
      const app = useAppStore();
      app.setFlash(e.data?.message || "Ошибка входа");
    }
    return false;
  };

const logout = async () => {
  try {
    // Проверяем, есть ли токен и роль
    const currentRole = role.value;
    
    // Пытаемся вызвать API logout только если есть токен и это не админ
    if (_token.value && currentRole !== 'admin') {
      try {
        await userLogout();
      } catch (error) {
        console.error("Logout API error:", error);
        // Игнорируем ошибки API при выходе
      }
    }
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // В любом случае очищаем локальное состояние
    _token.value = null;
    isAuthenticated.value = false;
    role.value = null;
    userData.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
  return true;
};

  const checkAuth = async () => {
    try {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        return false;
      }
      
      _token.value = savedToken;
      const savedRole = localStorage.getItem("role");
      
      if (savedRole === "admin") {
        console.log('🔵 Checking admin auth with token:', savedToken);
        const res = await adminCheckAuth(savedToken);
        role.value = "admin";
        userData.value = res.data;
      } else {
        console.log('🟢 Checking user auth with token:', savedToken);
        const res = await userCheckAuth(savedToken);
        role.value = "user";
        userData.value = res.data;
      }
      
      isAuthenticated.value = true;
      return true;
    } catch (error) {
      console.error("❌ CheckAuth error:", error);
      _token.value = null;
      role.value = null;
      isAuthenticated.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return false;
    }
  };

  // watch(_token, (newToken) => {
  //   isAuthenticated.value = !!newToken;
  // });

  // Инициализация при создании store
  const init = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await checkAuth();
    }
  };
  
  const authReady = init();

  // console.log('🟡 Попытка входа:', { admin, login: user.login });
  // console.log('🟡 Токен после входа:', responseToken);
  // console.log('🟡 Роль после входа:', role.value);
  // console.log('🟡 localStorage:', {
  //   token: localStorage.getItem('token'),
  //   role: localStorage.getItem('role')
  // });

  return {
      isAuthenticated,
      role,
      userData,
      token,
      login,
      logout,
      setToken,
      checkAuth,
      authReady,
    };
});

