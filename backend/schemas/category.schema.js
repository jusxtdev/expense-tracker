import { z } from 'zod'

const createCategorySchema = z.object({
    title : z.string()
})

const deleteCategorySchema = z.object({
    categoryId : z.string()
})

export {
    createCategorySchema,
    deleteCategorySchema
}