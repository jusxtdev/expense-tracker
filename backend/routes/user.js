// imports
import express from 'express'

/// -- middleware
import { authMiddleware } from '../middleware/auth.js';

/// controller
import { signupUser, signinUser, updateUser } from '../controllers/user.controller.js';

// global variables
const userRouter = express.Router()

// Routes

userRouter.post('/signup', signupUser)

userRouter.post('/signin', signinUser)

userRouter.put('/',authMiddleware, updateUser)

export {userRouter}