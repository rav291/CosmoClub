import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc       Auth user and get token
// @route      POST /api/users/login
// @access     Public  

const authUser = asyncHandler(async (req, res) => { // Used for login authentication

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) { // matchPassword is a method for userSchema, used to validate the entered  password with the correct one.

        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')  // new Error generates Error, which is caught by the errorHandler fn. inside the errorMiddleware
    }

})

// @desc       Register User
// @route      POST /api/users
// @access     Public  

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {

        res.status(401)
        throw new Error('User Already Exists!')
    }

    const user = await User.create({        // performs .save operation at then end.
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @desc       Get User Profile
// @route      GET /api/users/profile
// @access     Private  

const getUserProfile = asyncHandler(async (req, res) => {

    try {
        const user = await User.findById(req.user);
        if(user){
            res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
        })
        }
      
    } catch (error) {
        console.log(error.message)
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @desc       Update User Profile
// @route      PUT /api/users/profile
// @access     Private  

const updateUserProfile = asyncHandler(async (req, res) => {

    try {
        const user = await User.findById(req.user);
       
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.password = req.body.password || user.password // since password is encrypted everytime in the model, the password
        }                                                      // entered is also...

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } catch (error) {
        console.log(error.message)
        res.status(404)
        throw new Error('User Not Found')
    }
})

export { authUser, registerUser, getUserProfile, updateUserProfile }