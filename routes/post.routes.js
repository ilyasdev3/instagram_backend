const express = require('express')
const multer = require('multer')
const router = express.Router()
const postController = require('../controllers/post.controller')
const { verifyToken } = require('../middlewares/verifytToken.middlerware')

router.post('/create', verifyToken, postController.create)
router.get('/allPosts', postController.getAllPosts)

module.exports = router
