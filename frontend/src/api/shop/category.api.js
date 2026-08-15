// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";
import { getPublicCategories } from "../public/public.category.api";

const urlCategories = "/shop/categories";

export const getCategories = async (id = null) => {
  try {
    const url = id ? `${urlCategories}/${id}` : urlCategories;
    return await getPublicCategories(url);
  } catch {}
  return false;
};
