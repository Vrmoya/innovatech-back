const fs = require('fs');
const path = require('path');
const { Products } = require("../db"); // Asegúrate de ajustar la ruta al modelo de Products

const loadProducts = async () => {
    // Leer el archivo JSON
    const data = fs.readFileSync(path.join(__dirname, '..', 'assets', 'utils', 'tech.json'), 'utf8');
  
    // Convertir los datos a un objeto JavaScript
    const products = JSON.parse(data);
  
    try {
      // Insertar los productos en la base de datos
      await Products.bulkCreate(products);
      console.log('Productos cargados exitosamente');
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

module.exports = loadProducts;