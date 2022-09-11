const salesModels = require('../models/sales.models');

const insertSale = async (sale) => {
  const info = await salesModels.insertSale(sale);
  return { status: 'OK_CREATED', result: info };
};

const insertSaleProduct = async (saleProducts, sale) => {
  if (saleProducts.every((saleItem) => saleItem.quantity > 0)) {
    const info = await Promise.all(saleProducts.map(async (saleItem) => {
      const result = await salesModels.insertSaleProduct(saleItem);
      return result;
    }));
    const saleInsert = (await insertSale(sale)).result;
    const result = {
      id: saleInsert.insertId,
      itemsSold: info,
    };
    return { status: 'OK_CREATED', result };
  }
  return {
    status: 'BAD_FORMAT',
    result: {
      message: '"quantity" must be greater than or equal to 1',
    },
  };
};

module.exports = {
  insertSale,
  insertSaleProduct,
};