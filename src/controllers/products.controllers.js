const productsServices = require('../services/products.services');
const { statusHandler } = require('../utilities/statusHandler');

const getAll = async (_req, res) => {
    const info = await productsServices.getAll();
    const { status, result } = info;
    res.status(statusHandler(status)).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const info = await productsServices.getById(id);
    const { status, result } = info;
    res.status(statusHandler(status)).json(result);
};

const insert = async (req, res) => {
  if (req.body.name) {
      const { name } = req.body;
      const product = { name };
      const info = await productsServices.insert(product);
      const { status, result } = info;
      return res.status(statusHandler(status)).json(result);
  }
  return res.status(statusHandler('BAD_REQUEST')).json({ message: '"name" is required' });
};

const update = async (req, res) => {
  const { id } = req.params;
  if (req.body.name) {
    const { name } = req.body;
    const product = { name };
    const info = await productsServices.update(id, product);
    const { status, result } = info;
    return res.status(statusHandler(status)).json(result);
  }
  return res.status(statusHandler('BAD_REQUEST')).json({ message: '"name" is required' });
};

const deleter = async (req, res) => {
  const { id } = req.params;
  const info = await productsServices.deleter(id);
  const { status, result } = info;
  return res.status(statusHandler(status)).json(result);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleter,
};