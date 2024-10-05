const passport = require('passport'); // Import passport
const path = require('path');

async function auth(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: 'An error occurred during authentication' });
        }
        if (!user) {
            return res.render(path.join(__dirname, '../../app/views/Login.ejs'), { err: info.message });
        }

        // If authentication successful, attach user data to session
        req.session.user = {
            username: user.username,
            email: user.email
        };
        req.session.isLoggedIn = true;

        // Proceed to the next middleware/route handler
        return next();
    })(req, res, next); // Call the function
}

module.exports = { auth };