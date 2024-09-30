function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // User is logged in, proceed to the next middleware/route
    }
    //CHANGE THIS LINE
    return res.status(403).send('You need to log in first!'); // Forbidden
}

module.exports = isAuthenticated;