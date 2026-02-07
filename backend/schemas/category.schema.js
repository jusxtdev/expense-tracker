const { z } = require('zod')

const createCategorySchema = z.object({
    title : z.string()
})

const deleteCategorySchema = z.object({
    categoryId : z.string()
})

module.exports = {
    createCategorySchema,
    deleteCategorySchema
}