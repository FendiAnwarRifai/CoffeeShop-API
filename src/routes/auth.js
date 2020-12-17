const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const authController = require('../controllers/authControllers');

router.get('/', authController.getAllUser);
router.post('/signup', authController.createUser);
router.post('/login', authController.login);
router.post('/forgot-password/request', authController.reqForgotPassword);
router.post('/forgot-password/new-password/:token', authController.forgotPassword);
router.patch('/edit-password', verifyAccess, authController.editPassword);


module.exports = router;