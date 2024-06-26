const uploadFile = require('../../config/upload-file');
const Post = require('../../models/post');
const User = require('../../models/user')

module.exports = {
  index,
  upload,
  remove,
  getPost,
  getUserPosts,
  likePost,
  unlikePost,
  getPostLikes
};

async function getUserPosts(req, res) {
  try {
    const posts = await Post.find({ createdBy: req.params.userId }).populate('createdBy').exec();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('createdBy');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function index(req, res) {
  const posts = await Post.find({}).populate('createdBy').sort('-createdAt').exec();
  res.json(posts);
}

async function upload(req, res) {
  try {
    if (req.file) {
      const photoURL = await uploadFile(req.file);
      const postDoc = await Post.create({
        url: photoURL,
        title: req.body.title,
        category: req.body.category,
        createdBy: req.user._id
      });
      await postDoc.populate('createdBy');

      res.json(postDoc);
    } else {
      throw new Error('Must select a file');
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function remove(req, res) {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const deletedPost = await Post.findByIdAndRemove(postId);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Could not delete post' });
  }
}

async function likePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (!post.likes.includes(req.user._id)) {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      post.likes.push(user);
      await post.save();
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function unlikePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const index = post.likes.indexOf(req.user._id);
    if (index > -1) {
      post.likes.splice(index, 1);
      await post.save();
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPostLikes(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('likes');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likedUsers = post.likes.map(user => ({
      _id: user._id,
      name: user.name
    }));

    res.json(likedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
