const { User } = require('../../models/user')
const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tempUpload, originalname } = req.file
  const imageName = `${_id}_${originalname}`

  try {
    const resultUpload = path.join(avatarDir, imageName)
    await fs.rename(tempUpload, resultUpload)

    await Jimp.read(resultUpload)
      .then((avatar) => {
        return avatar.resize(250, 250).quality(60).write(resultUpload)
      })
      .catch((err) => {
        throw err
      })

    const avatarURL = path.join('avatars', imageName)
    await User.findByIdAndUpdate(_id, { avatarURL })

    res.json({
      avatarURL,
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error
  }
}

module.exports = updateAvatar
