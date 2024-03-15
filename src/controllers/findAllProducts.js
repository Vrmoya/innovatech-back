// const axios = require("axios");
const { Products, Categories } = require("../db");
const paginate = require("../helpers/paginate");
const { Op } = require("sequelize");
// const { PATH_ROUTES_PRODUCTS } = require("../assets/utils/constants");

const findAllProducts = async (req, res) => {
  const { category, order, page, items, model, actives } = req.query
  try {
    let findedProducts = [];

    //Caso: Todos los productos
    const findAllProductsDbQuery = {
      where:{},
      include: [{
        model: Categories,
        as: 'categories',
        through: { attributes: [] }, // This removes the association from being returned
        attributes: ['name']
      }]
    };

    if (category) {
      findAllProductsDbQuery.include[0].where = { name: category }
    }
    if (order)
      findAllProductsDbQuery.order = [['price', order.toUpperCase()]]
    if (category)
      findAllProductsDbQuery.include[0].where = { name: category }
    if (model)
      findAllProductsDbQuery.where = { model: { [Op.iLike]: `%${model}%` } }
    console.log('Active is',actives);
    if(actives !=='true')
      findAllProductsDbQuery.where = {...findAllProductsDbQuery.where, isActive:true}
console.log(findAllProductsDbQuery);
    //Pedido a la DB
    findAllProductsDB = await Products.findAll(findAllProductsDbQuery);

    // console.log(findAllProductsDB);
    // if (page && items > 0)npm 
      //Paginado
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
