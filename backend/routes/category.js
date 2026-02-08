import express from 'express'

import { authMiddleware } from '../middleware/auth.js';
import { Category } from '../database/category.model.js';
import { createCategorySchema, deleteCategorySchema } from '../schemas/category.schema.js';
import { addCategory, allCategory, deleteCategory } from '../controllers/category.controller.js';


const categoryRouter = express.Router()

categoryRouter.post('/', authMiddleware, addCategory)

categoryRouter.get('/', authMiddleware, allCategory)

// TODO - Does not raise an error on wrong id
categoryRouter.delete('/', authMiddleware, deleteCategory)

export {categoryRouter}