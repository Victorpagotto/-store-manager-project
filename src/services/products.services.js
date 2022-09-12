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

const insert = async (product) => {
  if (product.name.length > 4) {
    const info = await productsModels.insert(product);
    const result = await productsModels.getById(info.insertId);
    return { status: 'OK_CREATED', result };
  }
  return {
    status: 'BAD_FORMAT',
    result: { message: '"name" length must be at least 5 characters long' },
  };
};

const update = async (id, product) => {
  const isProduct = await productsModels.getById(id);
  if (!isProduct) return { status: 'NOT_FOUND', result: { message: 'Product not found' } };
  if (product.name.length > 4) {
    const info = await productsModels.update(id, product);
    return { status: 'OK_FOUND', result: { id: info.insertId, ...product } };
  }
  return {
    status: 'BAD_FORMAT',
    result: { message: '"name" length must be at least 5 characters long' },
  };
};

const deleter = async (id) => {
  const isProduct = await productsModels.getById(id);
  if (!isProduct) return { status: 'NOT_FOUND', result: { message: 'Product not found' } };
  await productsModels.deleter(id);
  return { status: 'OK_DELETED' };
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleter,
};