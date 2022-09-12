const productsServices = require('../services/products.services');

const validateSale = async (products) => {
  if (!products.every((product) => product.productId)) {
    return { status: 'BAD_REQUEST', message: '"productId" is required' };
  }
  if (products.some((product) => !product.quantity && product.quantity !== 0)) {
    return { status: 'BAD_REQUEST', message: '"quantity" is required' };
  }
  const arrayValidation = await Promise.all(products
    .map(async (product) => {
      const result = await productsServices.getById(product.productId).then((res) => res.result);
      return !result.message;
    }));
  if (!arrayValidation.every((position) => position)) {
    return { status: 'NOT_FOUND', message: 'Product not found' };
  }
  return { status: 'OK_FOUND' };
};

module.exports = {
  validateSale,
};
