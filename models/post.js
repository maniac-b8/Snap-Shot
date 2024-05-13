const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  url: {type: String, required: true},
  title: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);