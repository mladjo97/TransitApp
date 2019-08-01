import { Router } from 'express';
import validation from '@middlewares/validation';
import { busLineTypeSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as busLineTypesControllers from '@controllers/busLineTypes';

const busLineTypesRoute = (app) => {
    app.use('/busLineTypes', route);

    route.get('/:id', validation(busLineTypeSchemas.busLineTypeIdBindingModel, 'params'), busLineTypesControllers.getBusLineTypeById);
    route.get('/', busLineTypesControllers.getAllBusLineTypes);
    route.post('/', validation(busLineTypeSchemas.busLineTypeBindingModel, 'body'), busLineTypesControllers.postBusLineType);
    
    route.put('/:id', validation(busLineTypeSchemas.busLineTypeIdBindingModel, 'params'), 
                      validation(busLineTypeSchemas.busLineTypeBindingModel, 'body'),
                      busLineTypesControllers.putBusLineType);

    route.delete('/:id', validation(busLineTypeSchemas.busLineTypeIdBindingModel, 'params'), busLineTypesControllers.deleteBusLineType);
};

export default busLineTypesRoute;