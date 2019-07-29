import { Router } from 'express';
import { postUser } from '@controllers/users';
import validation from '@middlewares/validation';
import { userSchemas } from '@middlewares/validationSchemas';

const route = Router();

const usersRoute = (app) => {
    app.use('/users', route);

    route.post('/', validation(userSchemas.userPOST, 'body'), postUser);
};

export default usersRoute;