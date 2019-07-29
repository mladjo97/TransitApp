import { Router } from 'express';
import validation from '@middlewares/validation';
import { userSchemas } from '@middlewares/validationSchemas';
const route = Router();

import * as userControllers from '@controllers/users';

const usersRoute = (app) => {
    app.use('/users', route);

    route.get('/:id', validation(userSchemas.userIdBindingModel, 'params'), userControllers.getUserById);
    route.get('/', userControllers.getAllUsers);
    route.post('/', validation(userSchemas.postUserBindingModel, 'body'), userControllers.postUser);
    route.put('/:id', validation(userSchemas.userIdBindingModel, 'params'), validation(userSchemas.putUserBindingModel, 'body'), userControllers.putUser);
    route.delete('/:id', validation(userSchemas.userIdBindingModel, 'params'), userControllers.deleteUser);
};

export default usersRoute;