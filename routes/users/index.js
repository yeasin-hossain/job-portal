const express = require('express');

const { login, register, updateUser, getAllUsers } = require('../../api/controller/user');
const {
  loginValidator,
  addUserValidationHandler,
  registerValidator,
} = require('../../middelwares/user');

const router = express.Router();

router.get('/', getAllUsers);
router.put('/:userId', updateUser);
router.post('/login', loginValidator, addUserValidationHandler, login);
router.post('/resister', registerValidator, addUserValidationHandler, register);

module.exports = router;
