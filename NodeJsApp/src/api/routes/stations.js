import { Router } from 'express';
import validation from '@middlewares/validation';
import { stationSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as stationController from '@controllers/stations';

const usersRoute = (app) => {
    app.use('/stations', route);

    route.get('/:id', validation(stationSchemas.stationIdBindingModel, 'params'), stationController.getStationById);
    route.get('/', stationController.getAllStations);
    route.post('/', validation(stationSchemas.postStationBindingModel, 'body'), stationController.postStation);
    
    route.put('/:id', validation(stationSchemas.stationIdBindingModel, 'params'),
                      validation(stationSchemas.putStationBindingModel, 'body'),
                      stationController.putStation);
                      
    route.delete('/:id', validation(stationSchemas.stationIdBindingModel, 'params'), stationController.deleteStation);
};

export default usersRoute;