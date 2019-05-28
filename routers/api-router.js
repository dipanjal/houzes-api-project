const router = require('express').Router();

let testApis = require('../controllers/api/test-api-controller');
let publicApis = require('../controllers/api/public-api-controller');
let swaggerUi = require('../modules/api_doc_generator');

// const isUserActivated = require('../middlewares/user-validator');

router.use('/v1/test',testApis);
router.use('/v1/public',publicApis);
router.use('/v1/endpoints',swaggerUi.swaggerUiServer,swaggerUi.SwaggerUiSetup);


module.exports = router;