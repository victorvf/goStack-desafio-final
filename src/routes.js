import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import RecipientController from './app/controllers/RecipientController.js';
import SessionController from './app/controllers/SessionController.js';

import middleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.get('/users', middleware.authenticated, UserController.index);
routes.get('/user/:id', middleware.authenticated, UserController.show);
routes.post('/user/create', middleware.authenticated, middleware.isAdmin, UserController.store);
routes.put('/user/update',middleware.authenticated, middleware.isAdmin, UserController.update);
routes.delete('/user/:id/delete', middleware.authenticated, middleware.isAdmin, UserController.delete);

routes.get('/recipients', RecipientController.index);
routes.get('/recipient/:id', RecipientController.show);
routes.post('/recipient/create', RecipientController.store);
routes.put('/recipient/update', RecipientController.update);
routes.delete('/recipient/:id/delete', RecipientController.delete);

export default routes;
