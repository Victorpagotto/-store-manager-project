const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;
const { productsMock, productsDbMock } = require('./modelsMock/productsMock');

const productsModels = require('../../../src/models/products.models');
const db = require('../../../src/db/connection');

describe('Testa os models de produtos.', function() {
  it('Testa conseguir todos os produtos.', async function () {
    sinon.stub(db, 'execute').resolves(productsDbMock);
    const result = await productsModels.getAll();
    console.log(result);
    expect(result).to.be.deep.equal(productsMock);
  });
});