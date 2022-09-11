const express = require('express');

const productsRouter = express.Router();
const productsControllers = require('../controllers/products.controllers');

productsRouter.get('/', productsControllers.getAll);
productsRouter.get('/:id', productsControllers.getById);

module.exports = productsRouter;