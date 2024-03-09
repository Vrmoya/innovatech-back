require('dotenv').config();

const jwt = require("jsonwebtoken");



const generateResetToken = () => {
    return jwt.sign({ action: 'reset_password' }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });
};

module.exports = {generateResetToken};


