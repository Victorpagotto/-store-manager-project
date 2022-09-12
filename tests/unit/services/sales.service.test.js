const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;

const salesModels = require('../../../src/models/sales.models');
const salesServices = require('../../../src/services/sales.services');

const { saleExempleMock, buggedSaleExempleMock } = require('./servicesMock/salesMock');

describe('Testa os services de sales.', function () {
  it('Testa o insertSale.', async function () {
    sinon.stub(salesModels, 'insertSale').resolves({ insertId: 666 });
    const result = await salesServices.insertSale();
    expect(result).to.be.deep.equal({ status: 'OK_CREATED', result: { insertId: 666 } });
    sinon.restore();
  });

  it('Testa o funcionamento da insertSaleProduct', async function () {
    sinon.stub(salesModels, 'insertSale').resolves({ insertId: 666 });
    sinon.stub(salesModels, 'insertSaleProduct').resolves([{ insertId: 600 }, { insertId: 666 }]);
    const result = await salesServices.insertSaleProduct(saleExempleMock);
    expect(result).to.be.deep.equal({ status: 'OK_CREATED', result: { id: 666, itemsSold: saleExempleMock } });
    sinon.restore();
  });

  it('Testa o funcionamento de insertSaleProduct no caso de quantity negativa.', async function () {
    sinon.stub(salesModels, 'insertSale').resolves({ insertId: 666 });
    sinon.stub(salesModels, 'insertSaleProduct').resolves([{ insertId: 600 }, { insertId: 666 }]);
    const result = await salesServices.insertSaleProduct(buggedSaleExempleMock);
    expect(result).to.be.deep.equal({
      status: 'BAD_FORMAT',
      result: { message: '"quantity" must be greater than or equal to 1' }
    });
    sinon.restore();
  });
});