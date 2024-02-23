const passport = require('passport');
const authConfig = require("../config/auth.js");
const {sequelize, User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = new User(sequelize);
const generateRandomPassword = require("../handlers/randomPassword.js")



const googleSignIn = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "/login",
    // failureMessage: true,
  })(req, res, next);
};

googleSignIn.failure = (req, res) => {
  res.status(401).json({ message: req.flash("error") });
};

const googleSignInCallback = async (req, res, next) => {
  console.log('Request received at /auth/google/callback');
  console.log('Request query parameters:', req.query);
  
  if (!req.user) {
    console.error('User not found in database');
    return res.status(404).json({ message: 'User not found in database' });
  }
  
  console.log('Google user:', req.user);
  console.log('Google authentication successful');
  
  // Generar contraseña aleatoria y mostrarla en la consola
  const randomPassword = generateRandomPassword();
  console.log('Random password:', randomPassword);
  
  try {
    const email = req.user.emails?.[0]?.value; // Corregir acceso a la propiedad emails
    console.log('Email:', email); // Agregar console.log para mostrar el email
    
    const [existingUser, created] = await User.findOrCreate({
      where: { googleId: req.user.id },
      defaults: {
        name: req.user.displayName,
        email: email || 'example@example.com',
        password: randomPassword,
        isAdmin: false,
      },
      raw: true,
    });
    console.log('User found or created:', { existingUser, created });
    console.log('New User:', existingUser);
    
    // res.redirect("/");
    console.log('Redirecting user to homepage');
    // return a JSON response instead
    res.status(200).json({ message: 'Google authentication successful', user: existingUser });
  } catch (error) {
    console.error('Error in creating user:', error);
    res.status(500).json({ message: 'Error in creating user' });
  }
};




module.exports = {
  googleSignIn,
  googleSignInCallback,
  
}