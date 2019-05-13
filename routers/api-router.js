const router = require('express').Router();

let testApiController = require('../controllers/api/test-api-controller');
let authApiController = require('../controllers/api/auth-api-controller');

router.use('/test',testApiController);
router.use('/auth',authApiController);

module.exports = router;