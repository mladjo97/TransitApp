import { Router } from 'express';
import validation from '@middlewares/validation';
import { userTypeSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as userTypesControllers from '@controllers/userTypes';

const userTypesRoute = (app) => {
    app.use('/userTypes', route);

    route.get('/:id', validation(userTypeSchemas.userTypeIdBindingModel, 'params'), userTypesControllers.getUserTypeById);
    route.get('/', userTypesControllers.getAllUserTypes);
    route.post('/', validation(userTypeSchemas.userTypeBindingModel, 'body'), userTypesControllers.postUserType);
    
    route.put('/:id', validation(userTypeSchemas.userTypeIdBindingModel, 'params'), 
                      validation(userTypeSchemas.userTypeBindingModel, 'body'),
                      userTypesControllers.putUserType);

    route.delete('/:id', validation(userTypeSchemas.userTypeIdBindingModel, 'params'), userTypesControllers.deleteUserType);
};

export default userTypesRoute;