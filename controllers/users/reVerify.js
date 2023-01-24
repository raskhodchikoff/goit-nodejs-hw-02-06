const { User } = require('../../models/user')
const { sendEmail } = require('../../helpers')

require('dotenv').config()

const { BASE_URL, SENDGRID_SENDER } = process.env

const reVerify = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ message: 'Missing required field email' })
  }
  if (user.verify) {
    return res
      .status(400)
      .json({ message: 'Verification has already been passed' })
  }

  const { verificationToken } = user
  const mail = {
    to: email,
    from: `${SENDGRID_SENDER}`,
    subject: 'Verify email',
    html: `a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  }
  await sendEmail(mail)
  res.status(200).json({
    message: 'Verification email sent',
  })
}

module.exports = reVerify
