const express = require('express');

const router = express.Router();
// const Auth = require('../middelwares/auth');
const user = require('./users');

router.use('/user', user);

module.exports = router;
