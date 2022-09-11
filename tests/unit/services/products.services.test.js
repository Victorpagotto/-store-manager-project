const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;


const { productsMock } = require('./servicesMock/productsMock');
const productsServices = require('../../../src/services/products.services');
const productsModels = require('../../../src/models/products.models');
const { productNotFound } = require('./servicesMock/messages');

describe('Testa serviços de products.', () => {
  it('Testa se produtos são retornados em forma ordenada.', async () => {
    sinon.stub(productsModels, 'getAll').resolves(productsMock);
    const result = await productsServices.getAll();
    expect(result).to.be.deep.equal(productsMock.sort((a, b) => a.id - b.id));
    sinon.restore();
  });

  it('Testa se retorna um produto se buscado por id.', async () => {
    const product = productsMock[0];
    sinon.stub(productsModels, 'getById').resolves(product);
    const result = await productsServices.getById(product.id);
    expect(result).to.be.deep.equal(product);
    sinon.restore();
  });

  it('Testa a mensagem para caso produto não exista.', async () => {
    sinon.stub(productsModels, 'getById').resolves();
    const result = await productsServices.getById();
    expect(result).to.be.deep.equal(productNotFound);
    sinon.restore();
  });
});