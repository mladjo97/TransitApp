import config from '@config';
import jwt from 'express-jwt';

/**
 *  Exports JWT from Authorization header
 * @param {Request} req HTTP Request
 * @returns {string} JSON Web Token 
 */
const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1];

    return null;
};

const authentication = jwt({
    secret: config.jwtSecret,
    userProperty: 'token',
    getToken: getTokenFromHeader
});

const authorization = (role) => {
    return (req, res, next) => {
        if (req.currentUser.role.name === role) {
            return next();
        } else {
            return res.status(401).send('Action not allowed');
        }
    };
};

export default {
    authentication,
    authorization
};
