const { Products } = require('../db');

const postProducts = async (req, res) => {
    try {
        // Accede a los datos del cuerpo de la solicitud
        const productData = req.body;

        // Crea un nuevo producto en la base de datos utilizando Sequelize
        const newProduct = await Products.create(productData);

        // Si tienes éxito, envía una respuesta
        res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el producto' });
    }
};

module.exports = postProducts;