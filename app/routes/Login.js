const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../models/schemas');
const { auth } = require('../middleware/authentication');

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: ''});
})

router.post('/', auth, (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { profileName: req.session.user.username });
})

module.exports = router;