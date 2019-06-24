const router = require('express').Router();
const axios = require('axios');

/**
 * url: /api/v1/public/unsplash
 * method: post
 */
router.post('/unsplash',(req,res)=>{
    let body = req.body;
    let query = body.query;
    let pageNo = body.page;
    let limit = body.limit?10:body.limit;

    let requestUrl = "https://unsplash.com/napi/search/photos?query="+query+"&xp=&per_page="+limit+"&page="+pageNo;

    axios.get(requestUrl).then(response=>{
        res.json(response.data);
    }).catch(err=>{
        res.status(err.code||500).json(err);
    })
});

module.exports = router;