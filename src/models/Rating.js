const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Rating = sequelize.define('Rating', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0, // valor predeterminado
            validate: {
                min: 0,
                max: 5
            }
        },
        commentary: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Comentario"
        }

    });

    return Rating;
}