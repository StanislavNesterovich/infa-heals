const { projects, platforms } = require('../projects.config.json');
const { formatProject } = require('../formatters/projects-formatter');

function getProjects() {
  return new Promise((resolve, reject) => {
    resolve({ projects: projects.map(formatProject), platforms });
  });
};

function getProject(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      resolve(formatProject(project));
    } else {
      reject('Project not found');
    }
  });
};

function getPlatform(projectId, platformId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const platform = project.platforms.find(p => p.id === platformId);
      if (platform) {
        resolve(platform);
      } else {
        reject('Platform not found');
      }
    } else {
      reject('Project not found');
    }
  });
};

module.exports = {
  getProjects,
  getProject,
  getPlatform,
};
