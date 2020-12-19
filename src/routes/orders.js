const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const paymentsController = require('../controllers/paymentsControllers');

router.post('/checkout',verifyAccess, paymentsController.checkout);
router.get('/detail-order/:id', paymentsController.detailOrder);
router.patch('/confirm-payment', paymentsController.confirmAndPay);
router.patch('/done', paymentsController.markAsDone);
// router.post('/forgot-password/request', paymentsController.reqForgotPassword);
// router.post('/forgot-password/new-password/:token', paymentsController.forgotPassword);
// router.patch('/edit-password', verifyAccess, paymentsController.editPassword);


module.exports = router;