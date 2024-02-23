const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { User } = require('../db.js');
const { generateRandomPassword } = require('../handlers/googleSignIn');
const { googleSignInCallback } = require('../handlers/googleSignIn');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback"
},
googleSignInCallback
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log('GitHub profile:', profile);
  console.log('User model:', User.rawAttributes);
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));

module.exports = {
    secret: process.env.AUTH_SECRET || "veremos",
    expires: process.env.AUTH_EXPIRES || "24h",
    rounds: process.env.AUTH_ROUNDS || 10,
    passport: passport,
    generateRandomPassword: generateRandomPassword,
}