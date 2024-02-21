const {User} = require('../db.js');

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = await User.findByPk(id);
        if (!userId) {
            return res.status(404).json({message: 'No se encontró el usuario.'});
        }
        await userId.destroy();
        res.status(200).json({message: 'Usuario eliminado.'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
module.exports = deleteUser;