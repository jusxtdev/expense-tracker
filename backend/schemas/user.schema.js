import { z } from 'zod'

const userSignupSchema = z.object({
    userEmail : z.string().email(),
    firstName : z.string().min(2).max(20),
    lastName : z.string().min(2).max(20).optional(),
    password : z.string().min(6)
}) 

const userSigninSchema = z.object({
    userEmail : z.string().email(),
    password : z.string().min(6)
})

const userUpdateSchema = z.object({
    firstName : z.string().min(2).max(20).optional(),
    lastName : z.string().min(2).max(20).optional(),
    password : z.string().min(6).optional()
})

export {
    userSignupSchema,
    userSigninSchema,
    userUpdateSchema
}