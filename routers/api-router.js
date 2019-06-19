const router = require('express').Router();

let swaggerUi = require('../modules/api_doc_generator');

router.use('/v1',require('./secure-api-routs'));
router.use('/v1/public',require('./public-api-routs'));
router.use('/v1/endpoints',swaggerUi.swaggerUiServer,swaggerUi.SwaggerUiSetup);


module.exports = router;