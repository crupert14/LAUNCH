require('dotenv').config();

const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const { User } = require(path.join(__dirname, '../models/schemas.js')); // Assuming you have a User model

router.get('/:token', async (req, res) => {
    try {
        // Verify the token
        const decoded = jwt.verify(req.params.token, process.env.WEBSITE_SECRET);
        
        // Find the user by email from the token
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            throw new Error("User not found");
        }

        // Update the user's active status
        user.active = true;
        await user.save();

        // Render a success message or redirect to login
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: "Your account has been verified! You can now log in." });
    } catch (err) {
        console.log("Error: " + err);
        res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: "Token invalid!" });
    }
});

module.exports = router;