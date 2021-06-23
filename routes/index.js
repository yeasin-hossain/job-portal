const express = require('express');

const router = express.Router();
const Auth = require('../middelwares/auth');
const user = require('./users');
const jobs = require('./jobs');
const apply = require('./apply');

router.use('/user', user);
router.use('/jobs', jobs);
router.use('/apply', Auth, apply);

module.exports = router;
