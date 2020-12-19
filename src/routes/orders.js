const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const paymentsController = require('../controllers/paymentsControllers');

router.post('/checkout',verifyAccess, paymentsController.checkout);
// router.post('/signup', paymentsController.createUser);
// router.post('/login', paymentsController.login);
// router.post('/forgot-password/request', paymentsController.reqForgotPassword);
// router.post('/forgot-password/new-password/:token', paymentsController.forgotPassword);
// router.patch('/edit-password', verifyAccess, paymentsController.editPassword);


module.exports = router;