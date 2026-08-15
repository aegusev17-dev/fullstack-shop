import { http } from "../client.http";

export const getPublicCategories = async (url) => {
  try {
    const response = await http.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch {}
  return false;
};
