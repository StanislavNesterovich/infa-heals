const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAMESPACE } = require('../config');

const dbUrl = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAMESPACE}`

module.exports = {
  dbUrl,
};
