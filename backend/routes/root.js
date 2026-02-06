const express = require("express");
const {userRouter} = require("./user");

const rootRouter = express.Router()

// import other routes here !!
rootRouter.use('/user', userRouter);



module.exports = {rootRouter}