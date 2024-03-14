require('dotenv').config();
console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_NAME);
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
// console.log(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME )


const UserModel = require("./models/Users");
const ProductsModel = require("./models/Products");







const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


// Aca vendrian el llamado a los modelos
UserModel(sequelize);
ProductsModel(sequelize)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Products, Categories, Cart, CartItem, Rating, Register } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Products.belongsToMany(Categories, { as: 'categories', through: 'Products_Categories' });
Products.hasMany(Rating, { as: 'rating' });
Categories.belongsToMany(Products, { through: 'Products_Categories' });
User.hasOne(Register, { as: 'register', foreignKey: 'userId' })
User.hasMany(Cart, { as: 'carts', foreignKey: 'userId'  });
Cart.belongsTo(User, { as: 'user' });
CartItem.belongsTo(Products, { as: 'products',foreignKey:'productId' });
Products.hasMany(CartItem, { as: 'itemProducts',foreignKey:'productId' });
Cart.hasMany(CartItem, { as: 'cartItems', foreignKey: 'cartId'  });
CartItem.belongsTo(Cart, { as: 'cart', foreignKey: 'cartId' });


module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
