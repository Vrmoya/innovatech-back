require('dotenv').config();
console.log(process.env.EMAIL_INNOVATECH, process.env.PASSWORD_INNOVATECH)
const {EMAIL_INNOVATECH, PASSWORD_INNOVATECH} = process.env;
const nodemailer = require('nodemailer');

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Aquí puedes usar otros servicios como SMTP si lo prefieres
  auth: {
      
      user: 'innovatechhenry@gmail.com',
      
      pass: 'Argentina1234',
    },
});
module.exports = transporter;