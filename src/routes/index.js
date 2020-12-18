const express = require ('express');
const router = express.Router();
const auth = require('./auth');
const users = require('./users')

router.use('/auth', auth);
router.use('/user', users);

module.exports = router;