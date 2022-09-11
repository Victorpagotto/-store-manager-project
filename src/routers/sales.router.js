const express = require('express');

const salesRouter = express.Router();
const salesControllers = require('../controllers/sales.controllers');

salesRouter.post('/', salesControllers.insertSaleProduct);

module.exports = salesRouter;