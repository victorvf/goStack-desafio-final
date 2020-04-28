import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import ValidateSessionStore from './app/validators/session/SessionStore';
import ValidateUserStore from './app/validators/users/UserStore';
import ValidateUserUpdate from './app/validators/users/UserUpdate';
import ValidateDeliverymanStore from './app/validators/users/DeliverymanStore';
import ValidateDeliverymanUpdate from './app/validators/users/DeliverymanUpdate';
import ValidateRecipientStore from './app/validators/recipient/RecipientStore';
import ValidateRecipientUpdate from './app/validators/recipient/RecipientUpdate';
import ValidateDeliveryStore from './app/validators/deliveries/DeliveryStore';
import ValidateDeliveryUpdate from './app/validators/deliveries/DeliveryUpdate';
import ValidateProblemDeliveryStore from './app/validators/deliveries/ProblemDeliveryStore';
import ValidateProblemDeliveryUpdate from './app/validators/deliveries/ProblemDeliveryUpdate';
import ValidateOpenDeliveryUpdate from './app/validators/deliveries/OpenDeliveryUpdate';
import ValidateCloseDeliveryUpdate from './app/validators/deliveries/CloseDeliveryUpdate';

import UserController from './app/controllers/users/UserController';
import RecipientController from './app/controllers/recipient/RecipientController';
import SessionController from './app/controllers/session/SessionController';
import FileController from './app/controllers/file/FileController';
import DeliverymanController from './app/controllers/users/DeliverymanController';
import DeliveryController from './app/controllers/deliveries/DeliveryController';
import NotificationController from './app/controllers/notification/NotificationController';
import CompletedDeliveriesController from './app/controllers/deliveries/CompletedDeliveriesController';
import OpenDeliveryController from './app/controllers/deliveries/OpenDeliveryController';
import CloseDeliveryController from './app/controllers/deliveries/CloseDeliveryController';
import ProblemDeliveryController from './app/controllers/deliveries/ProblemDeliveryController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', ValidateSessionStore, SessionController.store);

routes.get('/notifications/:id', NotificationController.index);
routes.put('/notifications/:id/update', NotificationController.update);

routes.get('/deliveryman/:id', DeliverymanController.show);

routes.get('/deliveryman/:id/deliveries', OpenDeliveryController.index);
routes.put(
    '/deliveryman/:id/deliveries',
    ValidateOpenDeliveryUpdate,
    OpenDeliveryController.update
);

routes.post('/file/create', upload.single('file'), FileController.store);

routes.get(
    '/deliveryman/:id/orders-delivered',
    CompletedDeliveriesController.index
);

routes.put(
    '/delivery/:id/close-delivery',
    ValidateCloseDeliveryUpdate,
    CloseDeliveryController.update
);

routes.get('/delivery/:id/problems', ProblemDeliveryController.show);
routes.post(
    '/delivery/:id/create-problem',
    ValidateProblemDeliveryStore,
    ProblemDeliveryController.store
);

// authentication
routes.use(authMiddleware);

// verify user is admin
routes.use(adminMiddleware);

routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user/create', ValidateUserStore, UserController.store);
routes.put('/user/update', ValidateUserUpdate, UserController.update);
routes.delete('/user/:id/delete', UserController.delete);

routes.get('/recipients', RecipientController.index);
routes.get('/recipient/:id', RecipientController.show);
routes.post(
    '/recipient/create',
    ValidateRecipientStore,
    RecipientController.store
);
routes.put(
    '/recipient/:id/update',
    ValidateRecipientUpdate,
    RecipientController.update
);
routes.delete('/recipient/:id/delete', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.post(
    '/deliveryman/create',
    ValidateDeliverymanStore,
    DeliverymanController.store
);
routes.put(
    '/deliveryman/:id/update',
    ValidateDeliverymanUpdate,
    DeliverymanController.update
);
routes.delete('/deliveryman/:id/delete', DeliverymanController.delete);

routes.get('/orders', DeliveryController.index);
routes.get('/order', DeliveryController.show);
routes.post('/order/create', ValidateDeliveryStore, DeliveryController.store);
routes.put(
    '/order/:id/update',
    ValidateDeliveryUpdate,
    DeliveryController.update
);
routes.delete('/order/:id/delete', DeliveryController.delete);

routes.get('/delivery/problems', ProblemDeliveryController.index);
routes.put(
    '/delivery/:id/update-problem',
    ValidateProblemDeliveryUpdate,
    ProblemDeliveryController.update
);
routes.delete(
    '/delivery/:id/cancel-delivery',
    ProblemDeliveryController.delete
);

export default routes;
