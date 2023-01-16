const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../models/user')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Email or password is wrong' }) // "Email invalid"
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    return res.status(401).json({ message: 'Email or password is wrong' }) // "Password invalid"
  }
  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '48h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
      avatar: user.avatarURL,
    },
  })
}

module.exports = login
