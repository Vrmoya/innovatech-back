const {Products} = require('../db');

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const productId = await Products.findByPk(id);
        res.status(200).json(productId);
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
}
module.exports = getProductById;