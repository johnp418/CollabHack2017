const Express = require('express');
const mongoose = require('mongoose');
const authConfig = require('../config');
// mongoose.connect(authConfig.mongoURI);

const User = require('../models/User');
const Post = require('../models/Post');
const postRoute = Express.Router();

//Helper functions
const helpers = require('./helpers');
const { ensureAuthenticated, getAllUrlParams } = helpers;

//RESTful API
//READ POSTS
postRoute.get('/api/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

//CREATE POST
postRoute.post('/api/posts', ensureAuthenticated, (req, res) => {
  const { title, description, price, location } = req.body;

  User.findOne({ googleId: req.user.googleId }).then(user => {
    new Post({
      creator: user._id,
      title,
      description,
      price,
      location,
      date: Date.now()
    })
      .save()
      .then(post => console.log(post));
  });
  res.send('Post Successful');
});

//READ A POST
postRoute.get('/api/posts/:postId', (req, res) => {
  const { postId } = req.params;
  Post.findOne({ _id: postId }).then(post => {
    res.json(post);
  });
});

//UPDATE A POST
postRoute.put('/api/posts/:postId', (req, res) => {
  const { postId } = req.params;
  Post.findOneAndUpdate(
    { _id: postId },
    req.body,
    { new: true },
    (err, post) => {
      if (err) res.send(err);
      else res.json(post);
    }
  );
});

//DELETE A POST
postRoute.delete('/api/posts/:postId', (req, res) => {
  const { postId } = req.params;
  Post.findOneandRemove({ _id: postId }, err => {
    if (err) res.send(err);
    else res.json({ message: 'Post Deleted' });
  });
  res.send('POST DELETED');
});

module.exports = postRoute;
