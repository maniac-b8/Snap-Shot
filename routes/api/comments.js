const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/api/comments');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/comments/postId
router.post('/:postId', ensureLoggedIn, commentsCtrl.addComment);

module.exports = router;