import { Router } from 'express';
import auth from '@middlewares/auth';
import validation from '@middlewares/validation';
import attachCurrentUser from '@middlewares/attachCurrentUser';
import { priceListSchemas, generalSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as priceListsController from '@controllers/priceLists';

const priceListsRoute = (app) => {
    app.use('/priceLists', route);

    route.get('/all', auth.authentication, priceListsController.getAllPriceLists);
    route.get('/active', priceListsController.getActivePriceList);

    route.get('/:id',
        validation(generalSchemas.idBindingModel, 'params'),
        priceListsController.getPriceListById);

    route.get('/prices/:ticketTypeId',
        auth.authentication,
        attachCurrentUser,
        validation(priceListSchemas.ticketTypeIdBindingModel, 'params'),
        priceListsController.getTicketTypePrice);

    route.post('/',
        validation(priceListSchemas.postPriceListBindingModel, 'body'),
        priceListsController.postPriceList);

    route.put('/:id',
        validation(priceListSchemas.putPriceListBindingModel, 'body'),
        validation(generalSchemas.idBindingModel, 'params'),
        priceListsController.putPriceList);

    route.delete('/:id',
        auth.authentication,
        attachCurrentUser,
        auth.authorization('Admin'),
        priceListsController.deletePriceList);
};

export default priceListsRoute;