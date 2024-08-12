const jwt = require('jsonwebtoken');
const { verify } = jwt;

const { HTTP_UNAUTHORIZED } = require('../constants/http_status.js');


module.exports = (req, res, next) => {
    const token = req.headers.access_token;
    if (!token) return res.status(HTTP_UNAUTHORIZED).send();

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
    } catch (error) {
        return res.status(HTTP_UNAUTHORIZED).send();
    }

    return next();
};
