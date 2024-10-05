require('dotenv').config();

const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { User } = require(path.join(__dirname, '../models/schemas.js'));
const { All } = require(path.join(__dirname, '../models/schemas.js'));
const bcrypt = require('bcrypt');

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'no-reply@launchgummies.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'no-reply@launchgummies.com',
            to: 'rupertcade@gmail.com',
            subject: 'testing',
            text: 'testing the api'
        }

        const result = await transport.sendMail(mailOptions)
        return result;
    }
    catch(err) {
        return err
    }
}

//End email

const genString = () => {
    const len = 8;
    let randStr = '';

    for(let i=0;i < len;i++) {
        const ch = Math.floor((Math.random() * 10) + 1);
        randStr += ch;
    }

    return randStr;
}

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Signup.ejs'), {err: ""});
})

router.post('/', async (req, res) => {

    let username = req.body.user;
    let email = req.body.email;
    let pass = req.body.pass;
    let passConf = req.body.passConf;
    let captchaToken = req.body['g-recaptcha-response'];
    console.log('Captcha Token Received:', captchaToken);
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captchaToken}`;

    try {
        const captchaResponse = await axios.post(verificationURL);
        console.log('Captcha Response from Google:', captchaResponse.data);
        if (!captchaResponse.data.success) {
            throw 8;
        }
        const existingUsername = await User.findOne({
            username: username
        });
        const existingEmail = await User.findOne({
            email: email
        });

        if(username == "" || email == "" || pass == "" || passConf == "") {
            throw 6;
        } 
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            throw 2;
        }
        else if (username.length < 8) {
            throw 3;
        }
        else if (pass.length < 8) {
            throw 7;
        }
        else if (existingUsername) {
            throw 4;
        }
        else if (existingEmail) {
            throw 5;
        }
        else if (passConf != pass) {
            throw 1;
        }
        else {
            const saltRounds = 10;
            bcrypt.hash(pass, saltRounds).then(hashedPassword => {
                User.create({
                    username: username,
                    password: hashedPassword,
                    email: email,
                    active: false
                })

                All.create({
                    usermame: username,
                    password: hashedPassword,
                    email: email,
                    active: false,
                    accountType: "User"
                })
            })

            sendMail();

            res.render(path.join(__dirname, '../../app/views/Profile.ejs'), {profileName: username});
        }

    }
    catch(err) {
        let message;
        switch (err) {
            case 1:
                message = "Passwords do not match!";
                break;
            case 2:
                message = "Invalid email format!";
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
            case 6:
                message = "No blank fields are permitted!";
                break;
            case 7:
                message = "Password must be at least 8 characters!";
                break;
            case 8:
                message = "Failed reCaptcha!"
                break;
            default:
                message = "Internal error";
                console.log(err);
                break;
        }
        res.render(path.join(__dirname, '../../app/views/Signup.ejs'), {err: message});
    }

})

module.exports = router;
