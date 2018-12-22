const projectsService = require('../services/projects-service');

async function getProjects(req, res, next) {
  const projects = await projectsService.getProjects();
  res.send(projects);
};

async function getProject(req, res, next) {
  const projectId = req.params.projectId;
  const project = await projectsService.getProject(projectId);
  res.send(project);
};

module.exports = {
  getProjects,
  getProject,
};
