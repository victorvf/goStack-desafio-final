import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Delivery from '../app/models/Delivery';
import Problem from '../app/models/Problem';

const models = [User, Recipient, Deliveryman, File, Delivery, Problem];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));

        models.map(
            model => model.associate && model.associate(this.connection.models)
        );
    }

    mongo() {
        this.mongoConnection = mongoose.connect(process.env.URL_MONGO, {
            useNewUrlParser: true,
            useFindAndModify: true,
        });
    }
}

export default new Database();
