const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleMangooseError } = require('../helpers')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Type name of user'],},
  password: {
    type: String,
    required: [true, 'Set password for your account'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  token: String,
}, {versionKey: false})

userSchema.post('save', handleMangooseError)

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const userLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  userRegisterSchema,
  userLoginSchema
}

const User = model('user', userSchema)

module.exports = {
    User, 
    schemas,
}