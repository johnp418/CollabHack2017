const Express = require('express');
// const session = require('express-session');
const path = require('path');
const authApp = require('./authentication');
const app = new Express();
const port = 5000;

// Default settings
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

// Register passport
authApp(app);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
});

app.listen(port);
