const saleExempleMock = [
  {productId:2,quantity:999},
  {productId:3,quantity: 1},
];

const buggedSaleExempleMock = [
  {productId:2,quantity:-999},
  {productId:3,quantity: 1},
];

module.exports = {
  saleExempleMock,
  buggedSaleExempleMock,
}