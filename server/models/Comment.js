const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
