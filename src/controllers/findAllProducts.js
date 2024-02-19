// const axios = require("axios");
const { Products, Categories } = require("../db");
const paginate = require("../helpers/paginate");
// const { PATH_ROUTES_PRODUCTS } = require("../assets/utils/constants");

const findAllProducts = async (req, res) => {
  const { category, order, page, items } = req.query
  try {
    let findedProducts = [];

    //Caso: Todos los productos
    const findAllProductsDbQuery = {
      order: order ? [['price', order.toUpperCase()]] : [],
      include: [{
        model: Categories,
        as: 'categories',
        through: { attributes: [] }, // This removes the association from being returned
        attributes: ['name']
      }]
    };

    if(category){
      findAllProductsDbQuery.include[0].where={name:category}
    }

    findAllProductsDB = await Products.findAll(findAllProductsDbQuery);

    // console.log(findAllProductsDB);
    if (page && items)
      findedProducts = paginate(findAllProductsDB, items, page)
    else
      findedProducts = { data: findAllProductsDB }
    res.status(200).json(findedProducts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = findAllProducts;
