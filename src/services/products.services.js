const productsModels = require('../models/products.models');
const { sortObject } = require('../utilities/handlers');

const getAll = async () => {
  const info = await productsModels.getAll();
  return { status: 'OK_FOUND', result: sortObject(info, 'id') };
};

const getById = async (id) => {
  const info = await productsModels.getById(id);
  if (info) return { status: 'OK_FOUND', result: info };
  return { status: 'NOT_FOUND', result: { message: 'Product not found' } };
};

module.exports = {
  getAll,
  getById,
};