const bcrypt = require('bcrypt');
const { User } = require('../models/schemas');
const path = require('path');

async function auth(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'Username or password invalid' });
        }

        if (!user.active) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'Account not yet verified, please verify through your email' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'Username or password invalid' });
        }

        // If authentication successful, attach user data to session
        req.session.user = {
            username: user.username,
            email: user.email
        };

        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'An error occurred during authentication' });
    }
}

module.exports = { auth };