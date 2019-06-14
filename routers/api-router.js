const router = require('express').Router();

let secureApis = require('./secure-api-routs');
let publicApis = require('./public-api-routs');
let swaggerUi = require('../modules/api_doc_generator');

// const isUserActivated = require('../middlewares/user-validator');

// router.use('/v1/test',testApis);
router.use('/v1',secureApis);
router.use('/v1/public',publicApis);
router.use('/v1/endpoints',swaggerUi.swaggerUiServer,swaggerUi.SwaggerUiSetup);


module.exports = router;