'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('delivery_problems', {
          id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
          },
          description: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          created_at: {
              type: Sequelize.DATE,
              allowNull: false,
          },
          updated_at: {
              type: Sequelize.DATE,
              allowNull: false,
          },
      });
  },

  down: queryInterface => queryInterface.dropTable('delivery_problems'),
};
