const { Schema, model } = require('mongoose')
const { handleMangooseError } = require('../helpers')

const Joi = require('joi')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    }
}, {versionKey: false})
  
contactSchema.post('save', handleMangooseError)

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field'
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field'
  }),
  email: Joi.string().pattern(emailRegexp),
})

const contactPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).options({ allowUnknown: false });

const schemas = {
    contactAddSchema,
    contactPutSchema,
}

const Contact = model('contact', contactSchema)

module.exports = {
    Contact,
    schemas,
};