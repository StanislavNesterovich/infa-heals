const APP_PORT = process.env.APP_PORT || 4000;

const DATABASE_HOST = process.env.DB_HOST || 'mongo';
const DATABASE_PORT = process.env.DB_PORT || 27017;
const DATABASE_NAMESPACE = process.env.DB_NAMESPACE || 'versionstool';

const REPORT_BASE_URL = 'http://artifactory.corp/artifactory/SubmodulesVersions/';
const SUBMODULES_BASE_URL = 'http://artifactory.corp/artifactory/SubmodulesVersions/infra/';

module.exports = {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAMESPACE,
  APP_PORT,
  REPORT_BASE_URL,
  SUBMODULES_BASE_URL,
};
