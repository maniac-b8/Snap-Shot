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
    const createdBy = req.user._id;

    const post = new Post({
      imageUrl: req.body.imageUrl,
      caption: req.body.caption,
      createdBy: createdBy, 
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
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await Post.findByIdAndDelete(postId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  