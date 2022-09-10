const errList = {
  NO_PRODUCT_FOUND: 404,
};

const errHandle = (type) => errList[type] || 500;

module.exports = {
  errHandle,
  errList,
};