const { Register } = require('../db')

module.exports = async (req, res) => {
    const { userId } = req.body

    try {
        const result = await Register.findOne({
            where: { userId },
            attributes: ["id",
                "name",
                "lastname",
                "nationality",
                "birthdate",
                "address",
                "phone",]
        })


        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).send(err.message)
    }

}