import Sequelize from 'sequelize';

import databaseConfig from '../config/database.js';

import User from '../app/models/User.js';
import Recipient from '../app/models/Recipient.js';

const models = [User, Recipient];

class Database{
    constructor(){
        this.init();
    };

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
    };
};

export default new Database();
