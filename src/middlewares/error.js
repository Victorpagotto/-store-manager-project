const standardErrorHandle = (_err, _req, res, _next) => (
  res.status(500).send({ message: 'Something went wrong!' })
);

module.exports = standardErrorHandle;