const uploadFile = require('../../config/upload-file');
const Post = require('../../models/post');

module.exports = {
  index,
  upload,
  remove,
  getPhoto
};

async function getPhoto(req, res) {
  try {
    const photo = await Post.findById(req.params.id).populate('createdBy');
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function index(req, res) {
  const photos = await Post.find({}).populate('createdBy').sort('-createdAt').exec();
  res.json(photos);
}

async function upload(req, res) {
  try {
    if (req.file) {
      const photoURL = await uploadFile(req.file);
      const photoDoc = await Post.create({
        url: photoURL,
        title: req.body.title,
        createdBy: req.user._id
      });

      res.json(photoDoc);
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