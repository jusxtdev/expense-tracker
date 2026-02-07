const express = require("express");
const {userRouter} = require("./user");
const { categoryRouter } = require("./category");


const rootRouter = express.Router()

// import other routes here !!
rootRouter.use('/user', userRouter);
rootRouter.use('/category', categoryRouter)



module.exports = {rootRouter}