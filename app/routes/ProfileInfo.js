const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require(path.join(__dirname, '../models/schemas.js'));

router.post('/', async (req, res) => {
    const { username, firstname, lastname, email, addrLine1, addrLine2, addrLine3, city, state } = req.body;
    const user = await User.findOne({ username: req.session.user.username });
    const existingEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ username: username });

    try {

        const existingUsername = await User.findOne({
            username: username,
            _id: { $ne: user._id }
        });
        
        const existingEmail = await User.findOne({
            email: email,
            _id: { $ne: user._id }
        });
        
        if (existingUsername) {
            return res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { userInfo: user, err: "Username already in use" });
        }
        else if (existingEmail) {
            return res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { userInfo: user, err: "Email already in use" });
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            return res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { userInfo: user, err: "Invalid email" });
        }
        else if (username.length < 8) {
            return res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { userInfo: user, err: "Username must be at least 8 characters" });
        }


        const result = await User.updateOne(
            { username: req.session.user.username },
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

        // Update the session username to reflect changes
        req.session.user.username = username;

        if (result.matchedCount === 0) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: "Internal error" });
        }

        // Re-render profile page with updated info
        return res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { userInfo: await User.findOne({ username: req.session.user.username }), err: null });

    } catch (err) {
        return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: "Internal error" });
    }
});

router.get('/', (req, res) => {
    if (req.session.isLoggedIn) {
        res.render(path.join(__dirname, '../../app/views/Profile.ejs'), { profileName: req.session.user.username });
    } else {
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: "You need to login!" });
    }
});

module.exports = router;
