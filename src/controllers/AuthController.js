require('dotenv').config();
const authConfig = require('../config/auth.js');
const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
    // Login
    signIn(req, res) {
        let { email, password } = req.body;

        // Buscar al usuario en la base de datos
        User.findOne({ where: { email: email } })
            .then(user => {
                if (!user) {
                    // Si el usuario no existe, enviar un error
                    res.status(404).json({ message: "Usuario no encontrado" });
                } else {
                    // Si el usuario existe, verificar la contraseña
                    let passwordIsValid = bcrypt.compareSync(password, user.password);
                    if (!passwordIsValid) {
                        // Si la contraseña no es válida, enviar un error
                        res.status(401).json({ auth: false, token: null });
                    } else {
                        // Si la contraseña es válida, generar un token
                        let token = jwt.sign({ id: user.id }, authConfig.secret, {
                            expiresIn: authConfig.expires
                        });

                        res.status(200).json({ auth: true, token: token });
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    },

    googleSignIn(req, res) {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
    },

    googleSignInCallback(req, res) {
        passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!user) {
                User.create({
                    name: user.displayName,
                    email: user.emails[0].value,
                    password: null
                }).then(user => {
                    res.redirect('/');
                }).catch(err => {
                    res.status(500).json(err);
                });
            } else {
                res.redirect('/');
            }
        })(req, res);
    },

    githubSignIn(req, res) {
        passport.authenticate('github')(req, res);
    },

    githubSignInCallback(req, res) {
        passport.authenticate('github', { failureRedirect: '/login' }, (err, user) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!user) {
                User.create({
                    name: user.username,
                    email: user.emails[0].value,
                    password: null
                }).then(user => {
                    res.redirect('/');
                }).catch(err => {
                    res.status(500).json(err);
                });
            } else {
                res.redirect('/');
            }
        })(req, res);
    },

    // Registro
    signUp(req, res) {
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });
            
        }).catch(err => {
            res.status(500).json(err);
        });
    },
     // Registro de administrador
     signUpAdmin(req, res) {
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
            isAdmin: true
        }).then(user => {
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    },
};