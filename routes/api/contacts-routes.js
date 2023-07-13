const express = require('express')

const contactsController = require('../../controllers/contacts-controllers')

const { validateBody } = require('../../utils')

const { schemas } = require('../../models/contact')

const { isValidId, authenticate } = require('../../middlewares')

const router = express.Router()

router.use(authenticate)

router.get('/', contactsController.listContacts)

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact)

router.delete('/:contactId', isValidId, contactsController.removeContact)

module.exports = router;