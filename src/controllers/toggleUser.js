const { User } = require('../db')
module.exports = async (req, res) => {
    const { id } = req.body
    try{
    if(!id)
        throw new Error('Debe proporcionar un id')
    
    const findedUser = await User.findByPk(id)
    if(!findedUser)
        throw new Error('No se encontro el usuario')
        
    findedUser.isActive = !findedUser.isActive;
    findedUser.save();
    res.status(200).send('Usuario modificado')
    }catch(err){
        return res.status(500).send(err.message)
    }

}