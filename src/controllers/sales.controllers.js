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

module.exports = {
  insertSaleProduct,
};