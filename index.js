const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const loadProducts = require('./src/controllers/loadProducts.js');
const loadCategories = require('./src/controllers/loadCategories.js')


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log("DATABASE CONNECTED")
  server.listen(PORT, () => {
    console.log(PORT + ` PORT SUCCESS`);
    loadCategories();
    loadProducts();// eslint-disable-line no-console
  });
});