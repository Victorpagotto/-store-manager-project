const snakeize = require('snakeize');

const sortObject = (list, key) => {
  if (typeof list[0][key] === 'string') return list.sort((a, b) => a[key].localeCompare(b[key]));
  if (typeof list[0][key] === 'number') return list.sort((a, b) => a[key] - b[key]);
  return undefined;
};

const insertWrapper = (object) => {
  const entries = Object.entries(snakeize(object));
  const keys = entries.map((key) => key[0]).join(', ');
  const values = entries.map((value) => value[1]);
  const placeHolder = entries.map((_key) => '?').join(', ');
  return { keys, values, placeHolder };
};

module.exports = {
  sortObject,
  insertWrapper,
};