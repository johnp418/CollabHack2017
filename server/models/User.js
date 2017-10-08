const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  username: String,
  email: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User");
