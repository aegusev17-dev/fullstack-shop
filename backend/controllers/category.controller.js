const { Category } = require('../models')

async function adminGetCategories(req, res, next) {
    try {
        const categories = await Category.findAll({ order: [['id_category', 'ASC']] })
        const data = categories.map((c) => ({
            id: c.id_category,
            photo: c.photo,
            meta: { title: c.name }
        }))
        res.json({ data })
    } catch (err) {
        next(err)
    }
}

async function adminGetCategoryById(req, res, next) {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Категория не найдена' })
        }
        res.json({
            data: {
                id: category.id_category,
                photo: category.photo,
                meta: { title: category.name }
            }
        })
    } catch (err) {
        next(err)
    }
}

async function createCategory(req, res, next) {
    try {
        const meta = JSON.parse(req.body.meta || '{}')

        if (!meta.title) {
            return res.status(400).json({ message: 'Название категории обязательно' })
        }

        const photo = req.file ? `/uploads/${req.file.filename}` : null

        await Category.create({
            name: meta.title,
            photo
        })

        res.status(201).json({ message: 'Категория создана' })
    } catch (err) {
        next(err)
    }
}

async function updateCategory(req, res, next) {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Категория не найдена' })
        }

        const meta = JSON.parse(req.body.meta || '{}')
        const updates = {}

        if (meta.title !== undefined) updates.name = meta.title
        if (req.file) updates.photo = `/uploads/${req.file.filename}`

        await category.update(updates)

        res.json({ message: 'Категория обновлена' })
    } catch (err) {
        next(err)
    }
}

async function deleteCategory(req, res, next) {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Категория не найдена' })
        }
        await category.destroy()
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    adminGetCategories,
    adminGetCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}