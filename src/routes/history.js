const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const historyController = require('../controllers/historyControllers');

router.get('/', verifyAccess, historyController.historyByUser);
router.delete('/delete-history', historyController.deleteHistory);


module.exports = router;