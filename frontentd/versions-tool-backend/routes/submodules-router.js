const express = require('express');
const submodulesMiddleware = require('../middlewares/submodules-middleware');
const router = express.Router();

router.get('/submodules/:platformId', submodulesMiddleware.getSubmodules);
router.get('/submodules/:platformId/dependencies', submodulesMiddleware.getSubmodulesDependencies);

module.exports = router;