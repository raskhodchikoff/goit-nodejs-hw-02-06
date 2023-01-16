const bcrypt = require('bcrypt')

const gravatar = require('gravatar')
const { User } = require('../../models/user')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.status(409).json({ message: 'Email in use' })
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  })
  res.status(201).json({
    status: 'Created',
    code: 201,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatarURL,
      },
    },
  })
}

module.exports = register
