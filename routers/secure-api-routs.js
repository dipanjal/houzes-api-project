/**
 * base url: /api/v1/
 * @type {Router}
 */

const router = require('express').Router();

router.use('/test',require('../controllers/api/secure/test-api-controller'));
router.use('/location',require('../controllers/api/secure/user-location-controller'));

module.exports = router;