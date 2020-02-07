import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import RecipientController from './app/controllers/RecipientController.js';

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('user/:id', UserController.show);
routes.post('user/create', UserController.store);
routes.put('user/update', UserController.update);
routes.delete('user/:id/delete', UserController.delete);

routes.get('/recipients', RecipientController.index);
routes.get('recipient/:id', RecipientController.show);
routes.post('/recipient/create', RecipientController.store);
routes.put('/recipient/update', RecipientController.update);
routes.delete('/recipient/:id/delete', RecipientController.delete);

export default routes;