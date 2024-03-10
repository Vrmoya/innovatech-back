require('dotenv').config();
const { FRONT_HOST, FRONT_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env;
const baseFrontURL = `http://${FRONT_HOST}:${FRONT_PORT}`;
const authConfig = require("../config/auth.js");
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require('../config/nodemailer')



const signUp = async (req, res) => {
    console.log("Datos de la solicitud:", req.body);
    console.log("Número de rondas:", Number.parseInt(authConfig.rounds));

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, Number.parseInt(authConfig.rounds));

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            image: req.body.image
        });

        // Envío de correo electrónico al registrarse
        const mailOptions = {
            from: 'grupoinnovatech.soporte@gmail.com', // Reemplaza con tu dirección de correo electrónico
            to: user.email,
            subject: 'Registro Exitoso',
            html: `
            <p>¡Hola ${user.name}! Gracias por registrarte en nuestra plataforma.</p>
            <p>Para comenzar, visita nuestra <a href="http://localhost:5173/login">página principal</a>.</p>
        `
    };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
            } else {
                console.log('Correo electrónico enviado:', info.response);
            }
        });

        let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
        });

        return res.redirect(baseFrontURL + "/home");
    } catch (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).json(err);
    }
};

module.exports = signUp;

