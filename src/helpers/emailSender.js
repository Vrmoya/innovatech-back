const transporter = require("../config/sendEmail");
const { User } = require('../db')
const { ACCESS_TOKEN, EMAIL_INNOVATECH } = process.env;

module.exports = async (email, html) => {
    const emailUser = await User.findOne({ where: { email } });
    // Verificar si se encontró el usuario y obtener su dirección de correo electrónico
    if (emailUser) {
        const userEmailAddress = emailUser.email;
        // Envío de correo electrónico
        const mailOptions = {
            from: EMAIL_INNOVATECH,
            to: userEmailAddress,
            subject: "Estado del pago en MercadoPago",
            html,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email enviado: " + info.response);
            }
        });
    }
}