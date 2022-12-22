const contacts = require('../models/contacts')
const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const updateContactById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing fields' })
    }

    const { contactId } = req.params
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
module.exports = updateContactById
