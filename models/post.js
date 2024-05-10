const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
