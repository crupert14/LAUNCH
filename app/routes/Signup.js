const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require('/Users/caderupert/LAUNCH/app/models/schemas.js');

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Signup.ejs'));
})

router.post('/', async (req, res) => {

    let username = req.body.user;
    let email = req.body.email;
    let pass = req.body.pass;
    let passConf = req.body.passConf;

    try {
        if(username.length > 0 && email.length > 0) {
            if(pass == passConf) {
                const newUser = await User.create({
                    username: username,
                    password: pass,
                    email: email
                })
                res.render(path.join(__dirname, '../../app/views/Signup.ejs'));
            }
        }
        else {
            res.render(path.join(__dirname, '../../app/views/Login.ejs'));
        }
    }
    catch(err) {
        console.log(err);
        res.render(path.join(__dirname, '../../app/views/Login.ejs'));
    }

})

module.exports = router;