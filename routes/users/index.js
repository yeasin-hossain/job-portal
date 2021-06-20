const express = require('express');

const { login, register } = require('../../api/controller/user');
const {
  loginValidator,
  addUserValidationHandler,
  registerValidator,
} = require('../../middelwares/user');

const router = express.Router();

router.post('/login', loginValidator, addUserValidationHandler, login);
router.post('/resister', registerValidator, addUserValidationHandler, register);

module.exports = router;
