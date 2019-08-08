const userPostBodyParserMiddleware = () => {
    return (req, _res, next) => {
        console.log(req.body);
        
        if (!req.body.user)
            return next();

        req.body = JSON.parse(req.body.user);

        console.log(req.body);

        return next();
    };
};

export default userPostBodyParserMiddleware;