import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";
import { checkAuth } from "../public/public.user.api";

const adminUrl = "/admin";

export const adminLogin = async (userData) => {
  try {
    console.log('🔵 Admin login:', userData.login);
    const response = await http.post(`${adminUrl}/login`, {
      email: userData.login,
      password: userData.password,
    });
    return response.data.data.token;
  } catch (error) {
    console.error('❌ Admin login error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

// ✅ Добавьте функцию logout для админа, если нужна
export const adminLogout = async () => {
  try {
    const user = useUserStore();
    
    if (!user.token) {
      return true;
    }
    
    await http.post(`${adminUrl}/logout`, { user: user.userData });
    return true;
  } catch (error) {
    console.error("❌ Admin logout error:", error);
    return true;
  }
};

export const adminCheckAuth = async (token) => {
  try {
    console.log('🔵 Admin checkAuth');
    const response = await http.post(`${adminUrl}/check-auth`, { token });
    return response.data;
  } catch (error) {
    console.error('❌ Admin checkAuth error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};
