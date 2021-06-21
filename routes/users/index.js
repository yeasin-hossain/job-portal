const express = require('express');

const { login, register, updateUser, getAllUsers } = require('../../api/controller/user');
const Auth = require('../../middelwares/auth');
const {
  loginValidator,
  addUserValidationHandler,
  registerValidator,
} = require('../../middelwares/user');

const router = express.Router();

router.get('/', Auth, getAllUsers);
router.put('/:userId', Auth, updateUser);
router.post('/login', loginValidator, addUserValidationHandler, login);
router.post('/register', registerValidator, addUserValidationHandler, register);

module.exports = router;
