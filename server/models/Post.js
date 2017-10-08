const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  _creator: { type: Number, ref: "User" },
  title: String,
  description: String,
  price: Number,
  location: String,
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

module.exports = mongoose.model('Post');
