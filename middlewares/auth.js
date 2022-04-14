const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        req.isAuth = false;
        return next();
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_KEY);

        if (verifiedToken) {
            req.userId = verifiedToken.userId;
            req.email = verifiedToken.email;
            req.isAuth = true;
            return next();
        }
        else {
            req.isAuth = false;
            return next();
        }
    }
    catch (err) {
        req.isAuth = false;
        return next();
    }
}