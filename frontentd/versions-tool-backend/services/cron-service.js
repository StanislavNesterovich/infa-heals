const cron = require('node-cron');
const moment = require('moment');
const debug = require('debug')('cron-service');
const reportService = require('./reports-service');
const { projects } = require('../projects.config.json');

function saveReportsToDB() {
  debug('start cron task: saveReportsToDB');
  const timeNow = moment.utc().toDate();
  projects.forEach(project => {
    project.platforms.forEach(async platform => {
      try {
        await reportService.getReportAndSaveToDB(project.id, platform.id, timeNow);
        debug(`${project.id} ${platform.id} report saved.`);
      } catch (e) {
        console.error(`${project.id} ${platform.id} save report to DB failed: ${e}`)
      }
    });
  });
}

function scheduleCronTasks() {
  cron.schedule('0 0 * * 6', saveReportsToDB);
}

module.exports = {
  saveReportsToDB,
  scheduleCronTasks,
}