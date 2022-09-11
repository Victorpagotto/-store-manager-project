const express = require('express');

const salesRouter = express.Router();
const salesControllers = require('../controllers/sales.controllers');

salesRouter.get('/', salesControllers.insert);

module.exports = salesRouter;