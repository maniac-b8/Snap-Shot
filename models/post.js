const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String, 
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: String
}, {
  timestamps: true,
});

const postSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  title: String,
  category: {
    type: String,
    enum: ['Cars & Trucks', 'Nature', 'Gaming'],
    required: true
   },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  username: String,
  comments: [commentSchema] 
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);