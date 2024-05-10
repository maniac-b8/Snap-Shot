const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');

router.get('/', postsCtrl.getPosts);
router.post('/', postsCtrl.createPost);
router.delete('/:postId', postsCtrl.deletePost);

module.exports = router;