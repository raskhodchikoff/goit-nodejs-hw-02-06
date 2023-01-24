const express = require('express')
const router = express.Router()

const controller = require('../../controllers/users')
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middlewares')
const { schemas } = require('../../models/user')

router.post(
  '/register',
  validation(schemas.registerSchema),
  controllerWrapper(controller.register)
)

router.get('/verify/:verificationToken', controllerWrapper(controller.verify))

router.post('/verify', controllerWrapper(controller.reVerify))

router.post(
  '/login',
  validation(schemas.loginSchema),
  controllerWrapper(controller.login)
)

router.get('/current', authenticate, controllerWrapper(controller.getCurrent))

router.post('/logout', authenticate, controllerWrapper(controller.logout))

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(controller.updateAvatar)
)

module.exports = router
