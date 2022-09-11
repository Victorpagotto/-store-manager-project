const productsModels = require('../models/products.models');
const { sortObject } = require('../utilities/handlers');

const getAll = async () => {
  const info = await productsModels.getAll();
  return sortObject(info, 'id');
};

const getById = async (id) => {
  const info = await productsModels.getById(id);
  if (info) return info;
  return { message: 'Product not found' };
};

module.exports = {
  getAll,
  getById,
};