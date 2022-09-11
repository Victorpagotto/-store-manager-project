const chai = require('chai');
// const chaiHttp = require('chaiHttp');
const sinon = require('sinon');
const { expect } = chai;


const { productsMock, insertedProductMock, formatProductMock } = require('./servicesMock/productsMock');
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

  it('Testa se um produto pode ser cadastrado com sucesso.', async function () {
    sinon.stub(productsModels, 'insert').resolves(insertedProductMock);
    sinon.stub(productsModels, 'getById').resolves(formatProductMock);
    const result = await productsServices.insert({ name: insertedProductMock.name });
    expect(result).to.be.deep.equal({ status: 'OK_CREATED', result: formatProductMock });
    sinon.restore();
  });

  it('Testa se um produto com menos de 5 caracteres em seu nome não pode ser cadastrado.', async function () {
    sinon.stub(productsModels, 'insert').resolves({ insertId: insertedProductMock.insertId, name: '1234' });
    sinon.stub(productsModels, 'getById').resolves(formatProductMock);
    const result = await productsServices.insert({ name: '1234' });
    expect(result).to.be.deep.equal({ status: 'BAD_FORMAT', result: { message: '"name" length must be at least 5 characters long' } });
    sinon.restore();
  });
});