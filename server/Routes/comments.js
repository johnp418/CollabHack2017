const Express = require('express');
const Comment = require('../models/Comment');
const commentRoute = Express.Router();
const User = require('../models/User');

const ERROR_CODE = 404;

// commentRoute.get('/', (req, res) => {
//   User.find({ user: req.user }).then((doc) => {
//
//   }).catch(err => {
//     res.
//   })
// });

commentRoute.get('/:id', (req, res) => {
  const { id } = req.body;
  Comment.findById(id)
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(error => {
      res.status(ERROR_CODE).json({
        error
      });
    });
});

// Create
commentRoute.post('/', (req, res) => {
  const { description, postId } = req.body;
  const comment = new Comment({
    user: req.body.user || req.user._id,
    postId,
    description
  });
  comment
    .save()
    .then(doc => {
      // Add this comment to the post?
      console.log('comment saved , ', doc);
      res.status(200).json(doc);
    })
    .catch(error => {
      console.log(' error creating comment ', error);
      res.status(ERROR_CODE).json({
        error
      });
    });
});

// Update
commentRoute.patch('/:id', (req, res) => {
  const { id, description } = req.body;
  Comment.findOneAndUpdate({ id }, { description, date: Date.now() })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(error => {
      res.status(ERROR_CODE).json({
        error
      });
    });
});

commentRoute.delete('/:id', (req, res) => {
  Comment.post('remove', doc => {
    const deletedComment = doc;
    console.log(doc);
    User.findById(doc.user)
      .then(doc => {
        doc.comments.pull(deletedComment);
        return doc.save();
      })
      .then(() => {
        res.status(200).json(deletedComment);
      })
      .catch(error => {
        res.status(ERROR_CODE).json({
          error
        });
      });
  });
});

module.exports = commentRoute;

// module.exports = app => {
//   app.get('/posts/:id', (res, req) => {});
//
//   app.post('/posts', (req, res) => {
//     const { title, description, price, location } = req.body;
//     new Post({
//       title,
//       description,
//       price,
//       location,
//       date: Date.now()
//     })
//       .save()
//       .then(post => console.log(post));
//   });
// };
