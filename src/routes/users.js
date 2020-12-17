const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const userController = require('../controllers/userControllers');

router.get('/', userController.getAllUser);
router.post('/Signup', userController.createUser);
router.post('/login', userController.login);
router.post('/forgot-password/request', userController.reqForgotPassword);
router.post('/forgot-password/new-password/:token', userController.forgotPassword);


module.exports = router;