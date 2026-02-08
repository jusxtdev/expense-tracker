import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';


const SALT_ROUNDS = 10;

async function hashPassword(password){
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPass
}

async function verifyPassword(password, existingPass) {
    const isPassValid = await bcrypt.compare(password, existingPass)
    if (!isPassValid) return false
    return true;
}

function generateJWT(payload){
    const token = jwt.sign(payload, JWT_SECRET)
    return token;
}

function verifyJWT(token) {
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    } catch (err){
        return false
    }
}

export {
    hashPassword,
    verifyPassword,
    generateJWT,
    verifyJWT
}