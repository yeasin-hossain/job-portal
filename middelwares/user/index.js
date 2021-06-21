const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../../api/modal/user');

const loginValidator = [
  check('email').isEmail().withMessage('Invalid email address').trim(),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
    ),
];

const registerValidator = [
  check('name')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other than alphabet')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError('Email already is use!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
    ),
  check('role').notEmpty().withMessage('type must be selected'),
];
const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(200).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  registerValidator,
  loginValidator,
  addUserValidationHandler,
};
