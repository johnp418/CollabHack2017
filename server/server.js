// Use .env files

const Express = require('express');
const path = require('path');
const dotEnv = require('dotenv');

// Setup environmental settigns, eg. SERVER_PORT
dotEnv.config({ path: path.resolve(process.cwd(), '../.env') });

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
// const session = require('express-session');
const authApp = require('./authentication');
const authConfig = require('./config');
const app = new Express();
const port = process.env.SERVER_PORT || 8000;

const userRouter = require('./Routes/users');
const postRouter = require('./Routes/posts');
const commentRouter = require('./Routes/comments');

mongoose.connect(authConfig.mongoURI);

// const keys = require("./config");
// mongoose.connect(keys.mongoURI);

// Default settings
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['this is our secret!']
  })
);
// app.use(
//   session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   })
// );

// Register passport
authApp(app);
userRouter(app);

app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.listen(port, err => {
  console.log("Server started. It's running at ", port);
});
