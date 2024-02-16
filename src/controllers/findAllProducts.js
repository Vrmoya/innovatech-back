// const axios = require("axios");
const { Products } = require("../db");
// const { PATH_ROUTES_PRODUCTS } = require("../assets/utils/constants");

const findAllProducts = async (req, res) => {
try {
  const findAllProductsDB = await Products.findAll();
  res.status(200).json(findAllProductsDB);
} catch (error) {
  res.status(500).json({ error: error.message });
}
}

module.exports = findAllProducts;
