const userPostBodyParserMiddleware = (req, _res, next) => {
    if (!req.body.user)
        return next();

    req.body = JSON.parse(req.body.user);

    return next();
};

export default userPostBodyParserMiddleware;