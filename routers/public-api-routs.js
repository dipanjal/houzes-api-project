/**
 * base url: /api/v1/public
 * @type {Router}
 */

const router = require('express').Router();

router.use(require('../controllers/api/public/user-api-controller'));
router.use(require('../controllers/api/public/auth-api-controller'));
router.use(require('../controllers/api/public/unsplash-api-controller'));

module.exports = router;