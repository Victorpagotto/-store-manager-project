const express = require('express');

const salesRouter = express.Router();
const salesControllers = require('../controllers/sales.controllers');

salesRouter.get('/:id', salesControllers.getById);
salesRouter.delete('/:id', salesControllers.deleter);
salesRouter.get('/', salesControllers.getAll);
salesRouter.post('/', salesControllers.insertSaleProduct);

module.exports = salesRouter;