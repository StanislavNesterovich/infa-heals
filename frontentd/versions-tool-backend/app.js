const express = require('express');
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const databaseApi = require('./database/database-api');
const reportRouter = require('./routes/reports-router');
const submodulesRouter = require('./routes/submodules-router');
const projectsRouter = require('./routes/projects-router');
const cronService = require('./services/cron-service');

const app = express();

databaseApi.connect();
cronService.scheduleCronTasks();

app.use(cors());
app.use(logger('dev'));
app.use(express.static('public', {
  maxage: '30d',
}));
app.use(bodyParser.json());
app.use('/', [reportRouter, projectsRouter, submodulesRouter]);
app.use((err, req, res, next) => {
  console.error('Error: ', err);
  res.status(500).send(err);
});

module.exports = app;
