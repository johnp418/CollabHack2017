const Express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieSession = require("cookie-session");
const authApp = require("./authentication");
const authConfig = require("./config");
const app = new Express();
const port = 5000;

const postRouter = require('./Routes/posts');

mongoose.connect(authConfig.mongoURI);

// const keys = require("./config");
// mongoose.connect(keys.mongoURI);
// require("./models/User");
// require("./models/Post");


// Default settings
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookieSession({ maxAge: 1000 * 100000, keys: ["hi"] }));

// Register passport
authApp(app);
postRouter(app);


// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
// });

app.listen(port);
