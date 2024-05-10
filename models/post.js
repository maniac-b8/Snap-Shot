const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  caption: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
