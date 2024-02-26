// const { Cart } = require("../db.js");

// const postCart = async (req, res) => {
//     try {
//         const cartData = req.body;

//         // Crea el carrito
//         let cart = await Cart.create(cartData);

//         // Al haber una relación hasMany entre Cart y CartItem, agregamos los items a continuación
//         cart.setCartItems(cartData.cartItems); // Agregamos los items según sea necesario
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ mensaje: 'Error al crear el carrito' });
//     }

// };

// module.exports = postCart;

const { Cart, CartItem } = require("../db.js");

const postCart = async (req, res) => {
    try {
        const cartData = req.body;
        // const user = req.user.id

        // Crea el carrito
        let cart = await Cart.create(cartData);

        // Asociamos los items al carrito utilizando el método create
        for (const cartItemData of cartData.cartItems) {
            await CartItem.create({
                ...cartItemData,
                cartId: cart.id,  // Asociamos el item al carrito recién creado
            });
        }

        res.status(201).json({ mensaje: 'Carrito creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el carrito' });
    }
};

module.exports = postCart;