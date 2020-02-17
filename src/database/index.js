import Sequelize from 'sequelize';

import databaseConfig from '../config/database.js';

import User from '../app/models/User.js';
import Recipient from '../app/models/Recipient.js';
import Deliveryman from '../app/models/Deliveryman.js';
import File from '../app/models/File.js';

const models = [User, Recipient, Deliveryman, File];

class Database{
    constructor(){
        this.init();
    };

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map(
            model => model.init(this.connection)
        );

        models.map(
            model => model.associate && model.associate(this.connection.models)
        );
    };
};

export default new Database();
