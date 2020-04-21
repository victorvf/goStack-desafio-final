import './bootstrap';

import express from 'express';
import 'express-async-errors';
import { resolve } from 'path';
import cors from 'cors';
import * as Sentry from '@sentry/node';

import sentryConfig from './config/sentry';

import ExceptionMiddleware from './app/middlewares/exception';

import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();

        Sentry.init(sentryConfig);

        this.middleware();
        this.routes();
        this.exceptionHandler();
    }

    middleware() {
        this.server.use(Sentry.Handlers.requestHandler());
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(
            '/files',
            express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
        );
    }

    routes() {
        this.server.use(routes);
        this.server.use(Sentry.Handlers.errorHandler());
    }

    exceptionHandler() {
        this.server.use(ExceptionMiddleware);
    }
}

export default new App().server;
