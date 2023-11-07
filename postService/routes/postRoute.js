const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.post('/create/:id', postController.createPost)
router.get('/', postController.getActivePosts)
router.get('/:id', postController.getUserPosts)
router.put('/archive/:postId', postController.archivePost)

module.exports = router