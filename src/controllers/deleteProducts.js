const {Products} = require('../db');

const deleteProducts = async (req, res) => {
    try {
        const {id} = req.params;
        const productId = await Products.findByPk(id);
        if (!productId) {
            return res.status(404).json({message: 'No se encontró el producto.'});
        }
        await productId.destroy();
        res.status(200).json({message: 'Producto eliminado.'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = deleteProducts;