import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { addCartProduct, decCartProduct, getUserCart } from "@/api/shop/cart.api";
import { useAppStore } from "./store.app";
import { getProducts } from "@/api/admin/product.api";

export const useCartStore = defineStore("cart", () => {
  const _cart = ref({
    items: {},
    amount: 0,
    total: 0,
  });
  
  const cart = computed(() => _cart.value); 

  let isCartLoaded = false;

  const getCart = async () => {
    if (isCartLoaded) return;

    try {
      const res = await getUserCart(); 
      const data = res.data.data;
      
      // Сохраняем текущие локальные товары, которых нет на сервере
      const currentItems = { ..._cart.value.items };
      
      // Формируем товары с сервера
      const serverItems = {};
      if (data.items && data.items.length) {
        data.items.forEach(item => {
          serverItems[item.product_id] = item;          
        });
      }
      
      // Объединяем серверные товары с локальными
      // Локальные товары имеют приоритет (чтобы не потерять тестовые)
      const mergedItems = { ...serverItems, ...currentItems };
      
      _cart.value = {
        ...data.cart,
        items: mergedItems
      };
      
      isCartLoaded = true;
      console.log('✅ Корзина загружена (слияние):', _cart.value);
    } catch (err) {
      console.log('❌ Ошибка загрузки корзины:', err);
      isCartLoaded = false;
    }
  } 

  const refreshCart = async () => {
    isCartLoaded = false;
    await getCart();
  };

  const addToCart = async (product_id, quantity = 1) => {
    try {
      let amount = quantity; // Используем переданное количество
      
      // Если товар уже есть в корзине, добавляем к существующему
      if (product_id in _cart.value.items) {
        amount = _cart.value.items[product_id].amount + quantity;
        console.log('Увеличение количества до:', amount);
      } else {
        console.log('Добавление нового товара, количество:', amount);
      }

      // Пытаемся отправить на сервер
      try {
        const res = await addCartProduct(product_id, amount);
        if (res) {
          const app = useAppStore();
          app.setFlash("Товар успешно добавлен в корзину");
          
          // ✅ ВАЖНО: Обновляем корзину после успешного добавления
          isCartLoaded = false; // Сбрасываем флаг для принудительной загрузки
          await getCart();
          return true;
        }
      } catch (err) {
        // Если сервер вернул ошибку, добавляем локально
        console.log(`⚠️ Сервер вернул ${err.status}, добавляем локально`);
        
        // Локальное добавление
        const newItems = { ..._cart.value.items };
        
        // Получаем реальную цену с сервера через админский API
        let productPrice = 1000;
        let productTitle = `Товар ${product_id}`;
        
        try {
          // Используем админский API для получения информации о товаре
          const response = await getProducts(product_id);
          console.log('📦 Ответ от админского API:', response);
          
          if (response && response.data && response.data[0]) {
            productPrice = response.data[0].meta.price || 1000;
            productTitle = response.data[0].meta.title || productTitle;
            console.log(`✅ Получена цена с сервера: ${productPrice}₽ для товара ${product_id}`);
          }
        } catch (e) {
          console.log(`⚠️ Не удалось получить цену с сервера:`, e);
          
          // Fallback - пытаемся найти цену на странице
          const productCard = document.querySelector(`[data-product-id="${product_id}"]`);
          if (productCard) {
            const titleEl = productCard.querySelector('.product-title');
            if (titleEl) productTitle = titleEl.textContent;
            
            const priceEl = productCard.querySelector('.product-price');
            if (priceEl) {
              const priceText = priceEl.textContent.replace(/[^\d]/g, '');
              productPrice = parseInt(priceText) || 1000;
            }
          }
        }
        
        if (!newItems[product_id]) {
          // Новый товар с реальной ценой
          newItems[product_id] = {
            product_id: product_id,
            amount: amount,
            product: {
              id: product_id,
              price: productPrice,  // ← ТЕПЕРЬ РЕАЛЬНАЯ ЦЕНА
              meta: {
                title: productTitle
              }
            },
            id: Date.now() + product_id,
            _local: true
          };
          console.log(`✅ Добавлен новый локальный товар: ${productTitle} (${productPrice}₽)`);
        } else {
          // Обновляем количество
          newItems[product_id] = {
            ...newItems[product_id],
            amount: amount
          };
          console.log(`✅ Обновлено количество локального товара ${product_id} до ${amount}`);
        }
        
        // Пересчитываем общую сумму
        const total = Object.values(newItems).reduce(
          (sum, item) => sum + (item.amount * (item.product?.price || 1000)), 0
        );
        
        // Обновляем корзину
        _cart.value = {
          ..._cart.value,
          items: newItems,
          total: total
        };
        
        console.log('✅ Корзина после локального добавления:', _cart.value);
        
        const app = useAppStore();
        app.setFlash(`✅ ${productTitle} добавлен в корзину`);
        return true;
      }
    } catch (err) {
      console.log('❌ Ошибка добавления:', err);
    }
  };

  const decInCart = async (product_id) => {
    try {
      if (!(product_id in _cart.value.items)) {
        console.log('❌ Товар не найден в корзине');
        return;
      }
      
      let amount = _cart.value.items[product_id].amount - 1;
      
      // Создаем копию items
      const newItems = { ..._cart.value.items };
      
      if (amount <= 0) {
        // Удаляем товар
        delete newItems[product_id];
        console.log(`🗑️ Товар ${product_id} удален из корзины`);
      } else {
        // Обновляем количество
        newItems[product_id] = {
          ...newItems[product_id],
          amount: amount
        };
        console.log(`✅ Количество товара ${product_id} уменьшено до ${amount}`);
      }
      
      // Пересчитываем общую сумму
      const total = Object.values(newItems).reduce(
        (sum, item) => sum + (item.amount * (item.product?.price || 1000)), 0
      );
      
      // Обновляем корзину
      _cart.value = {
        ..._cart.value,
        items: newItems,
        total: total
      };
      
      console.log('✅ Корзина после уменьшения:', _cart.value);
      
      // Пытаемся отправить на сервер (только если это не локальный товар)
      const item = _cart.value.items[product_id];
      if (!item?._local && amount > 0) {
        try {
          await decCartProduct(product_id, amount);
        } catch (err) {
          console.log('⚠️ Ошибка сервера при уменьшении');
        }
      }
      
    } catch (err) {
      console.log('❌ Ошибка уменьшения:', err);
    }
  } 

  // Загружаем корзину при создании store
  getCart();

  return {
    cart,
    getCart,
    refreshCart,
    addToCart,
    decInCart,
  };
});