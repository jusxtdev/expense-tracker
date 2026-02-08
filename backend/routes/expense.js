import express from 'express'
import { authMiddleware } from '../middleware/auth.js';
import { addExpense, allExpense, deleteExpense } from '../controllers/expense.controller.js';

const expenseRouter = express.Router()

expenseRouter.post('/', authMiddleware, addExpense)

expenseRouter.get('/', authMiddleware, allExpense)


expenseRouter.delete('/', authMiddleware, deleteExpense)

export { expenseRouter }