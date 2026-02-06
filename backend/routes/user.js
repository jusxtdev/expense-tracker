const express = require("express");
const { z } = require("zod");
const User = require("../database");
const { hashPassword, verifyPassword, generateJWT, verifyJWT } = require("../utils");
const { authMiddleware } = require("../middleware/auth");

const userRouter = express.Router()

const userSignupSchema = z.object({
    userEmail : z.string().email(),
    firstName : z.string().min(2).max(20),
    lastName : z.string().min(2).max(20).optional(),
    password : z.string().min(6)
})  
userRouter.post('/signup', async (req, res) => {
    const userData = req.body

    // input validation
    const valid = userSchema.safeParse(userData)
    if (!valid.success){
        res.status(411).json({msg : 'Invalid Inputs'})
        return;
    }

    // check if user already exists
    const exists = await User.findOne({userEmail : userData.userEmail})
    if (exists){
        res.status(411).json({msg : 'User Already Exists'})
        return;
    }

    // hash the password
    const hashedPass = await hashPassword(userData.password)
    userData.hashedPass = hashedPass

    // create new User
    const newUser = new User(userData)

    // add new user to db and respond
    try {
        await newUser.save()
        res.status(201).json({userId : newUser._id})
    } catch (err) {
        console.log(err)
        res.status(500).json({msg : 'Error Occurred', error : err})
    }
})



const userSigninSchema = z.object({
    userEmail : z.string().email(),
    password : z.string().min(6)
})
userRouter.post('/signin', async (req, res) => {
    const userData = req.body

    // input validation
    const valid = userSigninSchema.safeParse(userData)
    if (!valid.success){
        res.status(411).json({msg : 'Invalid Inputs'})
    }

    // query user from DB
    const requestedUser = await User.findOne({userEmail : userData.userEmail})
    
    // respond if user not found
    if (!requestedUser){
        res.status(404).json({msg : 'User Not Found'})
    }

    // verify password
    const passIsCorrect = await verifyPassword(userData.password, requestedUser.hashedPass)
    if (!passIsCorrect){
        res.status(400).json({msg : 'Incorrect Password'})
    }

    // generate JWT
    const token = generateJWT({
        userEmail : requestedUser.userEmail,
        firstname : requestedUser.firstName
    })

    // Respond
    res.status(200).json({token:token})
})

const userUpdateSchema = z.object({
    firstName : z.string().min(2).max(20).optional(),
    lastName : z.string().min(2).max(20).optional(),
    password : z.string().min(6).optional()
})
userRouter.put('/',authMiddleware, async (req, res) => {
    const decoded = req.user
    
    // update data
    const updateData = req.body
    
    // input validation
    const valid = userUpdateSchema.safeParse(updateData)
    if(!valid){
        res.status(411).json({msg : 'Invalid Inputs'})
        return;
    }

    // find and update the user
    const requestedUser = await User.findOneAndUpdate(
        {userEmail : decoded.userEmail},
        updateData
    )

    // 404 if user not found
    if (!requestedUser){
        res.status(404).json({msg : 'User Not Found'})
        return;
    }

    // response
    res.status(200).json({msg : 'User Updated Succesfully'})
})

module.exports = {userRouter}