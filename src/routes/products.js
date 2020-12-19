const express = require('express')
const router = express.Router()
const { fileUpload } = require('../middlewares/upload')
const ProductsController = require('../controllers/ProductsController')
router
    .get('/', ProductsController.view)
    .get('/search', ProductsController.searchProduct)
    .get('/:id', ProductsController.getProductById)
    .post('/', fileUpload, ProductsController.insert)
    .patch('/:id', fileUpload, ProductsController.update)
    .delete('/:id', ProductsController.delete)

module.exports = router