const express = require('express')
const router = express.Router()

const controller = require('../../controllers/contacts')

const validation = require('../../middlewares/validation')
const { addSchema, updateFavoriteSchema } = require('../../models/contact')

router.get('/', controller.getAllContacts)

router.get('/:contactId', controller.getContactById)

router.post('/', validation(addSchema), controller.addContact)

router.delete('/:contactId', controller.removeContactById)

router.put('/:contactId', validation(addSchema), controller.updateContactById)

router.patch(
  '/:contactId/favorite',
  validation(updateFavoriteSchema),
  controller.updateStatusContact
)

module.exports = router
