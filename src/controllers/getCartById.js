const { Op } = require('sequelize');
const { Cart, CartItem } = require('../db')

const getCartById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Cart.findAll({ where: { userId:id, payment_status: 'approved' }, include: [{ model: CartItem, as: 'cartItems' }] });
        // const response = await Cart.findAll({
        //     where: {
        //         userId: {
        //             [Op.iLike]: `%${id}%`,
        //         },
        //     },
        // });

        // const data = response.forEach(async element => {
        //     const idElement = element.id
        //     element.Items = await CartItem.findAll({
        //         where: {
        //             cartId: {
        //                 [Op.iLike]: `%${idElement}%`,
        //             },
        //         },
        //     })
        // });
        // res.status(200).json(data);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ message: 'Error al obtener los datos' });
    }

};
module.exports = getCartById;