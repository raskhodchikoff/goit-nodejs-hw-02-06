const express = require('express')
const router = express.Router()

const controller = require('../../controllers/contacts')

const {
  validation,
  authenticate,
  controllerWrapper,
} = require('../../middlewares')
const { addSchema, updateFavoriteSchema } = require('../../models/contact')

router.get('/', authenticate, controllerWrapper(controller.getAllContacts))

router.get(
  '/:contactId',
  authenticate,
  controllerWrapper(controller.getContactById)
)

router.post(
  '/',
  authenticate,
  validation(addSchema),
  controllerWrapper(controller.addContact)
)

router.delete(
  '/:contactId',
  authenticate,
  controllerWrapper(controller.removeContactById)
)

router.put(
  '/:contactId',
  authenticate,
  validation(addSchema),
  controllerWrapper(controller.updateContactById)
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(updateFavoriteSchema),
  controllerWrapper(controller.updateStatusContact)
)

module.exports = router
