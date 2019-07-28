import { Router } from 'express';
import { postUser } from '@controllers/users';

const route = Router();

const usersRoute = (app) => {

    app.use('/users', route);

    route.post('/', postUser);

}

export default usersRoute;