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
postRoute.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

//CREATE POST
postRoute.post('/', ensureAuthenticated, (req, res) => {
  const { title, description, price, location } = req.body;

  User.findOne({ googleId: req.user.googleId }).then(user => {
    console.log('post data = ', req.body);
    new Post({
      creator: user._id,
      title,
      description,
      price,
      location,
      date: Date.now()
    })
      .save()
      .then(post => {
        console.log(' Successfully created post ', post);

        post.user = user._id;

        res.status(200).json(post);
      })
      .catch(error => {
        console.log(' Error creating post ', error);
        res.status(500).json({
          error
        });
      });
  });
});

//READ A POST
postRoute.get('/:postId', (req, res) => {
  const { postId } = req.params;
  Post.findOne({ _id: postId }).then(post => {
    res.json(post);
  });
});

//UPDATE A POST
postRoute.put('/:postId', (req, res) => {
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
postRoute.delete('/:postId', (req, res) => {
  const { postId } = req.params;
  Post.findOneandRemove({ _id: postId }, err => {
    if (err) res.send(err);
    else res.json({ message: 'Post Deleted' });
  });
  res.send('POST DELETED');
});

module.exports = postRoute;
