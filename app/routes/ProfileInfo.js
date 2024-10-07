const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require(path.join(__dirname, '../models/schemas.js'));

router.put('/', async (req, res) => {
    const { username, firstname, lastname, email, addrLine1, addrLine2, addrLine3, city, state } = req.body;

    try {
        const user = await User.findOne({ username: req.session.user.username });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user details
        user.username = username;
        user.personal.firstname = firstname;
        user.personal.lastname = lastname;
        user.email = email;
        user.address.address1 = addrLine1;
        user.address.address2 = addrLine2;
        user.address.address3 = addrLine3;
        user.address.city = city;
        user.address.state = state;

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Home.ejs'));
});

module.exports = router;