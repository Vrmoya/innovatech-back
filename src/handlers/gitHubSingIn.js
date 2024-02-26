require('dotenv').config();
const { FRONT_HOST, FRONT_PORT } = process.env;
const baseFrontURL = `http://${FRONT_HOST}:${FRONT_PORT}`
const passport = require('passport');
const authConfig = require("../config/auth.js");
const { sequelize, User } = require("../db.js");
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

    const image = req.user.image;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      console.log("User already exists:", existingUser);

      // Generar un token JWT para el usuario existente
      const token = jwt.sign({ userId: existingUser.id }, 'secret', { expiresIn: '1h' }); // Cambiar 'secret' por una clave secreta segura

      // Enviar el token como respuesta al cliente
      res.cookie('token', token, { httpOnly: true }); // Almacenar el token en una cookie segura y httponly


      console.log('Redirecting to ' + baseFrontURL + '/home');
      return res.redirect(baseFrontURL + "/home");
    } else {
      // El usuario no existe, puedes crear uno nuevo
      const newUser = await User.create({
        name: displayName,
        email: email || "example@example.com",
        password: randomPassword,
        image:image,
        isAdmin: false,
        googleId: req.user.id.toString(),
      });

      console.log("New user created:", newUser);

      // Generar un token JWT para el nuevo usuario
      const token = jwt.sign({ userId: newUser.id }, 'secret', { expiresIn: '1h' }); // Cambiar 'secret' por una clave secreta segura

      // Enviar el token como respuesta al cliente
      res.cookie('token', token, { httpOnly: true }); // Almacenar el token en una cookie segura y httponly
      return res.redirect(baseFrontURL + "/home");
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