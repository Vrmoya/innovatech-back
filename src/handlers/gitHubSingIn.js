const passport = require('passport');
const authConfig = require("../config/auth.js");
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const githubSignIn = async (req, res) => {
    passport.authenticate("github")(req, res);
  };

 const githubSignInCallback = async (req, res) => {
    passport.authenticate(
      "github",
      { failureRedirect: "/login" },
      (err, user) => {
        if (err) {
          return res.status(500).json(err);
        }
        if (!user) {
          User.create({
            name: user.username,
            email: user.emails[0].value,
            password: null,
          })
            .then((user) => {
              res.redirect("/");
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        } else {
          res.redirect("/");
        }
      }
    )(req, res);
  };

  module.exports = {
    githubSignIn,
    githubSignInCallback
  }