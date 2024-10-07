const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require(path.join(__dirname, '../models/schemas.js'));

router.post('/', async (req, res) => {
    const { username, firstname, lastname, email, addrLine1, addrLine2, addrLine3, city, state } = req.body;

    try {
        const existingUsername = await User.findOne({
            username: username
        });
        const existingEmail = await User.findOne({
            email: email
        });

        if(existingUsername || existingEmail) {
            res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: "Username or email already in use"});
        }

        // Update the user details
        const result = await User.updateOne(
            { username: req.session.user.username }, // Find the user by session username
            {
                $set: {
                    username: username,
                    email: email,
                    'personal.firstname': firstname,
                    'personal.lastname': lastname,
                    'address.address1': addrLine1,
                    'address.address2': addrLine2,
                    'address.address3': addrLine3,
                    'address.city': city,
                    'address.state': state
                }
            }
        );

        if (result.matchedCount === 0) {
            res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: "Internal error"});
        }

    } catch (err) {
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), {err: "Internal error"});
    }
});

router.get('/', (req, res) => {
    console.log(req.session.user);
    res.render(path.join(__dirname, '../../app/views/Profile.ejs'));
});

module.exports = router;