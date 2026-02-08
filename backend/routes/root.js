import express from 'express'
import { userRouter } from './user.js';
import { categoryRouter } from './category.js';
import { expenseRouter } from './expense.js';

const rootRouter = express.Router()

// import other routes here !!
rootRouter.use('/user', userRouter);
rootRouter.use('/category', categoryRouter)
rootRouter.use('/expense', expenseRouter)



export { rootRouter }