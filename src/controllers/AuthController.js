const authConfig = require("../config/auth.js");
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = require("../handlers/singIn.js");
const signUp = require("../handlers/signUp.js");
const signUpAdmin = require("../handlers/signUpAdmin.js");
const firstSignUpAdmin = require("../handlers/firstSignUpAdmin.js");
const {googleSignIn,googleSignInCallback} = require("../handlers/googleSignIn.js");
const {githubSignIn, githubSignInCallback} = require("../handlers/gitHubSingIn.js");

module.exports = {
  signIn,
  signUp,
  signUpAdmin,
  firstSignUpAdmin,
  googleSignIn,
  googleSignInCallback,
  githubSignIn,
  githubSignInCallback  
};