const Express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const authApp = require('./authentication');

const app = new Express();
const port = 5000;

// Default settings
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieSession({ maxAge: 1000 * 100000, keys: ['hi'] }));

// Register passport
authApp(app);

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
// });

app.listen(port);
