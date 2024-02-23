const passport = require('passport');
const authConfig = require("../config/auth.js");
const {sequelize, User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = new User(sequelize);
const generateRandomPassword = require("../handlers/randomPassword.js")

const githubSignIn = async (req, res) => {
    passport.authenticate("github", {
      scope: ["profile", "email"],
      failureRedirect: "/login",
      // failureMessage: true,
    })(req, res, next);
  };
  githubSignIn.failure = (req, res) => {
    res.status(401).json({ message: req.flash("error") });
  };

 const githubSignInCallback = async (req, res) => {
  console.log('Request received at /auth/github/callback');
  console.log('Request query parameters:', req.query);
  
  if (!req.user) {
    console.error('User not found in database');
    return res.status(404).json({ message: 'User not found in database' });
  }
  
  console.log('Github user:', req.user);
  console.log('Github authentication successful');
  
  // Generar contraseña aleatoria y mostrarla en la consola
  const randomPassword = generateRandomPassword();
  console.log('Random password:', randomPassword);
  
  try {
    const email = req.user.email; // Corregir acceso a la propiedad emails
    console.log('Email:', email); // Agregar console.log para mostrar el email
    
    const displayName = req.user.displayName || 'Unknown';
    
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ where: { email: email } });
    
    if (existingUser) {
      // El usuario ya existe, puedes actualizar su información si es necesario
      console.log('User already exists:', existingUser);
      
      // Aquí puedes decidir cómo manejar el caso de un usuario existente,
      // ya sea actualizando su información o respondiendo con un mensaje de error
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    } else {
      // El usuario no existe, puedes crear uno nuevo
      const newUser = await User.create({
        name: displayName,
        email: email || 'example@example.com',
        password: randomPassword,
        isAdmin: false,
        googleId: req.user.id.toString(),
      });
      
      console.log('New user created:', newUser);
      
      // Responder con el nuevo usuario creado
      return res.status(200).json({ message: 'New user created', user: newUser });
    }
  } catch (error) {
    console.error('Error in creating or finding user:', error);
    return res.status(500).json({ message: 'Error in creating or finding user' });
  }
};

  module.exports = {
    githubSignIn,
    githubSignInCallback
  }