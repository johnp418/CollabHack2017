const Express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieSession = require('cookie-session');
const authConfig = require('./config');
const authApp = require('./authentication');

const app = new Express();
const port = 5000;

const postRouter = require('./Routes/posts');
const commentRouter = require('./Routes/comments');

mongoose.connect(authConfig.mongoURI);

// const keys = require("./config");
// mongoose.connect(keys.mongoURI);

// Default settings
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieSession({ maxAge: 1000 * 100000, keys: ['hi'] }));

// Register passport
authApp(app);

app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
// });

app.listen(port);
