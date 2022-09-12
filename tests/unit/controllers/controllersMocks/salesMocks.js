const productArray = [
  {productId:2,quantity:999},
  {productId:3,quantity: 1},
];

const noProductIdArray = [
  {productId:2,quantity:999},
  {quantity: 1},
];

const noQuantityArray = [
  {productId:2},
  {productId:3,quantity: 1},
];

const responsesSales = {
  noProductId: { status: 'BAD_REQUEST', message: '"productId" is required' },
  noQuantity: { status: 'BAD_REQUEST', message: '"quantity" is required' },
  noProductFound: { status: 'NOT_FOUND', message: 'Product not found' },
}

const productServicesResponse = { status: 'OK_FOUND', result: { insertId: 1, productName: 'Martelo de Thor' } };

const productServicesReponseFalse = { status: 'NOT_FOUND', result: { message: 'Product not found' } };

const saleResponse = { status: 'OK_CREATED', result: { id: 666, itemsSold: productArray } };

module.exports = {
  saleResponse,
  productArray,
  noProductIdArray,
  noQuantityArray,
  responsesSales,
  productServicesResponse,
  productServicesReponseFalse,
}