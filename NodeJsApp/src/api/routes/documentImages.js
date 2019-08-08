import { Router } from 'express';
import auth from '@middlewares/auth';
import attachCurrentUser from '@middlewares/attachCurrentUser';

const route = Router();

import * as docImagesController from '@controllers/documentImages';

const documentImagesRoutes = (app) => {
    app.use('/documentImages', route);

    route.get('/all', auth.authentication, attachCurrentUser, auth.authorization('TicketInspector'), docImagesController.getAll);
    route.get('/', auth.authentication, attachCurrentUser, auth.authorization('User'), docImagesController.getUserDocumentById);
    route.post('/', auth.authentication, attachCurrentUser, auth.authorization('User'), docImagesController.postUserDocumentImage);
    route.put('/', auth.authentication, attachCurrentUser, auth.authorization('User'), docImagesController.putUserDocumentImage);
    route.delete('/', auth.authentication, attachCurrentUser, auth.authorization('User'), docImagesController.deleteUserDocumentImage);
};

export default documentImagesRoutes;