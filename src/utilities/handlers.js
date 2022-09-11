const sortObject = (list, key) => {
  if (typeof list[0][key] === 'string') return list.sort((a, b) => a[key].localeCompare(b[key]));
  if (typeof list[0][key] === 'number') return list.sort((a, b) => a[key] - b[key]);
  return undefined;
};

module.exports = {
  sortObject,
};