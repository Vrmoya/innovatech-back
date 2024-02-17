// const axios = require("axios");
const { Products, Categories } = require("../db");
const paginate = require("../helpers/paginate");
// const { PATH_ROUTES_PRODUCTS } = require("../assets/utils/constants");

const findAllProducts = async (req, res) => {
  const { category, order, page, items } = req.query
  try {
    let findedProducts = [];

    //Caso: Todos los productos
    let findAllProductsDB = [];
    if (!category || !order) {
      findAllProductsDB = await Products.findAll({
        order: order ? [['model', order.toUpperCase()]] : [],
        include: [{
          model: Categories,
          as: 'categories',
          through: { attributes: [] }, // This removes the association from being returned
          attributes: ['name']
        }]
      });
    } else {

      //Caso: Hay category y order
      findAllProductsDB = await Products.findAll({
        order: [
          ['model', order.toUpperCase()]
        ],
        include: [{
          model: Categories,
          as: 'categories',
          through: { attributes: [] }, // This removes the association from being returned
          where: {
            name: category
          },
          attributes: ['name']
        }]
      });
    }
    // console.log(findAllProductsDB);
    if (page && items)
      findedProducts = paginate(findAllProductsDB, items, page)
    else
      findedProducts = {data:findAllProductsDB}
    res.status(200).json(findedProducts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = findAllProducts;
