/**
 * base url: /api/v1/
 * @type {Router}
 */

const router = require('express').Router();

router.use(require('../controllers/api/secure/test-api-controller'));
router.use(require('../controllers/api/secure/user-location-controller'));

module.exports = router;