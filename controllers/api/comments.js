const Post = require('../../models/post');

module.exports = {
    addComment,
  }; 

async function addComment(req, res) {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId).populate('createdBy');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      content,
      createdBy: {
        _id: req.user._id,
        name: req.user.name 
      }
    };

    post.comments.push(newComment);
    await post.save();

    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not add comment' });
  }
}
