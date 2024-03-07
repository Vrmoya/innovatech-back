const {Products} = require('../db')
module.exports = async (req,res) => {
    const {id} = req.query;

    try{
        const instance = await Products.findByPk(id);
        instance.isActive = !instance.isActive;
        const result = await instance.save();
        return res.status(200).send('OK');
    }catch(err){
        return res.status(500).send(err.message);
    }

}