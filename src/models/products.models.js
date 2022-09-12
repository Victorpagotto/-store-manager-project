const camelize = require('camelize');
const db = require('../db/connection');
const { insertWrapper } = require('../utilities/handlers');

async function getAll() {
  const [info] = await db.execute('SELECT * FROM StoreManager.products');
  return camelize(info);
}

async function getById(id) {
  const [[info]] = await db.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  return camelize(info);
}

async function insert(product) {
  const { keys, placeHolder, values } = insertWrapper(product);
  const [info] = await db
    .execute(`INSERT INTO StoreManager.products (${keys}) values(${placeHolder})`, values);
  return camelize(info);
}

async function update(id, product) {
  const wrapping = Object.entries(product);
  const keys = wrapping.map((key) => `${key[0]}`);
  const values = wrapping.map((value) => value[1]);
  const statement = keys.map((key) => `${key} = ?`).join(', ');
  const [info] = await db
    .execute(`UPDATE StoreManager.products SET ${statement} WHERE id = ?`, [...values, id]);
  return camelize(info);
}

async function deleter(id) {
  const [info] = await db.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return camelize(info);
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleter,
};