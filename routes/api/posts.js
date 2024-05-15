const express = require('express');
const router = express.Router();
const upload = require("multer")();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require ('../../config/ensureLoggedIn')

// All routes start with ("/api/posts")

// GET /api/posts
router.get('/', postsCtrl.index);
// POST /api/posts/upload
router.post('/upload', ensureLoggedIn, upload.single('post'), postsCtrl.upload);
// DELETE /api/posts/postId
router.delete('/:id', ensureLoggedIn, postsCtrl.remove);
// GET /api/posts/postId
router.get('/:id', postsCtrl.getPost);
// GET /api/posts/user/:userId
router.get('/user/:userId', postsCtrl.getUserPosts);
// POST /api/posts/:postId/like
router.post('/:id/like', ensureLoggedIn, postsCtrl.likePost);
// POST /api/posts/:postId/unlike
router.post('/:id/unlike', ensureLoggedIn, postsCtrl.unlikePost);
// GET /api/posts/:postId/likes
router.get('/:id/likes', postsCtrl.getPostLikes);



module.exports = router;