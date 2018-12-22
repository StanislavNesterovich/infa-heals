const debug = require('debug')('database-api');
const mongoose = require('mongoose');
const { dbUrl } = require('./database-config');

function connect() {
  return mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => debug(`Connected to ${dbUrl}...`))
    .catch(err => {
      debug('Error! Can not connect to MongoDB...', err);
      setTimeout(() => {
        connect();
      }, 8000);
    });
};

module.exports = {
  connect,
}
