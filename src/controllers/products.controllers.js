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

module.exports = {
  getAll,
  getById,
};