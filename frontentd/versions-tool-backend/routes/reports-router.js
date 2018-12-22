const express = require('express');
const reportsMiddleware = require('../middlewares/reports-middleware');
const router = express.Router();

router.get('/report/:projectId/:platformId', reportsMiddleware.getReport);
router.get('/report/:projectId/:platformId/chart', reportsMiddleware.getChartReport);
router.get('/triggerSaveReportsToDB', reportsMiddleware.saveReportsToDB);

module.exports = router;