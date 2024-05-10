const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//All paths start with "/api/posts"

router.get('/', postsCtrl.getPosts);
router.post('/', ensureLoggedIn, postsCtrl.createPost);
router.delete('/:postId', ensureLoggedIn, postsCtrl.deletePost);

module.exports = router;
