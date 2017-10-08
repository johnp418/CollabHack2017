const Express = require("express");
const passport = require("passport");
// const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const session = require('express-session');
const mongoose = require("mongoose");
const authConfig = require("./config");
const User = require('./models/User');


require("./models/Post");


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
        callbackURL: "http://localhost:5000/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("accessToken ", accessToken);
        console.log("refreshToken ", refreshToken);
        console.log("profile ", profile);
        // User.findOrCreate({ googleId: profile.id }, (err, user) => {
        //   return cb(err, user);
        // });
        User.findOne({ googleId: profile.id }).then(existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            console.log("creating new user>>>>>>>>>>>>>>>>>>>>>");
            new User({
              _id: new mongoose.Types.ObjectId(),
              googleId: profile.id,
              name: profile.name.givenName + " " + profile.name.familyName,
              username: "",
              email: profile.emails[0].value,
              posts: [],
              date: Date.now()
            })
              .save()
              .then(user => done(null, user));
          }
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    console.log(" serializeUser ", user);
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    console.log(" deserializing .... ");
    console.log(" deserializeUser ", id);
    done(null, id);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      // Successful authentication, redirect home.
      console.log(" Successful authentication ");
      res.redirect("/test");
    }
  );

  // app.use(express.session({ secret: 'addsfgd' }));

  app.get("/test", (req, res) => {
    console.log(" req.user ", req.user);
    res.send(req.user);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // app.use(FacebookAuth);
};
