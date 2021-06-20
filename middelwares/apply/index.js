const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const applyValidator = [
  check('applicantId').notEmpty().withMessage('applicantId is required'),
  check('jobId').notEmpty().withMessage('jobId is required'),
  check('name').notEmpty().withMessage('name is required'),
  check('contact').notEmpty().withMessage('contact is required'),
  check('email').notEmpty().withMessage('email is required'),
  check('portfolioLink').notEmpty().withMessage('portfolioLink is required'),
  check('status').notEmpty().withMessage('status is required'),
];

const applyValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  applyValidator,
  applyValidationHandler,
};
