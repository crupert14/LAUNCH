const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    req.session.isLoggedIn = false;
    req.session.user= {}
    res.render(path.join(__dirname, '../../app/views/Home.ejs'), { active: req.session.isLoggedIn });
})

module.exports = router;