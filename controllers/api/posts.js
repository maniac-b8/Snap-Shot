const Post = require('../../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  const post = new Post({
    imageUrl: req.body.imageUrl,
    caption: req.body.caption,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      await Post.findByIdAndDelete(postId);
      res.status(204).send(); // No content
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };