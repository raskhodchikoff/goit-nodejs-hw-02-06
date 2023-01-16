const path = require('path')
const multer = require('multer')

const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, '../', 'tmp'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: { fileSize: 1048576 },
})

const upload = multer({
  storage: multerConfig,
})

module.exports = upload
