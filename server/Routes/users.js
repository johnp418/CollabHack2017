const Express = require('express');
const mongoose = require('mongoose');
const authConfig = require('../config');
mongoose.connect(authConfig.mongoURI);

const User = require('../models/User');
const Post = require('../models/Post');
const postRoute = Express.Router();

const helpers = require('./helpers');
const { ensureAuthenticated } = helpers;

module.exports = app => {
  app.get('/api/current_user', (req, res) => {
    console.log('req user  =', req.user);
    const user = req.user || {};
    res.status(200).json(user);
  });

  app.get('/api/logout', (req, res) => {
    const { user } = req;
    console.log('logout ', user, ' \n session ', req.session);
    req.logout();
    // TODO: Change this url later in prod
    res.sendStatus(200);
  });

  app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err) throw err;
      res.json(users);
    });
  });

  app.get('/api/users/:id', (req, res) => {
    // const id =
    // User.find({ _id: })
  });

  app.get('/api/users/:id/posts', (req, res) => {});
};
