const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models/schemas');
const { auth } = require('../middleware/authentication');

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: '', active: req.session.isLoggedIn});
})

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'An error occurred during authentication', active: req.session.isLoggedIn });
        }
        if (!user) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: info.message, active: req.session.isLoggedIn });
        }

        req.login(user, (err) => {
            if (err) {
                return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'An error occurred during login', active: req.session.isLoggedIn });
            }
            req.session.user = {
                username: req.body.username,
                lastLogin: new Date(), // Add last login timestamp
                sessionName: new Date() + " " + req.body.username // Custom session property
            }
            req.session.isLoggedIn = true;
            res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { err: "", userInfo: user, active: req.session.isLoggedIn });
        });
    })(req, res, next);
});

module.exports = router;