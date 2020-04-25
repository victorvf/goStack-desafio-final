require('../bootstrap');

module.exports = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.HOST_DB,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    storage: './__tests__/database.sqlite',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
