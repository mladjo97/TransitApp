const errorsRoute = (app) => {
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {        
        const err = new Error('NotFound');
        err.status = 404;
        next(err);
    });

    /// custom error handlers
    app.use((err, req, res, next) => {   
        /**
         * Handle UnauthorizedError thrown by middleware
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(403)
                .send({ message: err.message })
                .end();
        }

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

        /**
         * Handle WriteConflict thrown by db layer
         */
        if (err.name === 'WriteConflict') {
            return res
                .status(400)
                .send({ message: err.message })
                .end();
        }

        /**
         * Handle DbConcurrencyError thrown by db layer
         */
        if (err.message === 'DbConcurrencyError') {
            return res
                .status(409)
                .send({ message: err.message })
                .end();
        }
        
        /**
         * Handle custom BadRequest
         */
        if (err.message === 'BadRequest') {
            return res
                .status(400)
                .send({ message: err.message })
                .end();
        }

        /**
         * Handle custom NotFound
         */
        if (err.message === 'NotFound') {
            return res
                .status(404)
                .send({ message: err.message })
                .end();
        }

        /**
         * Handle custom login errors
         */
        if (err.message === 'InvalidEmail' || err.message === 'InvalidPassword') {
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
                message: err.message
            }
        });
    });
};

export default errorsRoute;