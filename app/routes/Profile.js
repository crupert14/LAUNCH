const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require(path.join(__dirname, '../models/schemas.js'));

router.get('/', (req, res) => {

    const user = User.findOne({ username: req.session.user.username })

    if(req.session.isLoggedIn) {
        res.render(path.join(__dirname, '../../app/views/Profile.ejs'), {userInfo: user, err: "", active: req.session.isLoggedIn});
    }
    else {
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: "You need to login!", active: req.session.isLoggedIn});
    }
})

module.exports = router;