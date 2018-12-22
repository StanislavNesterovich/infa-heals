const express = require('express');
const projectsMiddleware = require('../middlewares/projects-middleware');
const router = express.Router();

router.get('/projects', projectsMiddleware.getProjects);
router.get('/projects/:projectId', projectsMiddleware.getProject);

module.exports = router;