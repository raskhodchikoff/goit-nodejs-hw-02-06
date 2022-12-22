const express = require('express')

const getAllContacts = require('../../controllers/getAllContacts')
const getContactById = require('../../controllers/getContactById')
const addContact = require('../../controllers/addContact')
const removeContactById = require('../../controllers/removeContactById')
const updateContactById = require('../../controllers/updateContactById')

const { controllerWrapper } = require('../../helpers/controllerWrapper')

const router = express.Router()

router.get('/', controllerWrapper(getAllContacts))

router.get('/:contactId', controllerWrapper(getContactById))

router.post('/', controllerWrapper(addContact))

router.delete('/:contactId', controllerWrapper(removeContactById))

router.put('/:contactId', controllerWrapper(updateContactById))

module.exports = router
