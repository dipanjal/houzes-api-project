const oAuthApp = require('./app');
const oAuthController = require('./oauth-controller');
const oAuthModel = require('./oauth-model');

const dbConfig = require('./db/db-config');
const sequelizeInit = require('./db/connectors/seq-pg-connector');
let sequelizeModels = require('./db/sequlizer_models');


module.exports = {
    oAuthApp,
    oAuthController,
    oAuthModel,
    dbConfig,
    sequelizeInit,
    sequelizeModels
};