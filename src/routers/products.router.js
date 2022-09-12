const express = require('express');

const productsRouter = express.Router();
const productsControllers = require('../controllers/products.controllers');

productsRouter.get('/search', productsControllers.getByName);
productsRouter.get('/:id', productsControllers.getById);
productsRouter.put('/:id', productsControllers.update);
productsRouter.delete('/:id', productsControllers.deleter);
productsRouter.get('/', productsControllers.getAll);
productsRouter.post('/', productsControllers.insert);

module.exports = productsRouter;