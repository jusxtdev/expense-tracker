const express = require("express");
const { userRouter } = require("./user");
const { categoryRouter } = require("./category");
const { expenseRouter } = require("./expense");


const rootRouter = express.Router()

// import other routes here !!
rootRouter.use('/user', userRouter);
rootRouter.use('/category', categoryRouter)
rootRouter.use('/expense', expenseRouter)



module.exports = { rootRouter }