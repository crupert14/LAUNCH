const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require('/Users/caderupert/LAUNCH/app/models/schemas.js');

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Signup.ejs'), {err: ""});
})

router.post('/', async (req, res) => {

    let username = req.body.user;
    let email = req.body.email;
    let pass = req.body.pass;
    let passConf = req.body.passConf;

    try {

        const existingUsername = await User.findOne({
            username: username
        });
        if (existingUsername) {
            throw 4;
        }

        const existingEmail = await User.findOne({
            email: email
        });
        if (existingUsername) {
            throw 5;
        }

        if(username.length > 5) {
            if(email.length > 5) {
                if(pass == passConf) {
                    const newUser = await User.create({
                        username: username,
                        password: pass,
                        email: email
                    })
                    res.render(path.join(__dirname, '../../app/views/Profile.ejs'), {profileName: username});
                }
                else {
                    throw 1;
                }
            }
            else {
                throw 2;
            }
        }
        else {
            throw 3;
        }
    }
    catch(err) {
        let message;
        switch (err) {
            case 1:
                message = "Passwords do not match!";
                break;
            case 2:
                message = "Email must be at least six character!";
                break;
            case 3:
                message = "Username must be at least six character!";
                break;
            case 4:
                message = "Username already in use!";
                break;
            case 5:
                message = "Email already in use!";
                break;
            default:
                message = "Internal error";
                break;
        }
        res.render(path.join(__dirname, '../../app/views/Signup.ejs'), {err: message});
    }

})

module.exports = router;