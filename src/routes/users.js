const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/', userController.getAllUser);
router.post('/Signup', userController.createUser);
router.post('/login', userController.login);


module.exports = router;