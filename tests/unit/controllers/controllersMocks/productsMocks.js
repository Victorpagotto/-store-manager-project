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
}