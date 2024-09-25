const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../models/schemas');

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Login.ejs'));
})

router.post('/', async(req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        User.find({username}).then(data => {
            if(data.length) {
                const compPass = data[0].password;

                bcrypt.compare(password, compPass).then(result => {
                    if(result) {
                        res.render(path.join(__dirname, '../../app/views/Profile.ejs'), {profileName: username})
                    }
                    else {
                        res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: 'Invalid passowrd'});
                    }
                })
            }
        }).catch(err => {
            res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: err});
        })
    }
    catch(err) {

    }
})

module.exports = router;