const Express = require("express");
const mongoose = require("mongoose");
const authConfig = require("../config");
mongoose.connect(authConfig.mongoURI);

const User = require("../models/User");
const Post = require("../models/Post");
const postRoute = Express.Router();

module.exports = app => {
  app.get("/posts/:id", (res, req) => {});

  app.get("/posts", (req, res) => {
    User.findOne({ googleId: req.user.googleId }).then(user => {
      res.send(user);
    });
  });

  app.post("/posts", (req, res) => {
    const { title, description, price, location } = req.body;
    console.log("req.user", req.user);

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
  });
};
