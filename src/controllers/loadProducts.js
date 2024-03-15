const fs = require('fs');
const path = require('path');
const { Products, Categories } = require("../db");
const getProductById = require('./getProductById');

const loadProducts = async () => {
  // Leer el archivo JSON
  const data = fs.readFileSync(path.join(__dirname, '..', 'assets', 'utils', 'tech.json'), 'utf8');

  // Convertir los datos a un objeto JavaScript
  const products = JSON.parse(data);



  try {
    // Insertar los productos en la base de datos
    for (let i = 0; i < products.length; i++) {
      const findedCategory = await Categories.findOrCreate({
        where: { name: products[i].category },
        defaults: {
          name: products[i].category,

        }
      })
      delete products[i].category;
      const [createdProduct,wasCreated] = await Products.findOrCreate({
        where: { model: products[i].model },
        defaults: products[i]
      }

      );
      if(wasCreated);
        const result = await createdProduct.addCategories(findedCategory[0].dataValues.id);
    }
    console.log('Productos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

module.exports = loadProducts;
