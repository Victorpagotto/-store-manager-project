const express = require('express');

const productsRouter = express.Router();

productsRouter.get('/', () => console.log('connected'));

module.exports = productsRouter;