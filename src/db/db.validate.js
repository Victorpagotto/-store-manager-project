const db = require('./connection');

const validateDB = async () => {
  const result = await db.execute('SELECT "TEST"');
  if (result[0]) {
    const connectionPort = (await db.getConnection()).config.port;
    return `Database connected and working on port: ${connectionPort}.`;
  }
  return 'Database not working.';
};

module.exports = validateDB;