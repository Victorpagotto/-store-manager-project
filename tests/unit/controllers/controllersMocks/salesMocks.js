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

const sales = [
  {productId:2,quantity:999},
  {productId:3,quantity: 1},
];

const productServicesResponse = { status: 'OK_FOUND', result: { insertId: 1, productName: 'Martelo de Thor' } };

const productServicesReponseFalse = { status: 'NOT_FOUND', result: { message: 'Product not found' } };

const saleResponse = { status: 'OK_CREATED', result: { id: 666, itemsSold: productArray } };

const saleByIdFoundResponse = { status: 'OK_FOUND', result: getByIdResponse };

const saleByIdNotFoundResponse = { status: 'NOT_FOUND', result: { message: 'Sale not found' } };

const saleGetAllResponse = { status: 'OK_FOUND', result: getAllResponse };

const saleUpdateSuccessResponse = { status: 'OK_FOUND', result: { saleId: 666, itemsUpdated: [...sales] } }

module.exports = {
  saleResponse,
  productArray,
  noProductIdArray,
  noQuantityArray,
  responsesSales,
  productServicesResponse,
  productServicesReponseFalse,
  saleByIdFoundResponse,
  saleByIdNotFoundResponse,
  saleGetAllResponse,
  saleUpdateSuccessResponse,
}