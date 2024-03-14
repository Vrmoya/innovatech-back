const { User, Rating } = require('../db')

module.exports = async (req, res) => {
    const { userId, productId, rating, commentary } = req.body

    try {

        const result = await Rating.create({
            rating, commentary, ProductId: productId
        })
        const user = await User.findByPk(userId);
        if (user.productsReviewed === null)
            user.productsReviewed = [productId];
        else
            user.productsReviewed = [...user.productsReviewed, productId];
        user.save();
        return res.status(200).json({ productId, rating, commentary })
    } catch (err) {
        return res.status(500).send(err.message)
    }

}