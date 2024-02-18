const { Categories } = require("../db")


const categories = [{ name: 'tablet' }, { name: 'laptop' }, { name: 'smartphone' }, { name: 'headphone' }, { name: 'keyboard' },]

const loadCategories = async () => {
    try {
        // Insertar los categorias en la base de datos
        await Categories.bulkCreate(categories);
        console.log('Categorias cargadas exitosamente');
    } catch (error) {
        console.error('Error al cargar los categorias:', error);
    }
}

module.exports = loadCategories;