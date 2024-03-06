require('dotenv').config();
const { FRONT_HOST, FRONT_PORT } = process.env;
const baseFrontURL = `http://${FRONT_HOST}:${FRONT_PORT}`
const authConfig = require("../config/auth.js");
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    console.log("Datos de la solicitud:", req.body);
    console.log("Número de rondas:", Number.parseInt(authConfig.rounds));
  
    bcrypt.hash(req.body.password, Number.parseInt(authConfig.rounds))
      .then(hashedPassword => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          image: req.body.image
        })
        .then((user) => {
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });
  
          res.json({
            user: user,
            token: token,
          })
          // return res.redirect(baseFrontURL + "/home");
        })
        .catch((err) => {
          res.status(500).json(err);
        });
      })
      .catch((err) => {
        console.error('Error al hacer hash de la contraseña:', err);
        res.status(500).json(err);
      });
  };

  module.exports = signUp;