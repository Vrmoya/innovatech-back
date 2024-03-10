require('dotenv').config();
const { FRONT_HOST, FRONT_PORT } = process.env;
const baseFrontURL = `http://${FRONT_HOST}:${FRONT_PORT}`
const authConfig = require("../config/auth.js");
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  let { email, password } = req.body;

  // Buscar al usuario en la base de datos
  User.findOne({ where: { email: email } })
    .then((user) => {
      console.log("Usuario encontrado en la base de datos:", user); // Registro adicional

      if (!user) {
        // Si el usuario no existe, enviar un error
        console.log("Usuario no encontrado en la base de datos."); // Registro adicional
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        // Si el usuario existe, verificar la contraseña
        if (!user.password) {
          console.log("No se encontró un hash de contraseña para este usuario."); // Registro adicional
          res.status(401).json({ auth: false, token: null });
        } else {
          let passwordIsValid = bcrypt.compareSync(password, user.password);

          // Agregar registros de comparación
          console.log("Contraseña proporcionada:", password); // Registro adicional
          console.log("Contraseña almacenada en la base de datos:", user.password); // Registro adicional
          console.log("La comparación de contraseñas es:", passwordIsValid);

          if (!passwordIsValid) {
            // Si la contraseña no es válida, enviar un error
            console.log("La contraseña proporcionada no es válida."); // Registro adicional
            res.status(401).json({ auth: false, token: null });
          } else {
            // Si la contraseña es válida, generar un token
            console.log("La contraseña proporcionada es válida."); // Registro adicional
            let token = jwt.sign({ id: user.id }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });

            
            // return res.redirect(baseFrontURL + "/home");
            // return res.status(200).json({auth:true,token:token}); //esto es para usar jwt en front
            return res.status(200).json(user); //para normales

          }
        }
      }
    })
    .catch((err) => {
      console.log("Error al buscar el usuario en la base de datos:", err); // Registro adicional
      res.status(500).json(err);
    });
};

module.exports = signIn;