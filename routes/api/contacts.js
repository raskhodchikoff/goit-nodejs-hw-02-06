const express = require('express')

const getAllContacts = require('../../controllers/getAllContacts')
const getContactById = require('../../controllers/getContactById')
const addContact = require('../../controllers/addContact')
const removeContactById = require('../../controllers/removeContactById')
const updateContactById = require('../../controllers/updateContactById')

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', getContactById)

router.post('/', addContact)

router.delete('/:contactId', removeContactById)

router.put('/:contactId', updateContactById)

module.exports = router
