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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    }),
        res.status(200).json({
            message: 'User logged out'
        })
})

// @desc Get user profile
// route GET /api/users/profile
// @access Private (means you have to have a private token)
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }

    res.status(200).json(user)
})

// @desc Update user profile
// route PUT /api/users/profile
// @access Private (means you have to have a private token)
const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }