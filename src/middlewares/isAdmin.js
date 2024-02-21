const jwt = require('jsonwebtoken');
const { User } = require('../db.js');
const authConfig = require('../config/auth.js');

const isAdmin = async (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({ auth: false, message: 'No se proporcionó token.' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Falló la autenticación del token.' });
        }

        User.findByPk(decoded.user.id) // Aquí está el cambio
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'No se encontró el usuario.' });
                }

                if (!user.isAdmin) {
                    return res.status(403).json({ message: 'Requiere privilegios de administrador.' });
                }

                next();
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }); 
}
module.exports = isAdmin;