const express = require('express');

const router = express.Router();
const Auth = require('../middelwares/auth');
const user = require('./users');
const jobs = require('./jobs');

router.use('/user', user);
router.use('/jobs', Auth, jobs);

module.exports = router;
