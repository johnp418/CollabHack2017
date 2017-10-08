const Express = require("express");
const mongoose = require("mongoose");
const authConfig = require("../config");
mongoose.connect(authConfig.mongoURI);

const User = require("../models/User");
const Post = require("../models/Post");
const postRoute = Express.Router();

const helpers = require("./helpers");
const {ensureAuthenticated} = helpers

module.exports = app => {
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/users", (req, res) => {
    User.find({}, (err, users) => {
      if (err) throw err;
      res.json(users);
    });
  });

  app.get("/api/users/:id", (req, res) => {
    // const id =
    // User.find({ _id: })
  });

  app.get("/api/users/:id/posts", (req, res) => {});

};
