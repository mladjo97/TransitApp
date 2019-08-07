import { Router } from 'express';
import auth from '@middlewares/auth';
import validation from '@middlewares/validation';
import { userSchemas } from '@middlewares/validationSchemas';
import attachCurrentUser from '@middlewares/attachCurrentUser';
const route = Router();

import * as userControllers from '@controllers/users';

const usersRoute = (app) => {
    app.use('/users', route);

    route.get('/count', userControllers.getCount);
    route.get('/:id', validation(userSchemas.userIdBindingModel, 'params'), userControllers.getUserById);
    route.get('/', auth.authentication, attachCurrentUser, auth.authorization('Admin'), userControllers.getAllUsers);
    route.post('/login', validation(userSchemas.loginUserBindingModel, 'body'), userControllers.loginUser);
    route.post('/changePassword', validation(userSchemas.changePasswordBindingModel, 'body'), userControllers.changePassword);
    route.post('/', validation(userSchemas.postUserBindingModel, 'body'), userControllers.postUser);

    route.put('/:id', validation(userSchemas.userIdBindingModel, 'params'),
                      validation(userSchemas.putUserBindingModel, 'body'), 
                      userControllers.putUser);
                      
    route.delete('/:id', validation(userSchemas.userIdBindingModel, 'params'), userControllers.deleteUser);
};

export default usersRoute;