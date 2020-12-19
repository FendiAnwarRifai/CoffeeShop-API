const express = require ('express');
const router = express.Router();
const auth = require('./auth');
const users = require('./users')
const routeProducts = require('./products')
const orders = require('./orders')
const history = require('./history')

router.use('/auth', auth)
router.use('/user', users)
router.use('/products', routeProducts)
router.use('/order', orders)
router.use('/history', history)


module.exports = router
