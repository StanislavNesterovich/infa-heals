const submodulesService = require('../services/submodules-service');

async function getSubmodules(req, res, next) {
  const platformId = req.params.platformId;
  const submodules = await submodulesService.getSubmodules(platformId);
  res.send(submodules);
};

async function getSubmodulesDependencies(req, res, next) {
  const platformId = req.params.platformId;
  const submodulesDependencies = await submodulesService.getSubmodulesDependencies(platformId);

  res.send(submodulesDependencies);
}

module.exports = {
  getSubmodules,
  getSubmodulesDependencies,
};
