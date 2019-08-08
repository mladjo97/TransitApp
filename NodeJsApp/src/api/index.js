import { Router } from 'express';
import users from '@routes/users';
import errors from '@routes/errors';
import userTypes from '@routes/userTypes';
import busLines from '@routes/busLines';
import busLineTypes from '@routes/busLineTypes';
import stations from '@routes/stations';
import documentImages from '@routes/documentImages';

const routes = () => {
    const app = Router();

    // register routes
    users(app);
    userTypes(app);
    busLines(app);
    busLineTypes(app);
    stations(app);
    documentImages(app);
    errors(app);

    return app;
};

export default routes;