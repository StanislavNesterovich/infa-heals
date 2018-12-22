const axios = require('axios');
const config = require('../config');
const { Report } = require('../models/report-model');
const { getPlatform } = require('./projects-service');
const { formatReport, formatReportsToChartData } = require('../formatters/reports-formatter');

function getReport(projectId, platformId) {
  return new Promise(async (resolve, reject) => {
    try {
      const platform = await getPlatform(projectId, platformId);
      const report = await axios.get(config.REPORT_BASE_URL + platform.path);
      
      resolve(formatReport(report.data));
    } catch (e) {
      reject(e);
    }
  });
};

function getChartReport(projectId, platformId) {
  return new Promise(async (resolve, reject) => {
    try {
      const reports = await Report.find({ projectId, platformId }).sort('-createdAt').limit(6).lean().exec();
      resolve(formatReportsToChartData(reports));
    } catch (e) {
      reject(e);
    }
  });
};

function getReportAndSaveToDB(projectId, platformId, createdAt) {
  return new Promise(async (resolve, reject) => {
    try {
      const reportFromService = await getReport(projectId, platformId);
      const report =  new Report({
        projectId: projectId,
        platformId: platformId,
        createdAt: createdAt,
        data: reportFromService
      });
      const savedReport = await report.save();
      resolve(savedReport);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getReport,
  getChartReport,
  getReportAndSaveToDB,
};
