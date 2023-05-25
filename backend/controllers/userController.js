import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth a user
// route POST /api/users/auth
// @access Public
const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && await user.checkPassword(password)) {
        generateToken(res, user._id)
        console.log('You have successfully logged in.')
        // 201 means successfully created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        // 401 means unauthorized response
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})

// @desc Register a user
// route POST /api/users
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExisted = await User.findOne({ email })
    if (userExisted) {
        // 400 means client error
        res.status(400)
        throw new Error("User already exists")
    } else {
        const user = await User.create({
            name,
            email,
            password
        })
        if (user) {
            generateToken(res, user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            })
        } else {
            res.status(400);
            throw new Error("Invalid user data")
        }
    }
})

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = expressAsyncHandler(async (req, res) => {
    res.send('User Logout')
})

// @desc Get user profile
// route GET /api/users/profile
// @access Private (means you have to have a private token)
const getUserProfile = expressAsyncHandler(async (req, res) => {
    res.send('UserProfile')
})

// @desc Update user profile
// route PUT /api/users/profile
// @access Private (means you have to have a private token)
const updateUserProfile = expressAsyncHandler(async (req, res) => {
    res.send('Update user profile')
})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }