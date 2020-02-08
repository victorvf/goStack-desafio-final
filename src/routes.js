import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import RecipientController from './app/controllers/RecipientController.js';
import SessionController from './app/controllers/SessionController.js';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware.authenticated);

routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);

routes.get('/recipients', RecipientController.index);
routes.get('/recipient/:id', RecipientController.show);

routes.use(authMiddleware.isAdmin);

routes.post('/user/create', UserController.store);
routes.put('/user/update', UserController.update);
routes.delete('/user/:id/delete', UserController.delete);

routes.post('/recipient/create', RecipientController.store);
routes.put('/recipient/:id/update', RecipientController.update);
routes.delete('/recipient/:id/delete', RecipientController.delete);

export default routes;
