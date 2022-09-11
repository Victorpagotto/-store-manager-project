const statusList = {
  OK_FOUND: 200,
  NOT_FOUND: 404,
};

const statusHandler = (status) => statusList[status] || 500;

module.exports = {
  statusHandler,
  statusList,
};