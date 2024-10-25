const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth&token'];
    if (!token) {
        return res.redirect('/'); // Redirect to home if no token
    }

    jwt.verify(token, process.env.JWTKEY, (err, user) => {
        if (err) {
            return res.redirect('/');
        }
        req.user = user;
        next();
    });
};

module.exports = authMiddleware 