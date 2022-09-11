const salesModels = require('../models/sales.models');

const insertSale = async (sale) => {
  const info = await salesModels.insertSale(sale);
  return { status: 'OK_CREATED', result: info };
};

const insertSaleProduct = async (saleProducts, sale = {}) => {
  if (saleProducts.every((saleItem) => saleItem.quantity > 0)) {
    const saleId = (await insertSale(sale)).result.insertId;
    await Promise.all(saleProducts.map(async (saleItem) => {
      const result = await salesModels.insertSaleProduct({
        saleId,
        productId: saleItem.productId,
        quantity: saleItem.quantity, 
      });
      return result;
    }));
    return { status: 'OK_CREATED', result: { id: saleId, itemsSold: saleProducts } };
  }
  return {
    status: 'BAD_FORMAT',
    result: { message: '"quantity" must be greater than or equal to 1' },
  };
};

module.exports = {
  insertSale,
  insertSaleProduct,
};