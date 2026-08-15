import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";
import { checkAuth } from "../public/public.user.api";

const userUrl = "/users";

export const userLogin = async (userData) => {
  try {
    console.log('📤 Запрос на вход пользователя:', userData.login);
    const response = await http.post(`${userUrl}/login`, {
      email: userData.login,
      password: userData.password,
    });
    console.log('📥 Ответ сервера:', response.data);
    return response.data.data.token;
  } catch (error) {
    console.error('❌ Ошибка входа:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ LOGOUT
export const userLogout = async () => {
  try {
    const user = useUserStore();
    
    // Проверяем, есть ли токен перед запросом
    if (!user.token) {
      console.log('ℹ️ Нет токена, пропускаем logout API');
      return true;
    }
    
    console.log('📤 Запрос на выход пользователя');
    await http.post(`${userUrl}/logout`, { user: user.userData });
    console.log('✅ Выход выполнен успешно');
    return true;
  } catch (error) {
    console.error("❌ Ошибка при выходе (игнорируем):", error);
    // Возвращаем true даже при ошибке, чтобы очистить локальное состояние
    return true;
  }
};

export const userRegister = async (userData) => {
  try {
    const response = await http.post(`${userUrl}/register`, {
      email: userData.login,
      password: userData.password,
      name: userData.meta
        ? `${userData.meta.firstName} ${userData.meta.lastName}`.trim()
        : undefined,
    });
    return response.status === 201;
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    throw error.response?.data || error;
  }
};

export const userCheckAuth = async (token) => {
  try {
    return await checkAuth(`${userUrl}`, token);
  } catch (error) {
    console.error("Ошибка проверки авторизации:", error);
    throw error;
  }
};
