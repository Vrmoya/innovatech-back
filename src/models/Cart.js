const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        payment_status:{
            type: DataTypes.STRING(40),
            allowNull: true
        }
    });

    return Cart;
}