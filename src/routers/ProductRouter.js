const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware')

router.post('/create-product', ProductController.createProduct)
router.put('/update-product/:id', ProductController.updateProduct)
router.get('/get-details-product/:id', ProductController.getDetailsProduct)
router.get('/get-product-by-page', ProductController.getProductByPage)
// router.get('/get-all', ProductController.getProductByPage)
router.get('/get-all-details-product', ProductController.getAllDetailsProduct)
router.delete('/delete-product/:id', ProductController.deleteProduct)

module.exports = router