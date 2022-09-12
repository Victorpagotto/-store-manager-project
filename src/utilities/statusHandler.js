const statusList = {
  OK_FOUND: 200,
  NOT_FOUND: 404,
  OK_CREATED: 201,
  OK_DELETED: 204,
  BAD_FORMAT: 422,
  BAD_REQUEST: 400,
};

const statusHandler = (status) => statusList[status] || 500;

module.exports = {
  statusHandler,
  statusList,
};