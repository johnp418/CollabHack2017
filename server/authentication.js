const Express = require('express');
const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const session = require('express-session');

const authConfig = require('./config');

// Facebook
// passport.use(
//
// );

// const GoogleAuth = Express.Router();
//
// GoogleAuth.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['profile'] })
// );
//
// GoogleAuth.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     console.log(' Successful authentication ');
//     res.redirect('/');
//   }
// );

module.exports = app => {
  // Google
  passport.use(
    new GoogleStrategy(
      {
        clientID: authConfig.google.clientID, //
        clientSecret: authConfig.google.clientSecret, //
        callbackURL: 'http://localhost:5000/auth/google/callback'
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log('accessToken ', accessToken);
        console.log('refreshToken ', refreshToken);
        console.log('profile ', profile);
        // User.findOrCreate({ googleId: profile.id }, (err, user) => {
        //   return cb(err, user);
        // });
        cb(null, 'yolo');
      }
    )
  );

  passport.serializeUser(function(user, cb) {
    console.log(' serializeUser ', user);
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    console.log(' deserializing .... ');
    console.log(' deserializeUser ', obj);
    cb(null, obj);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      console.log(' Successful authentication ');
      res.redirect('/test');
    }
  );

  // app.use(express.session({ secret: 'addsfgd' }));

  app.get('/test', (req, res) => {
    console.log(' req.user ', req.user);
    res.send(req.user);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // app.use(FacebookAuth);
};
