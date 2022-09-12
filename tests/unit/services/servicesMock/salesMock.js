const saleExempleMock = [
  {productId:2,quantity:999},
  {productId:3,quantity: 1},
];

const buggedSaleExempleMock = [
  {productId:2,quantity:-999},
  {productId:3,quantity: 1},
];

const getByIdResponse = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2
  }
];

const getAllResponse = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2
  }
];

module.exports = {
  saleExempleMock,
  buggedSaleExempleMock,
  getByIdResponse,
  getAllResponse,
}