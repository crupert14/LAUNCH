const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models/schemas');
const { auth } = require('../middleware/authentication');

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: ''});
})

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'An error occurred during authentication' });
        }
        if (!user) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: info.message });
        }

        // Log the user in and redirect to profile
        req.login(user, (err) => {
            if (err) {
                return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'An error occurred during login' });
            }
            // Successful login, redirect to profile page
            req.session.user = {
                username: req.body.username
            }
            res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { profileName: user.username });
        });
    })(req, res, next); // Call the function
});

module.exports = router;