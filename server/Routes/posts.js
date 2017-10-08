const Express = require("express");
const Post = require("../models/Post");
const postRoute = Express.Router();

module.exports = app => {
  app.get("/posts/:id", (res, req) => {});

  app.post("/posts", (req, res) => {
    const { title, description, price, location } = req.body;
    new Post({
      title,
      description,
      price,
      location,
      date: Date.now()
    })
      .save()
      .then(post => console.log(post));
  });
};
