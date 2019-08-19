import { Router } from 'express';
import validation from '@middlewares/validation';
import { ticketTypeSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as ticketTypesController from '@controllers/ticketTypes';

const ticketTypesRoute = (app) => {
    app.use('/ticketTypes', route);

    route.get('/:id', validation(ticketTypeSchemas.ticketTypeIdBindingModel, 'params'), ticketTypesController.getTicketTypeById);
    route.get('/', ticketTypesController.getAllTicketTypes);
    route.post('/', validation(ticketTypeSchemas.tickeTypeBindingModel, 'body'), ticketTypesController.postTicketType);
    
    route.put('/:id', validation(ticketTypeSchemas.ticketTypeIdBindingModel, 'params'), 
                      validation(ticketTypeSchemas.tickeTypeBindingModel, 'body'),
                      ticketTypesController.putTicketType);

    route.delete('/:id', validation(ticketTypeSchemas.ticketTypeIdBindingModel, 'params'), ticketTypesController.deleteTicketType);
};

export default ticketTypesRoute;