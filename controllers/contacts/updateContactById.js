const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) {
    throw new NotFound()
  }
  res.status(200).json(result)
}

module.exports = updateContactById
