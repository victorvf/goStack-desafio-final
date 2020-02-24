import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database.js';

import User from '../app/models/User.js';
import Recipient from '../app/models/Recipient.js';
import Deliveryman from '../app/models/Deliveryman.js';
import File from '../app/models/File.js';
import Order from '../app/models/Order.js';

const models = [User, Recipient, Deliveryman, File, Order];

class Database{
    constructor(){
        this.init();
        this.mongo();
    };

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));

        models.map(model => model.associate && model.associate(this.connection.models));
    };

    mongo(){
        this.mongoConnection = mongoose.connect(
            process.env.URL_MONGO,
        {
            useNewUrlParser: true,
            useFindAndModify: true
        });
    };
};

export default new Database();
