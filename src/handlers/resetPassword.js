const {User} = require('../db.js')
const {Op} = require('sequelize')
const authConfig = require("../config/auth.js");
const bcrypt = require('bcrypt');


const resetPassword = async (req, res) => {
    const { token } = req.params;
    console.log("Token recibido:", token);
    const { password } = req.body;
    const user = await User.findOne({ where: { resetPasswordToken: token, resetPasswordExpires: { [Op.gte]: Date.now() } } });
    // const user = await User.findOne({ where: { resetPasswordToken: token } });
    if (!user) {
      return res.status(400).json({ message: "El token de restablecimiento de contraseña no es válido o ha expirado" });
    }
    // Actualiza la contraseña del usuario y elimina el token de restablecimiento
    user.password = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    
    res.status(200).json({ message: "Contraseña restablecida exitosamente" });
  };

  module.exports = resetPassword;