const express = require('express');
const router = express.Router();
const upload = require("multer")();
const postsCtrl = require('../../controllers/api/posts');

// All routes start with ("/api/posts")

// GET /api/posts
router.get('/', postsCtrl.index);
// POST /api/posts/upload
router.post('/upload', upload.single('photo'), postsCtrl.upload);
// DELETE /api/posts/postId
router.delete('/:id', postsCtrl.remove);
// GET /api/posts/postId
router.get('/:id', postsCtrl.getPhoto);


module.exports = router;