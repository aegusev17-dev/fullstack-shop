// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { useUserStore } from "@/stores/store.user";
import { http } from "../client.http";
import { getPublicProducts } from "../public/public.product.api";

const urlProducts = "/shop/products";

export const getProducts = async (id = null) => {
  try {
    const url = id ? `${urlProducts}/${id}` : urlProducts;
    return await getPublicProducts(url);
  } catch {
    return false;
  }
};

export const getCategoryProducts = async (id) => {
  try {
    const url = `${urlProducts}/category/${id}`;
    return await getPublicProducts(url);
  } catch {
    return false;
  }
};
