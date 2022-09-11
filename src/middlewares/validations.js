const productsModels = require('../models/products.models');

const validateSale = async (products) => {
  if (!products.every((product) => product.quantity && product.productId)) {
    return { status: 'BAD_REQUEST', result: false };
  }
  if (!Promise.all(products.every(async (product) => {
    const isProduct = await productsModels.getById(product.productId);
    return isProduct;
  }))) {
    return { status: 'NOT_FOUND', result: false };
  }
  return { status: 'OK_FOUND', result: true };
};

module.exports = {
  validateSale,
};
