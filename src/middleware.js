require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { getValidationErrors } = require('./helper');

const validateUsers = async (req, res, next) => {
  const usersSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .max(32)
      // eslint-disable-next-line no-useless-escape
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base':
          'Password must contain at least 1 uppercase letter and 1 special character',
      }),
    repeat_password: Joi.any().equal(Joi.ref('password')).required().messages({
      'any.only': 'Password and Repeat Password must match',
    }),
    role_id: Joi.number(),
  });
  try {
    // eslint-disable-next-line no-unused-vars
    const validateRes = await usersSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const messages = getValidationErrors(err);
    console.log('messages ===', messages);
    res.status(400).json({ errors: messages });
  }
};

const validateShopItems = async (req, res, next) => {
  const ordersSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().max(99999999.99).required(),
    description: Joi.string().min(5).required(),
    image: Joi.string().uri().required(),
    item_type_id: Joi.number().required(),
  });
  try {
    // eslint-disable-next-line no-unused-vars
    const validateRes = await ordersSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const messages = getValidationErrors(err);
    console.log('messages ===', messages);
    res.status(400).json({ errors: messages });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // jeigu authHeader yra
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    res.status(401).json({ msg: 'do not have a token' });
    return;
  }
  jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ msg: 'token is not valid' });
      return;
    }
    req.user = user;
    next();
  });
};

module.exports = {
  validateUsers,
  validateShopItems,
};
