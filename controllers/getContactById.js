const { Contact } = require('../models/contact')
const { NotFound } = require('http-errors')

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)
    if (!result) {
      throw new NotFound(`Contact ${contactId} not found`)
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
