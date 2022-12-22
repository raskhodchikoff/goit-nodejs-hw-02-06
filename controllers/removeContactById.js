const contacts = require('../models/contacts')

const removeContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.status(200).json({ message: 'Contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContactById
