const { Rating } = require('../db')

module.exports = async (req, res) => {
    const { productId } = req.query

    try {

        const result = await Rating.findAll({
            where: { ProductId: productId },
            attributes: ['rating','commentary']
        })
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).send(err.message)
    }

}