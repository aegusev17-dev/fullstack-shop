import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/store.user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/pages/shop/layouts/ShopLayout.vue"),
      children: [
        {
          path: "",
          name: "shop-main",
          component: () => import("@/pages/shop/ShopMain.vue"),
          meta: { requiresAuth: false },
        },
        {
          path: "catalog",
          name: "catalog",
          component: () => import("@/pages/shop/CatalogPage.vue"),
          meta: { requiresAuth: false },
        },
        {
          path: "product/:id",
          name: "product",
          component: () => import("@/pages/shop/ProductPage.vue"),
          meta: { requiresAuth: false },
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("@/pages/shop/CartPage.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/pages/admin/layouts/AdminLayout.vue"),
      meta: { requiresAuth: true, role: "admin" },
      children: [
        {
          path: "",
          name: "admin-panel",
          component: () => import("@/pages/admin/AdminMain.vue"),
          meta: { requiresAuth: true, role: "admin" },
        },
        {
          path: "categories",
          meta: { requiresAuth: true, role: "admin" },
          children: [
            {
              path: "",
              name: "categories",
              component: () => import("@/pages/admin/categories/CategoryList.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
            {
              path: "create",
              name: "category-create",
              component: () => import("@/pages/admin/categories/CreateCategory.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
            {
              path: ":id",
              name: "category-update",
              component: () => import("@/pages/admin/categories/UpdateCategory.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
          ],
        },
        {
          path: "products",
          meta: { requiresAuth: true, role: "admin" },
          children: [
            {
              path: "",
              name: "products",
              component: () => import("@/pages/admin/products/ProductList.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
            {
              path: "create",
              name: "product-create",
              component: () => import("@/pages/admin/products/ChangeProduct.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
            {
              path: ":id",
              name: "product-update",
              component: () => import("@/pages/admin/products/ChangeProduct.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
          ],
        },
      ],
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: () => import("@/pages/admin/SignIn.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/shop/login",
      name: "shop-login",
      component: () => import("@/pages/shop/components/SignIn.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/shop/register",
      name: "shop-register",
      component: () => import("@/pages/shop/components/SignUp.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../pages/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const user = useUserStore();
  await user.authReady;

  if (to.meta?.requiresAuth && !user.isAuthenticated) {
    if (to.path.startsWith('/admin')) {
      return { name: "admin-login", query: { redirect: to.fullPath } };
    }
    return { name: "shop-login", query: { redirect: to.fullPath } };
  }

  if (user.isAuthenticated && to.meta?.role === "admin" && user.role !== "admin") {
    user.logout();
    return { name: "admin-login" };
  }
  
  return true;
});

export default router;
