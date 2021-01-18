const express = require('express')
const router = express.Router()
const { fileUpload } = require('../middlewares/upload')
const { verifyAccess } = require('../middlewares/auth')
const ProductsController = require('../controllers/ProductsController')
router
    .get('/', verifyAccess, ProductsController.view)
    .get('/search', verifyAccess, ProductsController.searchProduct)
    .get('/:id',verifyAccess, ProductsController.getProductById)
    .post('/',verifyAccess, fileUpload, ProductsController.insert)
    .patch('/:id',verifyAccess, fileUpload, ProductsController.update)
    .delete('/:id',verifyAccess, ProductsController.delete)

module.exports = router