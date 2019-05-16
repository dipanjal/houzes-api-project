const router = require('express').Router();

let testApis = require('../controllers/api/test-api-controller');
let publicApis = require('../controllers/api/public-api-controller');

router.use('/test',testApis);
router.use('/public',publicApis);

module.exports = router;