const { Contact } = require('../models/contact')

const { HttpError } = require('../helpers')

const { ctrlWrapper } = require('../utils')

const listContacts = async (req, res) => {
  const { _id: owner } = req.user
  console.log(req.query)
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit
  const result = await Contact.find({ owner }, '', { skip, limit }).populate('owner')
  res.json(result)
}

const addContact = async (req, res) => {
  const { _id: owner } = req.user
  console.log(req)
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
   }


const removeContact = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`)
    }
    res.status(200).json({message: "contact deleted"})
  }


module.exports = {
    listContacts: ctrlWrapper(listContacts),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
}