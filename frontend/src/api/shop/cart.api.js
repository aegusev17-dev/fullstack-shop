// // "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

// import { http } from "../client.http";


// const urlCart = "/shop/cart";

// export const addCartProduct = async (id, amount) => {
//   try {
//     //"POST api/shop/cart/add/id"
//     const url = `${urlCart}/add/${id}`;
//     const data = {
//       amount: amount
//     }
//     const response = await http.post(url, data, {
//         // headers: {
//         //   "Content-Type": "multipart/form-data",
//         // },
//       }).catch(err => {
        
//         console.log(err);
//         throw err.response
//       });
//     return response;
    
//   } catch (err) {
//     throw err
//   }  
// };



// export const decCartProduct = async (id, amount) => {
//   try {
   
//     const url = `${urlCart}/dec/${id}`;
//     const data = {
//       amount: amount
//     }
//     const response = await http.post(url, data, {
       
//       }).catch(err => {
        
//         console.log(err);
//         throw err.response
//       });
//     return response;
    
//   } catch (err) {
//     throw err
//   }  
// };




// export const getUserCart = async () => {
//   try {
//     const url = urlCart;
//     const response = await http.get(url).catch(err => {
        
      
//         throw err.response
//       });
//     return response;
    
//   } catch (err) {
//     throw err
//   }
// };

// "BiAZikV9d76jI78wmv9_J5KZ2alwVPtnW8T"

import { http } from "/src/api/client.http.js";

const urlCart = "/shop/cart";

export const addCartProduct = async (id, amount = 1) => {
  try {
    console.log("🔍 addCartProduct вызван с параметрами:", { id, amount });
    
    if (!id) {
      console.error("❌ ОШИБКА: id товара не передан!");
      return Promise.reject({ message: "ID товара не указан" });
    }
    
    const validAmount = amount && !isNaN(amount) && amount > 0 ? amount : 1;
    
    // URL с ID в пути
    const url = `${urlCart}/add/${id}`;
    console.log("📡 Отправка запроса:", { method: "POST", url, data: { amount: validAmount } });
    
    // Отправляем только amount в теле (ID уже в URL)
    const data = { amount: validAmount };
    
    const response = await http.post(url, data);
    console.log("✅ Ответ от сервера:", response.data);
    return response;
    
  } catch (err) {
    // ✅ Добавлена обработка 404 ошибок
    if (err.response?.status === 404) {
      console.log(`ℹ️ Товар ${id} не найден на сервере (404) - будет добавлен локально`);
    } else {
      console.error("❌ Ошибка в addCartProduct:", err);
    }
    
    throw {
      originalError: err,
      message: err.response?.data?.message || "Ошибка при добавлении в корзину",
      status: err.response?.status
    };
  } 
};

export const decCartProduct = async (id, amount = 1) => {
  try {
    console.log("🔍 decCartProduct вызван с параметрами:", { id, amount });
    
    if (!id) {
      console.error("❌ ОШИБКА: id товара не передан!");
      return Promise.reject({ message: "ID товара не указан" });
    }
    
    const validAmount = amount && !isNaN(amount) && amount > 0 ? amount : 1;
    
    // ✅ ИСПРАВЛЕНО: URL с ID в пути (было add, должно быть dec)
    const url = `${urlCart}/dec/${id}`;
    console.log("📡 Отправка запроса на уменьшение:", { url, amount: validAmount });
    
    const data = { amount: validAmount };
    
    const response = await http.post(url, data);
    console.log("✅ Ответ от сервера (dec):", response.data);
    return response;
    
  } catch (err) {
    // ✅ Добавлена обработка 404 ошибок
    if (err.response?.status === 404) {
      console.log(`ℹ️ Товар ${id} не найден на сервере (404) - будет обновлен локально`);
    } else {
      console.error("❌ Ошибка в decCartProduct:", err);
    }
    throw err;
  }  
};

export const getUserCart = async () => {
  try {
    const url = urlCart;
    console.log("📡 Запрос корзины пользователя:", url);
    
    const response = await http.get(url);
    console.log("✅ Корзина пользователя:", response.data);
    return response;
    
  } catch (err) {
    console.error("❌ Ошибка при получении корзины:", err);
    throw err;
  }
};