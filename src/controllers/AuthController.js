const authConfig = require("../config/auth.js");
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Login
  signIn(req, res) {
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

          res.status(200).json({ auth: true, token: token });
        }
      }
    }
  })
  .catch((err) => {
    console.log("Error al buscar el usuario en la base de datos:", err); // Registro adicional
    res.status(500).json(err);
  });
},
  googleSignIn(req, res) {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
  },

  googleSignInCallback(req, res) {
    passport.authenticate(
      "google",
      { failureRedirect: "/login" },
      (err, user) => {
        if (err) {
          return res.status(500).json(err);
        }
        if (!user) {
          User.create({
            name: user.displayName,
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
  },

  githubSignIn(req, res) {
    passport.authenticate("github")(req, res);
  },

  githubSignInCallback(req, res) {
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
  },

  // Registro
  signUp(req, res) {
    console.log("Datos de la solicitud:", req.body);
    console.log("Número de rondas:", Number.parseInt(authConfig.rounds));
  
    bcrypt.hash(req.body.password, Number.parseInt(authConfig.rounds))
      .then(hashedPassword => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        })
        .then((user) => {
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });
  
          res.json({
            user: user,
            token: token,
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
      })
      .catch((err) => {
        console.error('Error al hacer hash de la contraseña:', err);
        res.status(500).json(err);
      });
  },
  
  firstSignUpAdmin(req, res) {
    console.log("Datos de la solicitud:", req.body);
     
    bcrypt.hash(req.body.password, Number.parseInt(authConfig.rounds))
      .then(hashedPassword => {
        
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          isAdmin: true,
        })
        .then((user) => {
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });
  
          res.json({
            user: user,
            token: token,
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
      })
      .catch((err) => {
        console.error('Error al hacer hash de la contraseña:', err);
        res.status(500).json(err);
      });
    },
  // Registro de administrador
  signUpAdmin(req, res) {
    console.log("Datos de la solicitud:", req.body);
     
    bcrypt.hash(req.body.password, Number.parseInt(authConfig.rounds))
      .then(hashedPassword => {

        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          isAdmin: true,
        })
        .then((user) => {
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });
  
          res.json({
            user: user,
            token: token,
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
      })
      .catch((err) => {
        console.error('Error al hacer hash de la contraseña:', err);
        res.status(500).json(err);
      });
  },

};