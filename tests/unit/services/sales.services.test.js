const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;

const salesModels = require('../../../src/models/sales.models');
const salesServices = require('../../../src/services/sales.services');

const {
  saleExempleMock,
  buggedSaleExempleMock,
  getByIdResponse,
  getAllResponse,
} = require('./servicesMock/salesMock');

describe('Testa os services de sales.', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa o insertSale.', async function () {
    sinon.stub(salesModels, 'insertSale').resolves({ insertId: 666 });
    const result = await salesServices.insertSale();
    expect(result).to.be.deep.equal({ status: 'OK_CREATED', result: { insertId: 666 } });
  });

  it('Testa o funcionamento da insertSaleProduct', async function () {
    sinon.stub(salesModels, 'insertSale').resolves({ insertId: 666 });
    sinon.stub(salesModels, 'insertSaleProduct').resolves([{ insertId: 600 }, { insertId: 666 }]);
    const result = await salesServices.insertSaleProduct(saleExempleMock);
    expect(result).to.be.deep.equal({ status: 'OK_CREATED', result: { id: 666, itemsSold: saleExempleMock } });
  });

  it('Testa o funcionamento de insertSaleProduct no caso de quantity negativa.', async function () {
    sinon.stub(salesModels, 'insertSale').resolves({ insertId: 666 });
    sinon.stub(salesModels, 'insertSaleProduct').resolves([{ insertId: 600 }, { insertId: 666 }]);
    const result = await salesServices.insertSaleProduct(buggedSaleExempleMock);
    expect(result).to.be.deep.equal({
      status: 'BAD_FORMAT',
      result: { message: '"quantity" must be greater than or equal to 1' }
    });
  });

  it('Testa o funcionamento da função getById.', async function () {
    sinon.stub(salesModels, 'getById').resolves(getByIdResponse);
    const result = await salesServices.getById(1);
    expect(result).to.be.deep.equal({ status: 'OK_FOUND', result: getByIdResponse });
  });

  it('Testa o funcionamento da função getById para caso o produto não exista.', async function () {
    sinon.stub(salesModels, 'getById').resolves([]);
    const result = await salesServices.getById(666);
    expect(result).to.be.deep.equal({ status: 'NOT_FOUND', result: { message: 'Sale not found' } });
  });

  it('Testa o funcionamento da função getAll.', async function () {
    sinon.stub(salesModels, 'getAll').resolves(getAllResponse);
    const result = await salesServices.getAll();
    expect(result).to.be.deep.equal({ status: 'OK_FOUND', result: getAllResponse });
  });

  it('Testa a função de deletar um sale.', async function () {
    sinon.stub(salesModels, 'deleter').resolves(true);
    sinon.stub(salesModels, 'getSaleById').resolves(true);
    const result = await salesServices.deleter(666);
    expect(result).to.be.deep.equal({ status: 'OK_DELETED' });
  });

  it('Testa o retorno de delete caso a sale não exista.', async function () {
    sinon.stub(salesModels, 'deleter').resolves(true);
    sinon.stub(salesModels, 'getSaleById').resolves(false);
    const result = await salesServices.deleter(666);
    expect(result).to.be.deep.equal({ status: 'NOT_FOUND', result: { message: 'Sale not found' } });
  });

  it('Testa se não é possível atualizar uma sale que não existe.', async function () {
    sinon.stub(salesModels, 'getSaleById').resolves(undefined);
    sinon.stub(salesModels, 'update').resolves();
    const result = await salesServices.update(666, saleExempleMock);
    expect(result).to.be.deep.equal({ status: 'NOT_FOUND', result: { message: 'Sale not found' } });
  });

  it('Testa o funcionamento padrão de update de uma sale.', async function () {
    sinon.stub(salesModels, 'getSaleById').resolves(true);
    sinon.stub(salesModels, 'update').resolves({ insertId: 666 });
    const result = await salesServices.update(666, saleExempleMock);
    expect(result).to.be.deep.equal({ status: 'OK_FOUND', result: { saleId: 666, itemsUpdated: [...saleExempleMock] } });
  });

    it('Testa se não é possível atualizar uma quantity menor que ou igual a 0.', async function () {
    sinon.stub(salesModels, 'getSaleById').resolves(true);
    sinon.stub(salesModels, 'update').resolves({ insertId: 666 });
    const result = await salesServices.update(666, buggedSaleExempleMock);
    expect(result).to.be.deep.equal({ status: 'BAD_FORMAT', result: { message: '"quantity" must be greater than or equal to 1' }, });
  });
});