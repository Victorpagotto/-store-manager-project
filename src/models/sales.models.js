const camelize = require('camelize');
const snakeize = require('snakeize');
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

async function deleter(id) {
  await db.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
  const [info] = await db.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return camelize(info);
}

async function update(id, product) {
  const wrapping = Object.entries(snakeize(product));
  const keys = wrapping.map((key) => `${key[0]}`);
  const values = wrapping.map((value) => value[1]);
  const statement = keys.map((key) => `${key} = ?`).join(', ');
  const [info] = await db
    .execute(`
    UPDATE StoreManager.sales_products
    SET ${statement} 
    WHERE sale_id = ? AND product_id = ?`,
      [...values, id, product.productId]);
  return camelize(info);
}

module.exports = {
  insertSale,
  insertSaleProduct,
  getSaleById,
  getAll,
  getById,
  deleter,
  update,
};