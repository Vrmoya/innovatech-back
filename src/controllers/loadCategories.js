const { Categories } = require("../db")

const categories = [{ name: 'tablet' }, { name: 'laptop' }, { name: 'smartphone' }, { name: 'headphone' }, { name: 'keyboard' },]

const loadCategories = async () => {
    try {
        for (let category of categories) {
            // Busca la categoría en la base de datos
            let existingCategory = await Categories.findOne({ where: { name: category.name } });

            // Si la categoría no existe, la crea
            if (!existingCategory) {
                await Categories.create(category);
            }
        }
        console.log('Categorias cargadas exitosamente');
    } catch (error) {
        console.error('Error al cargar los categorias:', error);
    }
}

module.exports = loadCategories;