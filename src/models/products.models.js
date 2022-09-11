const camelize = require('camelize');
const db = require('../db/connection');

async function getAll() {
  const [info] = await db.execute('SELECT * FROM StoreManager.products');
  return camelize(info);
}

module.exports = {
  getAll,
};