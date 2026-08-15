// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { http } from "../client.http";
import { getPublicCategories } from "../public/public.category.api";

const urlCategories = "/admin/categories";

export const createCategory = async (data) => {
  try {
    const response = await http.post(urlCategories, data);
    return response.status === 201;
  } catch {}
  return false;
};

export const updateCategory = async (id, data) => {
  try {
    const response = await http.patch(`${urlCategories}/${id}`, data);
    if (response.status === 200) {
      return true;
    }
  } catch {}
  return false;
};

export const getCategories = async (id = null) => {
  try {
    const url = id ? `${urlCategories}/${id}` : urlCategories;
    return await getPublicCategories(url);
  } catch {}
  return false;
};

export const deleteCategory = async (id = null) => {
  try {
    const response = await http.delete(`${urlCategories}/${id}`);
    return response.status === 204;
  } catch {}
  return false;
};

// import { useUserStore } from "@/stores/store.user";
// import { http } from "../client.http";
// import { getPublicCategories } from "../public/public.category.api";

// const urlCategories = "/shop/admin/categories";

// export const createCategory = async (data) => {
//   try {
//     const response = await http.post(urlCategories, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.status === 201;
//   } catch {}
//   return false;
// };

// export const updateCategory = async (id, data) => {
//   try {
//     const response = await http.patch(`${urlCategories}/${id}`, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     if (response.status === 200) {
//       return true;
//     }
//   } catch {}
//   return false;
// };

// export const getCategories = async (id = null) => {
//   try {
//     const url = id ? `${urlCategories}/${id}` : urlCategories;
//     return await getPublicCategories(url);
//   } catch {}
//   return false;
// };

// export const deleteCategory = async (id = null) => {
//   try {
//     const response = await http.delete(`${urlCategories}/${id}`);
//     return response.status === 204;
//   } catch {}
//   return false;
// };
