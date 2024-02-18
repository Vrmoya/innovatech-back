const { Products, Categories } = require('../db');
const { Op } = require("sequelize");

const postProducts = async (req, res) => {
    try {
        // Accede a los datos del cuerpo de la solicitud
        const productData = req.body;

        // Comprueba si se proporcionó un precio y categorías
        if (!productData.price) {
            return res.status(400).json({ mensaje: 'El precio es requerido' });
        }
        if (!productData.categories || !Array.isArray(productData.categories)) {
            return res.status(400).json({ mensaje: 'Las categorías son requeridas y deben ser un array' });
        }

        // Extrae los nombres de las categorías
        const categoryNames = productData.categories.map(category => category.name);

        // Crea un nuevo producto en la base de datos utilizando Sequelize
        const newProduct = await Products.create(productData);

        const categoryInstances = await Categories.findAll({
            where: { name: { [Op.in]: categoryNames } },
        });
        await newProduct.addCategories(categoryInstances);

        // Si tienes éxito, envía una respuesta
        res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el producto' });
    }
};

module.exports = postProducts;