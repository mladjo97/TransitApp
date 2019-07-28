import { Router } from 'express';
import users from '@routes/users';

const routes = () => {
	const app = Router();
	users(app);

	return app;
}

export default routes;