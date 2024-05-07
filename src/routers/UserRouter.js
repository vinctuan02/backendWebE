const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware')

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
router.get('/get-detail-user/:id', authUserMiddleWare, userController.getDetailUser)
router.get('/get-all-user', authMiddleWare, userController.getAllUser)
router.get('/refresh-token', userController.refreshToken)

module.exports = router