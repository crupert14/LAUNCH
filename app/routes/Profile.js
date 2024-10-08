const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require(path.join(__dirname, '../models/schemas.js'));

router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.session.user.username })
        if(req.session.isLoggedIn) {
            return res.render(path.join(__dirname, '../../app/views/Profile.ejs'), {userInfo: user, err: "", active: req.session.isLoggedIn});
        }
        else {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: "You need to login!", active: req.session.isLoggedIn});
        }
    }
    catch(err) {
        console.log("Error: " + err);
    }
})

module.exports = router;