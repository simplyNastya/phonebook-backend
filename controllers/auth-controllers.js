const bcryptjs = require('bcryptjs')

const path = require('path')

const { User } = require('../models/user')

const { ctrlWrapper } = require('../utils')

const { HttpError, createToken } = require('../helpers')

// const avatarsDir = path.resolve('public', 'avatars')

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, 'Email in use')
    }

    const hashPassword = await bcryptjs.hash(password, 10)
    
    const newUser = await User.create({ ...req.body, password: hashPassword })

    const token = createToken(newUser)

    await User.findByIdAndUpdate(newUser._id, {token})
    
    res.status(201).json({
        token,
        user: {
            email: newUser.email,
            name: newUser.name,
        }
    }) 
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    const passworCompare = await bcryptjs.compare(password, user.password)
    if (!passworCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const token = createToken(user)
    await User.findByIdAndUpdate(user._id, { token })
    
    res.json({
        token,
        user: {
            email: user.email,
            name: user.name
        }
    })
}

const getCurrent = async (req, res) => {
    const {email, name, token} = req.user
    res.json({
        token,
        user: {
            email,
            name
        }
    })
}

const logout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: '' }) 
    
    res.status(204).json({
        message: 'Logout success'
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}