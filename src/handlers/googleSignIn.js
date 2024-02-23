const passport = require('passport');
const authConfig = require("../config/auth.js");
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8);
};
const googleSignIn = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "/login",
    failureMessage: true,
  })(req, res, next);
};

googleSignIn.failure = (req, res) => {
  res.status(401).json({ message: req.flash("error") });
};
const googleSignInCallback = async (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/login" }, async (err, user) => {
    if (err) {
      console.error('Error in Google authentication:', err);
      return res.status(500).json({ message: 'Error in Google authentication' });
    }
    if (!req.user) {
      console.error('User not found in database');
      return res.status(404).json({ message: 'User not found in database' });
    }
    console.log('Google user:', req.user);
    try {
      const [existingUser, created] = await User.findOrCreate({
        where: { googleId: req.user.id },
        defaults: {
          name: req.user.displayName,
          email: req.user.emails[0].value,
          password: generateRandomPassword(),
          isAdmin: false,
        },
        raw: true,
      });

      console.log('User created:', created); // Add console.log here
      console.log('New User:', existingUser);

      res.redirect("/");
    } catch (error) {
      console.error('Error in creating user:', error);
      res.status(500).json({ message: 'Error in creating user' });
    }
  })(req, res, next);
};
module.exports = {
  googleSignIn,
  googleSignInCallback,
  generateRandomPassword
};


 