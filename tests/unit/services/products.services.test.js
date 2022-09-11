const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;


const { productsMock } = require('./servicesMock/productsMock');
const productsServices = require('../../../src/services/products.services');
const productsModels = require('../../../src/models/products.models');
const { productNotFound } = require('./servicesMock/messages');

describe('Testa serviços de products.', function() {
  it('Testa se produtos são retornados em forma ordenada.', async function() {
    sinon.stub(productsModels, 'getAll').resolves(productsMock);
    const result = await productsServices.getAll();
    expect(result).to.be.deep.equal({ status: 'OK_FOUND', result: productsMock.sort((a, b) => a.id - b.id) });
    sinon.restore();
  });

  it('Testa se retorna um produto se buscado por id.', async function() {
    const product = productsMock[0];
    sinon.stub(productsModels, 'getById').resolves(product);
    const result = await productsServices.getById(product.id);
    expect(result).to.be.deep.equal({ status: 'OK_FOUND', result: product } );
    sinon.restore();
  });

  it('Testa a mensagem para caso produto não exista.', async function() {
    sinon.stub(productsModels, 'getById').resolves();
    const result = await productsServices.getById();
    expect(result).to.be.deep.equal({ status: 'NOT_FOUND', result: { message: 'Product not found' } });
    sinon.restore();
  });
});