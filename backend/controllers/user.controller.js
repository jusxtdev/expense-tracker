import {User} from "../database/user.model.js";
import { userSigninSchema, userSignupSchema, userUpdateSchema } from "../schemas/user.schema.js";
import { generateJWT, hashPassword, verifyPassword } from "../utils.js";

export const signupUser = async (req, res, next) => {
    const userData = req.body

    // input validation
    const valid = userSignupSchema.safeParse(userData)
    if (!valid.success){
        res.status(411).json({msg : 'Invalid Inputs'})
        return;
    }

    // check if user already exists
    console.log(userData)
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
        next(err)
        res.status(500).json({msg : 'Error Occurred', error : err})
    }
}

export const signinUser = async (req, res, next) => {
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
}

export const updateUser = async (req, res, next) => {
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

    // response
    res.status(200).json({msg : 'User Updated Succesfully'})
}
