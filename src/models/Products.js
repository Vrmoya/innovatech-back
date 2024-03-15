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
    isActive:{ //Para borrado logico
      type:DataTypes.BOOLEAN,
      defaultValue:true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true ,
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
    useType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    videoCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operatingSystem: {
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
    batteryLife: {
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    internalMemory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    camera: {
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
    extraFunctions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    waterproof: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    touchControl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    microphone: {
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
    keycapDesign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mediaKeys: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wirelessRange: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Products;
};