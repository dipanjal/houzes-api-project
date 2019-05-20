const router = require('express').Router();

let testApis = require('../controllers/api/test-api-controller');
let publicApis = require('../controllers/api/public-api-controller');

let swaggerSpex = require('../modules/api_doc_generator');

router.use('/v1/test',testApis);
router.use('/v1/public',publicApis);




// router.get('/v1/doc', (req,res) =>{
//     // res.setHeader('Content-Type', 'application/json');
//     // res.send(swaggerSpex);
// });


module.exports = router;