const Express = require('express');
const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const authConfig = require('./config').auth;

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
    }
  )
);

// Facebook
// passport.use(
//
// );

const GoogleAuth = Express.Router();

GoogleAuth.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

GoogleAuth.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = app => {
  app.use(GoogleAuth);
  // app.use(FacebookAuth);
};
