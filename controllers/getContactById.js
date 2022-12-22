const contacts = require('../models/contacts')

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
