const {Products} = require('../db');
const { Op } = require("sequelize");

const getProductByModel = async (req, res) => {
    try {
        const {model} = req.query;
        const productModel = await Products.findAll({
            where: {
                model: {
                  [Op.iLike]: `%${model}%`,
                },
              },
        });
        res.status(200).json(productModel);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = getProductByModel;