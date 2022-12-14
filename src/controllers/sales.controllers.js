const salesServices = require('../services/sales.services');
const { statusHandler } = require('../utilities/statusHandler');
const { validateSale } = require('../middlewares/validations');

const insertSaleProduct = async (req, res) => {
  const products = req.body;
  const validation = await validateSale(products);
  if (!validation.message) {
    const info = await salesServices.insertSaleProduct(products);
    const { status, result } = info;
    return res.status(statusHandler(status)).json(result);
  }
  return res.status(statusHandler(validation.status)).json({ message: validation.message });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const info = await salesServices.getById(id);
  const { status, result } = info;
  res.status(statusHandler(status)).json(result);
};

const getAll = async (_req, res) => {
  const info = await salesServices.getAll();
  const { status, result } = info;
  res.status(statusHandler(status)).json(result);
};

const deleter = async (req, res) => {
  const { id } = req.params;
  const info = await salesServices.deleter(id);
  const { status, result } = info;
  return res.status(statusHandler(status)).json(result);
};

const update = async (req, res) => {
  const products = req.body;
  const validation = await validateSale(products);
  if (!validation.message) {
    const { id } = req.params;
    const sales = req.body;
    const info = await salesServices.update(id, sales);
    const { status, result } = info;
    return res.status(statusHandler(status)).json(result);
  }
  return res.status(statusHandler(validation.status)).json({ message: validation.message });
};

module.exports = {
  insertSaleProduct,
  getById,
  getAll,
  deleter,
  update,
};