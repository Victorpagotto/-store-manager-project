const productsServices = require('../services/products.services');
const { statusHandler } = require('../utilities/statusHandler');

const getAll = async (req, res) => {
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

module.exports = {
  getAll,
  getById,
  insert,
};