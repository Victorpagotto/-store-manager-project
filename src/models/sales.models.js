const camelize = require('camelize');
const db = require('../db/connection');
const { insertWrapper } = require('../utilities/handlers');

const getSaleById = async (id) => {
  const [[info]] = await db.execute(`SELECT * FROM StoreManager.sales WHERE id = ${id}`);
  return camelize(info);
};

const insertSale = async (sale) => {
  const wrapped = insertWrapper(sale);
  const { keys, placeHolder, values } = wrapped;
  const [info] = await db
    .execute(`INSERT INTO StoreManager.sales (${keys}) values(${placeHolder})`, values);
  return camelize(info);
};

const insertSaleProduct = async (saleProduct) => {
  const { keys, placeHolder, values } = insertWrapper(saleProduct);
  const [info] = await db
    .execute(`INSERT INTO StoreManager.sales_products (${keys}) values(${placeHolder})`, values);
  return camelize(info);
};

module.exports = {
  insertSale,
  insertSaleProduct,
  getSaleById,
};