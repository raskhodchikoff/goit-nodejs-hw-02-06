const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],

      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

const handleSaveErrors = (error, data, next) => {
  const { name, code } = error
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400

  next()
}

userSchema.post('save', handleSaveErrors)

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model('user', userSchema)

module.exports = { User, schemas }
