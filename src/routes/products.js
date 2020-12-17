const express = require('express')
const router = express.Router()
const { uploadMulter } = require('../middlewares/upload')
const ProductsController = require('../controllers/ProductsController')
router
    .post('/', uploadMulter.single('images'), ProductsController.insert)

module.exports = router