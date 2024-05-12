const uploadFile = require('../../config/upload-file');
const Post = require('../../models/post');

module.exports = {
  index,
  upload
};

async function index(req, res) {
  const photos = await Post.find({}).sort('-createdAt').exec();
  res.json(photos);
}

async function upload(req, res) {
  try {
    if (req.file) {
      const photoURL = await uploadFile(req.file);
      const photoDoc = await Post.create({
        url: photoURL,
        title: req.body.title
      });
      res.json(photoDoc);
    } else {
      throw new Error('Must select a file');
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
}