const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Categories = sequelize.define('Categories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        isActive: { //Para borrado logico
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: "El nombre solo puede contener letras"
                },
            }
        }
    });


    return Categories;
};
