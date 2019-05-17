const router = require('express').Router();

let testApis = require('../controllers/api/test-api-controller');
let publicApis = require('../controllers/api/public-api-controller');

router.use('/v1/test',testApis);
router.use('/v1/public',publicApis);

module.exports = router;