import { Router } from 'express';
import validation from '@middlewares/validation';
import { busLineSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as busLineController from '@controllers/busLines';

const usersRoute = (app) => {
    app.use('/busLines', route);

    route.get('/:id', validation(busLineSchemas.busLineIdBindingModel, 'params'), busLineController.getBusLineById);
    route.get('/', busLineController.getAllBusLines);
    route.post('/', validation(busLineSchemas.postBusLineBindingModel, 'body'), busLineController.postBusLine);
    
    route.put('/:id', validation(busLineSchemas.busLineIdBindingModel, 'params'),
                      validation(busLineSchemas.putBusLineBindingModel, 'body'),
                      busLineController.putBusLine);
                      
    route.delete('/:id', validation(busLineSchemas.busLineIdBindingModel, 'params'), busLineController.deleteBusLine);
};

export default usersRoute;