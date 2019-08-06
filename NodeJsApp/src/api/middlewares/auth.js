import config from '@config';
import jwt from 'express-jwt';

/**
 *  Authorization (_header_) : Bearer ${_token_} 
 */
const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') 
        return req.headers.authorization.split(' ')[1];    
    
    return null;
};

const auth = jwt({
    secret: config.jwtSecret,
    userProperty: 'token',
    getToken: getTokenFromHeader
});

export default auth;