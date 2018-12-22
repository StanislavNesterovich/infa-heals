const reportsService = require('../services/reports-service');
const cronService = require('../services/cron-service');

async function getReport(req, res, next) {
  const projectId = req.params.projectId;
  const platformId = req.params.platformId;
  const report = await reportsService.getReport(projectId, platformId);
  res.send(report);
};

async function getChartReport(req, res, next) {
  const projectId = req.params.projectId;
  const platformId = req.params.platformId;
  const report = await reportsService.getChartReport(projectId, platformId);
  res.send(report.reverse());
};

function saveReportsToDB(req, res, next) {
  cronService.saveReportsToDB();
  res.send('triggered');
}

module.exports = {
  getReport,
  getChartReport,
  saveReportsToDB,
};
