const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Login.ejs'));
})

router.post('/', async(req, res) => {
    try {
        if(req.body.username.length > 0) {
            if(req.body.password.length > 0) {
                res.render(path.join(__dirname, '../../app/views/Login.ejs'));
            }
        }
    }
    catch(err) {

    }
})

module.exports = router;