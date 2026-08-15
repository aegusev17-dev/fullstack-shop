const express = require('express')
const productController = require('../controllers/product.controller.js')
const categoryController = require('../controllers/category.controller.js')
const userController = require('../controllers/user.controller.js')
const orderController = require('../controllers/order.controller.js')
const { requireAuth, adminOnly } = require('../middleware/auth.js')
const upload = require('../middleware/upload.js')
const router = express.Router()

// пользователь
router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.post('/users/logout', userController.logout)
router.get('/users/:id', userController.getUser)
router.patch('/users/:id', userController.patchUser)
router.post('/admin/login', userController.adminLogin)
router.post('/admin/check-auth', userController.checkAuth)
router.post('/users/check-auth', userController.checkAuth)

// получение товаров
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProductById)

// получение категорий
router.get('/categories', productController.getCategories)
router.get('/categories/:categoryId', productController.getProductsByCategory)

// админ: товары
router.get('/admin/products', requireAuth, adminOnly, productController.adminGetProducts)
router.get('/admin/products/:id', requireAuth, adminOnly, productController.adminGetProductById)
router.post('/admin/products', requireAuth, adminOnly, upload.array('images', 5), productController.createProduct)
router.patch('/admin/products/:id', requireAuth, adminOnly, upload.array('images', 5), productController.updateProduct)
router.delete('/admin/products/:id', requireAuth, adminOnly, productController.deleteProduct)

// админ: категории
router.get('/admin/categories', requireAuth, adminOnly, categoryController.adminGetCategories)
router.get('/admin/categories/:id', requireAuth, adminOnly, categoryController.adminGetCategoryById)
router.post('/admin/categories', requireAuth, adminOnly, upload.single('image'), categoryController.createCategory)
router.patch('/admin/categories/:id', requireAuth, adminOnly, upload.single('image'), categoryController.updateCategory)
router.delete('/admin/categories/:id', requireAuth, adminOnly, categoryController.deleteCategory)

// работа с заказами у пользователя
router.get('/orders', orderController.getOrders)
router.post('/orders', orderController.createOrder)


module.exports = router