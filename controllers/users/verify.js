const { User } = require('../../models/user')

const verify = async (req, res) => {
  const { verificationToken } = req.params

  const user = await User.findOne({ verificationToken })

  if (!user) {
    return res.status(404).json({ message: 'User not found' }) // "Verification user Not Found
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  })

  res.json({
    status: 'success',
    code: 200,
    ResponseBody: {
      message: 'Verification successful',
    },
  })
}

module.exports = verify
