const { verifyJWT } = require("../utils");

function authMiddleware(req, res, next){
    const authHeader = req.header('Authorization')
    const token = authHeader.split(' ')[1]
    const decoded = verifyJWT(token)
    if(!decoded){
        res.status(400).json({msg : 'Invalid Token'})
        return;
    }

    req.user = decoded
    next()
}

module.exports = {authMiddleware}