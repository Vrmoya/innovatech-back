const { Rating } = require('../db')

module.exports = async (req, res) => {
    const { productId, rating, commentary } = req.body

    try {

        const result = await Rating.create({
            rating, commentary, ProductId: productId
        })
        result
        return res.status(200).json({ productId, rating, commentary })
    } catch (err) {
        return res.status(500).send(err.message)
    }

}