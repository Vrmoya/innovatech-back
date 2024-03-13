const { Op } = require('sequelize');
const { Cart, CartItem } = require('../db')

const getCart = async (req, res) => {
    try {
        const response = await Cart.findAll();
        const data = response.forEach(async element => {
            const idElement = element.id
            element.Items = await CartItem.findAll({
                where: {
                    cartId: {
                        [Op.iLike]: `%${idElement}%`,
                    },
                },
            })
        });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ message: 'Error al obtener los datos' });
    }

};
module.exports = getCart;