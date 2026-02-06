const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
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

async function generateJWT(payload){
    const token = await jwt.sign(payload, JWT_SECRET)
    console.log(token)
    return token;
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateJWT
}