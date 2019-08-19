import { Router } from 'express';
import validation from '@middlewares/validation';
import attachCurrentUser from '@middlewares/attachCurrentUser';
import auth from '@middlewares/auth';
import { ticketSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as ticketsController from '@controllers/tickets';

const ticketsRoute = (app) => {
    app.use('/tickets', route);

    route.get('/tickets', 
            auth.authentication,
            attachCurrentUser,
            ticketsController.getAllTicketsForUser);
};

export default ticketsRoute;