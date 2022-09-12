const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;

const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');
const productsServices = require('../../../src/services/products.services');

const {
  saleResponse,
  productArray,
  noProductIdArray,
  responsesSales,
  noQuantityArray,
  productServicesResponse,
  productServicesReponseFalse,
  saleByIdFoundResponse,
  saleByIdNotFoundResponse,
  saleGetAllResponse,
  } = require('./controllersMocks/salesMocks');

describe('Testa os controllers de sales.', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa o funcionamento do controller insertSaleProduct', async function () {
    sinon.stub(salesServices, 'insertSaleProduct').resolves(saleResponse);
    sinon.stub(productsServices, 'getById').resolves(productServicesResponse);
    const req = { body: productArray };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesControllers.insertSaleProduct(req, res);
    expect(res.status.calledWith(201)).equal(true);
    expect(res.json.calledWith(saleResponse.result)).equal(true);
  });

  it('Testa se não é possível registrar sem productId.', async function () {
    sinon.stub(salesServices, 'insertSaleProduct').resolves(saleResponse);
    sinon.stub(productsServices, 'getById').resolves(productServicesResponse);
    const req = { body: noProductIdArray };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesControllers.insertSaleProduct(req, res);
    expect(res.status.calledWith(400)).equal(true);
    expect(res.json.calledWith({ message: responsesSales.noProductId.message })).equal(true);
  });

  it('Testa se não é possível registrar sem productId.', async function () {
    sinon.stub(salesServices, 'insertSaleProduct').resolves(saleResponse);
    sinon.stub(productsServices, 'getById').resolves(productServicesResponse);
    const req = { body: noQuantityArray };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesControllers.insertSaleProduct(req, res);
    expect(res.status.calledWith(400)).equal(true);
    expect(res.json.calledWith({ message: responsesSales.noQuantity.message })).equal(true);
  });

  it('Testa se não é possível registrar se o produto não existe.', async function () {
    sinon.stub(salesServices, 'insertSaleProduct').resolves(saleResponse);
    sinon.stub(productsServices, 'getById').resolves(productServicesReponseFalse);
    const req = { body: productArray };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesControllers.insertSaleProduct(req, res);
    expect(res.status.calledWith(404)).equal(true);
    expect(res.json.calledWith({ message: responsesSales.noProductFound.message })).equal(true);
  });

  it('Testa o funcionamento da função getById', async function () {
    sinon.stub(salesServices, 'getById').resolves(saleByIdFoundResponse);
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesControllers.getById(req, res);
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith(saleByIdFoundResponse.result)).equal(true);
  });

  it('Testa o funcionamento da função getById', async function () {
    sinon.stub(salesServices, 'getAll').resolves(saleGetAllResponse);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesControllers.getAll(req, res);
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith(saleGetAllResponse.result)).equal(true);
  });

  it('Testa se não é possível cadastrar uma sale sem nome.', async function () {
    sinon.stub(salesServices, 'deleter').resolves({ status: 'OK_DELETED' });
    const req = { body: {}, params: { id: 666 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesControllers.deleter(req, res);
    expect(res.status.calledWith(204)).equal(true);
    expect(res.json.calledWith()).equal(true);
  });
});