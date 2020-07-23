var express = require('express');
var router = express.Router();
var query = require('../helpers/loginPage');

router.post('/', async (req, res, next) => {
    console.log(req.body);
    await query.loginUser(req.body)
        .then(response => {
            if (response.status && response.message) {
                res
                    .status(response.status)
                    .send(response.message);
            } else {
                res.send(response);
            }
        });
});

module.exports = router;
