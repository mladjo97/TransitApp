import { Router } from 'express';
import validation from '@middlewares/validation';
import { priceListSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as priceListsController from '@controllers/priceLists';

const priceListsRoute = (app) => {
    app.use('/priceLists', route);

    route.get('/all', priceListsController.getAllPriceLists);

    route.post('/',
        validation(priceListSchemas.postPriceListBindingModel, 'body'),
        priceListsController.postPriceList);
};

export default priceListsRoute;