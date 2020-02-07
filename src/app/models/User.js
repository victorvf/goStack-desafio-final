import Sequelize, {Model} from 'sequelize';

class User extends Model{
    static init(sequelize){
        super.init('user', {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN
        },
        {
            sequelize
        });
    };
};

export default new User();