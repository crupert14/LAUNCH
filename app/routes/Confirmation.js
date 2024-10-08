require('dotenv').config();

const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const { User } = require(path.join(__dirname, '../models/schemas.js')); // Assuming you have a User model

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Confirmation.ejs'), { err: "", active: false });
});

router.post('/', async (req, res) => {
    const { token } = req.body; // Get the token from the request body

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.WEBSITE_SECRET);

        // Find the user by email from the token
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            throw new Error("User not found");
        }

        // Update the user's active status
        user.active = true;
        await user.save();

        // Render a success message or redirect to login
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: "Your account has been verified! You can now log in.", active: req.session.isLoggedIn });
    } catch (err) {
        console.log("Error: " + err);
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: "Token invalid!", active: req.session.isLoggedIn });
    }
});
module.exports = router;