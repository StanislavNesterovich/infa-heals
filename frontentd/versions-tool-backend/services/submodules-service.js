const axios = require('axios');
const config = require('../config');
const reportService = require('./reports-service');
const { formatSubmodules, formatDependencyGraph } = require('../formatters/submodules-formatter');
const { projects } = require('../projects.config.json');

function getSubmodules(platformId) {
  return new Promise(async (resolve, reject) => {
    try {
      const projectsWithThisPlatformId = [];
      projects.forEach(async (project) => {
        const platform = project.platforms.find(platform => platform.id === platformId);
        if (platform) {
          projectsWithThisPlatformId.push({
            id: project.id,
            name: project.name,
          });
        };
      });

      Promise.all([
        axios.get(config.SUBMODULES_BASE_URL + platformId + '/report.json'),
        ...projectsWithThisPlatformId.map(project => loadProjectSubmodules(project, platformId)),
      ])
      .then((responses) => {
        resolve(formatSubmodules(responses[0].data, projectsWithThisPlatformId));
      })
      .catch((e) => {
        reject(e);
      })
    } catch (e) {
      reject(e);
    }
  });
};

function getSubmodulesDependencies(platformId) {
  return new Promise(async (resolve, reject) => {
    axios.get(config.SUBMODULES_BASE_URL + platformId + '/report.json')
      .then((response) => {
        Promise.all(response.data.repos.map((repo) => {
          return new Promise(async (resolve, reject) => {
            try {
              const resp = await axios.get(repo.repositoryUrl.slice(0, -6) + 'raw/haxelib.json?at=refs%2Fheads%2Fmaster',
              {
                headers: {
                  'Authorization': 'Bearer MTI4Mzc2NTg5NjExOoTESf4ps6HvWDF6f2qoi33oXTXn'
                }, 
              });
              resolve(resp.data);
            } catch (e) {
              resolve(null);
            }
          })
        }))
          .then((libs) => {
            resolve(formatDependencyGraph(libs));
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
};

async function loadProjectSubmodules(project, platformId) {
  project.report = await reportService.getReport(project.id, platformId);
}

module.exports = {
  getSubmodules,
  getSubmodulesDependencies,
};
