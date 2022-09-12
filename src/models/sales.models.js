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

const getById = async (id) => {
  const [info] = await db.execute(`
  SELECT ss.date, ssp.product_id, ssp.quantity 
  FROM StoreManager.sales AS ss
  JOIN StoreManager.sales_products AS ssp
  ON ss.id = ssp.sale_id WHERE ss.id = ?;`, [id]);
  return camelize(info);
};

const getAll = async () => {
  const [info] = await db
    .execute(`SELECT * FROM StoreManager.sales_products AS ssp
    JOIN StoreManager.sales AS ss ON ss.id = ssp.sale_id`);
  return camelize(info);
};

module.exports = {
  insertSale,
  insertSaleProduct,
  getSaleById,
  getAll,
  getById,
};