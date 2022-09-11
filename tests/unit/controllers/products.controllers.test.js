const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productsServices = require('../../../src/services/products.services');
const productsControllers = require('../../../src/controllers/products.controllers');
const { foundAProduct, foundAllProducts } = require('./controllersMocks/productsMocks');
const { productNotFound } = require('./controllersMocks/messages');

describe('Testando controllers de products.', function () {
  it('Testa retorno de lista de /products', async function () {
    sinon.stub(productsServices, 'getAll').resolves(foundAllProducts);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.getAll(req, res);
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith(foundAllProducts.result)).equal(true);
    sinon.restore();
  });

  it('Testa o retorna caso encontre um produto pelo id em /products/:id', async function() {
    sinon.stub(productsServices, 'getById').resolves(foundAProduct);
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.getById(req, res)
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith(foundAProduct.result)).equal(true);
    sinon.restore();
  });

  it('Testa o retorno caso nenhum produto seja encontrado em /products/:id', async function () {
    sinon.stub(productsServices, 'getById').resolves({ status: 'NOT_FOUND', result: { message: productNotFound.message } });
    const req = { params: { id: 999 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.getById(req, res);
    expect(res.status.calledWith(404)).equal(true);
    expect(res.json.calledWith({ message: productNotFound.message })).equal(true);
  });
});