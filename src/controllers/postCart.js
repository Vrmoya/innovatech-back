const { Cart } = require("../db.js");

const postCart = async (req, res) => {
    try {
        const cartData = req.body;

        // Crea el carrito
        let cart = await Cart.create(cartData);

        // Al haber una relación hasMany entre Cart y CartItem, agregamos los items a continuación
        cart.setCartItems(cartData.cartItems); // Agregamos los items según sea necesario
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el carrito' });
    }

};

module.exports = postCart;