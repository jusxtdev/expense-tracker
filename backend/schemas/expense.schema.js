const { z } = require('zod');

const createExpenseSchema = z.object({
    title : z.string().min(2).max(20),
    amount : z.number(),
    description : z.string().min(2).max(45).optional(),
    date : z.coerce.date().optional(),
    categories : z.array(z.string())  // Array of category titles
})

const deleteExpenseSchema = z.object({
    expenseId : z.number()
})

module.exports = {
    createExpenseSchema,
    deleteExpenseSchema
}