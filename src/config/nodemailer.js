const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "grupoinnovatech.soporte@gmail.com",
        pass: "lbit wroj gdpy ingn",
    },
});

transporter.verify()
    .then(() => console.log("Email funcionando con éxito!"))
    .catch((error) => console.error(error));



module.exports =  transporter;
