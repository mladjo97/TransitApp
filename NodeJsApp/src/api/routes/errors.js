const errorsRoute = (app) => {
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {  
        console.log(err);     
        /**
         * Handle CastError thrown by service layer
         */
        if (err.name === 'CastError') {
            return res
                .status(400)
                .send({ message: err.message })
                .end();
        }
        /**
         * Handle MongoError thrown by db layer
         */
        if (err.name === 'MongoError') {
            return res
                .status(400)
                .send({ message: err.message })
                .end();
        }
        
        return next(err);
    });
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};

export default errorsRoute;