const { Contact } = require('../models/contact')
const { NotFound } = require('http-errors')

const removeContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(contactId)
    if (!result) {
      throw new NotFound()
    }
    res.status(200).json({ message: 'Contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContactById
