'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('deliveries', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product: {
            type: Sequelize.STRING,
            allowNull: false
        },
        start_date: {
            type: Sequelize.DATE,
        },
        end_date: {
            type: Sequelize.DATE,
        },
        canceled_at: {
            type: Sequelize.DATE,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false
        }
      });
  },

  down: queryInterface => queryInterface.dropTable('deliveries'),
};
