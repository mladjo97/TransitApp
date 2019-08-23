import { Router } from 'express';
import validation from '@middlewares/validation';
import attachCurrentUser from '@middlewares/attachCurrentUser';
import auth from '@middlewares/auth';
import { generalSchemas, ticketSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as ticketsController from '@controllers/tickets';

const ticketsRoute = (app) => {
    app.use('/tickets', route);

    route.get('/:id',
        validation(generalSchemas.idBindingModel, 'params'),
        ticketsController.getTicketById);

    route.get('/',
        auth.authentication,
        attachCurrentUser,
        ticketsController.getAllTicketsForUser);

    route.post('/buy',
        validation(ticketSchemas.buyTicketBindingModel, 'body'),
        auth.authentication,
        attachCurrentUser,
        ticketsController.buyTicket);
};

export default ticketsRoute;