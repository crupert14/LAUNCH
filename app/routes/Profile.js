const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    if(req.session.user) {
        res.render(path.join(__dirname, '../../app/views/Profile.ejs'), {profileName: ""});
    }
    else {
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: "You need to login!"});
    }
})

module.exports = router;