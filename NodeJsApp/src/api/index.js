import { Router } from 'express';
import users from '@routes/users';
import errors from '@routes/errors';

const routes = () => {
	const app = Router();

	// register routes
	users(app);
	errors(app);

	return app;
};

export default routes;