const express = require('express')
const router = express.Router()
const { uploadMulter } = require('../middlewares/upload')
const ProductsController = require('../controllers/ProductsController')
router
    .get('/', ProductsController.view)
    .get('/:id', ProductsController.getProductById)
    .post('/', uploadMulter.single('images'), ProductsController.insert)
    .delete('/:id', ProductsController.delete)

module.exports = router