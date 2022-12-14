const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productsServices = require('../../../src/services/products.services');
const productsControllers = require('../../../src/controllers/products.controllers');
const {
  foundAProduct,
  foundAllProducts,
  createdProductMock,
  createdSuccess,
  updatedSuccess,
  productList
} = require('./controllersMocks/productsMocks');
const { productNotFound } = require('./controllersMocks/messages');

describe('Testando controllers de products.', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Testa retorno de lista de /products', async function () {
    sinon.stub(productsServices, 'getAll').resolves(foundAllProducts);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.getAll(req, res);
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith(foundAllProducts.result)).equal(true);
  });

  it('Testa o retorna caso encontre um produto pelo id em /products/:id', async function() {
    sinon.stub(productsServices, 'getById').resolves(foundAProduct);
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.getById(req, res);
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith(foundAProduct.result)).equal(true);
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

  it('Testa se ?? poss??vel cadastrar um produto com sucesso.', async function () {
    sinon.stub(productsServices, 'insert').resolves(createdSuccess);
    const req = { body: { name: 'Insert here a name' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.insert(req, res);
    expect(res.status.calledWith(201)).equal(true);
    expect(res.json.calledWith(createdSuccess.result)).equal(true);
  });

  it('Testa se falhar ao n??o enviar um nome de produto.', async function () {
    sinon.stub(productsServices, 'insert').resolves();
    const req = { body: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.insert(req, res);
    expect(res.status.calledWith(400)).equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).equal(true);
  });

  it('Testa se ?? poss??vel modificar um produto com sucesso.', async function () {
    sinon.stub(productsServices, 'update').resolves(updatedSuccess);
    const req = { body: { name: 'Cavalo de Tr??ia' }, params: {  id: 666 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.update(req, res);
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith(updatedSuccess.result)).equal(true);
  });

  it('Testa se n??o ?? poss??vel cadastrar um produto sem nome.', async function () {
    sinon.stub(productsServices, 'update').resolves();
    const req = { body: {}, params: { id: 666 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.update(req, res);
    expect(res.status.calledWith(400)).equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).equal(true);
  });

  it('Testa se n??o ?? poss??vel cadastrar um produto sem nome.', async function () {
    sinon.stub(productsServices, 'deleter').resolves({ status: 'OK_DELETED' });
    const req = { body: {}, params: { id: 666 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.deleter(req, res);
    expect(res.status.calledWith(204)).equal(true);
    expect(res.json.calledWith()).equal(true);
  });

  it('Testa a resposta padr??o da fun????o.', async function () {
    sinon.stub(productsServices, 'getByName').resolves({ status: 'OK_FOUND', result: [productList[0]] });
    const req = { query: { q: 'Martelo' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.getByName(req, res);
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith([productList[0]])).equal(true);
  });

    it('Testa se retorna todos os produtos caso n??o haja um nome na query.', async function () {
    sinon.stub(productsServices, 'getByName').resolves();
    sinon.stub(productsServices, 'getAll').resolves({ status: 'OK_FOUND', result: productList });
    const req = { query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsControllers.getByName(req, res);
    expect(res.status.calledWith(200)).equal(true);
    expect(res.json.calledWith(productList)).equal(true);
  });
});