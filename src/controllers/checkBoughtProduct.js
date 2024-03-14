const { User, Cart, CartItem } = require('../db')
module.exports = async (req, res) => {
    const { userId, productId } = req.query
    const response = {
        canReview: null,
        alreadyReviewed: false
    }

    try {

        const findedCart = await Cart.findAll({ where: { userId, payment_status: 'approved' }, attributes: [], include: [{ model: CartItem, as: 'cartItems' }] });
        const uniqueProductsId = new Set();
        findedCart.forEach(cartItems => {
            cartItems.cartItems.forEach(cartItem => {
                uniqueProductsId.add(cartItem.productId)
            })
        })

        //Array de los id de producto que fueron comprados y con payment_status:approved
        const uniqueProductsIdArray = [...uniqueProductsId]

        //Verifico que el producto recibido por req se encuentre en la compra ya pagada.
        if (uniqueProductsIdArray.includes(productId) === false) {
            response.canReview = false
            return res.status(200).json(response)
        }else{
            response.canReview = true;
        }
        //Obtengo el array de los id de productos ya con review por el usuario
        const user = await User.findByPk(userId);
        if (!user.productsReviewed)
            response.canReview = true;
        else if (user.productsReviewed.includes(productId)){
            response.canReview = false;
            response.alreadyReviewed = true;
        }

        return res.status(200).json(response)
        // return res.status(200).json({ findedCart, uniqueProductsIdArray })


    } catch (err) {
        return res.status(500).send(err.message)
    }

}