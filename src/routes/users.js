const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const {uploadMulter} = require('../middlewares/upload')
const usersController = require('../controllers/usersControllers');

router.patch('/edit-profile', verifyAccess, usersController.editProfile);
router.patch('/update-image', verifyAccess, uploadMulter.single('image'), usersController.updateImage);
router.delete('/delete-image', verifyAccess, usersController.deleteImage);
// router.get('/', authController.getAllUser);
// router.post('/signup', authController.createUser);
// router.post('/login', authController.login);
// router.post('/forgot-password/request', authController.reqForgotPassword);
// router.post('/forgot-password/new-password/:token', authController.forgotPassword);


module.exports = router;