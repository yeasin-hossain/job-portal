const express = require('express');

const { login, register, updateUser } = require('../../api/controller/user');
const {
  loginValidator,
  addUserValidationHandler,
  registerValidator,
} = require('../../middelwares/user');

const router = express.Router();

router.put('/:userId', updateUser);
router.post('/login', loginValidator, addUserValidationHandler, login);
router.post('/resister', registerValidator, addUserValidationHandler, register);

module.exports = router;
