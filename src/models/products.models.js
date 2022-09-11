const camelize = require('camelize');
const db = require('../db/connection');

async function getAll() {
  const [info] = await db.execute('SELECT * FROM StoreManager.products');
  return camelize(info);
}

async function getById(id) {
  const [[info]] = await db.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  return camelize(info);
}

module.exports = {
  getAll,
  getById,
};