
/** admin panel */

"POST api/shop/admin/users/sessid" - создание окружения
"POST api/shop/admin/users/admin" - регистрация админа,
"POST api/shop/admin/users/login" - аутентификация в админ панели
"POST api/shop/admin/users/logout" - выход админа из системы

// категории
"POST api/shop/admin/categories" - создание категории

"GET api/shop/admin/categories" - получение категорий
"GET api/shop/admin/categories/<id:\d+>" - получение категории

"PATCH api/shop/admin/categories/<id:\d+>" - редактирование категории
"DELETE api/shop/admin/categories/<id:\d+>" - удаление категории


// товары
"POST api/shop/admin/products" - создание товара
"PATCH api/shop/admin/products/<id:\d+>" - редактирование товара
"DELETE api/shop/admin/products/<id:\d+>" - удаление товара

"GET api/shop/admin/products" => - получение всех товаров
"GET api/shop/admin/products/<id:\d+>" - получение товара



/***  магазин */

// User 

"POST api/shop/users" - регистрация 
"POST api/shop/users/login" - аутентификация
"POST api/shop/users/logout" - выход пользователя из системы
               
// товары
"GET api/shop/products" => - получение всех товаров
"GET api/shop/products/<id:\d+>" - получение товара

// категории
"GET api/shop/categories" - получение категорий
"GET api/shop/categories/<id:\d+>" - получение категории


// корзина

"GET api/shop/cart" - получение всей корзины,
"POST api/shop/cart/add/id" - добавление товара,
"POST api/shop/cart/dec/id" - уменьшение кол-ва товара,
"DELET api/shop/cart/id" - удаление позиции,
"DELETE api/shop/cart" - очистка корзины,
