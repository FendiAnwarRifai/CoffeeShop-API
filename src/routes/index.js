const express = require('express')
const router = express.Router()
const routeProducts = require('./products')

router
    .use('/products', routeProducts)

module.exports = router