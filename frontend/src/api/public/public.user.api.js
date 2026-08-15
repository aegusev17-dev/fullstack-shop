import { http } from "../client.http";

export const logoutUser = async (url) => {
  try {
    const user = useUserStore();
    const response = await http.post(`${url}/logout`, user);
    return response.status === 204;
  } catch {}
  return false;
};

export const checkAuth = async (url, token) => {
  const response = await http.post(`${url}/check-auth`, { token }).catch((err) => {
    throw err.response;
  });

  return response.data;
};
