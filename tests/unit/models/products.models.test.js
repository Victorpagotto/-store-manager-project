const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;
const { productsMock, productsDbMock, productInsert } = require('./modelsMock/productsMock');

const productsModels = require('../../../src/models/products.models');
const db = require('../../../src/db/connection');

describe('Testa os models de produtos.', function() {
  it('Testa conseguir todos os produtos.', async function () {
    sinon.stub(db, 'execute').resolves(productsDbMock);
    const result = await productsModels.getAll();
    expect(result).to.be.deep.equal(productsMock);
    sinon.restore();
  });

  it('Testa conseguir um produto pelo id.', async function () {
    const productDb = productsDbMock[0][0];
    const product = productsMock[0];
    sinon.stub(db, 'execute').resolves([[productDb]]);
    const result = await productsModels.getById(productDb.id);
    expect(result).to.be.deep.equal(product);
    sinon.restore();
  });

  it('Testa insert de produto pelo model.', async function () {
    sinon.stub(db, 'execute').resolves([{ insertId: 666, ...productInsert }]);
    const result = await productsModels.insert(productInsert);
    expect(result).to.be.deep.equal({ insertId: 666, ...productInsert });
    sinon.restore();
  });
});