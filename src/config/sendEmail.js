require('dotenv').config();
console.log(process.env.EMAIL_INNOVATECH, process.env.PASSWORD_INNOVATECH)
const {EMAIL_INNOVATECH, PASSWORD_INNOVATECH} = process.env;
const nodemailer = require('nodemailer');

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587, // Aquí puedes usar otros servicios como SMTP si lo prefieres
    secure: false,
    auth: {
      
      user: EMAIL_INNOVATECH,
      
      pass: PASSWORD_INNOVATECH,
    },
});
module.exports = transporter;