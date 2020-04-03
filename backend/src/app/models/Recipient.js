import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cep: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                street: Sequelize.STRING,
                number: Sequelize.INTEGER,
                complement: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
}

export default Recipient;
