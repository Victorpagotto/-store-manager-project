const foundAllProducts = {
  status: 'OK_FOUND',
  result: [
    {
      "id": 1,
      "productName": "Martelo de Thor"
    },
    {
      "id": 2,
      "productName": "Traje de encolhimento"
    }
  ],
};

const createdProductMock =
  {
    id: 666,
    name: 'Luva do Infinito'
}

const createdSuccess = {
  status: 'OK_CREATED',
  result: createdProductMock,
}

const updatedSuccess = { status: 'OK_FOUND', result: { id: 666, name: 'Cavalo de Tróia.' } };

const foundAProduct = {
  status: 'OK_FOUND',
  result: {
      "id": 1,
      "productName": "Martelo de Thor"
    },
};

module.exports = {
  foundAllProducts,
  foundAProduct,
  createdProductMock,
  createdSuccess,
  updatedSuccess,
}