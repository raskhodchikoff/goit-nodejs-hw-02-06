const express = require('express')
const router = express.Router()

const controller = require('../../controllers/users')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares')
const { schemas } = require('../../models/user')

router.post(
  '/register',
  validation(schemas.registerSchema),
  controllerWrapper(controller.register)
)

router.post(
  '/login',
  validation(schemas.loginSchema),
  controllerWrapper(controller.login)
)

router.get('/current', authenticate, controllerWrapper(controller.getCurrent))

router.post('/logout', authenticate, controllerWrapper(controller.logout))

module.exports = router
