import { Router } from 'express';
import auth from '@middlewares/auth';
import attachCurrentUser from '@middlewares/attachCurrentUser';

const route = Router();

import * as docImagesController from '@controllers/documentImages';

const documentImagesRoutes = (app) => {
    app.use('/documentImages', route);

    route.get('/all', auth.authentication, attachCurrentUser, auth.authorization('TicketInspector'), docImagesController.getAll);
    route.get('/', auth.authentication, attachCurrentUser, auth.authorization('User'), docImagesController.getUserDocumentById);
};

export default documentImagesRoutes;