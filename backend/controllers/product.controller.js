const { Product, Category } = require('../models')

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll({
            order: [['id', 'ASC']]
        })
        res.json(products)
    } catch (err) {
        next(err)
    }
}

async function getProductById(req, res, next) {
    try {
        const productId = req.params.id

        const product = await Product.findByPk(productId)
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' })
        }
        res.json(product)
    } catch (err) {
        next(err)
    }
}

async function getCategories(req, res, next) {
    try {
        const products = await Category.findAll({
            attributes: ['id_category', 'name', 'id_parent_category']
        })
        res.json(products)
    } catch (err) {
        next(err)
    }
}

async function getProductsByCategory(req, res, next) {
  try {
    const catID = req.params.categoryId
    console.log("!!!", catID)

    // базовая валидация
    if (!Number.isInteger(Number(catID))) {
      return res.status(400).json({ message: 'Некорректный ID категории' });
    }

    // проверяем, существует ли категория
    const category = await Category.findByPk(catID);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    console.log("!!!!", category)
    // получаем товары
    const products = await Product.findAll({
      where: { category_id: catID },
      attributes: [
        'id',
        'name',
        'price',
        'price_opt',
        'img_url',
        'description',
        'stock_quantity',
      ],
      order: [['id', 'ASC']],
    });

    return res.json({
      category: {
        id: category.id_category,
        name: category.name,
      },
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
}

async function adminGetProducts(req, res, next) {
    try {
        const products = await Product.findAll({ order: [['id', 'ASC']] })
        const data = products.map((p) => ({
            id: p.id,
            category_id: p.category_id,
            images: p.images || [],
            meta: {
                title: p.name,
                price: p.price,
                recommended: p.recommended
            }
        }))
        res.json({ data })
    } catch (err) {
        next(err)
    }
}

async function adminGetProductById(req, res, next) {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' })
        }
        const data = {
            id: product.id,
            category_id: product.category_id,
            images: product.images || [],
            meta: {
                title: product.name,
                price: product.price,
                recommended: product.recommended
            }
        }
        res.json({ data: [data] })
    } catch (err) {
        next(err)
    }
}

async function createProduct(req, res, next) {
    try {
        const meta = JSON.parse(req.body.meta || '{}')
        const category_id = req.body.category_id

        if (!meta.title || !category_id) {
            return res.status(400).json({ message: 'Название и категория обязательны' })
        }

        const images = (req.files || []).map((f) => `/uploads/${f.filename}`)

        await Product.create({
            category_id,
            name: meta.title,
            price: meta.price || 0,
            recommended: !!meta.recommended,
            images
        })

        res.status(201).json({ message: 'Товар создан' })
    } catch (err) {
        next(err)
    }
}

async function updateProduct(req, res, next) {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' })
        }

        const meta = JSON.parse(req.body.meta || '{}')
        const updates = {}

        if (meta.title !== undefined) updates.name = meta.title
        if (meta.price !== undefined) updates.price = meta.price
        if (meta.recommended !== undefined) updates.recommended = !!meta.recommended
        if (req.body.category_id !== undefined) updates.category_id = req.body.category_id
        if (req.files && req.files.length > 0) {
            updates.images = req.files.map((f) => `/uploads/${f.filename}`)
        }

        await product.update(updates)

        res.json({ message: 'Товар обновлён' })
    } catch (err) {
        next(err)
    }
}

async function deleteProduct(req, res, next) {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' })
        }
        await product.destroy()
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getProducts,
    getProductById,
    getCategories,
    getProductsByCategory,
    adminGetProducts,
    adminGetProductById,
    createProduct,
    updateProduct,
    deleteProduct
}