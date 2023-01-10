const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const removeContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`)
  }
  res.status(200).json({ message: 'Contact deleted' })
}

module.exports = removeContactById
