require('dotenv').config();

const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');

router.get('/:token', (req, res) => {
    try {
        console.log(jwt.verify(req.params.token, process.env.WEBSITE_SECRET));
    }
    catch(err) {
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: "Token invalid!"});
    }
})

module.exports = router;