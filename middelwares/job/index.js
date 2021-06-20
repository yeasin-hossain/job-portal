const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const jobValidator = [
  check('title').isLength({ min: 10 }).trim(),
  check('description').isLength({ min: 30 }).withMessage('description is required').trim(),
  check('deadline').notEmpty().withMessage('deadline is required'),
  check('companyName').notEmpty().withMessage('deadline is required'),
  check('location').notEmpty().withMessage('location is required'),
  check('jobPosterId').notEmpty().withMessage('job poster id is required'),
];

const jobValidationHandler = (req, res, next) => {
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
  jobValidator,
  jobValidationHandler,
};
