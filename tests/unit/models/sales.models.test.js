const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;

const saleModels = require('../../../src/models/sales.models');
const db = require('../../../src/db/connection');

describe('Testa os models de sale.', function () {
  it('Testa o funcionamento de getSaleById', async function () {
    sinon.stub(db, 'execute').resolves([[{ insertId: 666 }]]);
    const result = await saleModels.getSaleById(666);
    expect(result).to.be.deep.equal({ insertId: 666 });
    sinon.restore();
  });

  it('Testa o funcionamento da função insertSale.', async function () {
    sinon.stub(db, 'execute').resolves([{ insertId: 666 }]);
    const result = await saleModels.insertSale();
    expect(result).to.be.deep.equal({ insertId: 666 });
    sinon.restore();
  });

  it('', async function () {
    sinon.stub(db, 'execute').resolves([{ insertId: 666 }]);
    const result = await saleModels.insertSaleProduct({ productId: 666, quantity: 666 });
    expect(result).to.be.deep.equal({ insertId: 666 });
    sinon.restore();
  });
});