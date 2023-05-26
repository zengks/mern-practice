import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Token not match')
        }
    } else {
        res.status(401)
        throw new Error('Unauthorized. No token found')
    }
})

export default protect