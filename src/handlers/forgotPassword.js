require("dotenv").config();
const { FRONT_HOST, FRONT_PORT, EMAIL_INNOVATECH } = process.env;
const { User } = require("../db");
const { generateResetToken } = require("../config/generateResetToken");
const transporter = require("../config/sendEmail");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const resetToken = generateResetToken(); // Generar un token único
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000).getTime(); // 1 hora de validez
    await user.save();

    // Envío de correo electrónico
    const mailOptions = {
      from: EMAIL_INNOVATECH,
      to: email,
      subject: "Recuperación de contraseña",
      html: `Haz clic en <a href="http://${FRONT_HOST}:${FRONT_PORT}/reset-password/${resetToken}">este enlace</a> para restablecer tu contraseña.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
        return res
          .status(500)
          .json({ message: "Error al enviar el correo electrónico" });
      } else {
        console.log("Correo electrónico enviado:", info.response);
        res.status(200).json({
          message:
            "Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = forgotPassword;
