const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = 3001
const loadProducts = require('./src/controllers/loadProducts.js');
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log("DATABASE CONNECTED")
  server.listen(PORT, () => {
    console.log(`PORT SUCCESS`); 
    loadProducts();// eslint-disable-line no-console
  });
});