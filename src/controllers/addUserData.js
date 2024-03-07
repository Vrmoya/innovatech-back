const { Register } = require('../db')

module.exports = async (req, res) => {
    const { name,
        lastname,
        nationality,
        birthdate,
        address,
        phone,
        userId } = req.body

    try {


        const result = await Register.findOrCreate({
            where: { userId },
            defaults: {
                name,
                lastname,
                nationality,
                birthdate,
                address,
                phone,
                userId,
            }
        })


        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).send(err.message)
    }

}