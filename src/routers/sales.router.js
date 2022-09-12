const express = require('express');

const salesRouter = express.Router();
const salesControllers = require('../controllers/sales.controllers');

salesRouter.get('/', salesControllers.getAll);
salesRouter.get('/:id', salesControllers.getById);
salesRouter.post('/', salesControllers.insertSaleProduct);

module.exports = salesRouter;