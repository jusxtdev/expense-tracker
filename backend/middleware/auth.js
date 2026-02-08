import { User } from "../database/user.model.js";
import { verifyJWT } from "../utils.js";


async function authMiddleware(req, res, next){
    const authHeader = req.header('Authorization')
    const token = authHeader.split(' ')[1]
    const decoded = verifyJWT(token)
    if(!decoded){
        res.status(400).json({msg : 'Invalid Token'})
        return;
    }

    const currentUser = await User.findOne(
        {userEmail : decoded.userEmail}
    )

    // 404 if user not found
    if (!currentUser){
        res.status(404).json({msg : 'User Not Found'})
        return;
    }

    req.user = decoded
    next()
}

export { authMiddleware }