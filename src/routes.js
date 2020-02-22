import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController.js';
import RecipientController from './app/controllers/RecipientController.js';
import SessionController from './app/controllers/SessionController.js';
import FileController from './app/controllers/FileController.js';
import DeliverymanController from './app/controllers/DeliverymanController.js';
import OrderController from './app/controllers/OrderController.js';
import NotificationController from './app/controllers/NotificationController.js';
import CompletedDeliveriesController from './app/controllers/CompletedDeliveriesController.js';
import DeliveriesController from './app/controllers/DeliveriesController.js';
import CloseDeliveryController from './app/controllers/CloseDeliveryController.js';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

routes.get('/notifications/:id', NotificationController.index);
routes.put('/notifications/:id/update', NotificationController.update);

routes.get('/deliveryman/:id/deliveries', DeliveriesController.index);
routes.put('/deliveryman/:id/deliveries', DeliveriesController.update);

routes.post('/file/create', upload.single('file'), FileController.store);

routes.put('/deliveryman/:id/close-delivery', CloseDeliveryController.update);

routes.get('/deliveryman/:id/orders-delivered', CompletedDeliveriesController.index);

// authentication
routes.use(authMiddleware);

// verify user is admin
routes.use(adminMiddleware);

routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user/create', UserController.store);
routes.put('/user/update', UserController.update);
routes.delete('/user/:id/delete', UserController.delete);

routes.get('/recipients', RecipientController.index);
routes.get('/recipient/:id', RecipientController.show);
routes.post('/recipient/create', RecipientController.store);
routes.put('/recipient/:id/update', RecipientController.update);
routes.delete('/recipient/:id/delete', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.post('/deliveryman/create', DeliverymanController.store);
routes.put('/deliveryman/:id/update', DeliverymanController.update);
routes.delete('/deliveryman/:id/delete', DeliverymanController.delete);

routes.get('/orders', OrderController.index);
routes.get('/order', OrderController.show);
routes.post('/order/create', OrderController.store);
routes.put('/order/:id/update', OrderController.update);
routes.delete('/order/:id/delete', OrderController.delete);

export default routes;
