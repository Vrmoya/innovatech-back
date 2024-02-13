const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Products = sequelize.define('Products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    processor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hardcore: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usetype: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Ram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    videocard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operatingsistem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    batterylife: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    connectivity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warranty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    internalmemory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    camera: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    batterylife: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sound: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    compatibility: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extrafunctions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    waterproof: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    touchcontrol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    microphone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    batterylife: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    compatibility: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extrafunctions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lights: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    design: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keycapdesign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mediakeys: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wirelessrange: {
      type: DataTypes.STRING,
      allowNull: true,
    },


  });

  return Products;
};