const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;

const saleModels = require('../../../src/models/sales.models');
const db = require('../../../src/db/connection');

const { getByIdResponse, getAllResponse } = require('./modelsMock/salesMock');
const snakeize = require('snakeize');

describe('Testa os models de sale.', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Testa o funcionamento de getSaleById', async function () {
    sinon.stub(db, 'execute').resolves([[{ insertId: 666 }]]);
    const result = await saleModels.getSaleById(666);
    expect(result).to.be.deep.equal({ insertId: 666 });
  });

  it('Testa o funcionamento da função insertSale.', async function () {
    sinon.stub(db, 'execute').resolves([{ insertId: 666 }]);
    const result = await saleModels.insertSale();
    expect(result).to.be.deep.equal({ insertId: 666 });
  });

  it('Testa o funcionamento da função insertSaleProduct.', async function () {
    sinon.stub(db, 'execute').resolves([{ insertId: 666 }]);
    const result = await saleModels.insertSaleProduct({ productId: 666, quantity: 666 });
    expect(result).to.be.deep.equal({ insertId: 666 });
  });

  it('Testa o funcionamento da função getById', async function () {
    sinon.stub(db, 'execute').resolves([snakeize(getByIdResponse)]);
    const result = await saleModels.getById(1);
    expect(result).to.be.deep.equal(getByIdResponse);
  });

  it('Testa o funcionamento da função getAll', async function () {
    sinon.stub(db, 'execute').resolves([snakeize(getAllResponse)]);
    const result = await saleModels.getAll();
    expect(result).to.be.deep.equal(getAllResponse);
  });

  it('Testa função de deletar sales.', async function () {
    sinon.stub(db, 'execute').resolves([{ insertId: 666 }]);
    const result = await saleModels.deleter(666);
    expect(result).to.be.deep.equal({ insertId: 666 });
  });
});